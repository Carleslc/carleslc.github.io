$(function() {

  $('#copyright-year').text(new Date().getFullYear());

  $('.page-link').click(function() {
    var anchor = $(this).attr("dest");

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

});