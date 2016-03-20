import React from 'react';
import PillBox from './styles/PillBox';

class FolderLink extends React.Component {
  render() {
    const URIComponent = encodeURIComponent(this.props.folderName);
    const href = '/' + this.props.user + '/folders/' + URIComponent;

    return (
      <a href={href} style={PillBox}>this.props.folderName</a>
    );
  }
}

export default FolderLink;
