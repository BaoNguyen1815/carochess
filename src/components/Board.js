import React, { Component } from "react";
import Square from "./Square";
import TurnButton from "./TurnButton";
// import Square from './Square';

export default class Board extends Component {
  state = {
    rowNumber: 15,
    colNumber: 15,
    board: []
  };

  makeBoard = () => {
    const row = [];
    const col = [];
    for (let i = 0; i < this.state.rowNumber; i++) {
      col.push(i);
    }
    for (let j = 0; j < this.state.colNumber; j++) {
      row.push(col);
    }
    this.setState({ board: row });
  };

  render() {
    const allBoard = this.state.board.map((row, rIndex) => (
      <div className="board-row" key={`row-${rIndex}`}>
        {row.map((cell, cIndex) => (
          <div key={`row-${rIndex}-cell-${cIndex}`} className="col">
            <Square
              handleChange={this.props.handleChange}
              turn={this.props.turn}
              row={rIndex}
              col={cIndex}
            ></Square>
          </div>
        ))}
      </div>
    ));
    return (
      <div>
        <button onClick={this.makeBoard}>START</button>
        <TurnButton turn={this.props.turn}></TurnButton>
        <div className="container main_content">{allBoard}</div>
        <button>Restart</button>
        <button>Undo</button>
      </div>
    );
  }
}
