import api from './api';

var user = '';
var form = document.getElementById('signupForm');
var signupButton = document.getElementById('signup');

function signup() {
  user = form.elements["user"].value;
  api('POST', 'signup', function(response) {
    if (response.url) {
      window.location.href = response.url;
    } else {
      console.log(response);
      alert('Something went wrong - please contact us');
    }
  }, "username=" + user + "&password=" + form.elements["password"].value);
  return false;
}

signupButton.onclick = signup;
