import { api } from "../../api";

export const GET_ADMIN_ACCOUNTS_SUCCESS = 'GET_ADMIN_ACCOUNTS_SUCCESS';
export const GET_ADMIN_ACCOUNTS_FAIL = 'GET_ADMIN_ACCOUNTS_FAIL';
export const SAVE_ADMIN_DETAILS_SUCCESS = 'SAVE_ADMIN_DETAILS_SUCCESS';
export const SAVE_ADMIN_DETAILS_FAIL = 'SAVE_ADMIN_DETAILS_FAIL';
export const DELETE_ADMIN_ACCOUNT_SUCCESS = 'DELETE_ADMIN_ACCOUNT_SUCCESS';
export const DELETE_ADMIN_ACCOUNT_FAIL = 'DELETE_ADMIN_ACCOUNT_FAIL';
export const DEACTIVATE_ADMIN_ACCOUNT_SUCCESS = 'DEACTIVATE_ADMIN_ACCOUNT_SUCCESS';
export const DEACTIVATE_ADMIN_ACCOUNT_FAIL = 'DEACTIVATE_ADMIN_ACCOUNT_FAIL';
export const ACTIVATE_ADMIN_ACCOUNT_SUCCESS = 'ACTIVATE_ADMIN_ACCOUNT_SUCCESS';
export const ACTIVATE_ADMIN_ACCOUNT_FAIL = 'ACTIVATE_ADMIN_ACCOUNT_FAIL';
export const VALIDATE_TOKEN_EXPIRED_SUCCESS = 'VALIDATE_TOKEN_EXPIRED_SUCCESS';
export const VALIDATE_TOKEN_EXPIRED_FAIL = 'VALIDATE_TOKEN_EXPIRED_FAIL';
export const SAVE_ADMIN_PASSWORD_SUCCESS = 'SAVE_ADMIN_PASSWORD_SUCCESS';
export const SAVE_ADMIN_PASSWORD_FAIL = 'SAVE_ADMIN_PASSWORD_FAIL';
export const RESET_ADMIN_PASS_SUCCESS = 'RESET_ADMIN_PASS_SUCCESS';
export const RESET_ADMIN_PASS_FAIL = 'RESET_ADMIN_PASS_FAIL';
export const FETCH_DASHBOARD_REQUEST = 'FETCH_DASHBOARD_REQUEST';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR';

export function fetchDashboardAccess() {
    return async (dispatch) => {
      dispatch(fetchDashboardRequest());
      try {
        const access = (await api.get("admin/user-access")).data;
        dispatch(fetchDashboardSuccess(access));
      } catch (error) {
        const payload = { status: error.response ? error.response.status : "NetworkError" };
        dispatch(fetchDashboardError(payload));
        // dispatch(logOut());
      }
    };
}

export function resetPassLinkSuccess(data)
{
    return { type: RESET_ADMIN_PASS_SUCCESS, data };
};

export function getAllAdminAccountsSuccess(data) {
    return { type: GET_ADMIN_ACCOUNTS_SUCCESS, data };
};

export function saveAdminDetailsSuccess(data) {
    return { type: SAVE_ADMIN_DETAILS_SUCCESS, data };
};

export function deleteAdminAccountSuccess(data) {
    return { type: DELETE_ADMIN_ACCOUNT_SUCCESS, data };
};

export function deactivateAdminAccountSuccess(data) {
    return { type: DELETE_ADMIN_ACCOUNT_SUCCESS, data };
};

export function activateAdminAccountSuccess(data) {
    return { type: DELETE_ADMIN_ACCOUNT_SUCCESS, data };
};

export function validateTokenExpiredSuccess(data) {
    return { type: VALIDATE_TOKEN_EXPIRED_SUCCESS, data };
};

export function saveAdminPasswordSuccess(data) {
    return { type: SAVE_ADMIN_PASSWORD_SUCCESS, data };
};

export function getAllAdminAccountsFail(data) {
    return { type: GET_ADMIN_ACCOUNTS_FAIL, data };
};

export function saveAdminDetailsFail(data) {
    return { type: SAVE_ADMIN_DETAILS_FAIL, data };
};

export function deleteAdminAccountFail(data) {
    return { type: DELETE_ADMIN_ACCOUNT_FAIL, data };
};

export function deactivateAdminAccountFail(data) {
    return { type: DELETE_ADMIN_ACCOUNT_FAIL, data };
};

export function activateAdminAccountFail(data) {
    return { type: DELETE_ADMIN_ACCOUNT_FAIL, data };
};

export function validateTokenExpiredFail(data) {
    return { type: VALIDATE_TOKEN_EXPIRED_FAIL, data };
};

export function saveAdminPasswordFail(data) {
    return { type: SAVE_ADMIN_PASSWORD_FAIL, data };
};

export function resetPassLinkFail(data)
{
    return { type: RESET_ADMIN_PASS_FAIL, data };
};

export function fetchDashboardRequest(data) {
    return { type: FETCH_DASHBOARD_REQUEST, data };
}

export function fetchDashboardSuccess(data) {
    return { type: FETCH_DASHBOARD_SUCCESS, data };
}

export function fetchDashboardError(data) {
    return { type: FETCH_DASHBOARD_ERROR, data };
}