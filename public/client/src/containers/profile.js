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
    base.syncState(`reservations`, {
      context: this,
      state: 'reservations',
      asArray: true,
      queries: {
        orderByChild: 'reservedBy',
        equalTo: params.userId
      }
    });
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



  render() {
    console.log('cracker jacks: ', this.state)

    return(
      <div>
      profile

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
