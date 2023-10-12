$(function () {
  initVars();
  mainGallery();

  $('a[data-fancybox]').fancybox({
    closeBtn: false,
    backFocus: false,
    arrows: true,
    keyboard: true,
    nextClick: true,
    infobar: true,
    protect: true,
    nextEffect: 'elastic',
    prevEffect: 'elastic',
    padding: 0,
    loop: true,
    animationEffect: 'zoom-in-out',
    transitionEffect: 'slide',
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true, // Continue movement after releasing mouse/touch when panning
    },
  });

  const swiperOptions = {
    paginationClickable: true,
    autoplay: 7500,
    spaceBetween: 0,
    loop: true,
    effect: 'slide',
    loop: true,
    // pagination: {
    //   el: '.swiper-pagination1',
    // },
    pagination: {
      el: '.swiper-pagination1',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    on: {
      activeIndexChange: function () {
        console.log('activeIndexChange');

        $('.swiper-slide')
          .children('.swiper__cadr')
          .removeClass('animationBaretsky1')
          .fadeOut(500);

        setTimeout(function () {
          $('.swiper-slide-active')
            .children('.swiper__cadr')
            .fadeIn(500)
            .addClass('animated')
            .addClass('animationBaretsky1');
        }, 500);
      },
      init: function () {
        console.log('init');

        $('.swiper-slide')
          .children('.swiper__cadr')
          .removeClass('animationBaretsky1')
          .fadeOut(500);

        setTimeout(function () {
          $('.swiper-slide-active')
            .children('.swiper__cadr')
            .fadeIn(500)
            .addClass('animated')
            .addClass('animationBaretsky1');
        }, 500);
      },
    },
  };

  const swiper1 = new Swiper('.swiper-container1', swiperOptions);

  swiper1.on('beforeSlideChangeStart', function () {
    console.log('beforeSlideChangeStart');
  });

  // var swiper = new Swiper('.mainGallery-container', {
  //   pagination: '.mainGallery__pagination',
  //   paginationClickable: true,
  //   effect: 'coverflow',
  //   loop: true,
  //   centeredSlides: true,
  //   slidesPerView: 1.5,
  //   lazyLoading: true,
  //   lazyLoadingInPrevNext: true,
  //   speed: 1000,
  //   additionalSlide: 1,
  //   coverflow: {
  //     rotate: 0,
  //     stretch: 150,
  //     depth: 200,
  //     modifier: 1,
  //     slideShadows: false,
  //   },
  // });

  $('.menuButton').on('click', function () {
    $(this).toggleClass('open');
    $('.topMenu').slideToggle();
  });

  $('.phoneZ').mask('+7 (999) 999-9999');
  $('.phone1').mask('+7 (999) 999-9999');
  $('.phone2').mask('+7 (999) 999-9999');
  $('.phone3').mask('+7 (999) 999-9999');

  $('.content > table').wrap('<div class="table_outer"></div>');

  $('.toTop').hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('.toTop').fadeIn();
    } else {
      $('.toTop').fadeOut();
    }
  });
  $('.toTop').on('click', function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if ($('.map__area').length) {
  ymaps.ready(initMaps);

  function initMaps() {
    var myMap = new ymaps.Map('map', {
      center: [51.53636907237114, 46.022191999999926],
      zoom: 14,
      controls: ['zoomControl'],
    });

    myMap.behaviors.disable('scrollZoom');
    if (isMobile.any()) {
      myMap.behaviors.disable('drag');
    }

    var myGeoObjects = [];

    myGeoObjects[0] = new ymaps.Placemark(
      [51.53636907237114, 46.022191999999926],
      {
        balloonContentHeader:
          '<div class="baloon__top">Кэрос-медицина</div>' +
          '<div class="baloon__description">IT-Компания</div>',
        balloonContentBody:
          '<div class="baloon__content"><div class="baloon__logo"><span class="gr">Кэрос</span><span class="or">MED</span></div>' +
          '<a href="mailto:info@keros-med.ru">info@keros-med.ru</a>',
        balloonContentFooter:
          '<div class="baloon__footer">Саратов, ул. Московская, 117</div>',
        clusterCaption:
          'Косметология<br>салон массажа<br>HAIR услуги<br>NAIL-BAR<br>профессиональная косметика',
        hintContent:
          '<div class="baloon__top">It-Компания "Кэрос-медицина"</div>',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'assets/img/marker.png',
        iconImageSize: [64, 64],
        iconImageOffset: [-32, -32],
      }
    );

    var clusterIcons = [
      {
        href: '/images/pointer.png',
        size: [29, 46],
        offset: [0, 0],
      },
    ];

    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonPanelMaxMapArea: 0,
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 200,
      clusterBalloonPagerSize: 5,
      clusterBalloonPagerType: 'marker',
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
  }
}
