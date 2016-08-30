import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';


function* getMsg(action) {
  try{
    
  } catch(err) {
    console.log('AHHHHH no')
  }
}


function* sendMsg(action) {
  try{
    
  } catch(err) {
    console.log('daaaaaaang dude try again')
  }
}

export function* getMessages() {
  yield* takeEvery('GET_USER_MESSAGES', getMsg)
}

export function* sendMessage() {
  yield* takeEvery('SEND_MESSAGE', sendMsg)
}

export default function* messageSaga() {
  yield [
    getMessages(),
    sendMessage()
    // more sagas go here...
  ];
}
