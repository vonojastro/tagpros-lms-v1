import Immutable from "immutable";

import {
    GET_SHOPPING_CART
} from "../actions/cart";

const initialState = { 
    data: {
      cart: []
    }
};

const cart = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  switch (action.type) {
    case GET_SHOPPING_CART:
      newState = newState.setIn(["data", "cart"], action.data);
      break;
    default:
      return state;
  }

  return newState;
};
  
export default cart;