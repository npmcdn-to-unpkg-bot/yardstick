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
      messaging: {
        messageVisible: false,
        toSend: '',
        sentMessages: [],
        recMessages: []
      },
      reservations: [],
      myExperiences: []
    }
    // this.confirmRes = this.confirmRes.bind(this);
    // this.sendMessage = this.sendMessage.bind(this);
    // this.typeMessage = this.typeMessage.bind(this);
    // this.dismiss = this.dismiss.bind(this);
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
              <span onClick={() => this.setState({ ...this.state, messaging: { ...this.state.messaging, messageVisible: true }})}>Message</span>
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
          visible={this.state.messaging.messageVisible}
          sendMessage={this.sendMessage}
          typeMessage={this.typeMessage}
          dismiss={this.dismiss}
        />
        <div className="row">
        <div className="col-md-6">
          <h3>My Reservations</h3>
          <span>These are the experiences that you have reserved.</span>
          {reservations}
        </div>
        <div className="col-md-6">
          <h3>My Listings</h3>
          <span>These are the experiences that you have listed</span>
          {myListings}
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