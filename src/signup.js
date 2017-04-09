import api from './api';

var user = '';
var form = document.getElementById('signupForm');
var signupButton = document.getElementById('signup');

function signup() {
  user = form.elements["user"].value;
  localStorage.user = user;
  api('POST', 'signup', function(response) {
    if (response.token) {
      form.style.display = 'none';
      localStorage.token = response.token;
      window.location.href = 'https://feedreader.co/welcome/';
    } else {
      console.log(response);
      alert('Something went wrong - please contact me at arpith@feedreader.co');
    }
  }, "user=" + user + "&password=" + form.elements["password"].value);
  return false;
}

signupButton.onclick = signup;
