import Scrollbar from 'smooth-scrollbar';

export default class {
  constructor() {
    this.containers = document.querySelectorAll('.fade-in__container');
    this.groupContainers = document.querySelectorAll('.fade-in__container--group');
    this.animatedStart = 'fade-in__animated-start';
    this.animatedFinish = 'fade-in__animated-finish';
    this.animatedLine = 'animated-line';
    this.animatedLineFinish = 'line-visible';
    this.scrollbarContainer = document.querySelector('.scroll-wrapper');
    this.scrollbar;

    this.bindListener()
  }

  fadeIn(elem) {
    elem.classList.add(this.animatedFinish)
  }

  delayFadeIn(elem, i) {
    elem.style.transitionDelay = `${i * 0.2}s`;
    this.fadeIn(elem)
  }

  drowLine(elem) {
    elem.classList.add(this.animatedLineFinish)
  }

  drowSpecialLine(container) {
    container.querySelectorAll('.project-extra__line-anim').forEach((item, i) => {
      if (!item.classList.contains(this.animatedLineFinish)) {
        if (i == 1) {
          const elemCounter = item.querySelectorAll(`.${this.animatedStart}`).length;
          item.classList.add(`delay-${elemCounter}`)
        }

        this.drowLine(item)
      }
    });
  }

  showContainer(container) {
    this.fadeIn(container)

    if (container.classList.contains(this.animatedLine)) {
      this.drowLine(container)
    }
  }

  showElements(container) {
    container.querySelectorAll(`.${this.animatedStart}`).forEach((animatedElem, i) => {
      if (!animatedElem.classList.contains(this.animatedFinish)) {
        this.delayFadeIn(animatedElem, i)

        if (animatedElem.classList.contains(this.animatedLine)) {
          this.drowLine(animatedElem)
        }
      }
    });
  }

  delaySpecialElements(container) {
    const innerContainer = container.querySelector('p');
    const width = innerContainer.clientWidth - parseFloat(getComputedStyle(innerContainer).paddingLeft) - parseFloat(getComputedStyle(innerContainer).paddingRight);
    let lineWidth = 0;
    let itemCounter = 0;
    container.querySelectorAll(`.${this.animatedStart}`).forEach((animatedElem, i) => {
      if (!animatedElem.classList.contains(this.animatedFinish)) {
        lineWidth += animatedElem.offsetWidth;
        if (lineWidth > width) {
          lineWidth = animatedElem.offsetWidth;
          itemCounter = 0;
        }
        animatedElem.style.transitionDelay = `${itemCounter++ * 0.2}s`;
      }
    });
  }

  showLineForElementsContainer(container) {
    if (container.classList.contains(this.animatedLine) && !container.classList.contains(this.animatedLineFinish)) {
      this.drowLine(container)
    }
  }

  showLineForExtraContainer(container) {
    if (container.classList.contains('project-extra')) {
      this.drowSpecialLine(container)
    }
  }

  show(container) {
    if (container.classList.contains(this.animatedStart) && !container.classList.contains(this.animatedFinish)) {
      this.showContainer(container)
    } else if (container.querySelectorAll(`.${this.animatedStart}`).length > 0) {
      this.showElements(container)
      this.showLineForElementsContainer(container)
      this.showLineForExtraContainer(container)
    }
  }

  determinePosition(container, status, func) {
    const offsetTop = container.offsetTop;
    const scrollTop = status.offset.y;
    const windowScroll = document.documentElement.clientHeight * 3/4;

    if (scrollTop > (offsetTop - windowScroll)) {
      func()
    }
  }

  showSections(status) {
    this.containers.forEach((container, i) => {
      this.determinePosition(container, status, () => {
        this.show(container)
      })
    });
  }

  bindDelay(status) {
    this.groupContainers.forEach((container, i) => {
      this.determinePosition(container, status, () => {
        this.delaySpecialElements(container)
      })
    });
  }

  bindListener() {
    if (this.containers.length > 0) {
      this.scrollbar = Scrollbar.get(this.scrollbarContainer);

      setTimeout(() => {
        this.showSections(this.scrollbar)
      }, 400)

      this.scrollbar.addListener(status => {
        this.showSections(status)
      })

      if (this.groupContainers.length > 0) {
        this.scrollbar.addListener(status => {
          this.bindDelay(status)
        })
      }
    }
  }
}
