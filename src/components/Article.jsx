import React from 'react';
import ArticleTitle from './ArticleTitle';
import FeedTitle from './FeedTitle';
import ArticleBody from './ArticleBody';
import Labels from './Labels';

export default ({ article, labels, user }) => {
  return <div className='article'>
    <ArticleTitle article={article} />
    <FeedTitle article={article} />
    <ArticleBody article={article.description} />
    <Labels articleID={article.hash} labels={labels} user={user} />
  </div>;
}
