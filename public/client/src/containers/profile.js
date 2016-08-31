import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Conversation from '../components/messages/conversation';
var Rebase = require('re-base');

var config = {
  apiKey: "AIzaSyAthBCq_uopCnlQn27DbBmQrHQVEJVfKRo",
  authDomain: "outdoors-1380.firebaseapp.com",
  databaseURL: "https://outdoors-1380.firebaseio.com",
  storageBucket: "outdoors-1380.appspot.com",
};

var base = Rebase.createClass(config);

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      myExperiences: [],
      reservations: [],
      hosting: [],
      pendingReservations: []
    }
    this.confirmRes = this.confirmRes.bind(this);
  }
  componentDidMount() {
    let { params } = this.props;
    base.syncState(`experiences`, {
      context: this,
      state: 'myExperiences',
      asArray: true,
      queries: {
        orderByChild: 'user',
        equalTo: params.userId
      }
    });

    base.fetch(`reservations`, {
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
            Object.assign(res, fullExp);
            expArray.push(res);
          });;
        });
        this.setState({
          reservations: expArray
        });
      }
    });

    base.fetch(`reservations`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'host',
        equalTo: params.userId
      },
      then(data) {
        let expArray = [];
        data.forEach((res) => {
          let exp = firebase.database().ref('experiences/' + res.experience);
          exp.once('value', function(val) {
            let fullExp = val.val();
            Object.assign(res, fullExp);
            expArray.push(res);
          });;
        });
        this.setState({
          pendingReservations: expArray
        });
      }
    })

    base.bindToState(`experiences`, {
      context: this,
      state: 'hosting',
      asArray: true,
      queries: {
        orderByChild: 'host',
        equalTo: params.userId
      }
    });
  }


  confirmRes(exp) {
    let wat = {};
    Object.assign(wat, exp);
    wat.confirmed = true;
    console.log('wat: ', wat);
    base.update('reservations/' + exp.key, {
      data: { confirmed: true }
    });
  }

  render() {
    console.log('profile state', this.state)
    let reservations,
      pendingReservations,
      myListings;

      if(this.state.reservations) {
        reservations = this.state.reservations.map((res) => {
          return (
            <div>
              <h5>{res.title}</h5>
              <span>{res.selectedDate}</span>
              <p>{res.confirmed === true ? 'Reservation Confirmed!' : 'The host has not yet confirmed your reservation for this experience'}</p>
            </div>
        )
        })
      } else {
        reservations = <div>Loading reservations...</div>
      }

      if(this.state.pendingReservations) {
        pendingReservations = this.state.pendingReservations.map((host) => {
          return (<div>
              <h5>{host.title}</h5>
              <button className="btn btn-primary" onClick={() => this.confirmRes(host)}>Confirm!</button>
          </div>)
        })
      } else {
        pendingReservations = <div>Loading hosted experiences...</div>
      }

      if(this.state.myExperiences) {
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
        <div>
          <h3>My Reservations</h3>
          <span>These are the experiences that you have reserved.</span>
          {reservations}
        </div>

        <div>
          <h3>Pending Reservations</h3>
          <span>These are reservations of your experiences</span>
          {pendingReservations}
        </div>

        <div>
          <h3>My Listings</h3>
          <span>These are the experiences that you have listed</span>
          {myListings}
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
