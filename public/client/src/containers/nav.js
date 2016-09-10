import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import config from '../config';
// import dog from '../dog';
var Rebase = require('re-base');
var base = Rebase.createClass(config);


export default class Navigation extends Component{
  constructor(props){
    super(props);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let user = base.auth().currentUser;
    if(user != null) {
      this.setState({
        user: user
      });
    }
  }

  setUser(user) {
    let { dispatch } = this.props;
    dispatch({
      type: 'SET_USER',
      user: user
    });
  }

  logOut() {
    base.auth().signOut().catch(function(err) {

    }).then(function() {
      browserHistory.push('/');
    })
  }

  render() {
      return (
        <div>
          <Navbar id="mainNav">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/welcome">{ this.state.user.displayName ? 'Welcome, ' + this.state.user.displayName : 'Welcome!'}</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <Link to="/welcome">Home</Link>
              <Link to="/createExperience">Create Experience</Link>
              <Link to={"/profile/" + this.props.user.uid}>Profile</Link>
              <Link to={"/myExperiences/" + this.props.user.uid}>My Experiences</Link>
              <Link to={"/hosted/" + this.props.user.uid}>Host Dashboard</Link>
              <a onClick={this.logOut}>Log Out</a>
            </Nav>
          </Navbar>
            <div className="content-main">
            {this.props.children}
            </div>
          </div>
        )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Navigation);
