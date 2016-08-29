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
    // var getExp = yield firebase.database().ref('experiences/' + action.payload.experience);
    // getExp.once('value', function(val) {
      // let whakamole = val.val()
      // console.log('mewosdfa? ', whakamole)
      // let data = {
      //   : action.payload.user,
      //
      // }
      // base.push('conversations', { data: })
    // });
    // console.log('dirt: ', result)
    // console.log('meow???', getExp)
    // action.payload.experience
    // action.payload.reservedBy
    // action.payload.selectedDate
    // yield base.push('conversations', { data:
    //     //something here
    // })
    yield browserHistory.push('/welcome');
  } catch(err) {
    console.log('didnt work dude')
  }
}

function* reserve(action) {
  try {
    yield put({ type: 'RESERVE_EXP', payload: {
      experience: action.payload.experience,
      host: action.payload.host,
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



export function* watchCreate() {
  yield* takeEvery('CREATE_EXP', createExp)
}

export function* watchReserve() {
  yield* takeEvery('RESERVE', reserve)
}

export function* watchConfirm() {
  yield* takeEvery('CONFIRM_RES', confirmRes)
}


export default function* homeSaga() {
  yield [
    watchCreate(),
    watchReserve(),
    watchConfirm()
    // more sagas go here...
  ];
}
