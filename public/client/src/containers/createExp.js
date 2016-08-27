import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateForm from '../components/experiences/createForm';
import Datetime from 'react-datetime';
import ExperienceActions from '../actions/experiences';
import filepicker from 'filepicker-js';

class CreateExp extends Component {
  constructor(props) {
    super(props)

    this.createExp = this.createExp.bind(this);
    this.blockDates = this.blockDates.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  uploadImages() {
    let { dispatch } = this.props;
    filepicker.setKey("AVfjXwFPTQgCfg5eJctYwz")
    filepicker.pickMultiple(
    {
      services: ['COMPUTER', 'FACEBOOK', 'BOX', 'IMGUR', 'CLOUDDRIVE'],
    },
    function(Blobs){
      dispatch({
        type: 'UPLOAD_IMAGES',
        payload: Blobs
      });
    },
    function(error){
      alert('Error uploading images.')
    }

  );
  }

  createExp(e) {
    e.preventDefault();
    let { dispatch, form, dates, images, user } = this.props;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': form.address.value + ',' + form.city.value + ',' + form.state.value}, function(res, status) {
      if(status == 'OK') {
        dispatch({
          type: 'CREATE_EXP',
          payload: {
            title: form.title.value,
            description: form.description.value,
            images: images,
            address: form.address.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value,
            longitude: res[0].geometry.viewport.b.b,
            latitude: res[0].geometry.viewport.f.b,
            user: user.uid,
            dates: {
              unavailableDates: dates.unavailableDates
            }
          }
        })

      }
    })
  }

  blockDates(e) {
    let { dispatch } = this.props;
    let array = this.props.dates.unavailableDates.slice();
    console.log('blocking dates? ', array)
    array.push(e._d)
    dispatch(ExperienceActions.blockDates(array));
  }

  render() {
    return(
      <div>
        <CreateForm createExp={this.createExp} blockDates={this.blockDates} uploadImages={this.uploadImages}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    user: state.auth.user,
    form: state.form.createForm,
    dates: state.experiences.singleExperience.dates,
    images: state.experiences.images
  }
}

export default connect(mapStateToProps)(CreateExp)
