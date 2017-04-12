import React from 'react';
import { Parser } from 'html-to-react';

export default ({ article }) => {
  const parser = new Parser();
  const Body = parser.parse(article.description);
  return <div id="article">{Body}</div>;
};
