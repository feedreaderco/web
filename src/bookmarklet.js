(function() {
  var feed = '';
  var linkTags = document.getElementsByTagName('link');
  var aTags = document.getElementsByTagName('a');
  for (var i = 0; i < linkTags.length; ++i) {
    var tag = linkTags[i];
    if (tag.rel === 'alternate') {
      if ((tag.type.indexOf('atom')!=-1)||(tag.type.indexOf('rss')!=-1)||(tag.type.indexOf('xml')!=-1)) {
        feed = tag.href;
        break;
      }
    }
  }
  if (!feed) for (var i = 0; i < aTags.length; ++i) {
    var tag = aTags[i];
    if ((tag.innerHTML.indexOf('atom')!=-1)||(tag.innerHTML.indexOf('rss')!=-1)||(tag.innerHTML.indexOf('xml')!=-1)) {
      feed = tag.href;
      break;
    }
  }
  if (!feed) {
    //check if it looks like a tumblr blog
    var head = document.getElementsByTagName('head')[0].innerHTML;
    if ((head.indexOf('tumblr')!=-1)||(head.indexOf('Tumblr')!=-1)||(head.indexOf('TUMBLR')!=-1)) {
      feed = window.location.protocol + "//"+ window.location.hostname + '/rss';
    } 
  }
  if (!feed) {
    alert("Couldn't find a feed URL on this page");
  } else {
    alert("Taking you to Feedreader");
    window.location.href = "https://feedreader.co/feeds/"+feed;
  }
})();
