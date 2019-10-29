import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";

class App extends Component {
  state = {
    player1Turn: true
  };
  handleChange=()=> {
    this.setState({
      player1Turn: !this.state.player1Turn
    });
  }

  render() {
    return (
      <div className="App">
        <Board handleChange={this.handleChange} turn={this.state.player1Turn}></Board>
      </div>
    );
  }
}

export default App;
