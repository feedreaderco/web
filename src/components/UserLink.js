import React from 'react';

export default ({ user }) => {
  let text = 'Login';
  let href = '/login';
  if (user) {
    text = user;
    href = `/${user}`;
  }
  const onclick = (e) => {
    e.preventDefault();
    window.location.pathname = href;
  }
  return <a onClick={onclick} id="userLink"><h2 id="user">{text}</h2></a>;
}
