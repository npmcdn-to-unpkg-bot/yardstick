import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Messages from '../components/messages';
import config from '../config';
// import dog from '../dog';
var Rebase = require('re-base');


var base = Rebase.createClass(config);

class Hosted extends Component{
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      messaging: {
        messageVisible: false,
        chat: '',
        toSend: '',
        user: {}
      },
      hosting: [],
      reservations: []
    }
    this.confirmRes = this.confirmRes.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  componentDidMount() {
    let { params } = this.props;
    this.ref3 = base.syncState(`reservations`, {
      context: this,
      state: 'reservations',
      asArray: true,
      queries: {
        orderByChild: 'host',
        equalTo: params.userId
      }
    })

    this.ref4 = base.syncState(`experiences`, {
      context: this,
      state: 'hosting',
      asArray: true,
      queries: {
        orderByChild: 'user',
        equalTo: params.userId
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref3)
    base.removeBinding(this.ref4)
  }

  sendMessage(e) {
    e.preventDefault();
    let message = this.state.messaging.toSend;
    if(this.state.messaging.toSend.length === 0) {
      return;
    } else {
      let user = this.state.messaging.user.to;
      let { params } = this.props;
      let data = {
        to: user,
        from: params.userId,
        message: message
      }
      this.setState({
        messages: this.state.messages.concat([data]),
        messaging: {
          ...this.state.messaging,
          toSend: ''
        }
      });
    }
    document.getElementById('messageArea').value = '';
  }

  confirmRes(exp) {
    base.update('reservations/' + exp.key, {
      data: { confirmed: true }
    });
  }

  dismiss() {
    this.setState({
      ...this.state,
      messaging: {
        toSend: '',
        user: {},
        messageVisible: false,
        sentMessages: [],
        recMessages: [],
        reservation: ''
      }
    });
    base.removeBinding(this.messageRef);
  }

  typeMessage(e) {
    this.setState({
      messaging: {
        ...this.state.messaging,
        toSend: e.target.value
      }
    });
  }

  openChat(res) {
    console.log('res: ', res)
    let { params } = this.props;
    let recMessages = [];
    let sentMessages = [];

    this.messageRef = base.syncState('messages/' + res.chat, {
      context: this,
      state: 'messages',
      asArray: true,
      then() {
        this.setState({
          messaging: {
            messageVisible: true,
            chat: res.chat,
            toSend: '',
            user: {
              to: res.reservedBy,
              from: res.host
            }
          }
        });

      }
    })
    // this.setState({ messaging: { ...this.state.messaging, messageVisible: true }})
  }

  render() {
    console.log('hosting state: ', this.state)
    let hosting,
      reservations;

    if(this.state.hosting && this.state.hosting.length > 0) {
      hosting = this.state.hosting.map((host) => {
        return(
          <div>
            <h5>{host.title}</h5>
            <span>{host.city}, {host.state}</span>
            {host.images ? host.images.map((img) => <img style={{ maxWidth: '25%', display: 'block'}} src={img.url} />) : <div>No images</div>}
            <hr />
          </div>
        )
      })
    } else {
      hosting = <div>No experiences found.</div>
    }

    if(this.state.reservations && this.state.reservations.length > 0) {
      reservations = this.state.reservations.map((res) => {
        return(
          <div>
            <h5>{res.experienceTitle ? res.experienceTitle : 'no title available'}</h5>
            <span>{res.selectedDate}</span>
            <span>Reserved By: {res.reservedBy}</span>
            <span>Status: {res.confirmed ? 'Confirmed!' : 'Not confirmed yet. Confirm this reservation to officially schedule it.'}</span>
            <button style={{ display: res.confirmed ? 'none' : 'inline-block' }} onClick={this.confirmRes.bind(null, res)}>Confirm</button>
            <span onClick={this.openChat.bind(null, res)}>Message</span>
            <hr />
          </div>
        )
      })
    }

    return(
      <div>
        <Messages
          messages={this.state.messages}
          visible={this.state.messaging.messageVisible}
          sendMessage={this.sendMessage}
          typeMessage={this.typeMessage}
          user={this.props.params.userId}
          dismiss={this.dismiss}
        />
        <div className="row">
          <div className="col-md-6">
            {hosting}
          </div>
          <div className="col-md-6">
            {reservations}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Hosted)
