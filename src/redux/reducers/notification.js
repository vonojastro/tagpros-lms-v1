import Immutable from "immutable";

import {
    GET_NOTIFICATIONS,
    READ_NOTIFICATIONS
} from "../actions/notification";

const initialState = { 
    data: {
      notifications: []
    }
};

const notification = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_NOTIFICATIONS:
      newState = newState.setIn(["data", "notifications"], action.data);
      break;

    case READ_NOTIFICATIONS:
      newState = newState.set("notification", action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default notification;