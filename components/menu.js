import styled from 'styled-components';

const Wrapper = styled.nav`
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
    line-height: 4em;
  }
  a, a:hover {
    font-size: 1.8em;
    color: white;
    text-decoration: none;
    position: relative;
    width: 160px;
    height: 1.8em;
    margin: 1em auto;
    display: inline-block;
    overflow: hidden;
  }
  span:before, span:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    transition: .4s .8s;
    transform: skew(-45deg);
  }
  a:before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 2px;
    left: 0;
    bottom: 0;
    background: #ddd;
    border: none;
  }

  span {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 0;
    top: 100px;
    transition: .5s .5s;
    line-height: 1.6em;
  }

  span:before {
    top: 0;
    left: 80px;
    border-top: 15px solid white;
  }
  span:after {
    bottom: 2px;
    right: 80px;
    border-bottom: 15px solid white;
  }

  &[open] {
    a:before {
      width: 100%;
    }
    span {
      opacity: 1;
      top: 0;
    }
    span:before {
      left: -15px;
    }
    span:after {
      right: -15px;
    }
  }
  @keyframes stripe {
    from { background-position: 0px; }
    to { background-position: -100px; }
  }
  a:hover {
    background: repeating-linear-gradient(
      -30deg,
      #000 0px, #000 5px, #444 5px, #444 8px
    );
    animation: stripe 3s linear infinite;
  }
`;

export default class Menu extends React.PureComponent {
  state = {
    isVisible: false,
  }

  move = e => {
    try {
      const el = document.querySelector(e.currentTarget.getAttribute('href'));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    } catch(e) {}

    this.props.onMove();
  }

  render() {
    return (
      <Wrapper open={this.props.open}>
        <ul style={{ padding: 0 }}>
          <li><a onClick={this.move} href="#profile"><span>Profile</span></a></li>
          <li><a onClick={this.move} href="#vj"><span>VJ Works</span></a></li>
          <li><a onClick={this.move} href="#apps"><span>Apps</span></a></li>
          <li><a onClick={this.move} href="#blog"><span>Blog</span></a></li>
        </ul>
      </Wrapper>
    );
  }
}
