import Immutable from "immutable";

import { REGISTRATION_PROCESS } from "../actions/registration";

const initialState = {
	registration: {
		status: "",
		registrationId: "",
		message: ""
	}
};

const registration = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REGISTRATION_PROCESS:
      newState = newState.set("registration", action.data);
			break;
  }
  return newState;
};

export default registration;
