import api from './api';

const signupButton = document.getElementById('signup');

function signup(e) {
  e.preventDefault();
  const form = document.getElementById('signupForm');
  const username = form.elements.user.value;
  const password = form.elements.password.value;
  localStorage.user = username;
  console.log(username, password);
  api(username).signup(password).then((response) => {
    if (!response.token) throw new Error();
    form.style.display = 'none';
    localStorage.token = response.token;
    window.location.href = 'https://feedreader.co/welcome/';
  }).catch((err) => {
    console.error(err);
    alert('Something went wrong - please contact me at arpith@feedreader.co');
  });
}

signupButton.onclick = signup;
