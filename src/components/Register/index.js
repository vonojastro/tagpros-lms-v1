import { connect } from "react-redux";

import { submitRegistration } from "../../api/registration";
import { offLoadingScreen } from "../../redux/actions/ui-elements";
import Register from "./Register";

const mapStateToProps = (state) => {
	// * Convert Immutable maps into JS object.
	const registrationStates = state.registration.toJS();
	const uiElementsStates = state.uiElements.toJS();

	const registration = registrationStates.registration;
	
	return {
		state: state,
		message: registration.message,
		status: registration.status,
		loadingScreen: uiElementsStates.loadingScreen
	}
};

const mapDispatchToProps = (dispatch) => {
  return {
		submitRegistration: (params) => submitRegistration(dispatch, params),
		offLoadingScreen: () => dispatch(offLoadingScreen())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);