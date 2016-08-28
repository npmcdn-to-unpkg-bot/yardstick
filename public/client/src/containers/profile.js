import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Conversation from '../components/messages/conversation';

class Profile extends Component {
  constructor(props){
    super(props);

    this.viewConversation = this.viewConversation.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }
  componentWillMount() {
    if ('serviceWorker' in navigator) {
     console.log('Service Worker is supported');
     navigator.serviceWorker.register('sw.js').then(function(reg) {
       console.log(':^)', reg);
       // TODO
     }).catch(function(err) {
       console.log(':^(', err);
     });
    }
    // let { dispatch, user } = this.props;
    // dispatch({
    //   type: 'GET_USER_EXP',
    //   user: user._id
    // });
    // dispatch({
    //   type: 'GET_USER_LISTINGS',
    //   user: user._id
    // })
    // dispatch({
    //   type: 'GET_USER_MESSAGES',
    //   user: user._id
    // })
  }

  viewConversation(msg) {
    let { dispatch } = this.props;
    dispatch({
      type: 'VIEW_CONVERSATION',
      payload: msg
    });
  }

  dismiss() {
    let { dispatch } = this.props;
    dispatch({
      type: 'VIEW_CONVERSATION',
      payload: {}
    })
  }

  typeMessage(e) {
    let { dispatch } = this.props;
    let msg = e.target.value;
    dispatch({
      type: 'TYPE_MESSAGE',
      payload: msg
    });
  }

  sendMessage(e) {
    e.preventDefault();
    let { dispatch, conversation, user } = this.props;
    dispatch({
      type: 'SEND_MESSAGE',
      payload: conversation
    })
    document.getElementById('msgInput').value = '';
  }


  render() {


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
