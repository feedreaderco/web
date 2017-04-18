import React, { Component } from 'react';

export default class FolderButton extends Component {
  constructor(props) {
    super(props);
    let className = 'pillbox empty';
    if (this.props.folders.indexOf(this.props.folder) !== -1) {
      className = 'pillbox';
    }
    this.state = { className };
  }

  onClick(e) {
    e.preventDefault();
    if (this.state.className === 'pillbox') {
      this.removeFromFolder(folderButton);
    } else {
      this.addToFolder(folderButton);
    }
  }
 
  addToFolder() {
    this.props.lib.user.folders.folder.post(this.props.folder, this.props.feed).then(() => {
      this.setState({ className: 'pillbox' });
    }).catch(console.error);
  }

  removeFromFolder() {
    this.props.lib.user.folders.folder.del(this.props.folder, this.props.feed).then(() => {
      this.setState({ className: 'pillbox empty' });
    }).catch(console.error);
  }

  render() {
    return <input type="submit"
      className={this.state.className}
      value={this.props.folder}
      onClick={this.onClick}
    />;
  }
}
