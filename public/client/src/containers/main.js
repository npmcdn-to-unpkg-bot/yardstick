
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Main extends Component{
  constructor(props){
    super(props);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    let { dispatch } = this.props;
    dispatch({
      type: 'SET_USER',
      user: user
    });
  }

  render() {
    let childs;
    if(!this.props.currentUser) {
      childs = <div>Loading...</div>
    } else {
      childs = this.props.children
    }
    //current user prop is set by Meteor- we want it available in redux
    this.setUser(this.props.currentUser);

    let user;
      if(!this.props.currentUser) {
        user = '!'
      } else {
        user = ' ' + this.props.currentUser.profile.firstName + '!';
      }
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/welcome">Welcome{user}</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <Link to="/welcome">Home</Link>
              <Link to="/createExperience">Create Experience</Link>
              <Link to={"/profile"}>Profile</Link>
            </Nav>
          </Navbar>
            <div className="content-main">
            {childs}
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

export default connect(mapStateToProps)(Main);
