'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var link = _ref.link,
      title = _ref.title;
  return _react2.default.createElement(
    'a',
    { href: link },
    _react2.default.createElement(
      'h1',
      null,
      title
    )
  );
};