import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ExperienceActions from '../actions/experiences';
import { browserHistory } from 'react-router';
var Rebase = require('re-base');

var config = {
  apiKey: "AIzaSyAthBCq_uopCnlQn27DbBmQrHQVEJVfKRo",
  authDomain: "outdoors-1380.firebaseapp.com",
  databaseURL: "https://outdoors-1380.firebaseio.com",
  storageBucket: "outdoors-1380.appspot.com",
};

var base = Rebase.createClass(config);

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.confirmRes = this.confirmRes.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {

  }

  confirmRes() {
    let { dispatch, params } = this.props;
    let res = this.props.res;
    let reservation = {
      confirmed: false,
      completed: false,
      selectedDate: res.selectedDate,
      reservedBy: res.reservation.reservedBy,
      experience: params.experienceId
    }

    console.log('deets: ', reservation);
    dispatch(ExperienceActions.confirmRes(reservation))
  }

  cancel() {
    let { dispatch } = this.props;
    dispatch({ type: 'FLUSH_RES', payload: '' })
    browserHistory.push('/welcome')
  }

  render() {
    return(
      <div>
        <h5>Confirm Reservation of {this.props.res.reservation.experience.title} for {this.props.res.selectedDate}</h5>
        <p>
          Once you confirm blah blah blah
        </p>
        <button className="btn btn-primary" onClick={this.confirmRes}>Confirm!</button>
        <a href="#" onClick={this.cancel}>Cancel</a>
      </div>

    )
  }
}

function mapStateToProps(state) {
  console.log('res state: ', state)
  return {
    res: state.reservation
  }
}

export default connect(mapStateToProps)(Reservation);
