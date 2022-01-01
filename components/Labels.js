'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Labels = function (_Component) {
  _inherits(Labels, _Component);

  function Labels(props) {
    _classCallCheck(this, Labels);

    var _this = _possibleConstructorReturn(this, (Labels.__proto__ || Object.getPrototypeOf(Labels)).call(this, props));

    _this.state = {
      newLabelValue: '',
      newLabelDisplay: 'none',
      addLabelButtonValue: 'Label'
    };
    return _this;
  }

  _createClass(Labels, [{
    key: 'onClick',
    value: function onClick(e) {
      e.preventDefault();
      if (this.state.newLabelButtonDisplay === 'none') {
        this.setState({
          newLabelDisplay: 'inline',
          addLabelButtonValue: 'Save'
        });
      } else {
        this.addLabel();
        this.setState({
          addLabelButtonValue: 'Label'
        });
      }
    }
  }, {
    key: 'addLabel',
    value: function addLabel() {
      //    const newLabelLink = document.createElement('a');
      this.setState({ newLabelValue: '', newLabelDisplay: 'none' });
      (0, _api2.default)().user.labels.post(this.state.newLabelValue, this.props.articleID).then(function () {
        //      newLabelLink.className = 'pillbox';
      }).catch(console.error);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var labelNames = Object.keys(this.props.labels).filter(function (name) {
        return _this2.props.labels[name].indexOf(_this2.props.articleID) !== -1;
      });
      return _react2.default.createElement(
        'div',
        { id: this.props.articleID, className: 'minor-margin-top' },
        labelNames.map(function (name) {
          return _react2.default.createElement(_Label2.default, { user: _this2.props.user, label: name });
        }),
        _react2.default.createElement('input', {
          type: 'text',
          placeholder: 'Label Name',
          style: { display: this.state.newLabelDisplay },
          value: this.state.newLabelValue,
          className: 'pillbox'
        }),
        _react2.default.createElement('input', {
          className: 'pillbox',
          value: this.state.addLabelButtonValue,
          type: 'submit',
          onClick: this.onClick
        })
      );
    }
  }]);

  return Labels;
}(_react.Component);

exports.default = Labels;