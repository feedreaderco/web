import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Parser } from 'html-to-react';
import api from './api';

const pathname_split = window.location.pathname.split('/');
const hash = pathname_split[pathname_split.length - 2];
const mountNode = document.getElementById('articles');

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { article: {} };
  }

  componentWillMount() {
    const uri = `articles/${this.props.id}`;
    api('GET', uri, ({ article }) => this.setState({ article }));
  }

  render() {
    if (!this.state.article.description) return <div></div>;
    const parser = new Parser();
    const Body = parser.parse(this.state.article.description);
    return <div id="article">{Body}</div>;
  }
}

ReactDOM.render(<Article id={hash} />, mountNode);
