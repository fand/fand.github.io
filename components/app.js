import React from 'react';
import marked from 'marked';
import styled, { injectGlobal } from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';
import Shader from './shader';
import Header from './header';
import Hamburger from './hamburger';
import profile from './profile.md';
import scrollToTop from './scroll-to-top';
import { HEADER_HEIGHT } from './constants';

injectGlobal`
  body {
    line-height: 2em;
    font-family: "Open Sans", sans-serif;
    text-align: center;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
  }
`;

const AppWrapper = styled.main`
  @keyframes disolve {
    from {
      opacity: 0;
      background: black;
    }
    to {
      opacity: 1;
      background: transparent;
    }
  }
  animation: disolve 1s;
`;

const Wrapper = styled.section`
  width: 640px;
  max-width: 90%;
  margin: 20px auto;

  .vertigo {
    width: 180px;
    height: 180px;
    margin: 50px;
  }

  img, iframe, video {
    width: 480px;
    min-height: 180px;
    max-width: 90vw;
    max-height: 300px;
  }

  p {
    margin: 1em auto;
    text-shadow: 0 0 2px white;
    font-weight: 600;
  }

  code {
    font-size: 0.9em;
  }

  a, a:visited {
    color: #F00;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  h1, h2 {
    text-align: center;
  }
  h1 {
    font-size: 2em;
    padding: 30px 0 30px;
  }
  h2 {
    padding: 90px 0 40px;
    font-size: 1.9em;
    &:before, &:after {
      color: #000;
      content: '―――';
      letter-spacing: -0.2em;
      margin: 0 20px 0 10px;
    }
  }
  h3 {
    padding: 60px 0 20px;
    font-size: 1.8em;
  }
  h4 {
    padding: 80px 0 20px;
    font-size: 1.7em;
  }
  h3 + h4 {
    margin-top: 20px;
  }
`;

const Footer = styled.footer`
  position: relative;
  width: 100vw;
  height: 100vh;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;

    transition: transform 0.5s;
    transform: translate(-50%, -50%) rotate(0deg);
    &:hover {
      transform: translate(-50%, -50%) rotate(1080deg);
    }
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 80px);
  }
`;

const Hero = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  margin-bottom: -20vh;
  img {
    position: absolute;
    top: calc(50% - 50px);
    left: 50%;
    width: 200px;
    height: 200px;
    max-width: 40vw;
    max-height: 40vw;
    transform: translate(-50%, -50%);
  }
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(5vw));
    font-size: 3em;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
  }
`;

const HeaderWrapper = styled.div`
  transition: opacity 0.3s;
  opacity: ${p => p.visible ? 1 : 0};
`
marked.setOptions({
  gfm: true,
  breaks: true,
});
const innerHtml = { __html: marked(profile) }

export default class App extends React.Component {
  state = {
    isHeaderVisible: false,
  }

  onChangeHero = isVisible => {
    this.setState({ isHeaderVisible: !isVisible });
  }

  render() {
    return (
      <AppWrapper>
        <HeaderWrapper visible={this.state.isHeaderVisible}>
          <Header/>
        </HeaderWrapper>
        <Hamburger size={HEADER_HEIGHT}/>
        <Hero>
          <VisibilitySensor onChange={this.onChangeHero}/>
          <img src="/static/images/vertigo.png" width="200"/>
          <h1>AMAGI</h1>
        </Hero>
        <Wrapper>
          <div dangerouslySetInnerHTML={innerHtml}/>
        </Wrapper>
        <Footer onClick={scrollToTop}>
          <img src="/static/images/vertigo.png" width="120"/>
          <span>gmork.in</span>
        </Footer>
        <Shader visible={!this.state.isHeaderVisible}/>
      </AppWrapper>
    );
  }
}
