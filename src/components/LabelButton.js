import React from 'react';
import api from '../api';
import style from '../styles/labelButton';

const token = localStorage.token;
const user = localStorage.user;
const lib = api(user, token);

class LabelButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {isSelected: this.props.isSelectedInitially};
    this.addLabel = this.addLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
  }

  addLabel(timeout=1000) {
    lib.user.labels.post(this.props.label, this.props.hash).then(() => {
      this.setState({isSelected: true});
    }).catch((e) => {
      console.error(`Could not add article to ${this.props.label}, trying again:`, e);
      window.setTimeout(() => this.addLabel(timeout*2), timeout);
    });
  }

  removeLabel(timeout=1000) {
    lib.user.labels.del(this.props.label, this.props.hash).then(() => {
      this.setState({isSelected: false});
    }).catch((e) => {
      console.error(`Could not remove article from ${this.props.label}, trying again:`, e);
      window.setTimeout(() => this.removeLabel(timeout*2), timeout);
    });
  }

  render() {
    const onclick = (e) => {
      e.target.blur();
      if (this.state.isSelected) this.removeLabel();
      else this.addLabel();
    };

    let src = `/${this.props.label}-inactive.png`;
    if (this.state.isSelected) {
      src = `/${this.props.label}-active.png`;
    }

    return (
      <div
        style={style(src)}
        onClick={onclick}
      />
    );
  }
}

export default LabelButton;
