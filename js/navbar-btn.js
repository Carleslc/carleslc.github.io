var navbarCollapse = $('#portfolio-collapse-menu');
var navbarToggle = $("#navbar-toggle-btn");

$(window).on('resize', function () {
  var expanded = !navbarToggle.is(":visible");
  if (expanded) navbarCollapse.removeClass('in');
})