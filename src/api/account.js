import { api } from "../api";
import {
  fetchUserSuccess,
  setResetPasswordVerification,
  setResetPasswordResponse,
} from "../redux/actions/auth";
import {
  getAllAccountsSuccess,
  updateAccountStatusAction,
} from "../redux/actions/account";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";

const ACCOUNT_ENDPOINT = "/account";
const AUTH_ENDPOINT = "/auth";

export const getUserProfile = async (dispatch) => {
  try {
    const response = await api.get(ACCOUNT_ENDPOINT + "/me");

    dispatch(fetchUserSuccess(response.data));

    console.log(response);
  } catch (error) {
    console.log("(getUserProfile) Status:", error);
  }
};

export const getAllAccounts = async (dispatch, callback) => {
  try {
    dispatch(onLoadingScreen());
    const response = await api.get(ACCOUNT_ENDPOINT + "/list");

    dispatch(getAllAccountsSuccess(response.data));

    !!callback && callback(true);
    console.log(response);
  } catch (error) {
    console.log("(getAllAccounts) Status:", error);
    !!callback && callback(false);
    dispatch(offLoadingScreen());
  } finally {
    dispatch(offLoadingScreen());
  }
};

export const updateAccountStatus = async (dispatch, args, callback) => {
  try {
    //dispatch(onLoadingScreen());

    const response = await api.post(ACCOUNT_ENDPOINT + "/status", args);
    dispatch(updateAccountStatusAction(response.data));
    !!callback && callback(true);
  } catch (error) {
    console.log("Status:", error);
    !!callback && callback(false);
    //dispatch(offLoadingScreen());
  } finally {
    //dispatch(offLoadingScreen());
  }
};

export const updateAccountDetails = async (dispatch, args, callback) => {
  try {
    const response = await api.post(ACCOUNT_ENDPOINT + "/me", args);
    dispatch(fetchUserSuccess(response.data));
    !!callback && callback(true);
  } catch (error) {
    console.log("Status:", error);
    !!callback && callback(false);
  }
};

export const changePassword = async (args, callback) => {
  try {
    const response = await api.post(ACCOUNT_ENDPOINT + "/password", args);
    !!callback && callback(true, response);
  } catch (error) {
    console.log("Status:", error);
    !!callback && callback(false, error);
  }
};

export const forgotPassword = async (dispatch, args) => {
  try {
    dispatch(onLoadingScreen());
    const response = await api.post(AUTH_ENDPOINT + "/forgot-password", args);
    dispatch(setResetPasswordVerification(response.data));
  } catch (error) {
    dispatch(setResetPasswordVerification(error.response.data));
  } finally {
    dispatch(offLoadingScreen());
  }
};

export const changePasswordNoCB = async (dispatch, args) => {
  try {
    dispatch(onLoadingScreen());

    await api.post(AUTH_ENDPOINT + "/forgot-password/reset/", args, {
      headers: { Authorization: "Bearer " + args.token },
    });

    dispatch(
      setResetPasswordResponse({
        message: "You have change your password successfully.",
        status: "success",
      })
    );
  } catch (error) {
    console.log("ERROR", error.response.data);
    dispatch(setResetPasswordResponse(error.response.data));
  } finally {
    dispatch(offLoadingScreen());
  }
};

export const resendVerificationEmail = (dispatch, { EMAIL_ADD }) => {
  return api.get('auth/verify', { params: { EMAIL_ADD } });
};
