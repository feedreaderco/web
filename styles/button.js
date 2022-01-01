'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var base = {
  fontWeight: 300,
  background: 'Gainsboro',
  border: 'thin solid',
  borderColor: 'Gainsboro',
  color: 'rgb(74, 82, 90)',
  fontSize: '0.8em',
  padding: '0.2em',
  paddingLeft: '0.4em',
  paddingRight: '0.4em',
  marginRight: '0.4em',
  borderRadius: '0.2em',
  cursor: 'pointer'
};

exports.default = function () {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!selected) {
    return _extends({}, base, {
      background: 'white',
      color: '#4A525A',
      borderColor: '#ADADAD'
    });
  }
  return base;
};