import React from 'react';
import ReactDOM from 'react-dom';
import api from './api';
import Article from './components/Article';
import FolderLinks from './components/FolderLinks';
import FolderButtons from './components/FolderButtons';

const token = localStorage.token;
const user = localStorage.user;
const lib = api(user, token);
const userLink = document.getElementById('userLink');
const userH2 = document.getElementById('user');
const splitPathname = window.location.pathname.split('/');
const isArticle = splitPathname[splitPathname.length - 1] === 'articles';
const labelArticles = {};
let hash = splitPathname.pop();
let pathname = splitPathname.join('/');
let labelNames = [];
let current;
let articles;

function displayFolders({ allFolders, folders }) {
  const foldersDiv = document.getElementById('folders');
  if (splitPathname[1] === 'feeds') {
    const feed = pathname.slice(7, -1);
    if (!allFolders || !folders) return;
    ReactDOM.render(<FolderButtons
      folders={folders}
      user={user} 
      allFolders={allFolders} 
      feed={feed} />, foldersDiv);
  } else {
    if (!folders) return;
    ReactDOM.render(<FolderLinks folders={folders} user={user} />, foldersDiv);
  }
}

function getFolders(callback) {
  return lib.user.folders.get()
    .then(displayFolders)
    .catch(console.error);
}

function storeLabelArticles(label) {
  return lib.user.labels.get(label).then(({ articles }) => {
    labelArticles[feedLabel] = articles || [];
  });
}

function getLabels() {
  return lib.user.labels.get().then((response) => {
    if (!response.labels) return;
    labelNames = response.labels;
    const promiseArr = response.labels.map(fetchLabelArticles);
    return promise.all(promiseArr);
  }).catch(console.error);
}

function getArticles() {
  const strippedPathname = pathname.slice(1, -1);
  return lib.get(strippedPathname).then((response) => {
    if (response.articles) {
      let i = 0;
      articles = response.articles;
      if (hash) {
        i = articles.indexOf(hash);
      }
      if (i < 0) {
        i = 0;
      }
      articles.slice(i, i+4).forEach(getArticle);
    }
  });
}

function refreshFeed({ key, title }) {
  return lib.feeds.get(key).then(({articles}) => {
    if (!articles) return;
    console.log(`Refreshed ${title}, ${articles.length} articles so far`);
  }).catch((err) => {
    console.log(`Could not refresh ${title}: ${err}`);
  });
}

function refreshFeeds() {
  if (!token) return;
  lib.user.feeds.get().then(({ feeds }) => {
    if (!feeds) return;
    const promiseArr = feeds.map(refreshFeed);
    return Promise.all(promiseArr);
  }).catch(console.error);
}

function getArticle(hash) {
  if (!hash) return;
  return lib.articles.get(hash).then(({ article, error }) => {
    if (!article) {
      console.error(`Could not parse articles/${hash}`, error);
    }
    if (!document.getElementById(hash)) {
      displayArticle(article);
    }
  }).catch(console.error);
}

function displayArticle(article) {
  const element = document.createElement('div');
  element.id = article.hash;
  const e = document.getElementById('articles').appendChild(element);
  ReactDOM.render(<Article article={article} labels={labelArticles} user={user} />, e);
  if (!current) current = e;
}

function updateState() {
  if ((current.nextSibling.offsetTop < window.pageYOffset) || (current.offsetTop > window.pageYOffset)) {
    const hash = current.id;
    const i = articles.indexOf(hash);
    getArticle(articles[i+5]);
    if (current.offsetTop > window.pageYOffset) {
      current = current.previousSibling;
    } else {
      current = current.nextSibling;
    }
    const articleDiv = current.firstChild;
    const articleTitle = articleDiv.childNodes[0].firstChild.innerHTML;
    const feedTitle = articleDiv.childNodes[1].firstChild.innerHTML;
    document.title = `${articleTitle} - ${feedTitle} (feedreader.co)`;
    history.replaceState({ id: current.id }, '', `https://feedreader.co${pathname}${current.id}`);
    if (token) {
      console.log(`Marking ${hash} as read`);
      lib.user.labels.post('read', { hash }).then(() => {
        console.log(`Marked ${hash} as read`);
      }).catch(() => {
        console.log(`Couldn't mark ${hash} as read`);
      });
    }
  }
}

pathname = `${pathname}/`;

if ((hash.length != 32) && (hash.length != 40)) {
  pathname = `${pathname}${hash}/`;
  hash = '';
}

window.onscroll = updateState;

if (user) {
  userLink.href = `/${user}`;
  userH2.innerHTML = user;
} else {
  userLink.href = '/login';
  userH2.innerHTML = 'Login';
}

if (hash && isArticle) {
  getArticle(hash).then(getFolders).then(getLabels).then(refreshFeeds);
} else {
  getArticles().then(getFolders).then(getLabels).then(refreshFeeds);
}
