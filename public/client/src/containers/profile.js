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

  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
    base.removeBinding(this.ref2)
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
    


    return(
      <div>
        
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
