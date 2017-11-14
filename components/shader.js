import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import shaderPc from './shaders/pc.frag';
import shaderMobile from './shaders/mobile.frag';

injectGlobal`
  @keyframes disolve {
    from { opacity: 0; }
    to   { opacity: .5; }
  }
`;

const Wrapper  = styled.div`
  background: #fff;
  opacity: 1;
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

export default class Shader extends React.Component {
  constructor(props) {
    super(props);
    this.scroll = 0;
  }

  componentDidMount() {
    if (!window) { return; }

    const Veda = require('vedajs');
    this.veda = new Veda();
    this.veda.setCanvas(this.canvas);
    this.veda.loadTexture('image', '/static/images/kii.png');
    this.veda.loadFragmentShader(window.innerWidth > 770 ? shaderPc : shaderMobile);
    this.veda.setUniform('scroll', 'f', this.getScroll());
    this.veda.play();

    this.update();
  }

  update = (e) => {
    this.veda.setUniform('scroll', 'f', this.getScroll());
    requestAnimationFrame(this.update);
  }

  getScroll = () => {
    if (!window) { return 0; }
    return window.scrollY / (document.body.scrollHeight - window.innerHeight);
  }

  setCanvas = el => this.canvas = el;

  render() {
    return (
      <Wrapper>
        <Canvas innerRef={this.setCanvas}/>
      </Wrapper>
    );
  }
}
