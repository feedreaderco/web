import React from 'react';
import ArticleTitle from './ArticleTitle';
import FeedTitle from './FeedTitle';
import ArticleBody from './ArticleBody';
import ArticleActions from './ArticleActions';
import style from '../styles/article';

export default ({ article, labels, user }) => <div style={style}>
  <ArticleTitle title={article.title} link={article.link} />
  <FeedTitle feedURL={article.feedurl} feedTitle={article.meta.title} />
  <ArticleBody body={article.description} />
  <ArticleActions labels={labels} hash={article.hash} />
</div>;
