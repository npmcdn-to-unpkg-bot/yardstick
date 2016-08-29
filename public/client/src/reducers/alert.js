import * as constants from './constants';

const initialState = {
  alert: {
    visible: false,
    type: '', // success, warning, error
    title: '',
    message: ''
  }
};

export default function alertReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.ALERT_SET:
      return action.payload.alert ? { ...state, alert: action.payload.alert } : state;
    default:
      return state;
  }
}
