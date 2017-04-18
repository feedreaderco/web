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

app.get('/articles/:id/body', (req, res) => {
  api().articles.get(req.params.id).then(({ article }) => {
    const reactString = renderToString(<ArticleBody body={article.description} />);
    res.render('article', { reactString });
  });
});

app.get('/articles/:articleID', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/bookmarklet/js', (req, res) => {
  res.redirect(301, '../bookmarklet.js');
});

app.get('/:user/labels/:label*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/:user/folders/:folder*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/:user/feeds*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/feeds/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/label.html'));
});

app.get('/:user', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/user.html'));
});

app.listen(port);
