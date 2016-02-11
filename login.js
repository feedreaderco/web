import api from './api';

var user = '';
var form = document.getElementById('loginForm');
var login = document.getElementById('login');

function get_token() {
  user = form.elements["user"].value;
  api('POST', user + '/tokens', function(response) {
    if (response.token) {
      form.style.display = 'none';
      localStorage.token = response.token;
      localStorage.user = user;
      window.location.pathname = user;
    } else {
      alert('Please type them out again');
    }
  }, "user=" + user + "&password=" + form.elements["password"].value);
  return false;
}

login.onclick = get_token;

window.onbeforeunload = function() {
  api('DELETE');
};
