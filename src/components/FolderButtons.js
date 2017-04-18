import React from 'react';
import FolderButton from './FolderButton';
import AddFolderButton from './AddFolderButton';

export default ({ allFolders, user, folders, feed, lib }) => <div>
  {allFolders.map(FolderButton.bind(user, folders, feed, lib))}
  <AddFolderButton />
</div>;
