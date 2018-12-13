import React from 'react';
import ArticleTitle from './ArticleTitle';
import FeedTitle from './FeedTitle';
import ArticleBody from './ArticleBody';
import FavoriteButton from './FavoriteButton';

export default ({ article, labels, user }) => <div className="article">
  <ArticleTitle title={article.title} link={article.link} />
  <FeedTitle feedURL={article.feedurl} feedTitle={article.meta.title} />
  <ArticleBody body={article.description} />
  <FavoriteButton hash={article.hash} />
</div>;
