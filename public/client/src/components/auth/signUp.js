import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class SignUp extends Component {
  render() {
    const {fields: {email, password, firstName, lastName, address}} = this.props;
    return (
      <div className="signUpFormInt">
      <form onSubmit={this.props.signUp} className="form">
      <h4>Sign Up</h4>
      <span onClick={this.props.dismiss}>X</span>
        <div className="input-field">
          <label>Email*</label>
          <input type="text" placeholder="Email" {...email} required id="email"/>
        </div>
        <div className="input-field">
          <label>Password*</label>
          <input type="password" placeholder="password" {...password} required/>
        </div>
        <div className="input-field">
          <label>First Name*</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div className="input-field">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }
}

SignUp = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signUp',                           // a unique name for this form
  fields: ['email', 'password', 'firstName', 'lastName', 'address'] // all the fields in your form
})(SignUp);

export default SignUp;
