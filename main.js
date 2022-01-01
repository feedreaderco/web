'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _Article = require('./components/Article');

var _Article2 = _interopRequireDefault(_Article);

var _SubscribeButton = require('./components/SubscribeButton');

var _SubscribeButton2 = _interopRequireDefault(_SubscribeButton);

var _UserLink = require('./components/UserLink');

var _UserLink2 = _interopRequireDefault(_UserLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = localStorage.token;
var user = localStorage.user;
var lib = (0, _api2.default)(user, token);
var userLink = document.getElementById('userLink');
var userH2 = document.getElementById('user');
var splitPathname = window.location.pathname.split('/');
var isArticle = splitPathname[splitPathname.length - 1] === 'articles';
var labelArticles = {};
var userLinkDiv = document.getElementById('userLinkContainer');
var hash = splitPathname.pop();
var pathname = splitPathname.join('/');
var current = void 0;
var articles = void 0;

function displaySubscribeButton(_ref) {
  var allFolders = _ref.allFolders,
      folders = _ref.folders;

  var feed = pathname.slice(7, -1);
  var isSelectedInitially = false;
  var folderNames = ['Other'];
  if (allFolders && allFolders.length > 0 && folders && folders.length > 0) {
    folderNames = folders;
    isSelectedInitially = true;
  }
  _reactDom2.default.render(_react2.default.createElement(_SubscribeButton2.default, {
    folderNames: folderNames,
    isSelectedInitially: isSelectedInitially,
    feedURL: feed
  }), userLinkDiv);
}

function storeLabelArticles(label) {
  return lib.user.labels.get(label).then(function (response) {
    labelArticles[label] = response.articles || [];
  });
}

function getLabels() {
  return lib.user.labels.get().then(function (response) {
    if (!response.labels) return;
    var promiseArr = response.labels.map(storeLabelArticles);
    Promise.all(promiseArr);
  }).catch(console.error);
}

function displayArticle(article) {
  var element = document.createElement('div');
  element.id = article.hash;
  var e = document.getElementById('articles').appendChild(element);
  _reactDom2.default.render(_react2.default.createElement(_Article2.default, { article: article, labels: labelArticles, user: user }), e);
  if (!current) current = e;
}

function getArticle(id) {
  if (!id) return;
  lib.articles.get(id).then(function (_ref2) {
    var article = _ref2.article,
        error = _ref2.error;

    if (!article) {
      console.error('Could not parse articles/' + id, error);
    }
    if (!document.getElementById(id)) {
      displayArticle(article);
    }
  }).catch(console.error);
}

function getArticles() {
  var strippedPathname = pathname.slice(1, -1);
  return lib.get(strippedPathname).then(function (response) {
    if (response.articles) {
      var i = 0;
      articles = response.articles;
      if (hash) {
        i = articles.indexOf(hash);
      }
      if (i < 0) {
        i = 0;
      }
      articles.slice(i, i + 4).forEach(getArticle);
    }
  });
}

function refreshFeed(_ref3) {
  var key = _ref3.key,
      title = _ref3.title;

  return lib.feeds.get(key).then(function (response) {
    if (!response.articles) return;
    console.log('Refreshed ' + title + ', ' + response.articles.length + ' articles so far');
  }).catch(function (err) {
    console.log('Could not refresh ' + title + ': ' + err);
  });
}

function refreshFeeds() {
  if (!token) return;
  lib.user.feeds.get().then(function (_ref4) {
    var feeds = _ref4.feeds;

    if (!feeds) return;
    var promiseArr = feeds.map(refreshFeed);
    Promise.all(promiseArr);
  }).catch(console.error);
}

function updateState() {
  var nextArticleIsCurrent = current.nextSibling.offsetTop < window.pageYOffset;
  var previousArticleIsCurrent = current.offsetTop > window.pageYOffset;
  if (nextArticleIsCurrent || previousArticleIsCurrent) {
    var id = current.id;
    var i = articles.indexOf(id);
    getArticle(articles[i + 5]);
    if (previousArticleIsCurrent) {
      current = current.previousSibling;
    } else {
      current = current.nextSibling;
    }
    var articleDiv = current.firstChild;
    var articleTitle = articleDiv.childNodes[0].firstChild.innerHTML;
    var feedTitle = articleDiv.childNodes[1].firstChild.innerHTML;
    document.title = articleTitle + ' - ' + feedTitle + ' (feedreader.co)';
    history.replaceState({ id: current.id }, '', 'https://feedreader.co' + pathname + current.id);
    if (token) {
      console.log('Marking ' + id + ' as read');
      lib.user.labels.post('read', id).then(function () {
        console.log('Marked ' + id + ' as read');
      }).catch(function () {
        console.log('Couldn\'t mark ' + id + ' as read');
      });
    }
  }
}

pathname = pathname + '/';

if (hash.length !== 32 && hash.length !== 40) {
  pathname = '' + pathname + hash + '/';
  hash = '';
}

window.onscroll = updateState;

if (splitPathname[1] === 'feeds' && user) {
  var feed = pathname.slice(7, -1);
  lib.user.folders.get(feed).then(displaySubscribeButton).catch(console.error);
} else {
  _reactDom2.default.render(_react2.default.createElement(_UserLink2.default, { user: user }), userLinkDiv);
}

if (hash && isArticle) {
  getLabels().then(function () {
    return getArticle(hash);
  }).then(refreshFeeds);
} else {
  getLabels().then(getArticles).then(refreshFeeds);
}