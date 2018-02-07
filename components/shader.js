import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import shaderPc from './shaders/pc.frag';
import shaderMobile from './shaders/mobile.frag';

// for Safari
if (
  typeof window !== 'undefined' &&
  typeof window.AudioContext === 'undefined' &&
  typeof window.webkitAudioContext !== 'undefined'
) {
  window.AudioContext = window.webkitAudioContext
}

const Wrapper  = styled.div`
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  background: #9FF;
`;

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  opacity: 0.4;
  animation-fill-mode: forwards;
  background: #fff;
`;

const Video = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 200%;
  z-index: -2;
  background: #9FF;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 300%;
  }

  transition: opacity 1s;
  opacity: ${p => p.visible ? 1 : 0.5};
`

export default class Shader extends React.Component {
  componentDidMount() {
    if (!window) { return; }

    // const Veda = require('vedajs');
    // this.veda = new Veda();
    // this.veda.setCanvas(this.canvas);
    // this.veda.loadTexture('image', '/static/images/kii.png');
    // this.veda.loadFragmentShader(window.innerWidth > 770 ? shaderPc : shaderMobile);
    //
    // this.resize();
    // this.scroll();
    // window.addEventListener('resize', this.resize);
    // window.addEventListener('scroll', this.scroll);
    //
    // this.veda.play();
  }

  resize = () => {
    this.veda.resize(window.innerWidth, window.innerHeight)
  }

  scroll = () => {
    if (!window) { return 0; }
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    this.veda.setUniform('scroll', 'f', scroll);
  }

  setCanvas = el => this.canvas = el;

  render() {
    return (
      <Wrapper>
        {/* <Canvas innerRef={this.setCanvas}/> */}
        <Video autoPlay playsInline loop visible={this.props.visible}>
          <source src="/static/videos/m8.mp4" type="video/mp4" media="all and (min-width: 768px)"/>
          <source src="/static/videos/m8_1280.mp4" type="video/mp4" media="all and (max-width: 767px)"/>
        </Video>
      </Wrapper>
    );
  }
}
