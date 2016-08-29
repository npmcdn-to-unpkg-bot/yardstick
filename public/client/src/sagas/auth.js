import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
var Rebase = require('re-base');

var config = {
  apiKey: "AIzaSyAthBCq_uopCnlQn27DbBmQrHQVEJVfKRo",
  authDomain: "outdoors-1380.firebaseapp.com",
  databaseURL: "https://outdoors-1380.firebaseio.com",
  storageBucket: "outdoors-1380.appspot.com",
};

var base = Rebase.createClass(config);

function* signUp(action) {
  try {
    const user = yield base.auth().createUserWithEmailAndPassword(action.payload.email, action.payload.password)
    yield firebase.database().ref('users/' + user.uid).set({
      firstName: action.payload.profile.firstName,
      lastName: action.payload.profile.lastName,
      address: action.payload.profile.address,
      latitude: action.payload.profile.latitude,
      longitude: action.payload.profile.longitude
    });
    yield browserHistory.push('/welcome')
  } catch(err) {
    console.log('didnt work dude: ', err);
  }
}

export function* watchSignUp() {
  yield* takeEvery('SIGN_UP', signUp)
}

export default function* authSaga() {
  yield [
    watchSignUp()
    // more sagas go here...
  ];
}
