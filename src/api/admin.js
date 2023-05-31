import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import {
    getAllAdminAccountsSuccess,
    saveAdminDetailsSuccess,
    deleteAdminAccountSuccess,
    deactivateAdminAccountSuccess,
    activateAdminAccountSuccess,
    getAllAdminAccountsFail,
    saveAdminDetailsFail,
    deleteAdminAccountFail,
    deactivateAdminAccountFail,
    activateAdminAccountFail,
	validateTokenExpiredSuccess,
	validateTokenExpiredFail,
	saveAdminPasswordSuccess,
	saveAdminPasswordFail,
	resetPassLinkSuccess,
	resetPassLinkFail
} from "../redux/actions/admin";
import { getModulePermissionsSuccess } from "redux/actions/auth";

const ADMIN_ENDPOINT = "/admin";


export const getAllAdminAccounts = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(ADMIN_ENDPOINT + "/getAllAdminAccounts");

		dispatch(getAllAdminAccountsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(getAllAdminAccountsFail(error));
		console.log("(getAllAdminAccounts) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const saveAdminDetails = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());

		const response = await api.post(ADMIN_ENDPOINT + "/saveAdminDetails", args);

		dispatch(saveAdminDetailsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(saveAdminDetailsFail(error));

		console.log("(saveAdminDetails) Status:", error);
		callback(false,error);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const deleteAdminAccount = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());

		const response = await api.post(ADMIN_ENDPOINT + "/deleteAdminAccount", args);

		dispatch(deleteAdminAccountSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(deleteAdminAccountFail(error));

		console.log("(deleteAdminAccount) Status:", error);
		callback(false);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const deactivateAdminAccount = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());

		const response = await api.post(ADMIN_ENDPOINT + "/deactivateAdminAccount", args);

		dispatch(deactivateAdminAccountSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(deactivateAdminAccountFail(error));

		console.log("(deactivateAdminAccount) Status:", error);
		callback(false);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const activateAdminAccount = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());

		const response = await api.post(ADMIN_ENDPOINT + "/activateAdminAccount", args);

		dispatch(activateAdminAccountSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(activateAdminAccountFail(error));

		console.log("(activateAdminAccount) Status:", error);
		callback(false);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const validateTokenExpired = async (dispatch, args, callback) =>{
	try {
        dispatch(onLoadingScreen());

		const response = await api.post(ADMIN_ENDPOINT + "/validateTokenExpired", args);

		dispatch(validateTokenExpiredSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(validateTokenExpiredFail(error));

		console.log("(validateTokenExpired) Status:", error);
		callback(false);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const saveAdminPassword = async (dispatch, args, callback) =>{
	try {
        dispatch(onLoadingScreen());
		const credentials = {newPassword: args.newPassword, confirmPassword: args.confirmPassword}
		const response = await api.post(ADMIN_ENDPOINT + "/saveAdminPassword", credentials, {
			headers: { Authorization: "Bearer " + args.token },
		  });

		dispatch(saveAdminPasswordSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(saveAdminPasswordFail(error));
		console.log("(saveAdminPassword) Status:", error);
		callback(false, error);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const resetPassLink = async (dispatch, args, callback) =>{
	try {
        dispatch(onLoadingScreen());

		const response = await api.post(ADMIN_ENDPOINT + "/resendPasswordChangeLink", args);

		dispatch(resetPassLinkSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(resetPassLinkFail(error));

		console.log("(resetPassLink) Status:", error);
		callback(false);
	}
    finally{
        dispatch(offLoadingScreen());
    }
};

export const getSurveillanceData = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(ADMIN_ENDPOINT + "/getSurveillanceCalendarData", args);

		callback(true, response.data);
	} catch (error) {
		console.log("(getSurveillanceData) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
		throw error;
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getAllModulePermission = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(ADMIN_ENDPOINT + "/permissions");
		dispatch(getModulePermissionsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getAllModulePermission) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
		throw error;
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const updateModulePermission = async (dispatch, args, callback) => {
	try {
        // dispatch(onLoadingScreen());
		const response = await api.post(ADMIN_ENDPOINT + "/permissions", args);
		callback(true, response.data);
	} catch (error) {
		console.log("(updateModulePermission) Status:", error);
		callback(false);
        // dispatch(offLoadingScreen());
		throw error;
	} finally {
		// dispatch(offLoadingScreen());
	}
};