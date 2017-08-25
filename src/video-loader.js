import * as THREE from 'three';

export default class VideoLoader {
  constructor() {
    this._cache = {};
  }

  load(name, url) {
    const cache = this._cache[url];
    if (cache) {
      return cache.texture;
    }

    const video = document.createElement('video');
    document.body.appendChild(video);

    video.src = url;
    video.style.position = 'fixed';
    video.style.top = '-9999px';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    const texture = new THREE.VideoTexture(video);
    texture.format = THREE.RGBFormat;

    this._cache[url] = { video, texture };

    return texture;
  }

  unload(url) {
    const cache = this._cache[url];
    if (cache) {
      document.body.removeChild(cache.video);
    }
    this._cache[url] = null;
  }
}
