import api from './api';

const h2 = document.getElementById('user');
const read = document.getElementById('read');
const user = window.location.pathname.split('/')[1];

function getLabels() {
  const div = document.getElementById('labels');
  api(user).user.labels.get().then((response) => {
    if (!response.labels.length) {
      div.innerHTML = 'No labels';
    } else {
      div.innerHTML = response.labels.map((label) => {
        return `<a href=/${user}/labels/${encodeURIComponent(label)} class=pillbox>${label}</a>`;
      }).join(' ');
    }
  }).catch(() => {
    div.innerHTML = 'Couldn\'t load labels';
  });
}

function getFolders() {
  const div = document.getElementById('folders');
  api(user).user.folders.get().then((response) => {
    if (!response.folders.length) {
      div.innerHTML = 'No folders';
    } else {
      div.innerHTML = response.folders.map((folder) => {
        return `<a href=/${user}/folders/${encodeURIComponent(folder)} class=pillbox>${folder}</a>`;
      }).join(' ');
    }
  }).catch(() => {
    div.innerHTML = 'Couldn\'t load folders';
  });
}

function getFeeds() {
  const ul = document.getElementById('feeds');
  api(user).user.feeds.get().then((response) => {
    if (!response.feeds.length) {
      ul.innerHTML = 'No feeds';
    } else {
      ul.innerHTML = response.feeds.map((feed) => {
        return `<li><a href=/feeds/${encodeURIComponent(feed.key)}>${feed.title}</a></li>`;
      }).join(' ');
    }
  }).catch(() => {
    ul.innerHTML = 'Couldn\'t load feeds';
  });
}

h2.innerHTML = user;
document.title = `${user} (feedreader.co)`;
read.href = `/${user}/labels/read`;

getLabels();
getFolders();
getFeeds();
