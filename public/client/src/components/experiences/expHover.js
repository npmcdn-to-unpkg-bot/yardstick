import React, { Component } from 'react';

export default class HoverExp extends Component {
  render() {
    return (
      <div id="hover" style={{ display: this.props.visible ? "block" : "none" }} onMouseLeave={this.props.dismiss}>Hello There</div>

    )
  }
}
