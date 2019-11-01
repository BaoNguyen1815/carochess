import React, { Component } from "react";
import "../style/squares.css";

export default class Square extends Component {
  _handleClick = () => {
    let value = "X";
    let className = "square square1";
    if (this.props.turn) {
      value = "X";
      className = "square square1";
    } else {
      value = "O";
      className = "square square2";
    }
    const square = {
      value: value,
      row: this.props.row,
      col: this.props.col,
      disable: true,
      activeClass: className
    };
    this.props.onClick(square);
  };

  render() {
    const squares = this.props.squares;
    const value = squares[this.props.row][this.props.col].value;
    const className = squares[this.props.row][this.props.col].activeClass;
    const disable = squares[this.props.row][this.props.col].disable;

    return (
      <div>
        <button
          onClick={this._handleClick}
          className={className}
          disabled={disable}
        >
          {value}
        </button>
      </div>
    );
  }
}
