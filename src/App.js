import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";

class App extends Component {
  state = {
    player1Turn: true,
    squares: [],

  };

  handleRestart = () =>{
    this.setState({squares:[]})
  }

  handleChange = () => {
    this.setState({
      player1Turn: !this.state.player1Turn
    });
  };

  onSquareClick = (square) => {
   const history = this.state.squares;
   history.push(square);
   this.setState({squares:history})
   console.log(this.state.squares);
  }

  render() {
    return (
      <div className="App">
        <Board
          handleChange={this.handleChange}
          turn={this.state.player1Turn}
          onSquareClick={this.onSquareClick}
          squares = {this.state.squares}
          handleRestart = {this.handleRestart}
        ></Board>
      </div>
    );
  }
}

export default App;
