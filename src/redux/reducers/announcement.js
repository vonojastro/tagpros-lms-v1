import Immutable from "immutable";

import {
    GET_ANNOUNCEMENTS,
    GET_ACTIVE_ANNOUNCEMENTS
} from "../actions/announcement";

const initialState = { 
    data: {
      announcements: []
    }
};

const announcement = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      newState = newState.setIn(["data", "announcements"], action.data);
      break;

    case GET_ACTIVE_ANNOUNCEMENTS:
      newState = newState.setIn(["data", "announcements"], action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default announcement;