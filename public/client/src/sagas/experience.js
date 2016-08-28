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
    const res = yield base.push('reservations', { data: action.payload });

    yield browserHistory.push('/welcome');
  } catch(err) {
    console.log('didnt work dude')
  }
}

function* reserve(action) {
  try {
    yield put({ type: 'RESERVE_EXP', payload: {
      experience: action.payload.experience,
      reservedBy: action.payload.user,
      date: action.payload.date
    }});
    yield browserHistory.push('/reservation/' + action.payload.experience.key);
  } catch(err) {
    alert('man sorry bout that, it didnt work')
    console.log('man thats the worst error')
  }
}


function* createExp(action) {
  console.log('creating action...', action)

  try {
    const exp = yield base.database().ref('experiences').push().set(action.payload);
    // yield console.log('created? ', exp.key())
    yield browserHistory.push('/welcome')
  } catch(err) {
    console.log('horrible error man, sorry', err)
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
    // watchGetSingleExp(),
    watchCreate(),
    watchReserve(),
    watchConfirm(),
    watchUserExp(),
    watchUserList()
    // more sagas go here...
  ];
}
