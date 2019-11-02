import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  render() {
    const allBoard = this.props.squares.map((row, rIndex) => (
      <div className="row" key={`row-${rIndex}`}>
        {row.map((cell, cIndex) => (
          <div key={`row-${rIndex}-cell-${cIndex}`} className="col">
            <Square
              onClick={this.props.handleSquareClick}
              squares={this.props.squares}
              turn={this.props.turn}
              row={rIndex}
              col={cIndex}
            ></Square>
          </div>
        ))}
      </div>
    ));
    return <div className="board-container">{allBoard}</div>;
  }
}
