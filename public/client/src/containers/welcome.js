import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';
import { Link } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import HoverExp from '../components/experiences/expHover';
import { browserHistory } from 'react-router';
import ChangeModal from '../components/welcome/changeModal';
var Rebase = require('re-base');

var config = {
  apiKey: "AIzaSyAthBCq_uopCnlQn27DbBmQrHQVEJVfKRo",
  authDomain: "outdoors-1380.firebaseapp.com",
  databaseURL: "https://outdoors-1380.firebaseio.com",
  storageBucket: "outdoors-1380.appspot.com",
};

var base = Rebase.createClass(config);

class Welcome extends Component {
  constructor(props) {

    super(props);
    this.hover = this.hover.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.changeUserLocation = this.changeUserLocation.bind(this);
  }
  componentWillMount() {
    let { dispatch } = this.props;
    this.setState({
      showInfo: false,
      changeModal: false
    });

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
        dispatch({
          type: 'SET_LOCATION',
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      });
    } else {
      console.log('location thing not working')
      // dispatch({
      //   type: 'SET_LOCATION',
      //   payload: {
      //     latitude: Meteor.user().profile.latitude,
      //     longitude: Meteor.user().profile.longitude
      //   }
      // });
    }
  }

  componentDidMount() {
    this.ref = base.bindToState(`experiences`, {
      context: this,
      state: 'experiences',
      asArray: true
    });
  }

  componentWillUnmount() {
    let newArray = this.state.experiences.map((exp) => {
      exp.showInfo = false;
    });

    base.removeBinding(this.ref);
  }

  hover(marker) {
    console.log('the marker we hover on: ', marker)
    let experiences = this.state.experiences;

    let newArray = experiences.map((exp) => {
      if(exp.key === marker.key) {
        // console.log('found it');
        let newObj = {};
        Object.assign(newObj, exp)
        newObj.showInfo = true;
        return newObj;
      } else {
        return exp;
      }
    });
    this.setState({
      experiences: newArray
    });
  }


  showDetail(marker) {
    // console.log('da marker: ', marker)
    return(
      <InfoWindow
        onCloseclick={this.handleMarkerClose.bind(null, marker)}>
        <div className="hoverExp">
          <h5 onClick={() => {
            // let newArray = this.state.experiences.map((exp) => {
            //   exp.showInfo = false;
            // });
            this.setState({
              experiences: null
            });
            browserHistory.push("/experiences/" + marker.key + '/' + marker.user)
          }
          }>{marker.title}</h5>
          <p>{marker.description}</p>
          <div className="imgRow">
            {marker.images.map((img)=>{
              return <img src={img.url} />
            })}
          </div>
        </div>
      </InfoWindow>
    )
  }

  handleMarkerClose(marker) {
    let experiences = this.state.experiences;

    let newArray = experiences.map((exp) => {
      if(exp.key === marker.key) {
        let newObj = {};
        Object.assign(newObj, exp)
        newObj.showInfo = false;
        return newObj;
      } else {
        return exp;
      }
    });

    this.setState({
      experiences: newArray
    });
  }

  changeLocation() {
    this.setState({
      changeModal: true
    });
  }

  dismiss(){
    this.setState({
      changeModal: false
    });
  }

  changeUserLocation(e) {
    e.preventDefault();
    let { dispatch, form } = this.props;
    var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': form.changeLocation.address.value}, function(res, status) {
        console.log('status: ', status);
        if(status === 'OK') {
          let data = {
            latitude: res[0].geometry.viewport.f.b,
            longitude: res[0].geometry.viewport.b.b,
          }
          dispatch({
            type: 'SET_LOCATION',
            payload: data
          });
        }
    })
    this.setState({
      changeModal: false
    });
  }

  render(){
    let exp;
    let markerSection;


    if(this.state.experiences && this.state.experiences.length > 0) {
      exp = this.state.experiences.map((exp) => {
        return <div key={exp.key}><Link to={"/experiences/" + exp.key }>{exp.title}</Link></div>
      })
    } else {
      exp = <div>Loading experiences...</div>
    }

    if(this.state.experiences && this.state.experiences.length > 0) {
      console.log('experiences yayyy: ', this.state.experiences)
      markerSection = (
        this.state.experiences.map((marker, index) => {

          let pos = {
            lat: marker.latitude,
            lng: marker.longitude
          }
          return (
            <Marker
            position={pos}
            key={marker._id}
            onMouseover={this.hover.bind(null, marker)}>
            {marker.showInfo ? this.showDetail(marker) : null}
            </Marker>
            );
          })
      )
    } else {
      markerSection = null;
    }

      return(
        <div>
        <ChangeModal
          visible={this.state.changeModal}
          dismiss={this.dismiss}
          changeLocation={this.changeUserLocation}
        />
        <div className="welcomeInfo">
          <p>Welcome! Choose a nearby experience from the map below, or add your own! <a href="#" onClick={this.changeLocation}>Change Location</a></p>
        </div>

        <div style={{ height: 1000 }} className="map">
        <GoogleMapLoader
        containerElement={<div style={{ height: `100%`  }} />}
        googleMapElement={
          <GoogleMap
          ref={(map) => console.log(map)}
          defaultZoom={7}
          center={{ lat: this.props.location.latitude, lng: this.props.location.longitude }}
          >
            {markerSection}
          </GoogleMap>
          }
        />
        </div>
        {exp}
        </div>
      )
    }
  }


function mapStateToProps(state) {
  console.log('state: ', state)
  return {
    user: state.auth.user,
    location: state.auth.location,
    experiences: state.experiences.experiences,
    form: state.form
  }
}

export default connect(mapStateToProps)(Welcome);
