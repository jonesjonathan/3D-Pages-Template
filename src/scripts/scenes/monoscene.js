/**
 * Represents a single scene
 */

import WebScene from './webscene';

export default class MonoScene extends WebScene {
    static path() {
        return '/monoscene';
    }

    constructor(renderer) {
        super(renderer);
    }

    _render(delta) {

    }
};