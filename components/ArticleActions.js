'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LabelButton = require('./LabelButton');

var _LabelButton2 = _interopRequireDefault(_LabelButton);

var _articleActions = require('../styles/articleActions');

var _articleActions2 = _interopRequireDefault(_articleActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLabelled(labels, hash, label) {
  return labels[label] && labels[label].indexOf(hash) > -1;
}

exports.default = function (_ref) {
  var labels = _ref.labels,
      hash = _ref.hash;
  return _react2.default.createElement(
    'div',
    { style: _articleActions2.default },
    _react2.default.createElement(_LabelButton2.default, {
      hash: hash,
      label: 'favorites',
      isSelectedInitially: isLabelled(labels, hash, 'favorites')
    }),
    _react2.default.createElement(_LabelButton2.default, {
      hash: hash,
      label: 'reading-list',
      isSelectedInitially: isLabelled(labels, hash, 'reading-list')
    })
  );
};