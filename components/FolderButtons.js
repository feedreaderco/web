'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FolderButton = require('./FolderButton');

var _FolderButton2 = _interopRequireDefault(_FolderButton);

var _AddFolderButton = require('./AddFolderButton');

var _AddFolderButton2 = _interopRequireDefault(_AddFolderButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var allFolders = _ref.allFolders,
      user = _ref.user,
      folders = _ref.folders,
      feed = _ref.feed,
      lib = _ref.lib;
  return _react2.default.createElement(
    'div',
    null,
    allFolders.map(_FolderButton2.default.bind(user, folders, feed, lib)),
    _react2.default.createElement(_AddFolderButton2.default, null)
  );
};