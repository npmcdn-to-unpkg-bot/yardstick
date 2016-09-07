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
          <div className="row">
            <div className="col-md-6">
              {this.props.recMessages.length ? this.props.recMessages.map((msg) => <span>{msg.message}</span>) : <div/>}
            </div>
            <div className="col-md-6">
              {this.props.sentMessages.length ? this.props.sentMessages.map((msg) => <span>{msg.message}</span>) : <div/>}
            </div>
          </div>
          <form onSubmit={this.props.sendMessage}>
            <textarea onChange={this.props.typeMessage} />
            <button className="btn btn-primary">Send</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
