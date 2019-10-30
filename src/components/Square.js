import React, { Component } from "react";
import "../style/squares.css";
export default class Square extends Component {
  state = {
    value: null,
    disable: false,
    activeClass: "square"
  };

  _onClick = () => {
    if (this.props.turn) {
      const square = {
        value: 1,
        disable: true,
        row: this.props.row,
        col: this.props.col,
        activeClass: "square square1"
      };
      this.props.onSquareClick(square);

      this.setState({ value: square.value });
      this.setState({ disable: square.disable });
      this.setState({ activeClass: square.activeClass });
    } else {
      const square = {
        value: 0,
        disable: true,
        row: this.props.row,
        col: this.props.col,
        activeClass: "square square2"
      };
      this.props.onSquareClick(square);
      this.setState({ value: square.value });
      this.setState({ disable: square.disable });
      this.setState({ activeClass: square.activeClass });
    }

    this.props.handleChange();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.squares !== this.props.squares) {
      this.setState({ value: null });
      this.setState({ disable: false });
      this.setState({ activeClass: "square" });
    }
  }
  render() {
    return (
      <div>
        <button
          disabled={this.state.disable}
          className={this.state.activeClass}
          onClick={this._onClick}
        >
          {this.state.value}
        </button>
      </div>
    );
  }
}
