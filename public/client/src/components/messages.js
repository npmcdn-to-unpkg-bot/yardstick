import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentMessages: [],
      recMessages: []
    }
  }

  componentWillReceiveProps(props) {
    console.log('dem props: ', props)
    if(props.messages && props.messages.length > 0) {
      let sentMessages = [];
      let recMessages = [];
      props.messages.forEach((msg) => {
        if(msg.from === props.user) {
          sentMessages.push(msg)
        } else {
          recMessages.push(msg)
        }
      });
      this.setState({
        sentMessages: sentMessages,
        recMessages: recMessages
      });
    }
  }
  
  render() {
    
    
    return(
      <Modal show={this.props.visible} onHide={this.props.dismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with somebody</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              {this.state.recMessages.length ? this.state.recMessages.map((msg) => <div>{msg.message}</div>) : <div/>}
            </div>
            <div className="col-md-6">
              {this.state.sentMessages.length ? this.state.sentMessages.map((msg) => <div>{msg.message}</div>) : <div/>}
            </div>
          </div>
          <form onSubmit={this.props.sendMessage}>
            <textarea onChange={this.props.typeMessage} id="messageArea"/>
            <button className="btn btn-primary">Send</button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
