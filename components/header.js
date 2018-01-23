import React from 'react';
import styled from 'styled-components';
import Hamburger from './hamburger';

const HEIGHT = 48;

const Wrapper = styled.section`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEIGHT}px;
  background: rgba(157, 250, 251, 0.6);
`;

const Logo = styled.div`
  display: flex;
  margin: auto;
  width: 170px;
  .icon {
    width: ${HEIGHT}px;
    height: ${HEIGHT}px;
    padding: 6px;
    margin-right: -2px;
  }
  h1 {
    line-height: ${HEIGHT - 8}px;
    margin: 4px;
  }
`;

export default class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <Logo>
          <img className="icon" src="/static/images/vertigo.png"/>
          <h1 className="logo">AMAGI</h1>
        </Logo>
        <Hamburger size={HEIGHT}/>
      </Wrapper>
    );
  }
}
