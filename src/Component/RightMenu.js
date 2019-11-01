import React, { Component } from "react";

export default class RightMenu extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>Restart</button>
        <button
          onClick={this.props.handleUndo}
          disabled={this.props.checkHistory}
        >
          Undo
        </button>
        <button onClick={this.props.handleRedo}>Redo</button>
      </div>
    );
  }
}
