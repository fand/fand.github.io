import React from 'react';
import App from '../components/app';

export default class Index extends React.Component {
  componentDidMount() {
    const observer = window.lozad();
    observer.observe();
  }

  render() {
    return <App/>;
  }
}
