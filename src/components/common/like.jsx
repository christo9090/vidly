import React, { Component } from 'react';

class Like extends Component {
  liked() {
    return this.props.movie.liked ? 'fa fa-heart' : 'fa fa-heart-o';
  }

  render() {
    return (
      <i
        className={this.liked()}
        onClick={this.props.onClick}
        style={{ cursor: 'pointer' }}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
