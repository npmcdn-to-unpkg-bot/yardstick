import * as constants from './constants';

const initialState = {
  conversation: {
    visible: false,
    conversation: [],
    message: '',
    view: {}
  }
};

export default function reservationReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.GET_MESSAGES_SUCCESS:
      return action.payload ? { ...state, conversation: { ...state.conversation, conversation: action.payload } } : state;
    case constants.TYPE_MESSAGE:
      return action.payload ? { ...state, conversation: { ...state.conversation, message: action.payload } } : state;
    case constants.VIEW_CONVERSATION:
      return { ...state, conversation: { ...state.conversation, visible: !state.conversation.visible, view: action.payload } };
    case constants.UPDATE_CONVERSATION:
      return { ...state, conversation: { ...state.conversation, view: action.payload } }
    default:
      return state;
  }
}
