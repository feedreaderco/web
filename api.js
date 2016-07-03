'use strict'

const API_BASE_URL = 'https://9m5yi5dxhc.execute-api.us-east-1.amazonaws.com';
const API_URL = API_BASE_URL + '/v1';

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
  if (endpoint.substring(0, 5) === "feeds") {
    // endpoint looks like 'feeds/http://daringfireball.net/feeds/main'
    // beginning is 'feeds/'
    // rest is 'http://daringfireball.net/feeds/main'
    // endpoint is changed to 'feeds/http%3A%2F%2Fdaringfireball.net%2Ffeeds%2Fmain'
    var beginning = endpoint.substring(0, 6);
    var rest = endpoint.substring(6);
    endpoint = beginning + encodeURIComponent(rest);
  }
  if ((params) && (method === 'GET')) {
    urlparams = '?' + params;
  }
  xhr.open(method, API_URL + '/' + endpoint + urlparams);
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
