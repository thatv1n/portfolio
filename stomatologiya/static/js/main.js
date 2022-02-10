$(function () {
  $('.slider__item').slick({
    slidesToShow: 3,
    nextArrow:
      '<button type="button" class="slick-right  slick-next"> <img src="static/img/Arrow_right.png" alt="next"></button>',
    prevArrow:
      '<button type="button" class="slick-left  slick-prev"> <img src="static/img/Arrow_left.png" alt="next"></button>',
  });
});
