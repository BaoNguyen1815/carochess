import React, { Component } from "react";
import Board from "./Component/Board";
import LeftMenu from "./Component/LeftMenu";
import RightMenu from "./Component/RightMenu";
export default class App extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     squares: this.getInitialSquares(),
                     player1Turn: true,
                     winningNoti: null
                   };

                   this.history = [JSON.parse(JSON.stringify(this.state))];
                   this.currentStateIndex = 0;
                   this.row = 15;
                   this.col = 15;
                   this.timeCounterP1 = 0;
                   this.timeCounterP2 = 0;

                   // this.handleTimeCount = this.handleTimeCount.bind(this)
                 }


                 handleTimeCount = () => {
                   this.clockInterval = setInterval(() => {
                     // const timeCounterP1 = this.timeCounterP1;
                     // const timeCounterP2 = this.timeCounterP2;
                     if (this.state.player1Turn === true) {
                       this.timeCounterP1 += 1;
                     } else if (this.state.player1Turn === false) {
                       this.timeCounterP2 += 1;
                     }
                     this.forceUpdate();
                   }, 1000);
                 };

                 clearClockInterval = () => {
                   clearInterval(this.clockInterval);
                 };

                 handleSquareClick = square => {
                   const changeTurn = !this.state.player1Turn;
                   const squares = this.state.squares;
                   squares[square.row][square.col].value = square.value;

                   this.clearClockInterval();
                   this.setState(
                     {
                       squares: squares,
                       player1Turn: changeTurn
                     },
                     () => {
                       if (this.currentStateIndex !== this.history.length - 1) {
                         debugger;
                         this.history = this.history.slice(
                           0,
                           this.currentStateIndex + 1
                         );
                         console.log(this.history);
                       }
                       var nextState = JSON.parse(JSON.stringify(this.state));

                       this.history.push(nextState);
                       this.currentStateIndex = this.history.length - 1;
                       this.wincheck();
                       this.handleTimeCount();
                       console.log("1");
                     }
                   );
                 };

                 handleUndo = square => {
                   if (
                     this.history.length === 0 ||
                     this.currentStateIndex === 0
                   ) {
                     return;
                   }

                   this.currentStateIndex = this.currentStateIndex - 1;
                   console.log("currentState:", this.currentStateIndex);
                   console.log("historyLength:", this.history.length);
                   const nextState = this.history[this.currentStateIndex];
                   this.setState(JSON.parse(JSON.stringify(nextState)));
                 };

                 handleRedo = square => {
                   if (this.currentStateIndex === this.history.length - 1) {
                     return;
                   }

                   this.currentStateIndex = this.currentStateIndex + 1;
                   const nextState = this.history[this.currentStateIndex];
                   this.setState(JSON.parse(JSON.stringify(nextState)));
                 };

                 handeleRestart = () => {
                   this.setState(
                     {
                       squares: this.getInitialSquares(),
                       winningNoti: ""
                     },
                     () => {
                       this.timeCounterP1 = 0;
                       this.timeCounterP2 = 0;
                       this.history = [];
                       this.history = [JSON.parse(JSON.stringify(this.state))];
                       this.clearClockInterval();
                       this.forceUpdate();
                     }
                   );
                 };

                 wincheck = () => {
                   const squares = this.state.squares;
                   for (let i = 0; i < this.row; i++) {
                     for (let j = 0; j < this.col; j++) {
                       if (
                         squares[i][j - 2] &&
                         squares[i][j + 2] &&
                         squares[i][j].value === squares[i][j + 1].value &&
                         squares[i][j].value === squares[i][j + 2].value &&
                         squares[i][j].value === squares[i][j - 1].value &&
                         squares[i][j].value === squares[i][j - 2].value &&
                         squares[i][j].value !== null
                       ) {
                         squares[i][j].className = "winningSquare";
                         squares[i][j + 1].className = "winningSquare";
                         squares[i][j + 2].className = "winningSquare";
                         squares[i][j - 1].className = "winningSquare";
                         squares[i][j - 2].className = "winningSquare";

                         this.setState({
                           winningNoti: "VICTORY",
                           player1Turn: "null"
                         });

                         break;
                       }
                       // col check
                       if (
                         squares[i + 2] &&
                         squares[i - 2] &&
                         squares[i][j].value === squares[i + 1][j].value &&
                         squares[i][j].value === squares[i + 2][j].value &&
                         squares[i][j].value === squares[i - 1][j].value &&
                         squares[i][j].value === squares[i - 2][j].value &&
                         squares[i][j].value !== null
                       ) {
                         squares[i][j].className = "winningSquare";
                         squares[i + 1][j].className = "winningSquare";
                         squares[i + 2][j].className = "winningSquare";
                         squares[i - 1][j].className = "winningSquare";
                         squares[i - 2][j].className = "winningSquare";
                         this.clearClockInterval();
                         this.setState({
                           winningNoti: "VICTORY",
                           player1Turn: "null"
                         });
                         break;
                       }
                       //cross/
                       if (
                         squares[i + 2] &&
                         squares[i - 2] &&
                         squares[i][j - 2] &&
                         squares[i][j + 2] &&
                         squares[i][j].value === squares[i + 1][j + 1].value &&
                         squares[i][j].value === squares[i + 2][j + 2].value &&
                         squares[i][j].value === squares[i - 1][j - 1].value &&
                         squares[i][j].value === squares[i - 2][j - 2].value &&
                         squares[i][j].value !== null
                       ) {
                         squares[i][j].className = "winningSquare";
                         squares[i + 1][j + 1].className = "winningSquare";
                         squares[i + 2][j + 2].className = "winningSquare";
                         squares[i - 1][j - 1].className = "winningSquare";
                         squares[i - 2][j - 2].className = "winningSquare";
                         this.clearClockInterval();
                         this.setState({
                           winningNoti: "VICTORY",
                           player1Turn: "null"
                         });
                         break;
                       }
                       //cross\
                       else if (
                         squares[i + 2] &&
                         squares[i - 2] &&
                         squares[i][j - 2] &&
                         squares[i][j + 2] &&
                         squares[i][j].value === squares[i + 1][j - 1].value &&
                         squares[i][j].value === squares[i + 2][j - 2].value &&
                         squares[i][j].value === squares[i - 1][j + 1].value &&
                         squares[i][j].value === squares[i - 2][j + 2].value &&
                         squares[i][j].value !== null
                       ) {
                         squares[i][j].className = "winningSquare";
                         squares[i + 1][j - 1].className = "winningSquare";
                         squares[i + 2][j - 2].className = "winningSquare";
                         squares[i - 1][j + 1].className = "winningSquare";
                         squares[i - 2][j + 2].className = "winningSquare";
                         this.clearClockInterval();
                         this.setState({
                           winningNoti: "VICTORY",
                           player1Turn: "null"
                         });
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
                         col: j,
                         className: ""
                       };
                       squares[i].push(square);
                     }
                   }
                   return squares;
                 }

                 render() {
                   return (
                     <div className="container">
                       <h1>CARO CHESS</h1>
                       <h2>{this.state.winningNoti}</h2>

                       <LeftMenu
                         turn={this.state.player1Turn}
                         timeCounterP1={this.timeCounterP1}
                         timeCounterP2={this.timeCounterP2}
                       ></LeftMenu>

                       <Board
                         disable={this.state.winningNoti}
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
