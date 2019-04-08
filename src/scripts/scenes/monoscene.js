/**
 * Represents a single scene
 */

import WebScene from './webscene';
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

export default class MonoScene extends WebScene {
    static path() {
        return '/monoscene';
    }

    constructor(renderer) {
        super(renderer);
        const mesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial({color : 'red', wireframe : true})
        );
        mesh.position.set(0, 0, -5);
        this.scene.add(mesh);
    }

    _animate(delta) {
        console.log(delta);
    }
};