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


function* confirmRes(action) {
  console.log('action: ', action)
  try {
    let reservation = {
      experience: action.payload.reservation.experience._id,
      host: action.payload.reservation.host._id,
      reservedBy: action.payload.reservation.reservedBy._id,
      date: action.payload.selectedDate,
      confirmed: false,
      isCompleted: false
    }
    const res = yield Reservations.insert(reservation);
    yield Meteor.call('newRes', reservation);
    // yield Meteor.call('sendEmail', {
    //   to: action.payload.reservation.host.emails[0].address,
    //   from: 'Webmaster at GoFishCampHike',
    //   subject: 'Your experience was reserved!',
    //   text: action.payload.reservation.reservedBy.profile.firstName + action.payload.reservation.reservedBy.profile.lastName + ' has reserved your experience: ' + action.payload.reservation.experience.title + ' at : ' +
    //   action.payload.selectedDate + '. Please check your dashboard for more details.'
    // });
    //
    // yield Meteor.call('sendEmail', {
    //   to: action.payload.reservation.reservedBy.emails[0].address,
    //   from: 'Webmaster at GoFishCampHike',
    //   subject: 'Your pending reservation at GoFishCampHike',
    //   text: "Congratulations! You just reserved an awesome outdoor experience. You will be notified as soon as the host has confirmed your reservation."
    // });

    yield Meteor.call('sendMessage', {
      to: action.payload.reservation.reservedBy._id,
      owner: {
        _id: action.payload.reservation.host._id,
        name: action.payload.reservation.host.profile.firstName
      },
      message: 'Congratulations! You made a reservation.'
    });

    yield Meteor.call('sendMessage', {
      to: action.payload.reservation.host._id,
      owner: {
        _id: action.payload.reservation.reservedBy._id,
        name: action.payload.reservation.reservedBy.profile.firstName
      },
      message: 'Your experience has been reserved!'
    });

    yield browserHistory.push('/welcome');
  } catch(err) {
    console.log('didnt work dude')
  }
}

function* reserve(action) {
  try {
    yield put({ type: 'RESERVE_EXP', payload: {
      experience: action.payload.experience,
      host: action.payload.experience.user,
      reservedBy: Meteor.user()
    }});
    yield browserHistory.push('/reservation');
  } catch(err) {
    alert('man sorry bout that, it didnt work')
    console.log('man thats the worst error')
  }
}

function* getExp(action) {
  try {

  } catch(err) {
    //do something
    console.log('fatal error dude')
  }
}

function* getSingleExp(action) {

  let expObj = {}
  try{
    const exp = yield Experiences.find({ _id: action.payload._id }).fetch();

    const user = yield Meteor.users.find({ _id: exp[0].user }).fetch();

    Object.assign(expObj, exp[0]);
    expObj.user = user[0];
    yield put({
      type: 'GET_SINGLE_EXPERIENCE_SUCCESS',
      experience: expObj
    })
  } catch(err) {
    console.log('fatal error duuuuude')
  }
}

function* createExp(action) {
  console.log('exp: ', action);
  try {
    yield firebase.database().ref('experiences').push(action.payload);
    yield browserHistory.push('/welcome')
  } catch(err) {
    console.log('horrible error man, sorry')
  }
}

function* getUserExp(action) {
  try{
    const res = yield Reservations.find({ reservedBy: action.user }).fetch()
    const newArray = res.map((r) => {
      const exp = Experiences.find({ _id: r.experience }).fetch()
      let newObj = {}
      Object.assign(newObj, exp[0]);
      newObj.reservationId = r._id;
      newObj.confirmed = r.confirmed;
      newObj.date = r.date;
      return newObj;
    })
    yield put({
      type: 'SET_USER_EXP',
      payload: newArray
    });
  } catch(err) {
    console.log('nope not this time')
  }
}

function* getUserList(action) {
  try{
    const res = yield Experiences.find({ user: action.user }).fetch()
    console.log('found em: ', res);
    yield put({
      type: 'SET_USER_LISTINGS',
      payload: res
    })
  } catch(err) {

  }
}

export function* getExperiences() {
  yield* takeEvery('GET_EXPERIENCES', getExp)
}

export function* watchGetSingleExp() {
  yield* takeEvery('GET_SINGLE_EXPERIENCE', getSingleExp)
}

export function* watchCreate() {
  yield* takeEvery('CREATE_EXP', createExp)
}

export function* watchReserve() {
  yield* takeEvery('RESERVE', reserve)
}

export function* watchConfirm() {
  yield* takeEvery('CONFIRM_RES', confirmRes)
}

export function* watchUserExp() {
  yield* takeEvery('GET_USER_EXP', getUserExp)
}

export function* watchUserList() {
  yield* takeEvery('GET_USER_LISTINGS', getUserList)
}

export default function* homeSaga() {
  yield [
    getExperiences(),
    watchGetSingleExp(),
    watchCreate(),
    watchReserve(),
    watchConfirm(),
    watchUserExp(),
    watchUserList()
    // more sagas go here...
  ];
}
