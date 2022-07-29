import Scrollbar from 'smooth-scrollbar';
import Cursor from './components/Cursor';
import Swiper from './imports/import-swiper';
import Preview from './components/Preview';

export default () => {
  const cursor = new Cursor();
  cursor.cursorOut()
  cursor.hoveredCursor()

  const mainScrollbar = Scrollbar.init(document.querySelector('.scroll-wrapper'), {
    alwaysShowTracks: true
  });

  document.querySelector('.scrollbar-track-x').remove()

  if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
    mainScrollbar.options.alwaysShowTracks = false
  }

  const subscribeMessageElem = document.querySelector('#footer-subscribe-message');
  if (subscribeMessageElem) {
    const subscribeMessageCarousel = new Swiper(subscribeMessageElem, {
      speed: 20000,
      slidesPerView: 'auto',
      spaceBetween: 30,
      loopedSlides: 3,
      allowTouchMove: false,
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
    })
  }

  const previews = new Preview();
  if (previews.previews.length > 0) {
    previews.bind()
  }
}
