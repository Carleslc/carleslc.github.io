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
  $("#rss-feeds").rss("https://blog.carleslc.me/feed.json",
  {
    limit: 4,
    ssl: true,
    host: '',
    layoutTemplate: '<div class="feed-container container"><div class="row"><div class="col col-xs-12"><div class="blog-grids">{entries}</div></div></div></div>',
    entryTemplate: '<div id="entry-{index}" class="feed-entry grid"><div class="entry-media">{entryImage}</div><div class="entry-body"><span class="cat">{category}</span><h3><a id="link-entry-{index}" href="{url}" target="_blank">{title}</a></h3><p>{shortBody}</p></div></div>',
    effect: 'show', // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
    tokens: {
      entryImage: function(entry, tokens) {
        if (tokens.banner) {
          return `<img src="${tokens.banner}"/>`;
        }
        return '';
      },
      category: function(entry, tokens) {
        return tokens.tags[0];
      }
    },
    error: function() {
      console.error('Cannot fetch blog feed');
      console.warn(this);
    },
    success: function() {
      var grids = $('.blog-grids');
      $('div.feed-entry')
      .click(function() {
        window.open($(`#link-${$(this).attr('id')}`).attr('href'), '_blank');
      })
      .mouseenter(function() {
        $(this).css('box-shadow', '0 0 30px rgba(0, 0, 0, 0.2)');
        $(`#link-${$(this).attr('id')}`).toggleClass("hovered");
        grids.children().not(this).fadeTo(0, 0.5);
      })
      .mouseleave(function() {
        $(this).css('box-shadow', '0 0 30px rgba(0, 0, 0, 0.1)');
        $(`#link-${$(this).attr('id')}`).toggleClass("hovered");
        grids.children().fadeTo(0, 1);
      });
    },
    onData: function() {
      $('#blog-description').text(this.feed.description);
      $('#blog-button').attr('href', this.feed.home_page_url);
    }
  });

  // CONTACT FORM with AJAX -- Gold account only :(
  /*$('#contact-form').submit(function(e) {
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
  });*/

});