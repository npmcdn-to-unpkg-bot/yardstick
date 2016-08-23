import { combineReducers } from 'redux';
import HomeReducer from './homeReducer';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from './authReducer';
import Location from './singleLocation';
import Experiences from './experiences';
import Reservation from './reservation';
import Messages from './messages';
//import reducers up here ...
//import reducer1 from la la la

export default combineReducers({
  home: HomeReducer,
  auth: AuthReducer,
  location: Location,
  form: formReducer,
  experiences: Experiences,
  reservation: Reservation,
  messages: Messages
});
