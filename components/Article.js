'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ArticleTitle = require('./ArticleTitle');

var _ArticleTitle2 = _interopRequireDefault(_ArticleTitle);

var _FeedTitle = require('./FeedTitle');

var _FeedTitle2 = _interopRequireDefault(_FeedTitle);

var _ArticleBody = require('./ArticleBody');

var _ArticleBody2 = _interopRequireDefault(_ArticleBody);

var _ArticleActions = require('./ArticleActions');

var _ArticleActions2 = _interopRequireDefault(_ArticleActions);

var _article = require('../styles/article');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var article = _ref.article,
      labels = _ref.labels,
      user = _ref.user;
  return _react2.default.createElement(
    'div',
    { style: _article2.default },
    _react2.default.createElement(_ArticleTitle2.default, { title: article.title, link: article.link }),
    _react2.default.createElement(_FeedTitle2.default, { feedURL: article.feedurl, feedTitle: article.meta.title }),
    _react2.default.createElement(_ArticleBody2.default, { body: article.description }),
    _react2.default.createElement(_ArticleActions2.default, { labels: labels, hash: article.hash })
  );
};