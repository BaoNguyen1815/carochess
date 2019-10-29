import React, { Component } from 'react'

export default class TurnButton extends Component {

  render() {
    return (
      <div>
        <button disabled={this.props.turn}>PLAYER 1</button>
        <button disabled={!this.props.turn}>PLAYER 2</button>
      </div>
    );
  }
}
