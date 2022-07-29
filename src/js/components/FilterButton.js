export default class {
  constructor() {
    this.buttons = document.querySelectorAll('.works__filter-btn');

    this.hover()
  }

  moveBg(btn, e) {
    const btnCoords = btn.getBoundingClientRect();
    const relX = e.pageX - btnCoords.left;
    const relY = e.pageY - btnCoords.top;

    btn.querySelector('.works__btn-hover').style.left = relX + 'px';
    btn.querySelector('.works__btn-hover').style.top = relY + 'px';
  }

  hover() {
    this.buttons.forEach((button, i) => {
      button.addEventListener('mouseenter', event => {
        this.moveBg(button, event)
      })

      button.addEventListener('mouseleave', event => {
        this.moveBg(button, event)
      })
    });
  }
}
