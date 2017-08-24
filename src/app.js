import React from 'react';
import marked from 'marked';
import styled, { injectGlobal } from 'styled-components';

const profile = require('./profile.md');

injectGlobal`
  @keyframes blink {
    0%   { background: hsl(210, 9%, 93%); }
    17%  { background: hsl(180, 3%, 93%); }
    31%  { background: hsl(199, 7%, 93%); }
    47%  { background: hsl(230, 3%, 93%); }
    63%  { background: hsl(210, 1%, 93%); }
    79%  { background: hsl(180, 9%, 93%); }
    91%  { background: hsl(230, 7%, 93%); }
    100% { background: hsl(190, 1%, 93%); }
  }
  body {
    animation: blink 3s linear 0s infinite;
  }
`;

const Wrapper = styled.section`
  width: 640px;
  max-width: 90%;
  margin: 20px auto;
  line-height: 2em;
  font-family: serif;
  text-align: center;

  .vertigo {
    width: 180px;
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

marked.setOptions({
  gfm: true,
  breaks: true,
});
const innerHtml = { __html: marked(profile) }

export default () => (
  <div>
    <Wrapper>
      <div dangerouslySetInnerHTML={innerHtml}/>
    </Wrapper>
  </div>
);
