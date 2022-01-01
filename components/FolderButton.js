'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FolderButton = function (_Component) {
  _inherits(FolderButton, _Component);

  function FolderButton(props) {
    _classCallCheck(this, FolderButton);

    var _this = _possibleConstructorReturn(this, (FolderButton.__proto__ || Object.getPrototypeOf(FolderButton)).call(this, props));

    var className = 'pillbox empty';
    if (_this.props.folders.indexOf(_this.props.folder) !== -1) {
      className = 'pillbox';
    }
    _this.state = { className: className };
    return _this;
  }

  _createClass(FolderButton, [{
    key: 'onClick',
    value: function onClick(e) {
      e.preventDefault();
      if (this.state.className === 'pillbox') {
        this.removeFromFolder(folderButton);
      } else {
        this.addToFolder(folderButton);
      }
    }
  }, {
    key: 'addToFolder',
    value: function addToFolder() {
      var _this2 = this;

      this.props.lib.user.folders.folder.post(this.props.folder, this.props.feed).then(function () {
        _this2.setState({ className: 'pillbox' });
      }).catch(console.error);
    }
  }, {
    key: 'removeFromFolder',
    value: function removeFromFolder() {
      var _this3 = this;

      this.props.lib.user.folders.folder.del(this.props.folder, this.props.feed).then(function () {
        _this3.setState({ className: 'pillbox empty' });
      }).catch(console.error);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', { type: 'submit',
        className: this.state.className,
        value: this.props.folder,
        onClick: this.onClick
      });
    }
  }]);

  return FolderButton;
}(_react.Component);

exports.default = FolderButton;