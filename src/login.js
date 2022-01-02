import api from './api';

const login = document.getElementById('login');

function testToken(user, token) {
  return api(user, token).user.feeds.get();
}

function getToken(e) {
  e.preventDefault();
  const form = document.getElementById('loginForm');
  const user = form.elements.user.value;
  const password = form.elements.password.value;
  api(user).user.tokens.create(password).then((response) => {
    if (!response.token) throw new Error();
    form.style.display = 'none';
    localStorage.token = response.token;
    localStorage.user = user;
    window.location.pathname = "";
  }).catch(() => {
    alert('Please type that out again');
  });
}

if (localStorage.token && localStorage.user) {
  testToken(localStorage.user, localStorage.token).then(() => {
    window.location.pathname = `${localStorage.user}/feeds`;
  });
}

login.onclick = getToken;
