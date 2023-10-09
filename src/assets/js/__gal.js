function mainGallery() {
  //* Галерея на процедуре имидж и еще в нескольких местах*/
  var options_gallery4 = {};
  if ($('.mainGallery-container .mainGallery-slide').length) {
    options_mainGallery = {
      slidesPerView: 4,
      loop: true,
      spaceBetween: 0,
      centeredSlides: true,
      speed: 600,
      autoplay: {
        delay: 150000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.mainGallery__right',
        prevEl: '.mainGallery__left',
      },
      keyboard: true,
      watchOverflow: true,
      zoom: true,
      pagination: {
        el: '.mainGallery__pagination',
        type: 'bullets',
        dynamicBullets: true,
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          // spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          // spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
        },
        1080: {
          // spaceBetween: 20,
        },
      },
      on: {
        init() {
          updateClasses(this);
        },
        slideChange() {
          updateClasses(this);
        },
      },
    };
  }
  var swiper123 = new Swiper('.mainGallery-container', options_mainGallery);

  // swiper123.on('slideChange', function () {
  //   console.log('beforeSlideChangeStart');
  //   $('.swiper-slide-prev').prev().prev().css('opacity', '.2').addClass('000');
  //   $('.swiper-slide-active').prev().prev().css('opacity', '1');
  // });

  //$('.swiper-slide-prev').prev().css('opacity', '.2');
}

function updateClasses({ $el, slides, activeIndex }) {
  $el.find('.swiper-slide-prev-prev').removeClass('swiper-slide-prev-prev');
  slides.eq(activeIndex).prev().prev().addClass('swiper-slide-prev-prev');

  $el.find('.swiper-slide-next-next').removeClass('swiper-slide-next-next');
  slides.eq(activeIndex).next().next().addClass('swiper-slide-next-next');
}
