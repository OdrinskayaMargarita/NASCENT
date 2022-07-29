import Plyr from 'plyr';

export default class {
  constructor(cursor) {
    this.player;
    this.container;
    this.cursor = cursor;

    this.init()
    this.toggleControls()
  }

  init() {
    this.player = new Plyr('#project-video', {
      volume: 0,
      muted: true,
      autopause: false,
      iconUrl: './../../img/player-icons.svg'
    });

    this.container = this.player.elements.container;
  }

  madePauseButton() {
    this.cursor.addPauseIcon()
  }

  removePauseButton() {
    this.cursor.removePauseIcon()
  }

  toggleControls() {
    this.player.on('playing', () => {
      this.madePauseButton()
    })
    this.player.on('play', () => {
      this.madePauseButton()
    })
    this.player.on('pause', () => {
      this.removePauseButton()
    })
    this.player.on('ended', () => {
      this.removePauseButton()
    })

    this.container.addEventListener('mouseenter', () => {
      if (this.player.playing) {
        this.madePauseButton()
      }
    })
    this.container.addEventListener('mouseleave', () => {
      this.removePauseButton()
    })
  }
}
