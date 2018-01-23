import React from 'react';
import marked from 'marked';
import styled, { injectGlobal } from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';
import Shader from './shader';
import Header from './header';
import profile from './profile.md';
import scrollToTop from './scroll-to-top';

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
  }

  code {
    font-size: 0.9em;
  }

  a, a:visited {
    color: #059;
    text-decoration: none;
  }
  a:hover {
    opacity: 0.5;
    text-decoration: underline;
  }

  h1, h2 {
    text-align: center;
  }
  h1 {
    font-size: 1.8em;
    padding: 30px 0 30px;
  }
  h2 {
    padding: 90px 0 40px;
    &:before, &:after {
      color: #999;
      content: '――――';
      letter-spacing: -0.2em;
      margin: 0 20px 0 10px;
    }
  }
  h3 {
    padding: 60px 0 20px;
    font-size: 1.17em;
  }
  h4 {
    padding: 80px 0 20px;
    font-size: 1.12em;
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

const renderer = new marked.Renderer();
renderer.image = function(href, title, text) {
  var out = '<img class="lozad" data-src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

marked.setOptions({
  gfm: true,
  breaks: true,
});
const innerHtml = { __html: marked(profile, { renderer }) }

export default class App extends React.Component {
  state = {
    isHeaderVisible: false,
  }

  onChangeHero = isVisible => {
    this.setState({ isHeaderVisible: !isVisible });
  }

  render() {
    return (
      <div>
        <HeaderWrapper visible={this.state.isHeaderVisible}>
          <Header/>
        </HeaderWrapper>
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
        <Shader/>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"></script>
      </div>
    );
  }
}
