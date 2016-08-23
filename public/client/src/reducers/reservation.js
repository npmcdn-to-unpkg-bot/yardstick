import * as constants from './constants';

const initialState = {
  selectedDate: '',
  reservation: {}
};

export default function reservationReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    case constants.RESERVE_EXP:
      return { ...state, reservation: action.payload };
    case constants.FLUSH_RES:
      return state;
    default:
      return state;
  }
}
