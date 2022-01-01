'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FolderLink = require('./FolderLink');

var _FolderLink2 = _interopRequireDefault(_FolderLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var folders = _ref.folders,
      user = _ref.user;
  return _react2.default.createElement(
    'div',
    null,
    folders.map(function (folder) {
      return _react2.default.createElement(_FolderLink2.default, { folder: folder, key: folder, user: user });
    })
  );
};