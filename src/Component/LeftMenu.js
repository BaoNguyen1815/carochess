import React, { Component } from "react";

export default class LeftMenu extends Component {
  render() {
    return (
      <div className="left-menu">
        <button className="btn" disabled={!this.props.turn}>
          PLAYER 1 TURN
        </button>
        <button className="btn" disabled={this.props.turn}>
          {" "}
          PLAYER 2 TURN
        </button>
      </div>
    );
  }
}
