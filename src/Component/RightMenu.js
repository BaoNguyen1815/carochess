import React, { Component } from "react";

export default class RightMenu extends Component {
  render() {
    return (
      <div className="right-menu">
        <button className="btn" onClick={this.props.onClick}>
          Restart
        </button>
        <button
          className="btn"
          onClick={this.props.handleUndo}
          disabled={this.props.checkHistory}
        >
          Undo
        </button>
        <button
          onClick={this.props.handleRedo}
          disabled={this.props.checkHistoryRedo}
          className="btn"
        >
          Redo
        </button>
      </div>
    );
  }
}
