import Swiper from './../imports/import-swiper';
import Video from './../components/Video';

export default function(cursor) {
  const video = new Video(cursor);

  const imagesCarouselElem = document.querySelector('.project-carousel');
  if (imagesCarouselElem) {
    const imagesCarousel = new Swiper(imagesCarouselElem, {
      effect: 'fade',
      loop: true,
      navigation: {
        nextEl: '.project-carousel__nav.swiper-button-next',
        prevEl: '.project-carousel__nav.swiper-button-prev',
      },
      pagination: {
        el: '.project-carousel__pagination',
        type: 'fraction',
        formatFractionCurrent: function (number) {
          return `0${number}`
        },
        formatFractionTotal: function (number) {
          return `0${number}`
        },
        renderFraction: function (currentClass, totalClass) {
          return '<div><span class="' + currentClass + '"></span></div>' +
                 '<div><span class="' + totalClass + '"></span></div>';
        }
      },
      autoplay: true
      // breakpoints: {
      //   639: {
      //     autoplay: true
      //   }
      // }
    })

    if (!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      document.querySelectorAll('.project-carousel__nav').forEach((button, i) => {
        button.classList.add('project-carousel__nav--mouse')
      });
    }

    function addCarouselArrow(e, wrapper) {
      const frontier = wrapper.offsetWidth / 2;
      const position = e.clientX;

      if (position <= frontier) {
        cursor.addArrowLeft()
      } else {
        cursor.addArrowRight()
      }
    }

    imagesCarouselElem.addEventListener('mouseenter', e => {
      addCarouselArrow(e, imagesCarouselElem)
    })

    imagesCarouselElem.addEventListener('mousemove', e => {
      addCarouselArrow(e, imagesCarouselElem)
    })

    imagesCarouselElem.addEventListener('mouseleave', e => {
      cursor.removeArrow()
    })
  }
}
