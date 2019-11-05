import React, { Component } from "react";

export default class LeftMenu extends Component {
   pad= (num, size)=> {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
  render() {

    return (
      <div className="left-menu">
        <button className="btn" disabled={!this.props.turn}>
          PLAYER 1 TURN
        </button>
        <h3>
          {this.pad(Math.floor(this.props.timeCounterP1 / 60),2)}:
          {this.pad((
            this.props.timeCounterP1 -
            Math.floor(this.props.timeCounterP1 / 60) * 60
          ),2)}
        </h3>
        <hr></hr>
        <button className="btn" disabled={this.props.turn}>
          {" "}
          PLAYER 2 TURN
        </button>
        <h3>
          {this.pad(parseFloat(Math.floor(this.props.timeCounterP2 / 60)),2)}:
          {this.pad((
            this.props.timeCounterP2 -
            (Math.floor(this.props.timeCounterP2 / 60) * 60)
          ),2)}
        </h3>
      </div>
    );
  }
}
