import React from 'react';
import FolderButton from './FolderButton';
import FolderLink from './FolderLink';

class FolderList extends React.Component {
  render() {
    if (this.isViewingFeed) {
      viewedFeed = pathname.slice(7, -1);
      api('GET', user + '/folders', function(response) {
        if (response.allFolders && response.folders) {
          return <div id='folders'>
            response.allFolders.forEach((folderName) => {
              let isSelectedInitially = (response.folders.indexOf(folderName) != -1);
              return <FolderButton 
                folderName={folderName} 
                isSelectedInitially={isSelectedInitially}
                key={folderName}
              />;
            });
            <NewFolderButton />
            <AddFolderButton />
          </div>;
        }
      }, 'xmlurl=' + viewedFeed);
    } else {
      api('GET', user + '/folders', function(response) {
        if (response.folders) {
          return <div id='folders'>
            response.folders.map((folderName) => {
              return <FolderLink folderName={folderName} key={folderName}/>;
            });
          </div>;
        }
    });
  }
}

export default FolderList;
