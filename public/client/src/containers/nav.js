import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Nav extends Component {
  render() {
    return(

      <div>
        <h3>Nav Go Here</h3>
        {this.props.children}
      </div>
    )
  }
}
