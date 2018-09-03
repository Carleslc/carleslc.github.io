$(document).ready(function() {

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // COPYRIGHT
  $('#copyright-year').text(new Date().getFullYear());

  // LOCAL LINKS
  $('.page-link').click(function() {
    var anchor = $(this).attr("dest");

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

  // STICKY NAVBAR
  var navbar = $('#navbar');
  var stickyHeight = navbar.offset().top;

  $(window).scroll(function () {
    if (window.pageYOffset > stickyHeight) {
      navbar.addClass('sticky');
      $('#content').css("padding-top", navbar.height());
    } else {
      navbar.removeClass('sticky');
      $('#content').css("padding-top", 0);
    }
  });

  // CONTACT FORM
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: "https://formspree.io/lazaro.costa.carles@gmail.com",
      method: "POST",
      data: { message: $('#contact-form').serialize() },
      dataType: "json"
    }).done(function(response) {
      $('#contact-error').addClass('hidden');
      $('#contact-success').removeClass('hidden');
      $('#contact-form').find("input[type=text], input[type=email], textarea").val("");
    }).fail(function(xhr, status, error) {
      $('#contact-success').addClass('hidden');
      $('#contact-error').removeClass('hidden');
      console.warn(xhr.responseText);
    }).always(function() {
      $('.footer').height(600);
      scrollToBottom();
    });
  });

  $('#close').click(function() {
    $('#contact-success').addClass('hidden');
  });

});