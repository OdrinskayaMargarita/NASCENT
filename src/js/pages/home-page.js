import Plyr from 'plyr';
import FilterButton from './../components/FilterButton.js';

export default () => {
  const player = new Plyr('#hero-video', {
    volume: 0,
    muted: true,
    autoplay: true,
    autopause: false,
    loop: { active: true }
  });

  const filterBtn = new FilterButton();
}
