import React from 'react';
import { Parser } from 'html-to-react';

export default ({ body }) => {
  const parser = new Parser();
  const Body = parser.parse(body);
  return <div id="article">{Body}</div>;
};
