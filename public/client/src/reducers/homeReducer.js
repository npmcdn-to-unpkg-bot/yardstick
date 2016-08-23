import * as constants from './constants';

const initialState = {
  signup: {
    email: '',
    password: ''
  },
  login: {
    email: '',
    password: ''
  },
  user: {},
  locations: []
};

export default function leasesReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.EMAIL_INPUT:
      return { ...state, signup: { ...state.signup, email: action.payload }};
    case constants.PW_INPUT:
      return { ...state, signup: { ...state.signup, password: action.payload }};
    case constants.LOGIN_EMAIL_INPUT:
      return { ...state, login: { ...state.login, email: action.payload }};
    case constants.LOGIN_PW_INPUT:
      return { ...state, login: { ...state.login, password: action.payload }};
    case constants.LOGIN_SUCCESS:
      return { ...state, user: action.user };
    case constants.GET_LOCATIONS_SUCCESS:
      return { ...state, locations: action.locations };
    case constants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
