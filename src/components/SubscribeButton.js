import React from 'react';
import api from '../api';
import buttonStyle from '../styles/button';

const token = localStorage.token;
const user = localStorage.user;
const lib = api(user, token);

class SubscribeButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {isSelected: this.props.isSelectedInitially};
    this.addFeed = this.addFeed.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
  }

  addFeed(timeout=1000) {
    Promise.all(this.props.folderNames.map((folder) => {
      return lib.user.folders.post(folder, this.props.feedURL);
    })).then(() => {
      this.setState({isSelected: true});
    }).catch((e) => {
      console.error('Could not subscribe to feed, trying again:', e);
      window.setTimeout(() => this.addFeed(timeout*2), timeout);
    });
  }

  removeFeed(timeout=1000) {
    Promise.all(this.props.folderNames.map((folder) => {
      return lib.user.folders.del(folder, this.props.feedURL);
    })).then(() => {
      this.setState({isSelected: false});
    }).catch((e) => {
      console.error('Could not unsubscribe from feed, trying again:', e);
      window.setTimeout(() => this.removeFeed(timeout*2), timeout);
    });
  }

  render() {
    const onclick = (e) => {
      e.target.blur();
      if (this.state.isSelected) this.removeFeed();
      else this.addFeed();
    };

    const value = () => {
      if (this.state.isSelected) return "Unsubscribe";
      else return "Subscribe";
    };

    return (
      <input
        type='button'
        style={buttonStyle(this.state.isSelected)}
        value={value()}
        onClick={onclick}
      />
    );
  }
}

export default SubscribeButton;
