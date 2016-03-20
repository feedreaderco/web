import React from 'react';
import PillBox from '../styles/PillBox';
import PillBoxEmpty from './styles/PillBoxEmpty';

class FolderButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    const URIComponent = encodeURIComponent(this.props.folderName);
    this.state = {isSelected: this.props.isSelectedInitially};
    this.addFeed = this.addFeed.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
    this.folderURI = this.props.user + '/folders/' + URIComponent;
  }

  addFeed() {
    api('POST', this.folderURI, (response) => {
      if (response.success) this.setState({isSelected: true});
    }, 'xmlurl=' + this.props.feedURL);
  }

  removeFeed() {
    api('DELETE', this.folderURI, (response) => {
      if (response.success) this.setState({isSelected: false});
    }, 'xmlurl=' + this.props.feedURL);
  }

  render() {
    const style = () => {
      if (this.state.isSelected) return PillBox;
      else return PillBoxEmpty;
    };

    const onclick = () => {
      if (this.state.isSelected) removeFeed();
      else addFeed();
    };

    return (
      <input
        type='submit'
        style={style}
        value={this.props.folderName}
        onclick={onclick}
      />
    );
  }
}

export default FolderButton;
