'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchPonyfill2 = require('fetch-ponyfill');

var _fetchPonyfill3 = _interopRequireDefault(_fetchPonyfill2);

var _Base = require('Base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fetchPonyfill = (0, _fetchPonyfill3.default)(),
    fetch = _fetchPonyfill.fetch;

function base64Encode(str) {
  return (0, _Base.btoa)(unescape(encodeURIComponent(str)));
}

function singleParamFormBody(key, value) {
  return encodeURIComponent(key) + '=' + encodeURIComponent(value);
}

function formBody(data) {
  var singleParam = function singleParam(key) {
    return singleParamFormBody(key, data[key]);
  };
  return Object.keys(data).map(singleParam).join('&');
}

function formFetchParams(data) {
  return {
    body: formBody(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
}

function apiFetch(endpoint, fetchParams) {
  var baseURL = 'https://api.feedreader.co/v1';
  var url = baseURL + '/' + endpoint;
  return fetch(url, fetchParams).then(function (res) {
    return res.json();
  }).then(function (json) {
    if (!json.success) throw json;
    return json;
  }).catch(function (e) {
    throw e;
  });
}

function authHeader(token) {
  return 'Basic ' + base64Encode(token + ':');
}

exports.default = function (username, token) {
  var apiFormFetch = function apiFormFetch(endpoint, params, method) {
    var fetchParams = formFetchParams(params);
    fetchParams.headers.authorization = authHeader(token);
    fetchParams.method = method;
    return apiFetch(endpoint, fetchParams);
  };

  var api = {
    get: function get(endpoint) {
      return apiFetch(endpoint, { method: 'GET' });
    },
    post: function post(endpoint, params) {
      return apiFormFetch(endpoint, params, 'POST');
    },
    del: function del(endpoint, params) {
      return apiFormFetch(endpoint, params, 'DELETE');
    }
  };

  return {
    get: api.get,
    signup: function signup(password) {
      return api.post('signup', { username: username, password: password });
    },
    articles: {
      get: function get(id) {
        return api.get('articles/' + id);
      }
    },
    feeds: {
      get: function get(url) {
        return api.get('feeds/' + url);
      }
    },
    user: {
      tokens: {
        create: function create(password) {
          return api.post(username + '/tokens', { password: password });
        },
        delete: function _delete() {
          return api.del(username + '/tokens', { token: token });
        }
      },
      feeds: {
        get: function get() {
          return api.get(username + '/feeds');
        }
      },
      labels: {
        create: function create(label) {
          var endpoint = username + '/labels';
          return api.post(endpoint, { label: label });
        },
        get: function get(label) {
          if (!label) {
            return api.get(username + '/labels');
          }
          return api.get(username + '/labels/' + encodeURIComponent(label));
        },
        post: function post(label, hash) {
          var endpoint = username + '/labels/' + encodeURIComponent(label);
          return api.post(endpoint, { hash: hash });
        },
        del: function del(label, hash) {
          var endpoint = username + '/labels/' + encodeURIComponent(label);
          return api.del(endpoint, { hash: hash });
        }
      },
      folders: {
        create: function create(folder) {
          var endpoint = username + '/folders';
          return api.post(endpoint, { folder: folder });
        },
        get: function get(feed) {
          return api.get(username + '/folders?xmlurl=' + feed);
        },
        post: function post(folder, xmlurl) {
          var endpoint = username + '/folders/' + encodeURIComponent(folder);
          return api.post(endpoint, { xmlurl: xmlurl });
        },
        del: function del(folder, xmlurl) {
          var endpoint = username + '/folders/' + encodeURIComponent(folder);
          return api.del(endpoint, { xmlurl: xmlurl });
        }
      }
    }
  };
};