import React from 'react';
import styled from 'styled-components';
import Menu from './menu';

const Wrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 12px;
  width: ${p => p.size - 20}px;
  height: ${p => p.size - 20}px;
  cursor: pointer;
  transition: width 0.1s 0.2s, height 0.2s, background 0.3s, filter 0.8s 0.4s;
  z-index: 10;
  overflow: hidden;

  background: linear-gradient(
    -18.2deg,
    #333 5.25%, transparent 5.26%,
    transparent 21.74%, #333 21.75%,
    #333 28.5%, transparent 28.51%,
    transparent 46.74%, #333 46.75%,
    #333 53.25%, transparent 53.26%,
    transparent 71.74%, #333 71.75%,
    #333 78.25%, transparent 78.26%,
    transparent 94.74%, #333 94.75%
  ) 100% 100% / ${p => p.size - 20}px ${p => p.size - 20}px;
  &:hover {
    background-position: -${p => (p.size - 20) * 3}px;
  }

  &[open] {
    overflow: scroll;
    background-position: -${p => (p.size - 20) * 3}px;
    width: calc(100vw - 24px);
    height: calc(100vh - 24px);
    margin: 0;
    cursor: default;
    background: linear-gradient(
      -18.2deg,
      #000 3.25%, rgba(0, 0, 0, 0.8) 3.26%,
      rgba(0, 0, 0, 0.8) 21.74%, #000 21.75%,
      #000 28.5%, rgba(0, 0, 0, 0.8) 28.51%,
      rgba(0, 0, 0, 0.8) 46.74%, #000 46.75%,
      #000 53.25%, rgba(0, 0, 0, 0.8) 53.26%,
      rgba(0, 0, 0, 0.8) 71.74%, #000 71.75%,
      #000 78.25%, rgba(0, 0, 0, 0.8) 78.26%,
      rgba(0, 0, 0, 0.8) 96.74%, #000 96.75%
    ) 100% 100% / ${p => p.size - 20}px ${p => p.size - 20}px;
    filter: drop-shadow(4px 4px rgba(0, 0, 0, 0.4))
      drop-shadow(-4px -4px rgba(0, 0, 0, 0.4));

    @media (max-width: 768px) {
      background-position: 0;
      filter: none;
      background: rgba(0,0,0,0.8);
    }
  }
  @media (max-width: 768px) {
    transition: .3s;
  }
`;

const Inner = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  opacity: 0;
  &[open] {
    position: fixed;
    display: block;
    opacity: 1;
    color: white;
    transition: .3s all .5s;
    @media (max-width: 768px) {
      transition: none;
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${p => p.size - 24}px;
  height: ${p => p.size - 24}px;
  cursor: pointer;
  margin: 24px;
  transition: 0.4s;
  background:
   linear-gradient(45deg, transparent 48%, white 48.1%, silver 51.9%, transparent 52%),
   linear-gradient(-45deg, transparent 48%, white 48.1%, silver 51.9%, transparent 52%);
 @media (max-width: 768px) {
   transition: none;
 }
`;

export default class Hamburger extends React.PureComponent {
  state = {
    open: false,
  }

  open = () => {
    if (!this.state.open) {
      this.setState({ open: true });
    }
  }

  close = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <Wrapper size={this.props.size}
        open={this.state.open}
        onClick={this.open}>
        <Inner open={this.state.open}>
          <CloseButton size={this.props.size} onClick={this.close}/>
          <Menu open={this.state.open} onMove={this.close}/>
        </Inner>
      </Wrapper>
    );
  }
}
