import Immutable from "immutable";

import {
  GET_LIVE_CHAT_RECIPIENT
} from "../actions/messages";

const initialState = { 
    data: {
      recipients: []
    }
};

const messages = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_LIVE_CHAT_RECIPIENT:
      newState = newState.setIn(["data", "recipients"], action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default messages;