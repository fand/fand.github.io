import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import ThreeShader from './three-shader';

const shaderPc = require('./shaders/pc.frag');
const shaderMobile = require('./shaders/mobile.frag');

injectGlobal`
  @keyframes disolve {
    from { opacity: 0; }
    to   { opacity: .5; }
  }
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background: radial-gradient(circle, transparent, black);
`;

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  opacity: 0;
  animation: disolve 3s linear 1s 1;
  animation-fill-mode: forwards;
  background: #fff;
`;

const Texture = styled.img`
  display: none;
`;

export default class Shader extends React.Component {
  constructor(props) {
    super(props);
    this.three = new ThreeShader(1, 2);
    this.scroll = 0;
  }

  componentDidMount() {
    this.three.setCanvas(this.canvas);
    this.three.loadTexture('image', '/images/kii.png');
    this.three.loadShader(window.innerWidth > 770 ? shaderPc : shaderMobile);
    this.three.addUniform('scroll', this.getScroll);
    this.three.play();

    this.update();
  }

  update = (e) => {
    if (!window) { return; }

    this.scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    requestAnimationFrame(this.update);
  }

  getScroll = () => this.scroll;

  setCanvas = el => this.canvas = el;

  render() {
    return (
      <div>
        <Texture src="/images/kii.png"/>
        <Canvas innerRef={this.setCanvas}/>
      </div>
    );
  }
}
