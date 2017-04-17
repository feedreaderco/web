import React from 'react';

export default ({ folder, user }) => {
  const uri = `/${user}/folders/${encodeURIComponent(folder)}`;
  return <a href={uri} className="pillbox">{folder}</a>;
};
