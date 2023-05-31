import {
    FETCH_DASHBOARD_REQUEST,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_ERROR,
} from "../actions/admin";
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    permissions: {}
  };
  
  const admin = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DASHBOARD_REQUEST:
        return { ...state, loading: true, error: null, success: false };
      case FETCH_DASHBOARD_SUCCESS:
        return { ...state, loading: false, success: true, permissions: action.data };
      case FETCH_DASHBOARD_ERROR:
        return { ...state, loading: false, error: action.data, success: false};
      default:
        return state;
    }
  };
  
  export default admin;  