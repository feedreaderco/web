import api from './api';

const login = document.getElementById('login');

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
    window.location.pathname = `${user}/feeds`;
  }).catch(() => {
    alert('Please type that out again');
  });
}

login.onclick = getToken;
