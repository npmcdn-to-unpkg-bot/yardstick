import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Messages from '../components/messages';
import config from '../config';
// import dog from '../dog';
var Rebase = require('re-base');


var base = Rebase.createClass(config);


class MyExperiences extends Component{
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      messaging: {
        messageVisible: false,
        chat: '',
        user: {},
        toSend: '',
        sentMessages: [],
        recMessages: []
      },
      reservations: [],
      myExperiences: []
    }

    this.confirmRes = this.confirmRes.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  componentDidMount() {
    let { params } = this.props;
    this.ref = base.syncState(`experiences`, {
      context: this,
      state: 'myExperiences',
      asArray: true,
      queries: {
        orderByChild: 'user',
        equalTo: params.userId
      }
    });

    this.ref2 = base.syncState(`reservations`, {
      context: this,
      state: 'reservations',
      asArray: true,
      queries: {
        orderByChild: 'reservedBy',
        equalTo: params.userId
      }
    });

  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
    base.removeBinding(this.ref2)
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
        message: message,
        time: Date.now()
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
        messageVisible: false,
        reservation: '',
        user: {}
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
              from: res.reservedBy,
              to: res.host
            }
          }
        });

      }
    })
    // this.setState({ messaging: { ...this.state.messaging, messageVisible: true }})
  }

  render() {
    console.log('my exp state', this.state)
    let reservations,
      myListings;

      if(this.state.reservations && this.state.reservations.length > 0) {
        reservations = this.state.reservations.map((res) => {
          console.log('mapping reservations...', res)
          return (
            <div>
              <h5>{res.title}</h5>
              <span>{res.selectedDate}</span>
              <p>{res.confirmed === true ? 'Reservation Confirmed!' : 'The host has not yet confirmed your reservation for this experience'}</p>
              <span onClick={this.openChat.bind(null, res)}>Message</span>
            </div>
        )
        })
      } else {
        reservations = <div>Loading reservations...</div>
      }

      if(this.state.myExperiences && this.state.myExperiences.length > 0) {
        myListings = this.state.myExperiences.map((list) => {
          return (<div>
                  <h5>{list.title}</h5>
                </div>)
        })
      } else {
        myListings = <div>Loading my listings...</div>
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
          <h3>My Reservations</h3>
          <span>These are the experiences that you have reserved.</span>
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

export default connect(mapStateToProps)(MyExperiences)
