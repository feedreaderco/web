import React from 'react';

export default ({ article }) => {
  const metaLink = `https://feedreader.co/feeds/${article.feedurl}`;
  return <a href={metaLink}><h2>{article.meta.title}</h2></a>;
}
