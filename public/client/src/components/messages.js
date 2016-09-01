import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

export default class Messages extends Component {
  render() {
    return(
      <Modal show={this.props.visible} onHide={this.props.dismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with {this.props.otherUser.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Messages go here</h5>
          <form onSubmit={this.props.typeMessage}>
            <textarea  />
            <button className="btn btn-primary">Send</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
