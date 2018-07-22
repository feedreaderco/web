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
      feed={feed}
    />, foldersDiv);
  }
}

function getFolders() {
  return lib.user.folders.get()
    .then(displayFolders)
    .catch(console.error);
}

function storeLabelArticles(label) {
  return lib.user.labels.get(label).then((response) => {
    labelArticles[label] = response.articles || [];
  });
}

function getLabels() {
  return lib.user.labels.get().then((response) => {
    if (!response.labels) return;
    const promiseArr = response.labels.map(storeLabelArticles);
    Promise.all(promiseArr);
  }).catch(console.error);
}

function displayArticle(article) {
  const element = document.createElement('div');
  element.id = article.hash;
  const e = document.getElementById('articles').appendChild(element);
  ReactDOM.render(<Article article={article} labels={labelArticles} user={user} />, e);
  if (!current) current = e;
}

function getArticle(id) {
  if (!id) return;
  lib.articles.get(id).then(({ article, error }) => {
    if (!article) {
      console.error(`Could not parse articles/${id}`, error);
    }
    if (!document.getElementById(id)) {
      displayArticle(article);
    }
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
      articles.slice(i, i + 4).forEach(getArticle);
    }
  });
}

function refreshFeed({ key, title }) {
  return lib.feeds.get(key).then((response) => {
    if (!response.articles) return;
    console.log(`Refreshed ${title}, ${response.articles.length} articles so far`);
  }).catch((err) => {
    console.log(`Could not refresh ${title}: ${err}`);
  });
}

function refreshFeeds() {
  if (!token) return;
  lib.user.feeds.get().then(({ feeds }) => {
    if (!feeds) return;
    const promiseArr = feeds.map(refreshFeed);
    Promise.all(promiseArr);
  }).catch(console.error);
}

function updateState() {
  const nextArticleIsCurrent = current.nextSibling.offsetTop < window.pageYOffset;
  const previousArticleIsCurrent = current.offsetTop > window.pageYOffset;
  if (nextArticleIsCurrent || previousArticleIsCurrent) {
    const id = current.id;
    const i = articles.indexOf(id);
    getArticle(articles[i + 5]);
    if (previousArticleIsCurrent) {
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
      console.log(`Marking ${id} as read`);
      lib.user.labels.post('read', id).then(() => {
        console.log(`Marked ${id} as read`);
      }).catch(() => {
        console.log(`Couldn't mark ${id} as read`);
      });
    }
  }
}

pathname = `${pathname}/`;

if ((hash.length !== 32) && (hash.length !== 40)) {
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
