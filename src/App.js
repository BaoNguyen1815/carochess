import React, { Component } from "react";
import Board from "./Component/Board";
import LeftMenu from "./Component/LeftMenu";
import RightMenu from "./Component/RightMenu";

export default class App extends Component {
  state = {
    squares: [],
    col: 15,
    row: 15,
    history: [],
    checkHistory: true,
    historyRedo: [],
    checkHistoryRedo: true,
    player1Turn: true
  };

  handleSquareClick = square => {
    const changeTurn = !this.state.player1Turn;
    const squares = this.state.squares;
    const history = this.state.history;
    squares[square.row][square.col] = square;
    history.push(square);
    this.setState({
      squares: squares,
      player1Turn: changeTurn,
      history: history
    });
  };

  handleUndo = square => {
    const changeTurn = !this.state.player1Turn;
    const squares = this.state.squares;
    const lastMove = this.state.history.pop();
    this.state.historyRedo.push(lastMove);
    squares[lastMove.row][lastMove.col] = {
      value: "",
      row: this.row,
      col: this.col,
      disable: false,
      activeClass: "square"
    };

    this.setState({
      squares: squares,
      player1Turn: changeTurn
    });
  };

  handleRedo = square => {
    const changeTurn = !this.state.player1Turn;
    const squares = this.state.squares;
    const lastMove = this.state.historyRedo.pop();
    this.state.history.push(lastMove);
    squares[lastMove.row][lastMove.col] = {
      value: lastMove.value,
      row: this.row,
      col: this.col,
      disable: true,
      activeClass: lastMove.activeClass
    };

    this.setState({
      squares: squares,
      player1Turn: changeTurn
    });
  };

  handeleRestart = () => {
    const squares = [];

    for (let i = 0; i < 15; i++) {
      squares.push([]);
      for (let j = 0; j < 15; j++) {
        const square = {
          value: "",
          row: j,
          col: i,
          disable: false,
          activeClass: "square"
        };
        squares[i].push(square);
      }
    }
    this.setState({ squares: squares });
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

  componentDidMount() {
    const squares = this.state.squares;

    for (let i = 0; i < 15; i++) {
      squares.push([]);
      for (let j = 0; j < 15; j++) {
        const square = {
          value: "",
          row: j,
          col: i,
          disable: false,
          activeClass: "square"
        };
        squares[i].push(square);
      }
    }
    this.setState({ squares: squares });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.player1Turn !== prevState.player1Turn) {
      this.wincheck();
      if (this.state.history.length > 0) {
        this.setState({ checkHistory: false });
      }
      if (this.state.history.length === 0) {
        this.setState({ checkHistory: true });
      }
      if (this.state.historyRedo.length > 0) {
        this.setState({ checkHistoryRedo: false });
      }
      if (this.state.historyRedo.length === 0) {
        this.setState({ checkHistoryRedo: true });
      }
    }
  }

  render() {
    return (
      <div className="container">
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
