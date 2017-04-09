var path = require('path');
var express = require('express');

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static('static'));

app.get('/articles/:articleID', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/label.html'));
});

app.get('/bookmarklet/js', function(req, res) {
  res.redirect(301, '/bookmarklet.js');
});

app.get('/:user/labels/:label*', function(req,res) {
  res.sendFile(path.join(__dirname, 'static/label.html'));
});

app.get('/:user/folders/:folder*', function(req,res) {
  res.sendFile(path.join(__dirname, 'static/label.html'));
});

app.get('/:user/feeds*', function(req,res) {
  res.sendFile(path.join(__dirname, 'static/label.html'));
});

app.get('/feeds/*', function(req,res) {
  res.sendFile(path.join(__dirname, 'static/label.html'));
});

app.get('/:user', function(req,res) {
  res.sendFile(path.join(__dirname, 'static/user.html'));
});

app.listen(port);
