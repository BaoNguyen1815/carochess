import React, { Component } from "react";
import Board from "./Component/Board";
import LeftMenu from "./Component/LeftMenu";
import RightMenu from "./Component/RightMenu";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: this.getInitialSquares(),
      player1Turn: true
    };

    this.history = [JSON.parse(JSON.stringify(this.state))];
    this.currentStateIndex = 0;
    this.row = 15;
    this.col = 15;
  }

  handleSquareClick = square => {
    const changeTurn = !this.state.player1Turn;
    const squares = this.state.squares;
    squares[square.row][square.col].value = square.value;

    this.setState(
      {
        squares: squares,
        player1Turn: changeTurn
      },
      () => {
        if (this.currentStateIndex !== this.history.length - 1) {
          debugger;
          console.log("currentState:", this.currentStateIndex);
          console.log("historyLength:", this.history.length);
          this.history = this.history.slice(0, this.currentStateIndex + 1);
          console.log(this.history);
        }
        var nextState = JSON.parse(JSON.stringify(this.state));

        this.history.push(nextState);
        this.currentStateIndex = this.history.length - 1;
        debugger;
      }
    );
  };

  handleUndo = square => {
    if (this.history.length === 0 || this.currentStateIndex === 0) {
      return;
    }

    this.currentStateIndex = this.currentStateIndex - 1;
    console.log("currentState:", this.currentStateIndex);
    console.log("historyLength:", this.history.length);
    const nextState = this.history[this.currentStateIndex];
    debugger;
    this.setState(nextState);
  };

  handleRedo = square => {
    if (this.currentStateIndex === this.history.length - 1) {
      return;
    }
    this.currentStateIndex = this.currentStateIndex + 1;
    const nextState = this.history[this.currentStateIndex];
    this.setState(nextState);
  };

  handeleRestart = () => {
    this.setState(
      {
        squares: this.getInitialSquares()
      },
      () => {
        this.history = [];
        this.history = [JSON.parse(JSON.stringify(this.state))];
      }
    );
  };

  wincheck = () => {
    const squares = this.state.squares;
    for (let i = 2; i < 13; i++) {
      for (let j = 2; j < 13; j++) {
        if (
          (squares[i][j].value === squares[i + 1][j].value &&
            squares[i][j].value === squares[i + 2][j].value &&
            squares[i][j].value === squares[i - 1][j].value &&
            squares[i][j].value === squares[i - 2][j].value &&
            squares[i][j].value !== "") ||
          (squares[i][j].value === squares[i][j + 1].value &&
            squares[i][j].value === squares[i][j + 2].value &&
            squares[i][j].value === squares[i][j - 1].value &&
            squares[i][j].value === squares[i][j - 2].value &&
            squares[i][j].value !== "") ||
          (squares[i][j].value === squares[i + 1][j + 1].value &&
            squares[i][j].value === squares[i + 2][j + 2].value &&
            squares[i][j].value === squares[i - 1][j - 1].value &&
            squares[i][j].value === squares[i - 2][j - 2].value &&
            squares[i][j].value !== "") ||
          (squares[i][j].value === squares[i + 1][j - 1].value &&
            squares[i][j].value === squares[i + 2][j - 2].value &&
            squares[i][j].value === squares[i - 1][j + 1].value &&
            squares[i][j].value === squares[i - 2][j + 2].value &&
            squares[i][j].value !== "")
        ) {
          alert("Victory");
          break;
        }
      }
    }
  };

  getInitialSquares() {
    const squares = [];

    for (let i = 0; i < 15; i++) {
      squares.push([]);
      for (let j = 0; j < 15; j++) {
        const square = {
          value: null,
          row: i,
          col: j
        };
        squares[i].push(square);
      }
    }
    return squares;
  }

  render() {
    return (
      <div className="container">
        <h3>CARO CHESS</h3>
        <LeftMenu turn={this.state.player1Turn}></LeftMenu>
        <Board
          turn={this.state.player1Turn}
          squares={this.state.squares}
          handleSquareClick={this.handleSquareClick}
        ></Board>
        <RightMenu
          checkHistory={this.state.checkHistory}
          checkHistoryRedo={this.state.checkHistoryRedo}
          handleRedo={this.handleRedo}
          handleUndo={this.handleUndo}
          onClick={this.handeleRestart}
        ></RightMenu>
      </div>
    );
  }
}
