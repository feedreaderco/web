'use strict';

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h2 = document.getElementById('user');
var read = document.getElementById('read');
var user = window.location.pathname.split('/')[1];

function getLabels() {
  var div = document.getElementById('labels');
  (0, _api2.default)(user).user.labels.get().then(function (response) {
    if (!response.labels.length) {
      div.innerHTML = 'No labels';
    } else {
      div.innerHTML = response.labels.map(function (label) {
        return '<a href=/' + user + '/labels/' + encodeURIComponent(label) + ' class=pillbox>' + label + '</a>';
      }).join(' ');
    }
  }).catch(function () {
    div.innerHTML = 'Couldn\'t load labels';
  });
}

function getFolders() {
  var div = document.getElementById('folders');
  (0, _api2.default)(user).user.folders.get().then(function (response) {
    if (!response.folders.length) {
      div.innerHTML = 'No folders';
    } else {
      div.innerHTML = response.folders.map(function (folder) {
        return '<a href=/' + user + '/folders/' + encodeURIComponent(folder) + ' class=pillbox>' + folder + '</a>';
      }).join(' ');
    }
  }).catch(function () {
    div.innerHTML = 'Couldn\'t load folders';
  });
}

function getFeeds() {
  var ul = document.getElementById('feeds');
  (0, _api2.default)(user).user.feeds.get().then(function (response) {
    if (!response.feeds.length) {
      ul.innerHTML = 'No feeds';
    } else {
      ul.innerHTML = response.feeds.map(function (feed) {
        return '<li><a href=/feeds/' + encodeURIComponent(feed.key) + '>' + feed.title + '</a></li>';
      }).join(' ');
    }
  }).catch(function () {
    ul.innerHTML = 'Couldn\'t load feeds';
  });
}

h2.innerHTML = user;
document.title = user + ' (feedreader.co)';
read.href = '/' + user + '/labels/read';

getLabels();
getFolders();
getFeeds();