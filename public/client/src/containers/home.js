import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/auth/signIn';
import SignUp from '../components/auth/signUp';
import { Link, browserHistory } from 'react-router';
import superagent from 'superagent';
import 'react-google-maps';
import config from '../config';
// var validator = require('mailgun-validate-email')()
let jsonp = require('superagent-jsonp');

require('../stylesheets/main.scss');
var Rebase = require('re-base');
var base = Rebase.createClass(config);

class Home extends Component{
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
      var errorMessage = error.message;
      if(errorMessage) {
        alert(errorMessage)
      }
    }).then(function() {
      browserHistory.push('/welcome');
    });
  }

  signUp(e) {
    e.preventDefault();

    let { form } = this.props;
    let email = form.signUp.email.value;
    let password = form.signUp.password.value;
    let firstName = form.signUp.firstName.value;
    let lastName = form.signUp.lastName.value;

    superagent
      .get('https://api:pubkey-252bed34819a680c8b154bf61ba4128b@api.mailgun.net/v3/address/validate')
      .use(jsonp)
      .query({
        address: email
      })
      .end(function(err, res){
        console.log(err, res)
        if(!res.body.isValid) {
          console.log('turrrrrible error: ', err);
          alert('Invalid Email!')
        } else {
          console.log('yayyyyyyyyyza: ', res)
          base.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorMessage = error.message;
            if(errorMessage) {
              alert(errorMessage)
            }
          }).then(function(user) {
            base.database().ref('users/' + user.uid).set({
              firstName: firstName,
              lastName: lastName
            });
              browserHistory.push('/welcome')
          });
        }
      })




  }

  render() {
      return (
        <div>
          <Link to="/about" className="about-link">More Info</Link>
          <div className="homePage">
            <h3>Outdoors</h3>
            <div className="home-buttons">
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

export default connect(mapStateToProps)(Home);
