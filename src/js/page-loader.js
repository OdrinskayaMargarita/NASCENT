import barba from '@barba/core';
import Cursor from './components/Cursor';
import PageTransition from './components/PageTransition';
import Scrollbar from 'smooth-scrollbar';
import commonScripts from './common';
import Header from './components/Header';
import homePage from './pages/home-page';
import workPage from './pages/work-page';
import projectPage from './pages/project-page';
import aboutPage from './pages/about-page';
import contactPage from './pages/contact-page';
import animation from './animations';

export default function() {

  const cursor = new Cursor();
  cursor.bindCursor();
  cursor.preloaderAdd()

  const pageTransition = new PageTransition();

  function startPageTransition() {
    const listener = setInterval(() => {
      if (cursor.status == 'loaded') {
        pageTransition.opening()
        clearInterval(listener)
      }
    }, 100)
  }
  startPageTransition()

  let header = new Header();

  commonScripts();

  header.updateScrollbar();

  function startAnimations() {
    const listener = setInterval(() => {
      if (cursor.status == 'loaded') {
        animation()
        clearInterval(listener)
      }
    }, 100)
  }

  barba.init({
    debug: true,
    transitions: [{
      async leave(data) {
        await pageTransition.closing()
        cursor.preloaderAdd()
      },
      enter(data) {
        commonScripts()
        header = new Header();
        header.updateScrollbar()
        startPageTransition()
      },
      afterLeave(data) {
        data.current.container.remove();
      },
    }],
    views: [
      {
        namespace: 'homePage',
        beforeEnter(data) {
          homePage()
          cursor.hoveredCursor()
        },
        afterEnter(data) {
          cursor.preloaderRemove()
          startAnimations()
        }
      },
      {
        namespace: 'workPage',
        beforeEnter(data) {
          workPage()
          cursor.hoveredCursor()
        },
        afterEnter(data) {
          cursor.preloaderRemove()
          startAnimations()
        }
      },
      {
        namespace: 'projectPage',
        beforeEnter(data) {
          projectPage(cursor)
          cursor.hoveredCursor()
        },
        afterEnter(data) {
          cursor.preloaderRemove()
          startAnimations()
        }
      },
      {
        namespace: 'aboutPage',
        beforeEnter(data) {
          aboutPage(cursor)
          cursor.hoveredCursor()
        },
        afterEnter(data) {
          cursor.preloaderRemove()
          startAnimations()
        }
      },
      {
        namespace: 'contactPage',
        beforeEnter(data) {
          contactPage()
          cursor.hoveredCursor()
        },
        afterEnter(data) {
          cursor.preloaderRemove()
          startAnimations()
        }
      },
    ]
  });
}
