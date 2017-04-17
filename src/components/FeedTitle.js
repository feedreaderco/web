import React from 'react';

export default ({ feedURL, feedTitle }) => {
  const feedLink = `https://feedreader.co/feeds/${feedURL}`;
  return <a href={feedLink}><h2>{feedTitle}</h2></a>;
}
