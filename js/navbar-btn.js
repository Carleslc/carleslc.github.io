var navbar_collapse = $('#portfolio-collapse-menu');
var navbar_toggle = $("#navbar-toggle-btn");

$(window).on('resize', function () {
  var expanded = !navbar_toggle.is(":visible");
  if (expanded) navbar_collapse.removeClass('in');
})