import Immutable from "immutable";

import {
    GET_DISCOUNTS
} from "../actions/discount";

const initialState = { 
    data: {
      discounts: []
    }
};

const discount = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_DISCOUNTS:
      newState = newState.setIn(["data", "discounts"], action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default discount;