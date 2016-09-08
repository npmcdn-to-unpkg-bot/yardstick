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
    // if(props.messages && props.messages.length > 0) {
    //   let sentMessages = [];
    //   let recMessages = [];
    //   props.messages.forEach((msg) => {
    //     console.log('AHAHAAHHAHA: ', msg)
    //     if(msg.from === props.user) {
    //       sentMessages.push(msg)
    //     } else {
    //       recMessages.push(msg)
    //     }
    //   });
    //   this.setState({
    //     sentMessages: sentMessages,
    //     recMessages: recMessages
    //   });
    // }
  }

  render() {
    console.log('the message props n stuff: ', this.state)
    let messages;
    if(this.props.messages && this.props.messages.length > 0) {
      let newArray = [ ...this.props.messages ];
      newArray.sort((a, b) => {
        if(a.time > b.time) {
          return 1;
        }
        if(a.time < b.time) {
          return -1;
        }
        return 0;
      })
      messages = newArray.map((msg, i) => {
        if(msg.from === this.props.user) {
          return <div key={i} className="msgFrom"><p>{msg.message}</p></div>
        } else {
          return <div key={i} className="msgTo"><p>{msg.message}</p></div>
        }
      })
    } else {
      messages = <div>no messages </div>
    }

    return(
      <Modal show={this.props.visible} onHide={this.props.dismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with somebody</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {messages}
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
