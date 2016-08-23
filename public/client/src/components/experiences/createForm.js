import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import Datetime from 'react-datetime';

class CreateForm extends Component {
  render() {
    const {fields: {title, description, address, state, zip, city, type}} = this.props;
    return (
      <div>
        <h4>Create Experience</h4>
        <form onSubmit={this.props.createExp}>
          <div>
            <label>Title</label>
            <input type="text" placeholder="Title" {...title}/>
          </div>
          <div>
            <label>Experience Type</label>
            <select {...type}>
              <option value="" disabled>Select Experience Type</option>
              <option value="camping">Camping</option>
              <option value="fishing">Fishing</option>
              <option value="hiking">Hiking</option>
              <option value="swimming">Swimming</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <textarea type="text" placeholder="Description" {...description}/>
          </div>
          <div>
            <label>Address</label>
            <input type="text" placeholder="Address" {...address} />
          </div>
          <div>
            <label>City</label>
            <input type="text" placeholder="City" {...city} />
          </div>
          <div>
            <label>State</label>
            <select {...state}>
              <option value="" disabled>Select State</option>
            	<option value="AL">Alabama</option>
            	<option value="AK">Alaska</option>
            	<option value="AZ">Arizona</option>
            	<option value="AR">Arkansas</option>
            	<option value="CA">California</option>
            	<option value="CO">Colorado</option>
            	<option value="CT">Connecticut</option>
            	<option value="DE">Delaware</option>
            	<option value="DC">District Of Columbia</option>
            	<option value="FL">Florida</option>
            	<option value="GA">Georgia</option>
            	<option value="HI">Hawaii</option>
            	<option value="ID">Idaho</option>
            	<option value="IL">Illinois</option>
            	<option value="IN">Indiana</option>
            	<option value="IA">Iowa</option>
            	<option value="KS">Kansas</option>
            	<option value="KY">Kentucky</option>
            	<option value="LA">Louisiana</option>
            	<option value="ME">Maine</option>
            	<option value="MD">Maryland</option>
            	<option value="MA">Massachusetts</option>
            	<option value="MI">Michigan</option>
            	<option value="MN">Minnesota</option>
            	<option value="MS">Mississippi</option>
            	<option value="MO">Missouri</option>
            	<option value="MT">Montana</option>
            	<option value="NE">Nebraska</option>
            	<option value="NV">Nevada</option>
            	<option value="NH">New Hampshire</option>
            	<option value="NJ">New Jersey</option>
            	<option value="NM">New Mexico</option>
            	<option value="NY">New York</option>
            	<option value="NC">North Carolina</option>
            	<option value="ND">North Dakota</option>
            	<option value="OH">Ohio</option>
            	<option value="OK">Oklahoma</option>
            	<option value="OR">Oregon</option>
            	<option value="PA">Pennsylvania</option>
            	<option value="RI">Rhode Island</option>
            	<option value="SC">South Carolina</option>
            	<option value="SD">South Dakota</option>
            	<option value="TN">Tennessee</option>
            	<option value="TX">Texas</option>
            	<option value="UT">Utah</option>
            	<option value="VT">Vermont</option>
            	<option value="VA">Virginia</option>
            	<option value="WA">Washington</option>
            	<option value="WV">West Virginia</option>
            	<option value="WI">Wisconsin</option>
            	<option value="WY">Wyoming</option>
            </select>
          </div>
          <div>
            <label>Zip</label>
            <input type="text" placeholder="Zip Code" {...zip} />
          </div>
          <div>
            <label>Block Out Dates For This Experience To Be Unavailable</label>
            <Datetime onChange={this.props.blockDates} />
          </div>


          {/*<input type="filepicker" data-fp-apikey="AVfjXwFPTQgCfg5eJctYwz" data-fp-button-text="Choose Images"/>*/}
          <a className="btn btn-primary" onClick={this.props.uploadImages}>Upload Images</a>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

CreateForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'createForm',                           // a unique name for this form
  fields: ['title', 'description', 'address', 'state', 'zip', 'city', 'type'] // all the fields in your form
})(CreateForm);

export default CreateForm;
