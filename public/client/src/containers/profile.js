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
    let { dispatch, user } = this.props;
    dispatch({
      type: 'GET_USER_EXP',
      user: user._id
    });
    dispatch({
      type: 'GET_USER_LISTINGS',
      user: user._id
    })
    dispatch({
      type: 'GET_USER_MESSAGES',
      user: user._id
    })
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

    let expSection;
    if(this.props.experiences && this.props.experiences.length > 0) {
      expSection = this.props.experiences.map((exp) => {
        return (
          <div className="exp-profile" key={exp.reservationId}>
            <h5><Link to={"/experiences/" + exp._id}>{exp.title}</Link></h5>
            <span>{exp.date}</span>
            <div className="profile-exp-img">
              {exp.images.map((img) => {
                return <img src={img.url} style={{ width: 100 }}/>
              })}
            </div>
            <span>Rate!</span>
          </div>
        )
      })
    } else {
      expSection = <p>You havent booked any experiences yet!</p>
    }

    let listings;
    if(this.props.listings && this.props.listings.length > 0) {
      listings = this.props.listings.map((listing) => {
        return (
          <div>
            <h4>{listing.title}</h4>
          </div>
        )
      })
    } else {
      listings = <div>You dont have any listings yet!</div>
    }

    let messages;
    if(this.props.conversation.conversation) {
      messages = this.props.conversation.conversation.map((msg) => {
        return (
          <div onClick={this.viewConversation.bind(null, msg)}>
            <span>From: {msg.owner.name}</span>

          </div>
        )
      })
    } else {
      messages = <div>No Messages</div>
    }

    return(
      <div>
        <div>
          <h4>Profile Info</h4>
          <span>{Meteor.user() ? Meteor.user().profile.firstName : 'Loading...'}</span>
        </div>
        <div>
          <h4>My Experiences</h4>
          <span>These are the experiences that you have participated in. Book them again, or leave a rating!</span>
            {expSection}
        </div>

        <div>
          <h4>My Listings</h4>
          {listings}
        </div>

        <div className="messages">
          <h4>Messages</h4>
          {messages}
        </div>
        <Conversation
          owner={this.props.user._id}
          visible={this.props.conversation.visible}
          dismiss={this.dismiss}
          conversation={this.props.conversation.view}
          typeMessage={this.typeMessage}
          sendMessage={this.sendMessage}
        />
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
