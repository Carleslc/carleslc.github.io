$(document).ready(function() {

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // COPYRIGHT
  $('#copyright-year').text(new Date().getFullYear());

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

  // LOCAL LINKS
  $('.page-link').click(function() {
    var anchor = $(this).attr("dest");
    var offset = 0;

    if ($(this).attr("offset") != 'false') {
      offset = navbar.height();
    }

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top - offset
    }, 500);
  });

  // BLOG FEED

  $.getJSON("https://blog.carleslc.me/ghost/api/v3/content/posts/?key=17b7406271539059e309a77ed7&limit=4&order=published_at%20desc&include=tags", function callback(data) {
    var posts = data.posts;
    
    var content = '<div class="grid center">';
    posts.forEach(function(post) {
      var image = `<img src="${post.feature_image}"/>`;
      var tag = (post.primary_tag && post.primary_tag.name) || '';
      content += `<a id="entry-${post.uuid}" class="feed-entry grid-element" href="${post.url}" target="_blank"><div class="entry-media">${image}</div><div class="entry-body"><span class="cat">${tag}</span><h3>${post.title}</h3><p>${post.excerpt}</p></div></a>`;
    });
    content += '</div>';

    $("#rss-feed").html(content);
  });

});
