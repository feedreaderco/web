import React from 'react';

export default ({ user, label }) => {
  const url = `/${user}/labels/${encodeURIComponent(label)}`;
  return <a href={url} className="pillbox">{label}</a>;
};
