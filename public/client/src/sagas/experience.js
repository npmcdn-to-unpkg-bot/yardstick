import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
var Rebase = require('re-base');

import config from '../config';

var base = Rebase.createClass(config);

function* confirmRes(action) {
  console.log('action: ', action)
  try {
    var newChatKey = base.database().ref().child('chats').push().key;
    console.log('the new key: ', newChatKey)
    let wat = action.payload;
    wat.chat = newChatKey;
    yield base.push('reservations', { data: wat });
    yield base.update('chats/' + newChatKey, {
      data: {
        users: {
          user1: action.payload.host,
          user2: action.payload.reservedBy
        }
      }
    });
    yield base.update('messages/' + newChatKey, {
      data:{
        m1: {
          from: 'Outdoors Admin!',
          to: action.payload.host,
          message: 'Your experience has been reserved! Chat with the user here to work out the details.',
          time: Date.now()
        }
      }
    })
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
      date: action.payload.date,
      chat: action.payload.chat
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
