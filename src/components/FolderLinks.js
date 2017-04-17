import React from 'react';
import FolderLink from './FolderLink';

export default ({ folders, user }) => <div>
  {folders.map(folder => <FolderLink folder={folder} key={folder} user={user} />)}
</div>;
