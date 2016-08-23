import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Datetime from 'react-datetime';
import moment from 'moment';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import ExperienceActions from '../actions/experiences';


class SingleExperience extends Component {
  constructor(props) {
    super(props)

    this.selectDate = this.selectDate.bind(this);
    this.validDate = this.validDate.bind(this);
    this.reserve = this.reserve.bind(this);
  }

  componentWillMount() {
    let { dispatch, params } = this.props;

    dispatch({
      type: 'GET_SINGLE_EXPERIENCE',
      payload: {
        _id: params.experienceId
      }
    })
  }


  componentWillUnmount() {
    let { dispatch, params } = this.props;
    dispatch({
      type: 'SINGLE_EXP_FLUSH',
      payload: {}
    })
  }

  selectDate(e) {
    let { dispatch } = this.props;
    let date = e._d.toString();

    dispatch(ExperienceActions.selectDate(date));
  }


  validDate(current) {
    let newA = this.props.dates.unavailableDates.find((date) => {
      return Datetime.moment(current._d).isSame(date, 'day')
    });

    if(newA) {
      return false;
    } else {
      return true;
    }
  }

  reserve() {
    let { dispatch, experiences, reservation } = this.props;
    let data = {
      user: Meteor.user(),
      experience: experiences.singleExperience,
      date: reservation.selectedDate
    }

    dispatch(ExperienceActions.reserve(data))

  }

  render(){
    let exp;
    let images;
    if(this.props.experiences.singleExperience.images) {
      images = this.props.experiences.singleExperience.images.map((img) => {
        return <img src={img.url} />
      })
    } else { images = <div></div>}

    if(this.props.experiences.singleExperience._id.length > 0) {

      exp = (
        <div>
          <div className="singleExp">
            <h4>{this.props.experiences.singleExperience.title}- {this.props.experiences.singleExperience.city}, {this.props.experiences.singleExperience.state}</h4>
            <div className="imageGallery">
              {images}
            </div>
            <p>{this.props.experiences.singleExperience.description}</p>
            <div className="userDetails">
              <h5>{this.props.experiences.singleExperience.user.profile.firstName} {this.props.experiences.singleExperience.user.profile.lastName}</h5>
            </div>
          </div>

            <div style={{ height: 300 }} className="singleMap">
              <GoogleMapLoader
                containerElement={
                  <div style={{ height: `100%`  }} />
                }
                googleMapElement={
                  <GoogleMap
                    ref={(map) => console.log(map)}
                    defaultZoom={12}
                    defaultCenter={{ lat: this.props.experiences.singleExperience.latitude, lng: this.props.experiences.singleExperience.longitude }}
                  >
                  </GoogleMap>
                }
              />
            </div>
          <div className="availableDates">
            <h5>Available Dates</h5>
            <Datetime onChange={this.selectDate} isValidDate={this.validDate} input={false} open={true}/>
          </div>
          <div>
            <h5>Book This Experience!</h5>
            <button className="btn btn-primary" onClick={this.reserve}>Book</button>
          </div>
        </div>
        )
    } else {
      exp = <div>Loading...</div>
    }

    return(
      <div>
      {exp}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    experiences: state.experiences,
    dates: state.experiences.singleExperience.dates,
    reservation: state.reservation
  }
}

export default connect(mapStateToProps)(SingleExperience);
