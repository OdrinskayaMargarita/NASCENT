export default class {
  constructor() {
    this.wrapper = document.querySelector('.page-transition');
    this.bg = document.querySelector('.page-transition__bg');
    this.ANIMATION_DURATION = 500; // miliseconds
  }

  async opening() {
    await new Promise((resolve, reject) => {
      this.bg.classList.add('page-transition__bg--opening')

      setTimeout(() => {
        this.bg.classList.remove('page-transition__bg--opening')
        this.wrapper.classList.add('page-transition--hidden')

        resolve(true)
      }, this.ANIMATION_DURATION)
    })
  }

  async closing() {
    await new Promise((resolve, reject) => {
      this.wrapper.classList.remove('page-transition--hidden')

      this.bg.classList.add('page-transition__bg--closing')

      setTimeout(() => {
        this.bg.classList.remove('page-transition__bg--closing')

        resolve(true)
      }, this.ANIMATION_DURATION)
    })
  }
}
