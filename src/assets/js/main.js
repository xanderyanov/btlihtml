var $window;
var prevWindowWidth = 0;
var windowWidth;

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
//in selector we set style, for example
//height: calc(var(--vh, 1vh) * 100); for 100vh

function initVars() {
  $window = $(window);
  windowWidth = $window.width();
  windowHeight = $window.height();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

$(function () {
  initVars();

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

  var commentsOptions = {};
  if ($('.commentsCaroucel-container .commentsCaroucel-slide').length) {
    commentsOptions = {
      slidesPerView: 4,
      loop: false,
      spaceBetween: 0,
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
          spaceBetween: 0,
        },
        360: {
          slidesPerView: 1.5,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        920: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      },
    };
  }
  var swiper = new Swiper('.commentsCaroucel-container', commentsOptions);

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

  $('.menuButton').on('click', function () {
    $(this).toggleClass('open');
    $('.topMenu').slideToggle();
  });

  $('.phoneZ').mask('+7 (999) 999-9999');
  $('.phone1').mask('+7 (999) 999-9999');
  $('.phone2').mask('+7 (999) 999-9999');
  $('.phone3').mask('+7 (999) 999-9999');

  $('table').wrap('<div class="table_outer"></div>');

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

  $('.form1').on('click', '.submit1', function (e) {
    e.preventDefault();
    var name = $('.name1').val();
    var phone = $('.phone1').val();
    var email = $('.email1').val();
    var workemail = $('.work_email1').val();
    var message = $('.message1').val();
    var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.name1').addClass('error');
      setTimeout(function () {
        $('.name1').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phone1').addClass('error');
      setTimeout(function () {
        $('.phone1').removeClass('error');
      }, 3000);
    } else if (email == '') {
      swal({
        title: 'Ошибка Email',
        text: 'Заполните поле Email',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (!r.test(email)) {
      swal({
        title: 'Ошибка',
        text: 'Корректно заполните поле e-mail',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (message == '') {
      swal({
        title: 'Пустое сообщение',
        text: 'Заполните текст сообщения',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.message1').addClass('error');
      setTimeout(function () {
        $('.message1').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mail1.php',
        {
          name: name,
          phone: phone,
          email: email,
          message: message,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.name1').val('').removeClass('error');
          $('.phone1').val('').removeClass('error');
          $('.email1').val('').removeClass('error');
          $('.message1').val('').removeClass('error');
        }
      );
    }
  });

  $('.js_btnZ').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var self = $(this);
    if (self.hasClass('js_active')) {
      self.removeClass('js_active');
      $('.js_containerZ')
        .addClass('bounceOutUp')
        .removeClass('bounceInDown')
        .fadeOut(600);
      $('.overlay').fadeOut(200);
    } else {
      self.addClass('js_active');
      $('.js_containerZ')
        .removeClass('bounceOutUp')
        .addClass('bounceInDown')
        .fadeIn(200);
      $('.overlay').fadeIn(200);
    }
  });
  $('.overlay').on('click', function (e) {
    e.preventDefault();
    $('.js_containerZ')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.js_btnZ').removeClass('js_active');

    $('.overlay').fadeOut(600);
  });
  $('.formClose').on('click', function (e) {
    e.preventDefault();
    $('.js_containerZ')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.js_btnZ').removeClass('js_active');
    $('.overlay').fadeOut(600);
  });

  $('.formZ').on('click', '.submitZ', function (e) {
    e.preventDefault();
    var name = $('.nameZ').val();
    var phone = $('.phoneZ').val();
    var workemail = $('.work_emailZ').val();
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.nameZ').addClass('nameZ');
      setTimeout(function () {
        $('.nameZ').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phoneZ').addClass('phoneZ');
      setTimeout(function () {
        $('.phoneZ').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mailz.php',
        {
          name: name,
          phone: phone,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.nameZ').val('').removeClass('error');
          $('.phoneZ').val('').removeClass('error');
          $('.js_btn1').removeClass('js-Active');
          $('.js_containerZ')
            .addClass('bounceOutUp')
            .removeClass('bounceInDown')
            .fadeOut(600);
          $('.overlay').fadeOut(200);
        }
      );
    }
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
        iconImageHref: 'assets/img/marker3.png',
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