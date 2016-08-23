import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';


function* getMsg(action) {
  try{
    let convos = yield Conversations.find({ to: action.user }).fetch()
    yield put({
      type: 'GET_MESSAGES_SUCCESS',
      payload: convos
    });
  } catch(err) {
    console.log('AHHHHH no')
  }
}


function* sendMsg(action) {
  try{
    let newMsg = {
      to: action.payload.view.owner._id,
      owner: {
        _id: Meteor.user()._id,
        name: Meteor.user().profile.firstName
      },
      message: action.payload.message
    }
    const res = yield Meteor.call('sendMessage', newMsg, action.payload.view._id, (err, result) => {
      console.log('result? ', result)
      return result
    })
    console.log('res: ', res)
    const msg = yield Conversations.find({ _id: action.payload.view._id }).fetch();
    console.log('the msg: ', msg)
    yield put({
      type: 'UPDATE_CONVERSATION',
      payload: msg[0]
    });
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
