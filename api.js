function base64_encode(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function parseResponseText(responseText) {
  try {
    var parsedResponse = JSON.parse(responseText);
    return parsedResponse;
  } catch(e) {
    return {error: e};
  }
}

function api(method, endpoint, callback, params) {
  var xhr = new XMLHttpRequest();
  var urlparams = '';
  var token = localStorage.token;
  if ((params) && (method === 'GET')) {
    urlparams = '?' + params;
  }
  xhr.open(method, 'https://api.feedreader.co/v1/' + endpoint + urlparams);
  if (method != 'GET') {
    xhr.setRequestHeader('authorization', 'Basic ' + base64_encode(token + ':'));
  }
  
  xhr.onload = function() {
    var parsedResponse = parseResponseText(this.responseText);
    callback(parsedResponse);
  };

  if (params) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
  } else {
    xhr.send();
  }
}

export default api;
