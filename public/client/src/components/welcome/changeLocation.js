import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class ChangeLocation extends Component {
  render() {
    const {fields: {address}} = this.props;
    return (
      <form onSubmit={this.props.changeLocation} className="form">
        <div className="input-field">
          <label>New Address</label>
          <input type="text" placeholder="Address" {...address}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ChangeLocation = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'changeLocation',                           // a unique name for this form
  fields: ['address'] // all the fields in your form
})(ChangeLocation);

export default ChangeLocation;
