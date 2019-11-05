import React, { Component } from "react";
import "../style/squares.css";

export default class Square extends Component {
  _handleClick = () => {
    const square = this.props.square;
    if (square.value !== null) return;
    if (this.props.turn) {
      square.value = "X";
    } else {
      square.value = "O";
    }
    this.props.onClick(square);
  };

  render() {
    const square = this.props.square;
    const value = square.value;
    let className = "square";
    if (value === "X") {
      className = "square square1";
    } else if (value === "O") {
      className = "square square2";
    }
    let disabled = false;
    if (this.props.disable) {
      disabled = true;
    }
    return (
      <div>
        <button
          onClick={this._handleClick}
          className={`${className} ${square.className}`}
          disabled={!!value || disabled}
        >
          {value}
        </button>
      </div>
    );
  }
}
