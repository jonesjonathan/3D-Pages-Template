/**
 * Represents a single scene
 */

import WebScene from './webscene';
import { } from 'three';

export default class MonoScene extends WebScene {
    static path() {
        return '/monoscene';
    }

    constructor(renderer) {
        super(renderer);
    }

    _animate(delta) {
    }
};