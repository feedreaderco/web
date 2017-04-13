import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import express from 'express';
import api from './api';
import ArticleBody from './components/ArticleBody';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/articles/:id/body', function(req, res) {
  api().articles.get(req.params.id).then(({ article }) => {
    const reactString = renderToString(<ArticleBody article={article} />);
    res.render('article', { reactString });
  });
});

app.get('/articles/:articleID', function(req, res) {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/bookmarklet/js', function(req, res) {
  res.redirect(301, '../bookmarklet.js');
});

app.get('/:user/labels/:label*', function(req,res) {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/:user/folders/:folder*', function(req,res) {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/:user/feeds*', function(req,res) {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/feeds/*', function(req,res) {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/:user', function(req,res) {
  res.sendFile(path.join(__dirname, '../static/user.html'));
});

app.listen(port);
