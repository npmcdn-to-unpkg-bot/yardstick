import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Verify extends Component {
  constructor(props) {
    super(props)

    this.resend = this.resend.bind(this);
  }

  componentWillMount() {
    Accounts.verifyEmail(this.props.params.token, (err) => {
      if(err) {
        console.log('error: ', err)
        alert('Error verifying email.')
      } else {
        browserHistory.push('/welcome')
      }
    })
  }

  resend(){
    Meteor.call('sendVerificationLink')
  }

  render() {
    return(
      <div>If you are not redirected to the home page in a few seconds, then something has gone wrong with your verification. <a onClick={this.resend}>Click Here</a> to re-send your verification link.</div>

    )
  }
}

function mapStateToProps(state) {
  return{

  }
}

export default connect(mapStateToProps)(Verify)
