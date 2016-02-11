import api from './api';

var current;
var articles;
var labelNames = [];
var labelArticles = {};
var token = localStorage.token;
var pathname_split = window.location.pathname.split('/');
var hash = pathname_split.pop();
var pathname = pathname_split.join('/');
var user = localStorage.user;
var viewedFeed = '';

function add_to_folder(folderButton) {
  var folderName = folderButton.value;
  api('POST', user + '/folders/' + encodeURIComponent(folderName), function(response) {
    if (response.success) {
      folderButton.className = 'pillbox';
    }
  }, 'xmlurl=' + viewedFeed);
}

function remove_from_folder(folderButton) {
  var folderName = folderButton.value;
  api('DELETE', user + '/folders/' + encodeURIComponent(folderName), function(response) {
    if (response.success) {
      folderButton.className = 'pillbox empty';
    }
  }, 'xmlurl=' + viewedFeed);
}

function create_folder_button(folderName) {
  var folderButton = document.createElement('input');
  folderButton.type = 'submit';
  folderButton.className = 'pillbox empty';
  folderButton.value = folderName;
  folderButton.onclick = function() {
    if (folderButton.className === 'pillbox') remove_from_folder(folderButton);
    else add_to_folder(folderButton);
    return false;
  };
  return folderButton;
}

function add_to_new_folder(newFolder) {
  var newButton = create_folder_button(newFolder.value);
  newFolder.value = '';
  newFolder.parentElement.insertBefore(newButton, newFolder);
  newFolder.style.display = 'none';
  add_to_folder(newButton);
}

function get_folders(callback) {
  var foldersDiv = document.getElementById('folders');
  if (pathname_split[1] === 'feeds') {
    viewedFeed = pathname.slice(7, -1);
    api('GET', user + '/folders', function(response) {
      if (response.allFolders && response.folders) {
        response.allFolders.forEach(function(folderName, position) {
          folderButton = create_folder_button(folderName);
          if (response.folders.indexOf(folderName) != -1) folderButton.className = 'pillbox';
          foldersDiv.appendChild(folderButton);
        });
        var addFolder = document.createElement('input');
        var newFolder = document.createElement('input');
        newFolder.placeholder = 'Folder Name';
        newFolder.type = 'text';
        newFolder.style.display = 'none';
        newFolder.className = 'pillbox';
        addFolder.className = 'pillbox';
        addFolder.value = 'New Folder';
        addFolder.type = 'submit';
        addFolder.onclick = function() {
          if (newFolder.style.display === 'none') {
            newFolder.style.display = 'inline';
            addFolder.value = 'Save';
          } else {
            add_to_new_folder(newFolder);
            addFolder.value = 'New Folder';
          }
          return false;
        };
        foldersDiv.appendChild(newFolder);
        foldersDiv.appendChild(addFolder);
      }
      callback();
    }, 'xmlurl=' + viewedFeed);
  } else {
    api('GET', user + '/folders', function(response) {
      if (response.folders) {
        foldersDiv.innerHTML = response.folders.map(function(folder) {
          return '<a href=/' + user + '/folders/' + encodeURIComponent(folder) + ' class=pillbox>' + folder + '</a>';
        }).join(' ');
      }
      callback();
    });
  }
}

function add_label(newLabel) {
  var value = newLabel.value;
  var newLabelLink = document.createElement('a');
  newLabel.value = '';
  newLabelLink.href = '/' + user + '/labels/' + encodeURIComponent(value);
  newLabelLink.className = 'pillbox empty';
  newLabelLink.innerHTML = value;
  newLabel.parentElement.insertBefore(newLabelLink, newLabel);
  newLabel.style.display = 'none';
  api('POST', user + '/labels/' + encodeURIComponent(value), function(response) {
    if (response.success) {
      newLabelLink.className = 'pillbox'; 
    }
  }, 'hash=' + newLabel.parentElement.id);
}

function get_labels(callback) {
  api('GET', user + '/labels', function(response) {
    if (response.labels) {
      labelNames = response.labels;
      response.labels.forEach(function(feedLabel) {
        api('GET', user + '/labels/' + feedLabel, function(response) {
          labelArticles[feedLabel] = [];
          if (response.articles) {
            labelArticles[feedLabel] = response.articles;
          }
        });
      });
    }
    callback();
  });
}

function get_articles(callback) {
  var pathname_stripped = pathname.slice(1, -1);
  api('GET', pathname_stripped, function(response) {
    if (response.articles) {
      var i = 0;
      articles = response.articles;
      if (hash) i = articles.indexOf(hash);
      if (i<0) i = 0;
      if (articles[i]) get_article(articles[i], function() {
        if (articles[i+1]) get_article(articles[i+1], function() {
          if (articles[i+2]) get_article(articles[i+2], function() {
            if (articles[i+3]) get_article(articles[i+3], function() {
              if (articles[i+4]) get_article(articles[i+4], callback);
              else callback();
            });
            else callback();
          });
          else callback();
        });
        else callback();
      });
      else callback();
    }
  });
}

function refresh_feeds() {
  if (token) api('GET', user + '/feeds', function(response) {
    if (response.feeds) {
      response.feeds.forEach(function(feed) {
        api('GET', 'feeds/' + feed.key, function(response) {
          if (response.articles) {
            console.log('Refreshed ' + feed.title + ', ' + response.articles.length + ' articles so far');
          }
        });
      });
    }
  });
}

function get_article(hash, callback) {
  if (!!hash) {
    api('GET', 'articles/' + hash, function(response) {
      if (response.article) {
        if (!document.getElementById(hash)) {
          display_article(response.article, callback);
        } else {
          callback();
        }
      } else {
        console.error('Could not parse articles/' + hash, e.message);
        callback();
      }
    });
  } else {
    callback();
  }
}

function display_article(article, callback) {
  var element = document.createElement('div');
  var title = document.createElement('h1');
  var meta_title = document.createElement('h2');
  var text = document.createElement('div');
  var link = document.createElement('a');
  var meta_link = document.createElement('a');
  var labels = document.createElement('div');
  var newLabel = document.createElement('input');
  var addLabel = document.createElement('input');
  title.innerHTML = article.title;
  meta_title.innerHTML = article.meta.title;
  link.href = article.link;
  meta_link.href = 'https://feedreader.co/feeds/' + article.feedurl;
  link.appendChild(title);
  meta_link.appendChild(meta_title);
  text.innerHTML = article.description;
  labels.id = article.hash;
  labels.className = 'minor-margin-top';
  labels.innerHTML = labelNames.map(function(labelName) {
    if (labelArticles[labelName].indexOf(article.hash) === -1) {
      return '';
    } else {
      return '<a href=/' + user + '/labels/' + encodeURIComponent(labelName) + ' class=pillbox>' + labelName + '</a>';
    }
  }).join(' ');
  newLabel.placeholder = 'Label Name';
  newLabel.type = 'text';
  newLabel.style.display = 'none';
  newLabel.className = 'pillbox';
  addLabel.className = 'pillbox';
  addLabel.value = 'Label';
  addLabel.type = 'submit';
  addLabel.onclick = function() {
    if (newLabel.style.display === 'none') {
      newLabel.style.display = 'inline';
      addLabel.value = 'Save';
    } else {
      add_label(newLabel);
      addLabel.value = 'Label';
    }
    return false;
  };
  labels.appendChild(newLabel);
  labels.appendChild(addLabel);
  element.className = 'article';
  element.id = article.hash;
  element.appendChild(link);
  element.appendChild(meta_link);
  element.appendChild(text);
  element.appendChild(labels);
  var e = document.getElementById('articles').appendChild(element);
  if (!current) current = e;
  callback();
}

function updateState() {
  if ((current.nextSibling.offsetTop < window.pageYOffset) || (current.offsetTop > window.pageYOffset)) {
    var hash = current.id;
    var i = articles.indexOf(hash);
    get_article(articles[i+5], function(){});
    if (current.offsetTop > window.pageYOffset) current = current.previousSibling;
    else current = current.nextSibling;
    document.title = current.childNodes[0].firstChild.innerHTML + ' - ' + current.childNodes[1].firstChild.innerHTML + ' (feedreader.co)';
    history.replaceState({id: current.id}, '', 'https://feedreader.co' + pathname + current.id);
    if (token) {
      console.log('Marking '+ hash + ' as read');
      api('POST', user + '/labels/read', function(response) {
        if (response.success) {
          console.log('Marked ' + hash + ' as read');
        } else {
          console.log('Couldn\'nt mark ' + hash + ' as read');
        }
      }, 'hash=' + hash);
    }
  }
}

pathname = pathname + '/';

if ((hash.length != 32) && (hash.length != 40)) {
  pathname = pathname + hash + '/';
  hash = '';
}

window.onscroll = updateState;
window.onbeforeunload = function() {
  api('DELETE');
};

get_articles(function() {
  get_folders(function() {
    get_labels(refresh_feeds);
  });
});
