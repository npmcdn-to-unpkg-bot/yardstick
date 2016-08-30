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
      hosting: []
    }

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
        console.log('hesdafdf: ', data)
        let expArray = [];
        data.forEach((res) => {
          let exp = firebase.database().ref('experiences/' + res.experience);
          exp.once('value', function(val) {
            let fullExp = val.val();
            Object.assign(res, fullExp);
            expArray.push(res);
          });;
        });
        console.log(expArray)
        this.setState({
          reservations: expArray
        });
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
    let reservations,
      hosting,
      myListings;

      if(this.state.reservations) {
        reservations = this.state.reservations.map((res) => {
          console.log('res: ', res);
          return (
            <div>
              <h5></h5>
            </div>
        )
        })
      } else {
        reservations = <div>Loading reservations...</div>
      }

      if(this.state.hosting) {
        hosting = this.state.hosting.map((host) => {
          console.log('host: ', host);
          return <div>hosting</div>
        })
      } else {
        hosting = <div>Loading hosted experiences...</div>
      }

      if(this.state.myExperiences) {
        myListings = this.state.myExperiences.map((list) => {
          console.log('my listing: ', list)
          return <div>my listing</div>
        })
      } else {
        myListings = <div>Loading my listings...</div>
      }
    return(
      <div>
        <div>
          {reservations}
        </div>

        <div>
          {hosting}
        </div>

        <div>
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
