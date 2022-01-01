'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _labelButton = require('../styles/labelButton');

var _labelButton2 = _interopRequireDefault(_labelButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = localStorage.token;
var user = localStorage.user;
var lib = (0, _api2.default)(user, token);

var LabelButton = function (_React$Component) {
  _inherits(LabelButton, _React$Component);

  function LabelButton(props, context) {
    _classCallCheck(this, LabelButton);

    var _this = _possibleConstructorReturn(this, (LabelButton.__proto__ || Object.getPrototypeOf(LabelButton)).call(this, props, context));

    _this.state = { isSelected: _this.props.isSelectedInitially };
    _this.addLabel = _this.addLabel.bind(_this);
    _this.removeLabel = _this.removeLabel.bind(_this);
    return _this;
  }

  _createClass(LabelButton, [{
    key: 'addLabel',
    value: function addLabel() {
      var _this2 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      lib.user.labels.post(this.props.label, this.props.hash).then(function () {
        _this2.setState({ isSelected: true });
      }).catch(function (e) {
        console.error('Could not add article to ' + _this2.props.label + ', trying again:', e);
        window.setTimeout(function () {
          return _this2.addLabel(timeout * 2);
        }, timeout);
      });
    }
  }, {
    key: 'removeLabel',
    value: function removeLabel() {
      var _this3 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      lib.user.labels.del(this.props.label, this.props.hash).then(function () {
        _this3.setState({ isSelected: false });
      }).catch(function (e) {
        console.error('Could not remove article from ' + _this3.props.label + ', trying again:', e);
        window.setTimeout(function () {
          return _this3.removeLabel(timeout * 2);
        }, timeout);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var onclick = function onclick(e) {
        e.target.blur();
        if (_this4.state.isSelected) _this4.removeLabel();else _this4.addLabel();
      };

      var src = '/' + this.props.label + '-inactive.png';
      if (this.state.isSelected) {
        src = '/' + this.props.label + '-active.png';
      }

      return _react2.default.createElement('div', {
        style: (0, _labelButton2.default)(src),
        onClick: onclick
      });
    }
  }]);

  return LabelButton;
}(_react2.default.Component);

exports.default = LabelButton;