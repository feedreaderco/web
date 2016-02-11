import api from './api';

var h2 = document.getElementById('user');
var unread = document.getElementById('unread');
var user = window.location.pathname.split('/')[1];

function get_labels() {
  api('GET', user + '/labels', function(response) {
    var div = document.getElementById('labels');
    if (response.labels) {
      if (!response.labels.length) {
        div.innerHTML = "No labels.";
      } else {
        div.innerHTML = response.labels.map(function(label) {
          return "<a href=/" + user + "/labels/" + encodeURIComponent(label) + " class=pillbox>" + label + "</a>";
        }).join(' ');
      }
    } else {
      div.innerHTML = "Couldn't load labels.";
    }
  });
}

function get_folders() {
  api('GET', user + '/folders', function(response) {
    var div = document.getElementById('folders');
    if (response.folders) {
      if (!response.folders.length) {
        div.innerHTML = "No folders.";
      } else {
        div.innerHTML = response.folders.map(function(folder) {
          return "<a href=/" + user + "/folders/" + encodeURIComponent(folder) + " class=pillbox>" + folder + "</a>";
        }).join(' ');
      }
    } else {
      div.innerHTML = "Couldn't load folders.";
    }
  });
}

function get_feeds() {
  api('GET', user + '/feeds', function(response) {
    var ul = document.getElementById('feeds');
    if (response.feeds) {
      if (!response.feeds.length) {
        ul.innerHTML = "No feeds.";
      } else {
        ul.innerHTML = response.feeds.map(function(feed) {
          return "<li><a href=/feeds/" + encodeURIComponent(feed.key) + ">" + feed.title + "</a></li>";
        }).join(' ');
      }
    } else {
      ul.innerHTML = "Couldn't load feeds.";
    }
  });
}

h2.innerHTML = user;
document.title = user + ' (feedreader.co)';
unread.href = "/" + user + "/feeds";

get_labels();
get_folders();
get_feeds();
