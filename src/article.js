import React from 'react';
import ReactDOM from 'react-dom';
import ArticleBody from './components/ArticleBody';

const pathname_split = window.location.pathname.split('/');
const hash = pathname_split[pathname_split.length - 2];
const mountNode = document.getElementById('articles');

ReactDOM.render(<ArticleBody id={hash} />, mountNode);
