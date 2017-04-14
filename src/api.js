import fetch from 'isomorphic-fetch';

function singleParamFormBody(key, value) {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

function formBody(data) {
  return Object.keys(data).map((key) => {
    return singleParamFormBody(key, data[key]);
  }).join('&');
}

function formFetchParams(data) {
  return {
    body: formBody(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  };
}

function apiFetch(endpoint, fetchParams) {
  const baseURL = 'https://api.feedreader.co/v1';
  const url = `${baseURL}/${endpoint}`;
  return fetch(url, fetchParams)
    .then(res => res.json())
    .then((json) => {
      if (!json.success) throw e;
      return json;
    })
    .catch(e => { throw e });
}

function apiFormFetch(endpoint, params, method) {
  const fetchParams = formFetchParams(params);
  return apiFetch(endpoint, {...fetchParams, method });
}

const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, params) => apiFormFetch(endpoint, params, 'POST'),
  del: (endpoint, params) => apiFormFetch(endpoint, params, 'DELETE'),
};

export default (username, token) => {
  return {
    get: api.get,
    articles: {
      get: (id) => api.get(`articles/${id}`),
    },
    feeds: {
      get: (url) => {
      },
    },
    user: {
      tokens: {
        create: (password) => api.post(`${username}/tokens`, { password }),
        delete: () => {
        },
      },
      feeds: {
        get: () => api.get(`${username}/feeds`),
      },
      labels: {
        create: () => {
        },
        get: (label) => api.get(`${username}/labels/${encodeURIComponent(label)}`),
        post: (label, hash) => {
          const endpoint = `${username}/labels/${encodeURIComponent(label)}`;
          return api.del(endpoint, { hash });
        },
      },
      folders: {
        create: () => {
        },
        get: (feed) => api.get(`${username}/folders?${feed}`),
        post: (folder, xmlurl) => {
          const endpoint = `${username}/folders/${encodeURIComponent(folder)}`;
          return api.post(endpoint, { xmlurl });
        },
        del: (folder, xmlurl) => {
          const endpoint = `${username}/folders/${encodeURIComponent(folder)}`;
          return api.del(endpoint, { xmlurl });
        },
      },
    },
  };
}
