import {ObjectLoader, TextureLoader} from 'three';
import GLTFLoader from 'three-gltf-loader';

const objectLoader = new ObjectLoader();
const textureLoader = new TextureLoader();
const gltfLoader = new GLTFLoader();

export default class Loader {
    constructor() {
        this._queue = [];
        this.cache = {};

        this._load = this._load.bind(this);
    }

    _load(resolve, reject, loader, url, id) {
        loader.load(
            url,
            (asset) => { // onSuccess
                this.cache[id] = asset;
                resolve(asset);    
            },
            () => {}, // onProgress
            err => reject(err)
        );
    }

    addObjectToQueue(url, id) {
        const promise = new Promise(((resolve, reject) => {
            this._load(resolve, reject, objectLoader, url, id);
        }).bind(this));
        
        this._queue.push(promise);
        return promise;
    }

    addTextureToQueue(url, id) {
        const promise = new Promise(((resolve, reject) => {
            this._load(resolve, reject, textureLoader, url, id);
        }).bind(this));
        
        this._queue.push(promise);
        return promise;
    }

    addGLTFToQueue(url, id) {
        const promise = new Promise(((resolve, reject) => {
            this._load(resolve, reject, gltfLoader, url, id);
        }).bind(this));
        
        this._queue.push(promise);
        return promise;
    }

    waitForCache() {
        const promise = new Promise(((resolve, reject) => {
            Promise.all(this._queue).then((() => {
                resolve(this.cache);
            }).bind(this));
        }).bind(this));

        return promise;
    }
    
};