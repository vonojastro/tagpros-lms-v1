import Immutable from "immutable";

import {
    GET_PRICING
} from "../actions/pricing";

const initialState = { 
    data: {
      pricing: []
    }
};

const pricing = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_PRICING:
      newState = newState.setIn(["data", "pricing"], action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default pricing;