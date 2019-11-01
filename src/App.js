import React, { Component } from "react";
import Board from "./Component/Board";
import LeftMenu from "./Component/LeftMenu";
import RightMenu from "./Component/RightMenu";

export default class App extends Component {
  state = {
    squares: [],
    col: 15,
    row: 15,
    player1Turn: true,
    history: [],
    checkHistory: false,
    historyRedo: [],
    checkHistoryUndo: false
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

  render() {
    console.log(this.state.historyRedo);
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
          historyRedo={this.state.historyRedo}
          handleRedo={this.handleRedo}
          handleUndo={this.handleUndo}
          onClick={this.handeleRestart}
        ></RightMenu>
      </div>
    );
  }
}
