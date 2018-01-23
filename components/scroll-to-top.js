export default () => {
  const scroll = () => {
    if (typeof window === 'undefined' || window.scrollY === 0) { return; }
    window.scrollTo(0, window.scrollY * 0.9);
    requestAnimationFrame(scroll);
  }

  scroll();
}
