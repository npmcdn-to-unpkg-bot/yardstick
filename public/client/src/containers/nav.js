import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Navigation extends Component{
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
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/welcome">Welcome!</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <Link to="/welcome">Home</Link>
              <Link to="/createExperience">Create Experience</Link>
              <Link to={"/profile/" + this.props.user.uid}>Profile</Link>
              <Link to={"/myExperiences/" + this.props.user.uid}>My Experiences</Link>
              <Link to={"/hosted/" + this.props.user.uid}>Host Dashboard</Link>
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
