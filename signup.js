'use strict';

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signupButton = document.getElementById('signup');

function signup(e) {
  e.preventDefault();
  var form = document.getElementById('signupForm');
  var username = form.elements.user.value;
  var password = form.elements.password.value;
  localStorage.user = username;
  console.log(username, password);
  (0, _api2.default)(username).signup(password).then(function (response) {
    if (!response.token) throw new Error();
    form.style.display = 'none';
    localStorage.token = response.token;
    window.location.href = 'https://feedreader.co/welcome/';
  }).catch(function (err) {
    console.error(err);
    alert('Something went wrong - please contact me at arpith@feedreader.co');
  });
}

signupButton.onclick = signup;