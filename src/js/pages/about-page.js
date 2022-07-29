import Video from './../components/Video';
import tippy, {followCursor} from 'tippy.js';

export default (cursor) => {
  const video = new Video(cursor);

  document.querySelectorAll('[data-partners-hover]').forEach((partner, i) => {
    partner.addEventListener('mouseenter', () => {
      document.querySelectorAll('[data-partners-hover]').forEach((partnerInner, i) => {
        if (partnerInner == partner) return;
        partnerInner.style.opacity = '0.2';
      });
    })

    partner.addEventListener('mouseleave', () => {
      document.querySelectorAll('[data-partners-hover]').forEach((partnerInner, i) => {
        partnerInner.style.opacity = '';
      });
    })
  });


  tippy(document.querySelectorAll('[data-partners-hover]'), {
    content(reference) {
      const id = reference.getAttribute('data-template');
      const template = document.getElementById(id);
      return template;
    },
    followCursor: true,
    arrow: false,
    maxWidth: 'none',
    duration: 300,
    zIndex: 1,
    appendTo: document.getElementById('partners-list'),
    plugins: [followCursor],
    popperOptions: {
      modifiers: [
        {
          name: 'flip',
          enabled: false,
        },
        {
          name: 'preventOverflow',
          enabled: false,
        }
      ],
    },
    onHide(instance) {
      instance.popper.querySelector('.partners-hover__img').classList.add('partners-hover__img--disappear')
    },
    onHidden(instance) {
      instance.popper.querySelector('.partners-hover__img').classList.remove('partners-hover__img--disappear')
    }
  })

  const awardsItems = document.querySelectorAll('.awards__row');
  if (awardsItems.length > 0) {
    awardsItems.forEach((award, i) => {
      award.addEventListener('mouseenter', e => {
        const awardCoords = award.getBoundingClientRect();
        const relX = e.pageX - awardCoords.left;
        const relY = e.pageY - awardCoords.top;

        award.querySelector('.awards__bg').style.clipPath = `circle(200% at ${relX}px ${relY}px)`;
      })

      award.addEventListener('mouseleave', e => {
        const awardCoords = award.getBoundingClientRect();
        const relX = e.pageX - awardCoords.left;
        const relY = e.pageY - awardCoords.top;

        award.querySelector('.awards__bg').style.clipPath = `circle(0% at ${relX}px ${relY}px)`;
      })
    });
  }
}
