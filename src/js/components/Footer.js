import Scrollbar from 'smooth-scrollbar';

export default class {
  constructor() {
    this.subscribe = document.querySelector('.subscribe-message--footer');
    this.footer = document.querySelector('.footer--footer');
    this.scrollbarContainer = document.querySelector('.scroll-wrapper');
    this.scrollbar;
  }

  showSubscribe() {
    this.subscribe.classList.add('visible')
  }

  showFooter() {
    this.footer.classList.add('visible')
  }

  show(status) {
    const offsetTop = this.subscribe.offsetTop;
    const scrollTop = status.offset.y;
    const windowScroll = document.documentElement.clientHeight;

    if (scrollTop > (offsetTop - windowScroll)) {
      this.showSubscribe()
      this.showFooter()
    }
  }

  bindListener() {
    this.scrollbar = Scrollbar.get(this.scrollbarContainer);

    setTimeout(() => {
      this.show(this.scrollbar)
    }, 1200)

    this.scrollbar.addListener(status => {
      this.show(status)
    })
  }
}
