'use strict'

const API_BASE_URL = 'http://feedreader2016-923846828.us-east-1.elb.amazonaws.com';
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
