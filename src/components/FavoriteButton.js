import React from 'react';
import api from '../api';
import style from '../styles/favoriteButton';

const token = localStorage.token;
const user = localStorage.user;
const lib = api(user, token);

class FavoriteButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {isSelected: this.props.isSelectedInitially};
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
  }

  favorite(timeout=1000) {
    lib.user.labels.post('favorites', this.props.hash).then(() => {
      this.setState({isSelected: true});
    }).catch((e) => {
      console.error('Could not add article to favorites, trying again:', e);
      window.setTimeout(() => this.favorite(timeout*2), timeout);
    });
  }

  unfavorite(timeout=1000) {
    lib.user.labels.del('favorites', this.props.hash).then(() => {
      this.setState({isSelected: false});
    }).catch((e) => {
      console.error('Could not remove article from favorites, trying again:', e);
      window.setTimeout(() => this.unfavorite(timeout*2), timeout);
    });
  }

  render() {
    const onclick = (e) => {
      e.target.blur();
      if (this.state.isSelected) this.unfavorite();
      else this.favorite();
    };

    let src = '/favorite.png'
    if (this.state.isSelected) {
      src = '/unfavorite.png';
    }

    return (
      <div
        style={style(src)}
        onClick={onclick}
      />
    );
  }
}

export default FavoriteButton;
