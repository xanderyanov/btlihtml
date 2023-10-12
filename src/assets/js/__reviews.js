$(function () {
  var commentsOptions = {};
  if ($('.commentsCaroucel-container .commentsCaroucel-slide').length) {
    commentsOptions = {
      slidesPerView: 2,
      loop: true,
      spaceBetween: 300,
      // centeredSlides: true,
      speed: 600,
      autoplay: {
        delay: 15000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.commentsCaroucel__right',
        prevEl: '.commentsCaroucel__left',
      },
      keyboard: true,
      watchOverflow: true,
      pagination: {
        el: '.commentsCaroucel__pagination',
        type: 'bullets',
        dynamicBullets: true,
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        360: {
          slidesPerView: 1.2,
          spaceBetween: 12,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 300,
        },
      },
    };
  }
  var swiper = new Swiper('.commentsCaroucel-container', commentsOptions);

  function cutLongString(element, count_lit) {
    var text = element.html();
    var all_len = text.length;
    var new_text;
    if (all_len > count_lit) {
      new_text = text.substr(0, count_lit - 3) + '...';
      element.html(new_text);
    }
  }

  $('.cutLongString150').each(function () {
    if ($(this).length) {
      cutLongString($(this), 150);
    }
  });

  $('.commentsCard__more').on('click', function () {
    var Parent = $(this).closest('.commentsCard__textArea');
    var AllText = Parent.find('.commentsCard__textAll');
    var ShortText = Parent.find('.commentsCard__text');
    if ($(this).hasClass('open')) {
      $(this).removeClass('open').text('Читать весь отзыв');
      AllText.slideUp();
      ShortText.slideDown();
    } else {
      $(this).addClass('open').text('Свернуть');
      AllText.slideDown();
      ShortText.slideUp();
    }
  });
});
