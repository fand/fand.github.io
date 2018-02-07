import React from 'react';
import styled from 'styled-components';
import scrollToTop from './scroll-to-top';
import { HEADER_HEIGHT } from './constants';

const Wrapper = styled.section`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background: #9FF;
`;

const Logo = styled.div`
  display: flex;
  margin: auto;
  width: 170px;
  .icon {
    width: ${HEADER_HEIGHT}px;
    height: ${HEADER_HEIGHT}px;
    padding: 6px;
    margin-right: -2px;
  }
  h1 {
    line-height: ${HEADER_HEIGHT - 8}px;
    margin: 4px;
  }

  cursor: pointer;
  &:hover {
    filter: drop-shadow(2px 0 red);
  }
`;

export default class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <Logo onClick={scrollToTop}>
          <img className="icon" src="/static/images/vertigo.png"/>
          <h1 className="logo">AMAGI</h1>
        </Logo>
      </Wrapper>
    );
  }
}
