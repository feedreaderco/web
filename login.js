'use strict';

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = document.getElementById('login');

function testToken(user, token) {
  return (0, _api2.default)(user, token).user.feeds.get();
}

function getToken(e) {
  e.preventDefault();
  var form = document.getElementById('loginForm');
  var user = form.elements.user.value;
  var password = form.elements.password.value;
  (0, _api2.default)(user).user.tokens.create(password).then(function (response) {
    if (!response.token) throw new Error();
    form.style.display = 'none';
    localStorage.token = response.token;
    localStorage.user = user;
    window.location.pathname = user + '/feeds';
  }).catch(function () {
    alert('Please type that out again');
  });
}

if (localStorage.token && localStorage.user) {
  testToken(localStorage.user, localStorage.token).then(function () {
    window.location.pathname = localStorage.user + '/feeds';
  });
}

login.onclick = getToken;