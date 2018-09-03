var navbarCollapse = $('#portfolio-collapse-menu');
var navbarToggle = $("#navbar-toggle-btn");

$(window).on('resize', function () {
  var expanded = !navbarToggle.is(":visible");
  if (expanded) {
    navbarCollapse.removeClass('in');
  }
});

navbarToggle.hover(
  function mouseIn() {
    $('.icon-bar').css("background-color", "white");
}, function mouseOut() {
  $('.icon-bar').css("background-color", "#888")
});