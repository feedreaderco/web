'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ArticleBody = require('./components/ArticleBody');

var _ArticleBody2 = _interopRequireDefault(_ArticleBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathnameSplit = window.location.pathname.split('/');
var hash = pathnameSplit[pathnameSplit.length - 2];
var mountNode = document.getElementById('articles');

_reactDom2.default.render(_react2.default.createElement(_ArticleBody2.default, { id: hash }), mountNode);