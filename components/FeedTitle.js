'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var feedURL = _ref.feedURL,
      feedTitle = _ref.feedTitle;

  var feedLink = 'https://feedreader.co/feeds/' + feedURL;
  return _react2.default.createElement(
    'a',
    { href: feedLink },
    _react2.default.createElement(
      'h2',
      null,
      feedTitle
    )
  );
};