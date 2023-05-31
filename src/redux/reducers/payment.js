import Immutable from "immutable";

import {
    GET_PROCESSORS,
    GET_PAYMENT_HISTORY,
    GET_PAYOUTS,
} from "../actions/payment";

const initialState = { 
    data: {
      processors: null,
      payments: [],
      payouts: []
    }
};

const payment = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_PAYMENT_HISTORY:
      newState = newState.setIn(["data", "payments"], action.data);
      break;
    case GET_PROCESSORS:
      newState = newState.setIn(["data", "processors"], action.data);
      break;
    case GET_PAYOUTS:
      newState = newState.setIn(["data", "payouts"], action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default payment;