/* Twitter widgets.js script*/
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));


$(document).ready(function() {
  newQuoteGenerator();
  $("#getNewQuote").click(newQuoteGenerator);
});


var background_images = [
  'https://picsum.photos/id/10/1500/980/',
  'https://picsum.photos/id/1033/1500/980/?grayscale',
  'https://picsum.photos/id/1037/1500/980/?blur=2',
  'https://picsum.photos/id/1043/1500/980/?blur=',
  'https://picsum.photos/id/137/1500/980/?blur=2',
  'https://picsum.photos/id/167/1500/980/?grayscale&blur=2',
  'https://picsum.photos/id/171/1500/980/',
  'https://picsum.photos/id/223/1500/980/',
  'https://picsum.photos/id/232/1500/980/',
  'https://picsum.photos/id/265/1500/980/?blur',
  'https://picsum.photos/id/299/1500/980/?blur',
  'https://picsum.photos/id/382/1500/980/?blur',
];



function newQuoteGenerator() {
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?"

  $.getJSON(url,
    function(jsonp) {
      var new_quoteText = jsonp.quoteText;
      var new_quoteAuthor = jsonp.quoteAuthor;
      if (new_quoteAuthor == "") {
        new_quoteAuthor = "Unknown Author";
      }
      updateIntentTweetURL(new_quoteText, new_quoteAuthor);

      //update quote text
      $("blockquote").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 1000);
          $("#quote").html(new_quoteText);
        });

      //update quote author
      $("#quote_author").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 1000);
          $(this).html(new_quoteAuthor);
        });
    })
};

function updateIntentTweetURL(new_quote, new_author) {
  var hashtag = "&hashtags=InspirationalQuotes";
  var url = "https://twitter.com/intent/tweet?text=" + '"' + new_quote + '"' + ' -' + new_author + hashtag;
  var encoded_url = encodeURI(url);
  $("#twitter-share-button").attr("href", encoded_url);
};


function getRandomBackgroundImage(min, max) {
  var index = Math.floor(Math.random() * (max - min)) + min;
  var url = 'url(' + background_images[index] + ')';
  return url;
}

var background_image_url = getRandomBackgroundImage(0, background_images.length);
$("body").css('background-image', background_image_url);