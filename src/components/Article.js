import React, { Component } from 'react';
import api from './api';
import ArticleTitle from './ArticleTitle';
import FeedTitle from './FeedTitle';
import ArticleBody from './ArticleBody';

export class Article extends Component {
  state = { article: {} };

  componentWillMount() {
    const uri = `articles/${this.props.id}`;
    api('GET', uri, ({ article }) => this.setState({ article }));
  }

  render() {
    return <div id="article">
      <ArticleTitle article={this.state.article} />
      <FeedTitle article={this.state.article} />
      <ArticleBody article={this.state.article} />
    </div>;
  }
}
