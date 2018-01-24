import React from 'react';
import Loadable from 'react-loadable';
import 'isomorphic-unfetch';
import Loading from '../components/loading';

const loadImage = src => {
  if (typeof document === 'undefined') { return; }
  const img = document.createElement('img');
  img.src = src;

  return new Promise((resolve, reject) => {
    const fulfill = () => {
      img.removeEventListener('load', fulfill);
      img.removeEventListener('error', fulfill);

      if (img.naturalWidth) {
        resolve(img);
      } else {
        reject();
      }
    };

    img.addEventListener('load', fulfill);
    img.addEventListener('error', fulfill);
  });
}

const wait = delay => new Promise(r => setTimeout(r, delay));

const LoadableApp = Loadable({
  loader: () => Promise.all([
    '/static/images/kii.png',
    '/static/images/vertigo.png',
    '/static/images/kyotojs.png',
    '/static/images/vj01.jpg',
    '/static/images/vj02.jpg',
    '/static/images/vj03.jpg',
    '/static/images/vj04.jpg',
    '/static/images/vj05.jpg',
    '/static/images/vj06.jpg',
    '/static/images/vj07.jpg',
    '/static/images/t_evil.png',
    '/static/images/lolipop.png',
    '/static/images/t_mokugyo.png',
    '/static/images/t_font.png',
    '/static/images/t_glitch.png',
    '/static/images/t_bake.png',
  ].map(loadImage))
    .then(res => import('../components/app'))
    .then(res => wait(300).then(() => res)),
  loading: Loading,
  modules: ['../components/app'],
  webpack: () => [require.resolveWeak('../components/app')],
});

export default class Index extends React.Component {
  componentDidMount() {
    document.querySelectorAll('video').forEach(e => {
      e.loop = true;
      e.addEventListener('mousemove', () => e.play());
      e.addEventListener('mouseleave', () => e.pause());
    });
  }

  render() {
    return <LoadableApp/>;
  }
}
