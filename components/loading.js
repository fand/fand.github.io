import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @keyframes loading {
    from {
      background-position: 0;
    }
    to {
      background-position: 100px;
    }
  }
  background: linear-gradient(-60deg, black 10px, #122 12px, #012 14px, black 23px, black) 0 0 / 20px 20px;
  animation: loading 2.3s infinite;
`;

export default () => (
  <Wrapper/>
);
