import fetch from 'isomorphic-fetch';

function api(endpoint, fetchParams) {
  const baseURL = 'https://api.feedreader.co/v1';
  const url = `${baseURL}/${endpoint}`;
  return fetch(url, fetchParams)
    .then(res => res.json());
}

export default (username, token) => {
  return {
    articles: {
      get: (id) => api(`articles/${id}`, { method: 'GET' }),
    },
    feeds: {
      get: (url) => {
      },
    },
    user: {
      tokens: {
        create: (password) => {
          const body = `password=${encodeURIComponent(password)}`;
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          };
          return api(`${username}/tokens`, { method: 'POST', body, headers });
        },
        delete: () => {
        },
      },
      feeds: {
        get: () => api(`${username}/feeds`, { method: 'GET' }),
      },
      labels: {
        create: () => {
        },
        get: (label) => api(`${username}/labels/${label}`, { method: 'GET' }),
      },
      folders: {
        create: () => {
        },
        delete: () => {
        },
        get: (feed) => api(`${username}/folders?${feed}`, { method: 'GET' }),
      },
    },
  };
}
