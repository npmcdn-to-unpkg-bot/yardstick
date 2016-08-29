import React, { Component } from 'react';

class Alert extends Component {
  render() {


    let alertClass;

    switch(this.props.type) {
      case 'success':
        alertClass='alert alert-success';
        break;
      case 'warning':
        alertClass='alert alert-danger';
        break;
      case 'error':
        alertClass='alert alert-danger';
        break;
      default:
        break;
    }

    return(
      <div className={alertClass} style={{ display: this.props.visible ? 'block' : 'none' }}>
        <span onClick={this.props.closeAlert}>X</span>
        <h5>{this.props.title}</h5>
        <p>{this.props.message}</p>
      </div>
      );
  }
}

export default Alert;
