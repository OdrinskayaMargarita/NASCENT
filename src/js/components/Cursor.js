export default class {
  constructor() {
    this.customCursor = document.getElementById('cursor');
    this.text = this.customCursor.querySelector('span');
    this.status = 'before load';
    this.cursorLeftPosition = -100;
    this.cursorTopPosition = -100;
  }

  updateCoords() {
    document.addEventListener("mousemove", e => {
      this.cursorLeftPosition = e.clientX;
      this.cursorTopPosition = e.clientY;
    });
  }

  initCursor() {
    const render = () => {
      this.customCursor.style.transform = `translate3d(${this.cursorLeftPosition}px, ${this.cursorTopPosition}px, 0)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  cursorOver() {
    this.customCursor.classList.add('cursor--hovered');
  }

  cursorOut() {
    this.customCursor.classList.remove('cursor--hovered');
  }

  preloaderAdd() {
    this.preloaderAddMobile()
    this.customCursor.classList.add('cursor--preload');
    this.status = 'before load';
    this.preloaderCounter()
  }

  preloaderAddMobile() {
    if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      this.customCursor.classList.remove('cursor--hidden');
      this.cursorLeftPosition = document.documentElement.clientWidth / 2;
      this.cursorTopPosition = document.documentElement.clientHeight / 2;
      this.customCursor.style.transform = `translate3d(${this.cursorLeftPosition}px, ${this.cursorTopPosition}px, 0)`;
    }
  }

  preloaderCounter() {
    this.status = 'loading';
    let i = 0;
    const INTERVAL = 75;
    const counterAnim = setInterval(() => {
      this.text.innerHTML = `${i}%`;
      i += 10;
      if (i > 100) {
        clearInterval(counterAnim);
        this.status = 'loaded';
      }
    }, INTERVAL);
  }

  preloaderRemove() {
    const listener = setInterval(() => {
      if (this.status == 'loaded') {
        this.customCursor.classList.remove('cursor--preload')
        this.text.innerHTML = '';
        this.preloaderRemoveMobile()
        clearInterval(listener)
      }
    }, 100)
  }

  preloaderRemoveMobile() {
    if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      this.customCursor.classList.add('cursor--hidden');
    }
  }

  hoveredCursor() {
    document.querySelectorAll('a:not(.no-hovered), button:not(.no-hovered), input:not(.no-hovered), textarea:not(.no-hovered), select:not(.no-hovered), .hovered').forEach(item => {
      item.addEventListener('mouseover', () => {
        this.cursorOver()
      });
      item.addEventListener('mouseout', () => {
        this.cursorOut()
      });
    });
  }

  toggleCursorVisibility() {
    document.addEventListener('mouseleave', e => {
      this.customCursor.classList.add('cursor--hidden');
    })
    document.addEventListener('mouseenter', e => {
      this.customCursor.classList.remove('cursor--hidden');
    })
  }

  addPauseIcon() {
    this.cursorOut()
    this.customCursor.classList.add('cursor--pause');
  }

  removePauseIcon() {
    this.customCursor.classList.remove('cursor--pause');
  }

  addArrowLeft() {
    this.removeArrow()
    this.customCursor.classList.add('cursor--arrow-left')
  }

  addArrowRight() {
    this.removeArrow()
    this.customCursor.classList.add('cursor--arrow-right')
  }

  removeArrow() {
    this.customCursor.classList.remove('cursor--arrow-left')
    this.customCursor.classList.remove('cursor--arrow-right')
  }

  bindCursor() {
    if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      this.customCursor.classList.add('cursor--hidden');
    } else {
      this.updateCoords()
      this.initCursor()
      this.toggleCursorVisibility()
    }
  }
}
