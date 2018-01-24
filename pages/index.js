import React from 'react';
import App from '../components/app';

export default class Index extends React.Component {
  componentDidMount() {
    const observer = window.lozad();
    observer.observe();

    document.querySelectorAll('video').forEach(e => {
      e.loop = true;
      e.addEventListener('mousemove', () => e.play());
      e.addEventListener('mouseleave', () => e.pause());
    });
  }

  render() {
    return <App/>;
  }
}
