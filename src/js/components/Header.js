import Swiper from './../imports/import-swiper';
import Scrollbar from 'smooth-scrollbar';
import TweenLite from 'gsap';

export default class {
  constructor() {
    this.header = document.getElementById('header');
    this.hamburger = document.querySelector('.header__hamburger');
    this.menuBtn = document.querySelector('[data-open-menu]');
    this.opening = document.querySelectorAll('.header__opening');
    this.menu = document.querySelector('.header__menu');
    this.menuItems = document.querySelectorAll('.menu__list li');
    this.menuItem = document.querySelector('.menu__list li');
    this.menuLinks = document.querySelectorAll('.menu__list li a');
    this.subscribeMessage = document.getElementById('header-subscribe-message');
    this.subscribeMessageCarousel;
    this.scrollbarContainer = document.querySelector('.scroll-wrapper');
    this.scrollbar;
    this.scrollbarPrevState = 0;
    this.visibilityByScroll;
    this.invertButton = document.querySelector('[data-invert-colors]');

    this.OPENING_DURATION = 700;
    this.closingTimer;

    this.bindEvents()
  }

  // Header Colors

  invertColors() {
    document.body.classList.toggle('body--negative')
    if (this.opening[0].classList.contains('header__opening--left')) {
      setTimeout(() => {
        this.opening.forEach((opening, i) => {
          opening.classList.remove('header__opening--left')
        });
      }, this.OPENING_DURATION)
    } else {
      this.opening.forEach((opening, i) => {
        opening.classList.add('header__opening--left')
      });

      setTimeout(() => {
        this.opening.forEach((opening, i) => {
          opening.classList.remove('header__opening--left')
        });
      }, this.OPENING_DURATION)
    }
  }

  // Open Menu

  toggleHeader() {
    this.header.classList.toggle('header--light')
  }

  toggleHamburger() {
    this.hamburger.classList.toggle('header__hamburger--close')
  }

  toggleMenuContainer() {
    this.menu.classList.toggle('header__menu--hidden')
  }

  toggleMenuItems() {
    this.menuItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.toggle('menu__item--line-visible')
        item.querySelector('a > span > span').classList.toggle('menu-item--visible')
      }, i * 300)
    });
  }

  toggleMenuFooter() {
    setTimeout(() => {
      this.menu.classList.toggle('header__menu--footer-visible')
    }, (this.menuItems.length - 1) * 300)
  }

  toggleMenu() {
    this.toggleMenuContainer()
    setTimeout(() => {
      this.toggleMenuItems()
      this.toggleMenuFooter()
    }, 10)
  }

  toggleOpening() {
    this.opening.forEach((opening, i) => {
      opening.classList.toggle('header__opening--opened')
    });

    if (this.opening[0].classList.contains('header__opening--right')) {
      this.closingTimer = setTimeout(() => {
        this.opening.forEach((opening, i) => {
          opening.classList.remove('header__opening--right')
          opening.classList.remove('header__opening--overflow')
        });
      }, this.OPENING_DURATION)
    } else {
      this.opening.forEach((opening, i) => {
        clearTimeout(this.closingTimer)
        opening.classList.add('header__opening--right')
        opening.classList.add('header__opening--overflow')
      });
    }
  }

  toggleDocumentScroll() {
    if (Scrollbar.has(this.scrollbarContainer)) {
      Scrollbar.destroy(this.scrollbarContainer)
      this.scrollbarContainer.style.overflow = 'hidden';
    } else {
      this.scrollbarContainer.style.overflow = '';
      Scrollbar.init(this.scrollbarContainer);
      this.updateScrollbar()
    }
  }

  setMenuItemsHeight() {
    const totalHeight = this.menuItem.offsetHeight;
    const paddingTop = totalHeight * 0.25843;
    const fontSize = totalHeight * 0.67416;
    const paddingBottom = totalHeight * 0.067416;
    this.menuLinks.forEach((link, i) => {
      if (document.documentElement.clientWidth >= 640) {
        link.style.cssText = `padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px; font-size: ${fontSize}px`;
      } else {
        link.style.cssText = `padding-top: ''; padding-bottom: ''; font-size: ''`;
      }
    });
  }

  initSubscribeMessageCarousel() {
    this.subscribeMessageCarousel = new Swiper(this.subscribeMessage, {
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

  // Sticky Header

  setScrolledState() {
    this.header.classList.remove('header--no-scrolled')
  }

  removeScrolledState() {
    this.header.classList.add('header--no-scrolled')
    this.header.style.transform = '';
  }

  showScrolledHeader() {
    TweenLite.to(this.header, (this.OPENING_DURATION / 1000), {transform: 'translateY(0)'})
  }

  hideScrolledHeader(d) {
    const delay = d || 0;
    TweenLite.to(this.header, (this.OPENING_DURATION / 1000), {transform: 'translateY(-100%)', delay: delay})
  }

  // Events

  onMenuBtnClick() {
    this.menuBtn.addEventListener('click', () => {
      this.toggleHeader()
      this.toggleHamburger()
      this.toggleOpening()
      this.toggleDocumentScroll()

      if (!this.subscribeMessageCarousel) {
        setTimeout(() => {
          this.toggleMenu()
          this.setMenuItemsHeight()
          this.initSubscribeMessageCarousel()
        }, (this.OPENING_DURATION - (this.OPENING_DURATION * 0.5)))
      } else {
        this.toggleMenu()
        this.setMenuItemsHeight()
        this.subscribeMessageCarousel.destroy()
        this.subscribeMessageCarousel = null
      }
    })
  }

  onInvertBtnClick() {
    this.invertButton.addEventListener('click', () => {
      this.invertColors()
    })
  }

  onMenuLinkClick() {
    this.menuLinks.forEach((link, i) => {
      link.addEventListener('click', () => {
        this.toggleHeader()
        this.toggleHamburger()
        this.toggleMenu()
        this.toggleDocumentScroll()
        this.subscribeMessageCarousel.destroy()
        this.subscribeMessageCarousel = null
      })
    });
  }

  onWindowResize() {
    window.addEventListener('resize', () => {
      this.setMenuItemsHeight()
    })
  }

  onTopWindowMove() {
    document.addEventListener("mousemove", e => {
      const top = e.clientY;
      const triggerArea = this.header.offsetHeight / 2;
      if (this.scrollbar && this.scrollbar.offset.y > 100 && top < triggerArea) {
        this.showScrolledHeader()
      }
    });
  }

  onHeaderLeave() {
    this.header.addEventListener('mouseleave', e => {
      if (e.relatedTarget && this.scrollbar && this.scrollbar.offset.y > 100 && !this.visibilityByScroll) {
        this.hideScrolledHeader(0.5)
      }
    })
  }

  bindEvents() {
    this.onMenuBtnClick()
    this.onInvertBtnClick()
    this.onMenuLinkClick()
    this.onWindowResize()
    this.onTopWindowMove()
    this.onHeaderLeave()
  }

  updateScrollbar() {
    this.scrollbar = Scrollbar.get(this.scrollbarContainer);

    this.scrollbar.addListener(status => {
      if (status.offset.y > 100) {
        this.setScrolledState()
      } else {
        this.removeScrolledState()
      }

      if (this.scrollbarPrevState > status.offset.y) {
        this.showScrolledHeader()
        this.visibilityByScroll = true;
      } else if (this.visibilityByScroll) {
        this.hideScrolledHeader()
        this.visibilityByScroll = false;
      }

      this.scrollbarPrevState = status.offset.y
    })
  }

}
