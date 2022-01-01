'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _button = require('../styles/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = localStorage.token;
var user = localStorage.user;
var lib = (0, _api2.default)(user, token);

var SubscribeButton = function (_React$Component) {
  _inherits(SubscribeButton, _React$Component);

  function SubscribeButton(props, context) {
    _classCallCheck(this, SubscribeButton);

    var _this = _possibleConstructorReturn(this, (SubscribeButton.__proto__ || Object.getPrototypeOf(SubscribeButton)).call(this, props, context));

    _this.state = { isSelected: _this.props.isSelectedInitially };
    _this.addFeed = _this.addFeed.bind(_this);
    _this.removeFeed = _this.removeFeed.bind(_this);
    return _this;
  }

  _createClass(SubscribeButton, [{
    key: 'addFeed',
    value: function addFeed() {
      var _this2 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      Promise.all(this.props.folderNames.map(function (folder) {
        return lib.user.folders.post(folder, _this2.props.feedURL);
      })).then(function () {
        _this2.setState({ isSelected: true });
      }).catch(function (e) {
        console.error('Could not subscribe to feed, trying again:', e);
        window.setTimeout(function () {
          return _this2.addFeed(timeout * 2);
        }, timeout);
      });
    }
  }, {
    key: 'removeFeed',
    value: function removeFeed() {
      var _this3 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      Promise.all(this.props.folderNames.map(function (folder) {
        return lib.user.folders.del(folder, _this3.props.feedURL);
      })).then(function () {
        _this3.setState({ isSelected: false });
      }).catch(function (e) {
        console.error('Could not unsubscribe from feed, trying again:', e);
        window.setTimeout(function () {
          return _this3.removeFeed(timeout * 2);
        }, timeout);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var onclick = function onclick(e) {
        e.target.blur();
        if (_this4.state.isSelected) _this4.removeFeed();else _this4.addFeed();
      };

      var value = function value() {
        if (_this4.state.isSelected) return "Unsubscribe";else return "Subscribe";
      };

      return _react2.default.createElement('input', {
        type: 'button',
        style: (0, _button2.default)(this.state.isSelected),
        value: value(),
        onClick: onclick
      });
    }
  }]);

  return SubscribeButton;
}(_react2.default.Component);

exports.default = SubscribeButton;