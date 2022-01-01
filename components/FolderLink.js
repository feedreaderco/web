"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var folder = _ref.folder,
      user = _ref.user;

  var uri = "/" + user + "/folders/" + encodeURIComponent(folder);
  return _react2.default.createElement(
    "a",
    { href: uri, className: "pillbox" },
    folder
  );
};