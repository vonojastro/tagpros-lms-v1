import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOG_OUT,
  SET_AUTH_TOKEN,
  SET_ACCOUNT_TYPE,
  SET_LAST_LOGIN,
  SET_RESET_PASSWORD_VERIFICATION,
  SET_RESET_PASSWORD_RESPONSE,
  SET_SOCIAL_AUTH_TOKEN,
  GET_ADMIN_MODULE_PERMISSION_SUCCESS,
} from "../actions/auth";

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null,
  authToken: null,
  accountType: null,
  lastLogin: null,
  resetPasswordData: {
    message: "",
    status: "",
  },
  permissions: {}
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, success: true, user: { ...state.user, ...action.data } };
    case FETCH_USER_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.data,
        success: false, 
        authToken: null,
      };
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.data };
    case SET_ACCOUNT_TYPE:
      return { ...state, accountType: action.data };
    case SET_LAST_LOGIN:
      sessionStorage.setItem("lastLogin", action.data);
      return { ...state, lastLogin: action.data };
    case LOG_OUT:
      sessionStorage.removeItem("lastLogin");
      return initialState;
    case SET_RESET_PASSWORD_VERIFICATION:
      return { ...state, resetPasswordData: action.data };
    case SET_RESET_PASSWORD_RESPONSE:
      return { ...state, resetPasswordData: action.data };
    case SET_SOCIAL_AUTH_TOKEN: 
      return {...state, socialAuthToken: action.data}
    case GET_ADMIN_MODULE_PERMISSION_SUCCESS: 
      return {...state, permissions: action.data}
    default:
      return state;
  }
};

export default auth;
