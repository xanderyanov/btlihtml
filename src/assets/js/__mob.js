$(function () {
  /*start-newSlideMobileMenu*/

  $('.menuBtn__js').on('click', function (e) {
    e.preventDefault();
    $('.mobileMenu__area').addClass('mobileMenu__area_open');
    $('body').addClass('stop');
  });

  $('.menuBtn__close__js').on('click', function (e) {
    e.preventDefault();
    leftSlideMenuClose();
  });
  $('.mobileMenu__area').on('click', function (e) {
    e.stopPropagation();
  });
});

function leftSlideMenuClose() {
  $('.mobileMenu__area').removeClass('mobileMenu__area_open');
  $('body').removeClass('stop');
}
