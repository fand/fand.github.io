import React from 'react';
import marked from 'marked';
import styled, { injectGlobal } from 'styled-components';
import Shader from './shader';

const profile = require('./profile.md');

injectGlobal`
  body {
    line-height: 2em;
    font-family: serif;
    text-align: center;
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

  img, iframe {
    width: 420px;
    max-width: 100%;
    max-height: 360px;
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
    margin: 30px auto 30px;
  }
  h2 {
    margin: 90px auto 40px;
    &:before, &:after {
      color: #999;
      content: '――――';
      letter-spacing: -0.2em;
      margin: 0 20px 0 10px;
    }
  }
  h3 {
    margin: 60px auto 20px;
    font-size: 1.17em;
  }
  h4 {
    margin: 80px auto 20px;
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
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
  }
  a {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 80px);
  }
`;

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

export default () => (
  <div>
    <Shader/>
    <Wrapper>
      <div dangerouslySetInnerHTML={innerHtml}/>
    </Wrapper>
    <Footer>
      <img src="/images/vertigo.png" width="120"/>
      <a href="/">gmork.in</a>
    </Footer>
  </div>
);
