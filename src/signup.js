import api from './api';

const signupButton = document.getElementById('signup');
function signup() {
  const form = document.getElementById('signupForm');
  const user = form.elements.user.value;
  const password = form.elements.password.value;
  localStorage.user = user;
  api('POST', 'signup', (response) => {
    if (response.token) {
      form.style.display = 'none';
      localStorage.token = response.token;
      window.location.href = 'https://feedreader.co/welcome/';
    } else {
      console.log(response);
      alert('Something went wrong - please contact me at arpith@feedreader.co');
    }
  }, `user=${user}&password=${password}`);
  return false;
}

signupButton.onclick = signup;
