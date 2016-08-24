import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/auth/signIn';
import SignUp from '../components/auth/signUp';
import { Link, browserHistory } from 'react-router';
import superagent from 'superagent';
require('../stylesheets/main.scss');
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

  }

  signUp(e) {
    e.preventDefault();
    superagent
      .get('http://localhost:3333/signUp')
      .end((err, res) => console.log(res))
    // e.preventDefault();
    // let { dispatch, form } = this.props;
    //
    // var geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': form.signUp.address.value}, function(res, status) {
    //   if(status == 'OK') {
    //     let user = {
    //       email: form.signUp.email.value,
    //       password: form.signUp.password.value,
    //       profile: {
    //         firstName: form.signUp.firstName.value,
    //         lastName: form.signUp.lastName.value,
    //         address: form.signUp.address.value,
    //         latitude: res[0].geometry.viewport.f.b,
    //         longitude: res[0].geometry.viewport.b.b,
    //       }
    //     }
    //     dispatch({
    //       type: 'SIGN_UP',
    //       payload: user
    //     });
    //   }
    // });
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
