import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  render() {
    const allBoard = this.props.squares.map((row, rIndex) => (
      <div className="row" key={`row-${rIndex}`}>
        {row.map((cell, cIndex) => (
          <div key={`row-${rIndex}-cell-${cIndex}`} className="col">
            <Square
            disable = {this.props.disable}
              onClick={this.props.handleSquareClick}
              square={cell}
              turn={this.props.turn}
            ></Square>
          </div>
        ))}
      </div>
    ));
    return <div className="board-container">{allBoard}</div>;
  }
}
