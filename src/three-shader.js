import * as THREE from 'three';
import VideoLoader from './video-loader';

const DEFAULT_VERTEX_SHADER = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default class ThreeShader {
  constructor(ratio, skip) {
    this._ratio = ratio;
    this._skip = skip;

    this._scene = new THREE.Scene();

    // Create camera
    this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this._camera.position.set(0, 0, 1);
    this._camera.lookAt(this._scene.position);

    // Create a target for backbuffer
    this._targets = [
      new THREE.WebGLRenderTarget(
        0, 0,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat }
      ),
      new THREE.WebGLRenderTarget(
        0, 0,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat }
      ),
    ];

     this._videoLoader = new VideoLoader();

    // Prepare uniforms
    this._start = Date.now();
    this._uniforms = {
      backbuffer: { type: 't', value: new THREE.Texture() },
      mouse: { type: 'v2', value: new THREE.Vector2() },
      resolution: { type: 'v2', value: new THREE.Vector2() },
      time: { type: 'f', value: 0.0 },
    };

    this._textureLoader = new THREE.TextureLoader();
  }

  setPixelRatio(pixelRatio) {
    this._ratio = pixelRatio;
    this._renderer.setPixelRatio(1 / pixelRatio);
    this._resize();
  }

  setFrameskip(frameskip) {
    this._skip = frameskip;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    if (!canvas) {
      return;
    }

    this._renderer = new THREE.WebGLRenderer({ canvas });
    this._renderer.setPixelRatio(1 / this._ratio);
    this._resize();
    window.addEventListener('resize', this._resize);
    window.addEventListener('mousemove', this.mousemove);

    this._frame = 0;
    this.animate();
  }

  loadShader(shader) {
    if (this._plane) {
      this._scene.remove(this._plane);
    }

    // Create plane
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: DEFAULT_VERTEX_SHADER,
      fragmentShader: shader,
      extensions: {
        derivatives: true,
        drawBuffers: false,
        fragDepth: false,
        shaderTextureLOD: false,
      },
    });
    this._plane = new THREE.Mesh(geometry, material);
    this._scene.add(this._plane);
  }

  loadTexture(name, textureUrl) {
    const texture = isVideo(textureUrl) ? this._videoLoader.load(name, textureUrl) : this._textureLoader.load(textureUrl);
    this._uniforms[name] = {
      type: 't',
      value: texture,
    };
  }

  unloadTexture(name, textureUrl) {
    const texture = this._uniforms[name];
    texture.value.dispose();

    if (isVideo(textureUrl)) {
      this._videoLoader.unload(textureUrl);
    }
  }

  mousemove = (e: MouseEvent) => {
    this._uniforms.mouse.value.x = e.clientX / window.innerWidth;
    this._uniforms.mouse.value.y = 1 - e.clientY / window.innerHeight;
  }

  _resize = () => {
    const [width, height] = [window.innerWidth, window.innerHeight];
    this._renderer.setSize(width, height);
    this._targets.forEach(t => t.setSize(width / this._ratio, height / this._ratio));
    this._uniforms.resolution.value.x = width / this._ratio;
    this._uniforms.resolution.value.y = height / this._ratio;
  }

  animate = () => {
    this._frame++;
    if (!this._isPlaying) {
      return;
    }

    requestAnimationFrame(this.animate);
    if (this._frame % this._skip === 0) {
      this._render();
    }
  }

  play() {
    this._isPlaying = true;
    this.animate();
  }

  stop() {
    this._isPlaying = false;
  }

  _render() {
    this._uniforms.time.value = (Date.now() - this._start) / 1000;
    this._targets = [this._targets[1], this._targets[0]];
    this._uniforms.backbuffer.value = this._targets[0].texture;

    this._renderer.render(this._scene, this._camera);
    this._renderer.render(this._scene, this._camera, this._targets[1], true);
  }
}
