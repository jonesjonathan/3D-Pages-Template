import { 
    PerspectiveCamera, 
    Scene, 
    Clock
} from "three";

/**
 * Parent class for all scenes.
 */

export default class WebScene {
    constructor(renderer) {
        this.isActive = false;
        this.renderer = renderer;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.clock = new Clock(false);

        // List of event listener references
        this.eventListeners = [];

        // Bind functions to context
        this._render = this._render.bind(this);
    }

    updateCameraAspect(aspect) {
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    start() {
        this.isActive = true;
        this.clock.start();
        this._render();
    }

    stop() {
        this.isActive = false;
        this.clock.stop();
    }

    /**
     * Override this in children. Updates objects in scene every frame.
     * @param {Number} delta Time passed in seconds since last frame
     */
    _animate(delta) {
        return delta;
    }

    _render() {
        if(this.isActive) {
            const delta = this.clock.getDelta();

            // Animate objects in child scene
            this._animate(delta);

            this.renderer.render(this.scene, this.camera);

            return requestAnimationFrame(this._render);
        }
    }

    /**
     * Fires an event to load a new scene, effectively ending this one
     * @param {String} path 
     */
    _loadScene(path) {
        window.dispatchEvent(
            new CustomEvent('loadscene', {detail : path})
        );
    }

    /**
     * Adds an event listener to the list of EL references for deletion later
     * @param {HTMLElement} target 
     * @param {String} type 
     * @param {Function} listener 
     */
    _addEventListener(target, type, listener) {
        target.addEventListener(type, listener);
        this.eventListeners.push({
            target : target,
            type : type,
            listener : listener
        });
    }

    /**
     * Removes all event listeners associated with this scene
     */
    removeEventListeners() {
        for(let i = 0; i < this.eventListeners.length; i++) {
            const eventListener = this.eventListeners[i];
            eventListener.target.removeEventListener(
                eventListener.type,
                eventListener.listener
            );
        }
}
};