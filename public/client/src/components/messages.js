import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

export default class Messages extends Component {
  render() {
    return(
      <Modal show={this.props.visible} onHide={this.props.dismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with somebody</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Messages go here</h5>
          <form onSubmit={this.props.sendMessage}>
            <textarea onChange={this.props.typeMessage} />
            <button className="btn btn-primary">Send</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
