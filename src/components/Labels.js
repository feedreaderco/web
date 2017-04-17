import React, { Component } from 'react';
import api from '../api';
import Label from './Label';

export default class Labels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLabelValue: '',
      newLabelDisplay: 'none',
      addLabelButtonValue: 'Label',
    };
  }

  onClick(e) {
    e.preventDefault();
    if (this.state.newLabelButtonDisplay === 'none') {
      this.setState({
        newLabelDisplay: 'inline',
        addLabelButtonValue: 'Save',
      });
    } else {
      this.addLabel();
      this.setState({
        addLabelButtonValue: 'Label',
      });
    }
  }

  addLabel() {
    //    const newLabelLink = document.createElement('a');
    this.setState({ newLabelValue: '', newLabelDisplay: 'none' });
    api().user.labels.post(this.state.newLabelValue, this.props.articleID).then(() => {
      //      newLabelLink.className = 'pillbox';
    }).catch(console.error);
  }

  render() {
    const labelNames = Object.keys(this.props.labels).filter((name) => {
      return labels[name].indexOf(this.props.articleID) !== -1;
    });
    return (<div id={this.props.articleID} className="minor-margin-top">
      {labelNames.map(name => <Label user={this.props.user} label={name} />)}
      <input
        type="text"
        placeholder="Label Name"
        style={{ display: this.state.newLabelDisplay }}
        value={this.state.newLabelValue}
        className="pillbox"
      />
      <input
        className="pillbox"
        value={this.state.addLabelButtonValue}
        type="submit"
        onClick={this.onClick}
      />
    </div>);
  }
}
