import React, { Component } from "react";
import "../style/squares.css";
export default class Square extends Component {
  state = {
    value: ""
  };

  _onClick = () => {
    if (this.props.turn) {
      this.setState({ value: 1 });
    } else {
      this.setState({ value: 0 });
    }
    this.props.handleChange();
  };
  render() {
    return (
      <div>
        <button className="square" onClick={this._onClick}>
          {this.state.value}
        </button>
      </div>
    );
  }
}
