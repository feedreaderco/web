'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _userLink = require('../styles/userLink');

var _userLink2 = _interopRequireDefault(_userLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var user = _ref.user;

  var text = 'Login';
  var href = '/login';
  if (user) {
    text = user;
    href = '/' + user;
  }
  var onclick = function onclick(e) {
    e.preventDefault();
    window.location.pathname = href;
  };
  return _react2.default.createElement(
    'a',
    { style: _userLink2.default, onClick: onclick, id: 'userLink' },
    _react2.default.createElement(
      'h2',
      { id: 'user' },
      text
    )
  );
};