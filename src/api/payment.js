import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import { getProcessorsSuccess, getPaymentsSuccess, getPayoutsSuccess } from "../redux/actions/payment";

const PAYMENT_ENDPOINT = '/payment';
const PAYOUT_ENDPOINT = '/payout';

export const getProcessors = async (dispatch) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(PAYMENT_ENDPOINT + "/processors");

		dispatch(getProcessorsSuccess(response.data));
	} catch (error) {
		console.log("(getProcessors) Status:", error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getPayments = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(PAYMENT_ENDPOINT + "/");

		dispatch(getPaymentsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getPayments) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getPayouts = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(PAYOUT_ENDPOINT + "/list");

		dispatch(getPayoutsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getPayouts) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};