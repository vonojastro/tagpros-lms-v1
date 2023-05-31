import { connect } from 'react-redux';

import { changePasswordNoCB } from '../../api/account';
import ResetPassword from './ResetPassword';
import { offLoadingScreen } from '../../redux/actions/ui-elements';

const mapStateToProps = (state) => {
  const resetPassword = state.auth.resetPasswordData;
  const uiElementsStates = state.uiElements.toJS();

  return {
    state: state,
    message: resetPassword.message,
    status: resetPassword.status,
    loadingScreen: uiElementsStates.loadingScreen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    offLoadingScreen: () => dispatch(offLoadingScreen()),
    changePasswordNoCB: (params) => changePasswordNoCB(dispatch, params),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
