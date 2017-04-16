import React from 'react';

export default ({ article }) => {
  return <a href={article.link}><h1>{article.title}</h1></a>;
}
