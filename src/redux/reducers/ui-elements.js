import Immutable from "immutable";

import { ON_LOADING_SCREEN, OFF_LOADING_SCREEN, TOGGLE_LOGOUT_MODAL } from "../actions/ui-elements";


const initialState = {
	loadingScreen: true,
	logoutModal: false
};

const uiElements = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  // eslint-disable-next-line default-case
  switch (action.type) {
		case ON_LOADING_SCREEN: 
			newState = newState.set("loadingScreen", action.data);
			break;
		case OFF_LOADING_SCREEN: 
			newState = newState.set("loadingScreen", action.data);
			break;
		case TOGGLE_LOGOUT_MODAL:
			newState = newState.set("logoutModal", ( action['truthy'] !== undefined ? action.truthy : state.logoutModal ));
			break;
  }
  return newState;
};

export default uiElements;
