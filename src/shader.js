import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import ThreeShader from './three-shader';

const shaders = [
  require('./shaders/0.frag'),
];

injectGlobal`
  @keyframes disolve {
    from { opacity: 0; }
    to   { opacity: .8; }
  }
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background: radial-gradient(circle, transparent, silver);
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
`;

export default class Shader extends React.Component {
  componentDidMount() {
    this.three = new ThreeShader(1, 3);
    this.three.setCanvas(this.canvas);
    // this.three.loadTexture(article.texture);
    this.three.loadShader(shaders[Math.floor(Math.random() * shaders.length)]);
    this.three.play();
  }

  setCanvas = el => this.canvas = el;

  render() {
    return (
      <div>
        <Mask/>
        <Canvas innerRef={this.setCanvas}/>
      </div>
    );
  }
}
