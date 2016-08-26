import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/auth/signIn';
import SignUp from '../components/auth/signUp';
import { Link, browserHistory } from 'react-router';

class About extends Component{
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }
  componentWillMount() {
    this.setState({
      signIn: false,
      signUp: false,
      logInBtn: true,
      signUpBtn: true
    });
  }

  dismiss() {
    this.setState({
      signIn: false,
      signUp: false,
      logInBtn: true,
      signUpBtn: true
    })
  }

  toggleSignIn() {
    this.setState({
      signIn: true,
      signUp: false,
      logInBtn: false,
      signUpBtn: false
    });
  }

  toggleSignUp() {
    this.setState({
      signIn: false,
      signUp: true,
      logInBtn: false,
      signUpBtn: false
    });
  }


  signIn(e) {
    e.preventDefault();
    let { dispatch, form } = this.props;
    let user = {
      email: form.signIn.email.value,
      password: form.signIn.password.value
    }
    base.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log('err? ', errorMessage)
      alert(errorMessage);
    });
    browserHistory.push('/welcome');

  }

  signUp(e) {
    e.preventDefault();

    let { dispatch, form } = this.props;
          let email = form.signUp.email.value;
          let password = form.signUp.password.value;
    //
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': form.signUp.address.value}, function(res, status) {
      if(status == 'OK') {
        let user = {
          email: form.signUp.email.value,
          password: form.signUp.password.value,
          profile: {
            firstName: form.signUp.firstName.value,
            lastName: form.signUp.lastName.value,
            address: form.signUp.address.value,
            latitude: res[0].geometry.viewport.f.b,
            longitude: res[0].geometry.viewport.b.b,
          }
        }
        dispatch({
          type: 'SIGN_UP',
          payload: user
        });
      }
    });
  }


  render() {
      return (
        <div>
          <Link to="/" className="about-link">Home</Link>
          <div className="aboutPage">
            <h3>About Outdoors</h3>
            <div className="home-buttons">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <button onClick={this.toggleSignIn} style={{ display: this.state.logInBtn ? "inline-block" : "none" }}>Log In</button>
              <button onClick={this.toggleSignUp} style={{ display: this.state.signUpBtn ? "inline-block" : "none" }}>Sign Up</button>

            </div>
            <div className="signInForm" style={{ display: this.state.signIn ? "block" : "none" }}>
              <SignIn signIn={this.signIn} dismiss={this.dismiss}/>
            </div>
            <div className="signUpForm" style={{ display: this.state.signUp ? "block" : "none" }}>
              <SignUp signUp={this.signUp} dismiss={this.dismiss}/>
            </div>
          </div>
        </div>
      )

  }
}

function mapStateToProps(state) {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps)(About);
