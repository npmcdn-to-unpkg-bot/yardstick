import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Messages from '../components/messages';
import config from '../config';
// import dog from '../dog';
var Rebase = require('re-base');


var base = Rebase.createClass(config);

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      messaging: {
        messageVisible: false,
        toSend: '',
        sentMessages: [],
        recMessages: []
      },
      myExperiences: [],
      reservations: [],
      hosting: [],
      pendingReservations: [],
      confirmedReservations: []
    }
    this.confirmRes = this.confirmRes.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
    this.dismiss = this.dismiss.bind(this);
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

    this.ref2 = base.fetch(`reservations`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'reservedBy',
        equalTo: params.userId
      },
      then(data) {
        let expArray = [];
        data.forEach((res) => {
          let exp = firebase.database().ref('experiences/' + res.experience);
          exp.once('value', function(val) {
            let fullExp = val.val();
            res.experience = fullExp;
            expArray.push(res);
          });;
        });
        this.setState({
          reservations: expArray
        });
      }
    });

    this.ref3 = base.fetch(`reservations`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'host',
        equalTo: params.userId
      },
      then(data) {
        let confirmedArray = [];
        let unconfirmed = [];
        data.forEach((res) => {
          let exp = firebase.database().ref('experiences/' + res.experience);
          exp.once('value', function(val) {
            let fullExp = val.val();
            res.experience = fullExp;
            if(res.confirmed === true) {
              confirmedArray.push(res)
            } else {
              unconfirmed.push(res)
            }
          });;
        });
        this.setState({
          pendingReservations: unconfirmed,
          confirmedReservations: confirmedArray
        });
      }
    })

    this.ref4 = base.bindToState(`experiences`, {
      context: this,
      state: 'hosting',
      asArray: true,
      queries: {
        orderByChild: 'host',
        equalTo: params.userId
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
    base.removeBinding(this.ref2)
    base.removeBinding(this.ref3)
    base.removeBinding(this.ref4)
  }

  confirmRes(exp) {
    console.log('turnt: ', exp)
    let wat = {};
    Object.assign(wat, exp);
    wat.confirmed = true;
    base.update('reservations/' + exp.key, {
      data: { confirmed: true }
    });
  }

  sendMessage() {

  }

  typeMessage(e) {
    console.log(e.target.value)

    this.setState({
      messaging: {

      }
    })

  }

  dismiss() {
    this.setState({
      ...this.state,
      messaging: {
        messageVisible: false,
        sentMessages: [],
        recMessages: []
      }
    });
  }

  render() {
    console.log('profile state', this.state)
    let reservations,
      pendingReservations,
      confirmedRes,
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

      if(this.state.pendingReservations && this.state.pendingReservations.length > 0) {
        pendingReservations = this.state.pendingReservations.map((host) => {
          return (<div>
              <h5>{host.experience.title}</h5>
              <button className="btn btn-primary" onClick={() => this.confirmRes(host)}>Confirm!</button>
          </div>)
        })
      } else {
        pendingReservations = <div>Loading hosted experiences...</div>
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

      if(this.state.confirmedReservations && this.state.confirmedReservations.length > 0) {
        confirmedRes = this.state.confirmedReservations.map((res) => {
          return (
            <div>
              <h5>{res.title}</h5>
            </div>
          )
        })
      } else {
        confirmedRes = <div> Loading confirmed reservations... </div>
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
          <h3>Pending Reservations</h3>
          <span>These are reservations of your experiences</span>
          {pendingReservations}
        </div>

        <div className="col-md-6">
          <h3>Confirmed Reservations</h3>
          <span>These are confirmed experiences that you are hosting.</span>
          {confirmedRes}
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
    user: state.auth.user,
    experiences: state.auth.userExp,
    listings: state.auth.userListings,
    conversation: state.messages.conversation
  }
}

export default connect(mapStateToProps)(Profile)
