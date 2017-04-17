import React, { Component } from 'react';

export default class AddFolderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputDisplay: 'none',
      buttonValue: 'New Folder',
    };
  }

  onClick() {
    if (this.state.textInputDisplay === 'none') {
      this.setState({ textInputDisplay: 'inline', buttonValue: 'Save' });
    } else {
      addToNewFolder();
      this.setState({ buttonValue: 'New Folder' });
    }
    return false;
  }

  addToNewFolder(newFolder) {
    const newButton = createFolderButton(newFolder.value);
    newFolder.value = '';
    newFolder.parentElement.insertBefore(newButton, newFolder);
    newFolder.style.display = 'none';
    addToFolder(newButton);
  }

  render() {
    return (
      <div>
        <input type="text"
          placeholder="Folder Name"
          display={this.state.textInputDisplay}
          className="pillbox"
        />
        <input type="submit"
          className="pillbox"
          value={this.state.buttonValue}
          onClick={this.onClick}
        />
      </div>
    );
  }
}
