import * as constants from './constants';

const initialState = {
  experiences: [],
  images: [],
  singleExperience: {
    _id: '',
    user: {},
    dates: {
      unavailableDates: [],
      selectedDate: ''
    }
  }
};

export default function authReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.GET_EXPERIENCES_SUCCESS:
      return { ...state, experiences: action.experiences }
    case constants.GET_SINGLE_EXPERIENCE_SUCCESS:
      return { ...state, singleExperience: action.experience }
    case constants.BLOCK_DATE:
      return { ...state, singleExperience: { ...state.singleExperience, dates: { ...state.singleExperience.dates, unavailableDates: action.payload } }  }
    case constants.SINGLE_EXP_FLUSH:
        return { ...state, singleExperience: state.singleExperience }
    case constants.HOVER:
        return { ...state, experiences: action.payload };
    case constants.HOVER_CLOSE:
      return { ...state, experiences: action.payload };
    case constants.UPLOAD_IMAGES:
      return { ...state, images: action.payload }
    default:
      return state;
  }
}
