import TweenLite from 'gsap';
import Scrollbar from 'smooth-scrollbar';

export default class {
  constructor() {
    this.previews = document.querySelectorAll('.preview');
    this.toggleInfoBtns = document.querySelectorAll('[data-open-info]');
    this.magazineContainer = document.querySelectorAll('.preview__wide');
    this.ANIM_DURATION = 0.5;

    this.previewsContainer = document.querySelector('.works__list');
    this.animatedStart = 'fade-in__animated-start';
    this.animatedFinish = 'fade-in__animated-finish';
    this.itemsMax;
    this.scrollbarContainer = document.querySelector('.scroll-wrapper');
    this.scrollbar;
  }

  calcHeight() {
    const height = Math.round(this.previews[0].offsetWidth * 1.41);
    this.previews.forEach((item, i) => {
      item.style.height = height + 'px';
    });
  }

  calcInfoOffset() {
    this.magazineContainer.forEach((container, i) => {
      const part = container.children[1];
      part.style.marginLeft = this.previews[0].offsetWidth * -1 + 'px';
    });
  }

  toggleLabelAttr(wrapper) {
    if (wrapper.hasAttribute('data-opened')) {
      wrapper.removeAttribute('data-opened')
    } else {
      wrapper.setAttribute('data-opened', '')
    }
  }

  changeInfoBtn(button) {
    if (button.closest('.preview').hasAttribute('data-opened')) {
      TweenLite.to(button, this.ANIM_DURATION, {transform: 'rotate(45deg)'})
    } else {
      TweenLite.to(button, this.ANIM_DURATION, {transform: 'rotate(0)', delay: 0.2})
    }
  }

  toggleInfo(wrapper) {
    const container = wrapper.querySelector('.preview__wide');
    const parts = wrapper.querySelectorAll('.preview__half');
    const title = parts[0];
    const info = parts[1];
    const direction = wrapper.getAttribute('data-open-to');

    const gutter = parseFloat(getComputedStyle(container.closest('.preview')).marginLeft) * 2;
    const width = container.offsetWidth;

    if (wrapper.hasAttribute('data-opened')) {
      // opening card
      TweenLite.to(container, this.ANIM_DURATION, {width: `${width * 2 + gutter}px`});
      info.style.visibility = 'visible';

      title.classList.add('border')

      parts.forEach((part, i) => {
        part.style.width = width + 'px';
      });

      if (direction == 'right') {
        TweenLite.to(info, this.ANIM_DURATION, {transform: `translateX(${width + gutter}px)`});
      } else {
        TweenLite.to(container, this.ANIM_DURATION, {'margin-left': `-${width + gutter}px`});
        TweenLite.to(title, this.ANIM_DURATION, {transform: `translateX(${width + gutter}px)`});
      }
    } else {
      // closing card
      TweenLite.to(container, this.ANIM_DURATION, {width: `100%`, delay: 0.2, onComplete: () => {
        info.style.visibility = '';
        title.classList.remove('border')
        parts.forEach((part, i) => {
          part.style.width = '';
        });
      }});

      if (direction == 'right') {
        TweenLite.to(info, this.ANIM_DURATION, {transform: `translateX(0)`, delay: 0.2});
      } else {
        TweenLite.to(container, this.ANIM_DURATION, {'margin-left': `0`, delay: 0.2});
        TweenLite.to(title, this.ANIM_DURATION, {transform: `translateX(0)`, delay: 0.2});
      }
    }
  }

  recalcOpenedInfo() {
    const wrappers = document.querySelectorAll('.preview[data-opened]');
    if (wrappers.length === 0) return;

    const gutter = parseFloat(getComputedStyle(wrappers[0]).marginLeft) * 2;
    const width = wrappers[0].offsetWidth;

    wrappers.forEach((wrapper, i) => {
      const container = wrapper.querySelector('.preview__wide');
      const parts = wrapper.querySelectorAll('.preview__half');
      const title = parts[0];
      const info = parts[1];
      const direction = wrapper.getAttribute('data-open-to');

      container.style.width = `${width * 2 + gutter}px`;

      parts.forEach((part, i) => {
        part.style.width = width + 'px';
      });

      if (direction == 'right') {
        info.style.transform = `translateX(${width + gutter}px)`;
      } else {
        container.style.marginLeft = `-${width + gutter}px`;
        title.style.transform = `translateX(${width + gutter}px)`;
      }
    });
  }

  showCards(row) {
    row.forEach((item, i) => {
      if (i == 0) item.style.transitionDelay = '0s';
      else if (i == row.length - 1) item.style.transitionDelay = `0.3s`;
      else item.style.transitionDelay = `${(i + 1) * 0.3}s`;

      item.classList.add(this.animatedFinish)
    });

  }

  determinePosition(row, status) {
    const offsetTop = row[0].offsetTop;
    const scrollTop = status.offset.y;
    const windowScroll = document.documentElement.clientHeight * 3/4;

    if (scrollTop > (offsetTop - windowScroll)) {
      this.showCards(row)
    }
  }

  determineRow() {
    const windowWidth = document.documentElement.clientWidth;
    if (windowWidth < 640) this.itemsMax = 1;
    else if (windowWidth < 1024) this.itemsMax = 2;
    else if (windowWidth < 1366) this.itemsMax = 3;
    else if (windowWidth < 2160) this.itemsMax = 4;
    else this.itemsMax = 5;

    let rows = [];
    let rowsCounter = this.itemsMax;
    let counter = 0;

    this.previewsContainer.querySelectorAll(`.${this.animatedStart}`).forEach((preview, i) => {
      if (counter == 0 || counter >= rowsCounter) rows.push([]);
      if (counter >= rowsCounter) rowsCounter += this.itemsMax;

      rows[(rowsCounter / this.itemsMax) - 1].push(preview);

      if (preview.classList.contains('works__preview--half')) counter += 2;
      else if (preview.classList.contains('works__preview--quarter')) counter++;
    });

    return rows;
  }

  activateRows(status) {
    const rows = this.determineRow();
    rows.forEach((row, i) => {
      this.determinePosition(row, status)
    });
  }

  bind() {
    this.calcHeight()
    this.calcInfoOffset()

    window.addEventListener('resize', () => {
      this.calcHeight()
      this.calcInfoOffset()
      this.recalcOpenedInfo()
    })

    this.toggleInfoBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.toggleLabelAttr(btn.closest('.preview'))
        this.changeInfoBtn(btn.querySelector('.preview__icon'))
        this.toggleInfo(btn.closest('.preview'))
      })
    });
  }

  animate() {
    this.scrollbar = Scrollbar.get(this.scrollbarContainer);

    setTimeout(() => {
      this.activateRows(this.scrollbar)
    }, 400)

    this.scrollbar.addListener(status => {
      this.activateRows(status)
    })
  }
}
