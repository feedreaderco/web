var path = require('path');
var express = require('express');

var app = express();

app.use(express.static('static'));

app.get('/:user/labels/:label*', function(req,res) {
  res.sendFile(path.join(__dirname, 'label.html'));
});

app.get('/:user/folders/:folder*', function(req,res) {
  res.sendFile(path.join(__dirname, 'label.html'));
});

app.get('/:user/feeds*', function(req,res) {
  res.sendFile(path.join(__dirname, 'label.html'));
});

app.get('/feeds/*', function(req,res) {
  res.sendFile(path.join(__dirname, 'label.html'));
});

app.get('/:user', function(req,res) {
  res.sendFile(path.join(__dirname, 'user.html'));
});

app.listen(8000);
