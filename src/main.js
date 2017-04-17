import React from 'react';
import ReactDOM from 'react-dom';
import api from './api';
import Article from './components/Article';

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
let viewedFeed = '';
let current;
let articles;

function addToFolder(folderButton) {
  const folderName = folderButton.value;
  lib.user.folders.folder.post(folderName, viewedFeed).then(() => {
    folderButton.className = 'pillbox';
  }).catch(console.error);
}

function removeFromFolder(folderButton) {
  const folderName = folderButton.value;
  lib.user.folders.folder.del(folderName, viewedFeed).then(() => {
    folderButton.className = 'pillbox empty';
  }).catch(console.error);
}

function createFolderButton(folderName) {
  const folderButton = document.createElement('input');
  folderButton.type = 'submit';
  folderButton.className = 'pillbox empty';
  folderButton.value = folderName;
  folderButton.onclick = () => {
    if (folderButton.className === 'pillbox') {
      removeFromFolder(folderButton);
    } else {
      addToFolder(folderButton);
    }
    return false;
  };
  return folderButton;
}

function addToNewFolder(newFolder) {
  const newButton = createFolderButton(newFolder.value);
  newFolder.value = '';
  newFolder.parentElement.insertBefore(newButton, newFolder);
  newFolder.style.display = 'none';
  addToFolder(newButton);
}

function getFolders(callback) {
  const foldersDiv = document.getElementById('folders');
  if (splitPathname[1] === 'feeds') {
    viewedFeed = pathname.slice(7, -1);
    return lib.user.folders.get().then((response) => {
      if (response.allFolders && response.folders) {
        response.allFolders.forEach((folderName, position) => {
          const folderButton = createFolderButton(folderName);
          if (response.folders.indexOf(folderName) !== -1) {
            folderButton.className = 'pillbox';
          }
          foldersDiv.appendChild(folderButton);
        });
        const addFolder = document.createElement('input');
        const newFolder = document.createElement('input');
        newFolder.placeholder = 'Folder Name';
        newFolder.type = 'text';
        newFolder.style.display = 'none';
        newFolder.className = 'pillbox';
        addFolder.className = 'pillbox';
        addFolder.value = 'New Folder';
        addFolder.type = 'submit';
        addFolder.onclick = () => {
          if (newFolder.style.display === 'none') {
            newFolder.style.display = 'inline';
            addFolder.value = 'Save';
          } else {
            addToNewFolder(newFolder);
            addFolder.value = 'New Folder';
          }
          return false;
        };
        foldersDiv.appendChild(newFolder);
        foldersDiv.appendChild(addFolder);
      }
    }).catch(console.error);
  } else {
    return lib.user.folders.get().then((response) => {
      if (response.folders) {
        foldersDiv.innerHTML = response.folders.map((folder) => {
          return `<a href=/${user}/folders/${encodeURIComponent(folder)} class=pillbox>${folder}</a>`;
        }).join(' ');
      }
    }).catch(console.error);
  }
}

function getLabels() {
  return lib.user.labels.get().then((response) => {
    if (response.labels) {
      labelNames = response.labels;
      response.labels.forEach((labelName) => {
        lib.user.labels.get(labelName).then((response) => {
          labelArticles[feedLabel] = [];
          if (response.articles) {
            labelArticles[feedLabel] = response.articles;
          }
        });
      });
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
      articles.slice(i, i+4).forEach(getArticle);
    }
  });
}

function refreshFeeds() {
  if (!token) return;
  lib.user.feeds.get().then((response) => {
    if (!response.feeds) return;
    const promiseArr = response.feeds.map(({ key, title }) => {
      return lib.feeds.get(key).then(({articles}) => {
        if (!articles) return;
        console.log(`Refreshed ${title}, ${articles.length} articles so far`);
      }).catch((err) => {
        console.log(`Could not refresh ${title}: ${err}`);
      });
    }).catch(console.error);
    Promise.all(promiseArr);
  });
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
      api.user.labels.post('read', { hash }).then(() => {
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
