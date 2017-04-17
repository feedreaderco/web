import React from 'react';
import ReactDOM from 'react-dom';
import ArticleBody from './components/ArticleBody';

const pathnameSplit = window.location.pathname.split('/');
const hash = pathnameSplit[pathnameSplit.length - 2];
const mountNode = document.getElementById('articles');

ReactDOM.render(<ArticleBody id={hash} />, mountNode);
