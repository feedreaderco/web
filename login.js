var token = '';
var user = '';
var form = document.getElementById('loginForm');
var login = document.getElementById('login');

function base64_encode(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function api(method, endpoint, onload, params) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, 'https://api.feedreader.co/v1/' + endpoint);
  xhr.setRequestHeader('authorization', 'Basic ' + base64_encode(token + ':'));
  xhr.onload = onload;
  if (params) {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  } else {
    xhr.send();
  }
}

function get_token() {
  user = form.elements["user"].value;
  api('POST', user + '/tokens', function() {
    if ((hash = JSON.parse(this.responseText).token)) {
      form.style.display = 'none';
      localStorage.token = hash;
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
