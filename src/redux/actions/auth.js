import { api } from "../../api";

export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const LOG_OUT = "LOG_OUT";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_SOCIAL_AUTH_TOKEN = "SET_SOCIAL_AUTH_TOKEN";
export const SET_ACCOUNT_TYPE = "SET_ACCOUNT_TYPE";
export const SET_LAST_LOGIN = "SET_LAST_LOGIN";
export const SET_RESET_PASSWORD_VERIFICATION = "SET_RESET_PASSWORD_VERIFICATION";
export const SET_RESET_PASSWORD_RESPONSE = "SET_RESET_PASSWORD_RESPONSE";
export const GET_ADMIN_MODULE_PERMISSION_SUCCESS = 'GET_ADMIN_MODULE_PERMISSION_SUCCESS';

export function fetchUser() {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const user = (await api.get("/account/me")).data;
      
      // localStorage.setItem('accountId', user.accountId); //temporary fix for missing account ID in class creation
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      const payload = { status: error.response ? error.response.status : "NetworkError" };
      dispatch(fetchUserError(payload));
      dispatch(logOut());
    }
  };
}

export function fetchUserRequest() {
  return { type: FETCH_USER_REQUEST };
}

export function fetchUserError(data) {
  return { type: FETCH_USER_ERROR, data };
}

export function fetchUserSuccess(data) {
  return { type: FETCH_USER_SUCCESS, data };
}

export function logOut() {
  return { type: LOG_OUT };
}

export function setAuthToken(data) {
  return { type: SET_AUTH_TOKEN, data };
}

export function setSocialAuthToken(data) {
  return { type: SET_SOCIAL_AUTH_TOKEN, data };
}

export function setAccountType(data) {
  return { type: SET_ACCOUNT_TYPE, data };
}

export function setLastLogin(data) {
  return { type: SET_LAST_LOGIN, data };
}

export function setResetPasswordVerification(data) {
  return { type: SET_RESET_PASSWORD_VERIFICATION, data };
}

export function setResetPasswordResponse(data) {
  return { type: SET_RESET_PASSWORD_RESPONSE, data };
}

export function getModulePermissionsSuccess(data)
{
  return { type: GET_ADMIN_MODULE_PERMISSION_SUCCESS, data };
};