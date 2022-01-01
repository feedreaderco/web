'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url) {
  return {
    width: '1.8em',
    height: '1.8em',
    marginTop: '0.2em',
    marginRight: '0.6em',
    border: 'blue',
    cursor: 'pointer',
    backgroundImage: 'url(' + url + ')',
    backgroundSize: 'contain'
  };
};