/**
 * Webpage entry point. 
 * Handles setup and scene routing.
 */

// Sample scene for default loading
import Sample from './scenes/sample';

import {
    WebGLRenderer
} from 'three';

class Site {
    constructor() {
        /** @type {WebGLRenderer} */
        this.renderer;

        this._initRenderer();
        this._initEventListeners();

        // Load starting scene
        this.loadScene('/');

        // DEBUG
        // document.site = this;
    }

    _initEventListeners() {
        // Resize renderer when window resizes
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Scene loading event listener
        window.addEventListener('loadscene', ((e) => {
            this.loadScene(e.detail);
        }).bind(this), true);

        window.onpopstate = (() => {
            this.loadScene(window.location.pathname); // Return to previous scene
        }).bind(this);
    }

    _initRenderer() {
        const renderer = new WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.renderer = renderer;
    }

    loadScene(path) {
        window.history.pushState({}, path, window.location.origin + path);

        // Clean up previous scene if it exists
        if(this.scene) {
            this.scene.stop();
            this.scene.removeEventListeners();
        }

        // TODO: Loading scene/page start
        // const loadingScene = new LoadingScene(this.renderer);
        // loadingScene.start();

        // Begin loading new scene
        switch(path) {
            case '/':
                this.scene = new Sample(this.renderer);
                break;
            default:
                this.scene = new Sample(this.renderer);
                break;
        }

        const promise = new Promise(((resolve, reject) => {
            this.scene.loader.waitForCache().then((cache) => {
                resolve(cache);
            });
        }).bind(this));

        promise.then(((cache) => {
            // TODO: Loading scene/page end
            // loadingScene.stop();
            this.scene.onAssetsLoaded(cache);
            this.scene.start();
        }).bind(this));
    }

    /**
     * Updates scene camera aspect ratio and resizes rendering framebuffer on window resize
     */
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scene.updateCameraAspect(width / height);
        this.renderer.setSize(width, height);
    }
};

new Site();