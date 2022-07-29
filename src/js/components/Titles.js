import Scrollbar from 'smooth-scrollbar';

export default class {
  constructor() {
    this.titles = document.querySelectorAll('.page-title h1, .page-title h2, .page-title h3, .specialization__list-title');
    this.scrollbarContainer = document.querySelector('.scroll-wrapper');
    this.scrollbar;

    this.ANIMATION_DURATION = 700;

    this.wrapWords()
    this.bindListener()
  }

  wrapWords() {
    this.titles.forEach((title, i) => {
      const oldHTML = title.innerHTML;
      let newHTML = '';

      let index = 0;
      while(index != -1) {
        if (oldHTML.indexOf(' ', index+1) != -1) {
          newHTML += `<span><span>${oldHTML.slice(index, (oldHTML.indexOf(' ', index+1) + 1))}</span></span> `;
        } else {
          newHTML += `<span><span>${oldHTML.slice(index)}</span></span> `;
        }
        index = oldHTML.indexOf(' ', index+1);
      }

      title.innerHTML = newHTML;
    });

  }

  showText(title) {
    title.querySelectorAll('span > span').forEach((span, i) => {
      span.classList.add('visible')
    });
  }

  showLine(title) {
    setTimeout(() => {
      title.classList.add('line-visible');
    }, (this.ANIMATION_DURATION - (this.ANIMATION_DURATION / 3)))
  }

  show(title, status) {
    const offsetTop = title.offsetTop;
    const scrollTop = status.offset.y;
    const windowScroll = document.documentElement.clientHeight * 4/5;

    if (scrollTop > (offsetTop - windowScroll)) {
      this.showText(title)
      this.showLine(title)
    }
  }

  bindListener() {
    if (this.titles.length > 0) {
      this.scrollbar = Scrollbar.get(this.scrollbarContainer);

      this.show(this.titles[0], this.scrollbar)

      this.scrollbar.addListener(status => {
        this.titles.forEach((title, i) => {
          this.show(title, status)
        });
      })
    }
  }
}
