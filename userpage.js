var h2 = document.getElementById('user')
, unread = document.getElementById('unread')
, user = window.location.pathname.split('/')[1]
, base64_encode = function(str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}
, api = function(method,endpoint,onload,params) {
  var xhr = new XMLHttpRequest()
  xhr.open(method,'https://api.feedreader.co/v1/'+endpoint)
  if (method!='GET') xhr.setRequestHeader('authorization','Basic '+base64_encode(localStorage.token+':'))
  xhr.onload = onload
  if (params) {
    if (typeof params === 'string') xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(params)
  }
  else xhr.send()
}
, get_labels = function() {
  api('GET',user+'/labels',function(){
    var div = document.getElementById('labels')
    if ((labels = JSON.parse(this.responseText).labels)) {
      if (!labels.length) div.innerHTML = "No labels."
      else div.innerHTML = labels.map(function(label) {return "<a href=/"+user+"/labels/"+encodeURIComponent(label)+" class=pillbox>"+label+"</a>"}).join(' ')
    }
    else div.innerHTML = "Couldn't load labels."
  })
}
, get_folders = function() {
  api('GET',user+'/folders',function(){
    var div = document.getElementById('folders') 
    if ((folders= JSON.parse(this.responseText).folders)) {
      if (!folders.length) div.innerHTML = "No folders."
      else div.innerHTML = folders.map(function(folder) {return "<a href=/"+user+"/folders/"+encodeURIComponent(folder)+" class=pillbox>"+folder+"</a>"}).join(' ')
    }
    else div.innerHTML = "Couldn't load folders."
  })
}
, get_feeds = function() {
  api('GET',user+'/feeds',function(){
    var ul = document.getElementById('feeds')
    if ((feeds = JSON.parse(this.responseText).feeds)) {
      if (!feeds.length) ul.innerHTML = "No feeds."
      else ul.innerHTML = feeds.map(function(feed) {return "<li><a href=/feeds/"+encodeURIComponent(feed.key)+">"+feed.title+"</a></li>"}).join(' ')
    }
    else ul.innerHTML = "Couldn't load feeds."
  })
}
h2.innerHTML = user
document.title = user + ' (feedreader.co)'
