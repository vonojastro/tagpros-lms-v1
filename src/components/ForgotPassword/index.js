import { connect } from "react-redux";

import { forgotPassword } from "../../api/account";
import ForgotPassword from "./ForgotPassword";
import { offLoadingScreen } from "../../redux/actions/ui-elements";

const mapStateToProps = (state) => {
  // * Convert Immutable maps into JS object.
  const resetPasswordData = state.auth.resetPasswordData;
  const uiElementsStates = state.uiElements.toJS();

  return {
    state: state,
    message: resetPasswordData.message,
    status: resetPasswordData.status,
    loadingScreen: uiElementsStates.loadingScreen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    offLoadingScreen: () => dispatch(offLoadingScreen()),
    forgotPassword: (params) => forgotPassword(dispatch, params),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
