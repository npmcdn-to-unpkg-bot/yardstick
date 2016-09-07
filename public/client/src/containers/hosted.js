import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Messages from '../components/messages';
import config from '../config';
// import dog from '../dog';
var Rebase = require('re-base');


var base = Rebase.createClass(config);

class Hosted extends Component{
  constructor(props){
    super(props);

    this.state = {
      messaging: {
        messageVisible: false,
        toSend: '',
        sentMessages: [],
        recMessages: []
      },
      hosting: [],
      reservations: []
    }
    this.confirmRes = this.confirmRes.bind(this);
    // this.sendMessage = this.sendMessage.bind(this);
    // this.typeMessage = this.typeMessage.bind(this);
    // this.dismiss = this.dismiss.bind(this);
  }
  
  componentDidMount() {
    let { params } = this.props;
    this.ref3 = base.syncState(`reservations`, {
      context: this,
      state: 'reservations',
      asArray: true,
      queries: {
        orderByChild: 'host',
        equalTo: params.userId
      }
    })

    this.ref4 = base.syncState(`experiences`, {
      context: this,
      state: 'hosting',
      asArray: true,
      queries: {
        orderByChild: 'user',
        equalTo: params.userId
      }
    });
  }
  
  componentWillUnmount() {
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
  
  render() {
    console.log('hosting state: ', this.state)
    let hosting,
      reservations;
    
    if(this.state.hosting && this.state.hosting.length > 0) {
      hosting = this.state.hosting.map((host) => {
        return(
          <div>
            <h5>{host.title}</h5>
            <span>{host.city}, {host.state}</span>
            {host.images ? host.images.map((img) => <img style={{ maxWidth: '25%', display: 'block'}} src={img.url} />) : <div>No images</div>}
          </div>
        )
      })
    } else {
      hosting = <div>No experiences found.</div>
    }
    
    if(this.state.reservations && this.state.reservations.length > 0) {
      reservations = this.state.reservations.map((res) => {
        console.log('res...', res)
        return(
          <div>
            <h5>{res.experienceTitle ? res.experienceTitle : 'no title available'}</h5>
            <span>{res.selectedDate}</span>
            <span>Reserved By: {res.reservedBy}</span>
            <span>Status: {res.confirmed ? 'Confirmed!' : 'Not confirmed yet. Confirm this reservation to officially schedule it.'}</span>
            <button style={{ display: res.confirmed ? 'none' : 'inline-block' }} onClick={this.confirmRes.bind(null, res)}>Confirm</button>
          </div>
        )
      })
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
            {hosting}
          </div>
          <div className="col-md-6">
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

export default connect(mapStateToProps)(Hosted)