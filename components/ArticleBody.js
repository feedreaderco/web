'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _htmlToReact = require('html-to-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var body = _ref.body;

  var parser = new _htmlToReact.Parser();
  var Body = parser.parse(body);
  return _react2.default.createElement(
    'div',
    { id: 'article' },
    Body
  );
};