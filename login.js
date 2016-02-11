var current
, token = ''
, user = ''
, form = document.getElementById('loginForm')
, login = document.getElementById('login')
, base64_encode = function(str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}
, api = function(method,endpoint,onload,params) {
  var xhr = new XMLHttpRequest()
  xhr.open(method,'https://api.feedreader.co/v1/'+endpoint)
  xhr.setRequestHeader('authorization','Basic '+base64_encode(token+':'))
  xhr.onload = onload
  if (params) {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(params)
  }
  else xhr.send()
}
, get_token = function() {
  user = form.elements["user"].value
  api('POST',user+'/tokens',function(){
    if ((hash = JSON.parse(this.responseText).token)) {
      form.style.display = 'none'
      localStorage.token = hash
      localStorage.user = user
      window.location.pathname = user
    }
    else alert('Please type them out again')
  },"user="+user+"&password="+form.elements["password"].value)
  return false
}
login.onclick = get_token
window.onscroll = mark_as_read
window.onbeforeunload = function() {
  api('DELETE')
}
