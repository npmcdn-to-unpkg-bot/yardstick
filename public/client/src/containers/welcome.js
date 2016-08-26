import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';
import { Link } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import HoverExp from '../components/experiences/expHover';
import { browserHistory } from 'react-router';
import ChangeModal from '../components/welcome/changeModal';

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

    // Meteor.call('getExpByLocation', function (err, res) {
    //   dispatch({
    //     type: 'GET_EXPERIENCES_SUCCESS',
    //     experiences: res
    //   });
    // });
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

  hover(marker) {
    let { dispatch, experiences } = this.props;
    let newArray = experiences.map((exp) => {
      if(exp._id === marker._id) {
        console.log('found it')
        newObj = {};
        Object.assign(newObj, exp)
        newObj.showInfo = true;
        return newObj;
      } else {
        return exp;
      }
    })

    dispatch({
      type: 'HOVER',
      payload: newArray
    });
  }


  showDetail(marker) {
    return(
      <InfoWindow
        onCloseclick={this.handleMarkerClose.bind(null, marker)}>
        <div className="hoverExp">
          <h5 onClick={() => browserHistory.push("/experiences/" + marker._id)}>{marker.title}</h5>
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
    let { dispatch, experiences } = this.props;
    let newArray = experiences.map((exp) => {
      if(exp._id === marker._id) {
        newObj = {};
        Object.assign(newObj, exp)
        newObj.showInfo = false;
        return newObj;
      } else {
        return exp;
      }
    });

    dispatch({
      type: 'HOVER_CLOSE',
      payload: newArray
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

    if(this.props.experiences.length > 0) {
      exp = this.props.experiences.map((exp) => {
        return <div key={exp._id}><Link to={"/experiences/" + exp._id }>{exp.title}</Link></div>
      })
    } else {
      exp = <div>Loading experiences...</div>
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
        containerElement={
          <div style={{ height: `100%`  }} />
        }
        googleMapElement={
          <GoogleMap
          ref={(map) => console.log(map)}
          defaultZoom={10}
          center={{ lat: this.props.location.latitude, lng: this.props.location.longitude }}
          >
          {this.props.experiences.map((marker, index) => {
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
          })}
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
