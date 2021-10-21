import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      liked: !this.state.liked,
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>
          {!this.state.liked ? (
            <i class='far fa-heart like-btn'></i>
          ) : (
            <i class='fas fa-heart like-btn'></i>
          )}
        </div>
      </div>
    );
  }
}

export default LikeButton;
