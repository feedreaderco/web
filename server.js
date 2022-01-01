'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _ArticleBody = require('./components/ArticleBody');

var _ArticleBody2 = _interopRequireDefault(_ArticleBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

app.use(_express2.default.static('static'));
app.set('view engine', 'ejs');

app.get('/api', function (req, res) {
  res.status(301).redirect("https://api.feedreader.co");
});

app.get('/articles/:id/body', function (req, res) {
  (0, _api2.default)().articles.get(req.params.id).then(function (_ref) {
    var article = _ref.article;

    var reactString = (0, _server.renderToString)(_react2.default.createElement(_ArticleBody2.default, { body: article.description }));
    res.render('article', { reactString: reactString });
  });
});

app.get('/articles/:articleID', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../static/label.html'));
});

app.get('/bookmarklet/js', function (req, res) {
  res.redirect(301, '../bookmarklet.js');
});

app.get('/:user/labels/:label*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../static/label.html'));
});

app.get('/:user/folders/:folder*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../static/label.html'));
});

app.get('/:user/feeds*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../static/label.html'));
});

app.get('/feeds/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../static/label.html'));
});

app.get('/:user', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../static/user.html'));
});

app.listen(port);