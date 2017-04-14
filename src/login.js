import api from './api';

function getToken() {
  const form = document.getElementById('loginForm');
  const login = document.getElementById('login');
  const user = form.elements.user.value;
  const password = form.elements.password.value;
  api(user).user.tokens.create(password).then((response) => {
    if (!response.token) throw '';
    form.style.display = 'none';
    localStorage.token = response.token;
    localStorage.user = user;
    window.location.pathname = `${user}/feeds`;
  }).catch(() => {
    alert('Please type that out again');
  });
  return false;
}

login.onclick = getToken;
