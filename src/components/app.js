import React from 'react';
import Markdown from 'react-markdown';
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
  max-width: 80%;
  margin: 20px auto;
  line-height: 2em;
  font-family: serif;
  text-align: center;

  .vertigo {
    width: 120px;
    margin: 50px;
  }

  img {
    max-width: 420px;
    max-height: 360px;
  }

  ul {
    padding: 0 20px;
    width: 200px;
    margin: auto;
    text-align: left;
    list-style: none;
  }

  h1, h2 {
    text-align: center;
  }
  h1 {
    font-size: 1.8em;
    margin: 30px auto 30px;
  }
  h2 {
    margin: 90px auto 30px;
  }
  h3 {
    margin: 40px auto 20px;
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
