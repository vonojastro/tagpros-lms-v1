import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import { getDiscountsSuccess, saveDiscountSuccess, updateDiscountSuccess } from "../redux/actions/discount";

const DISCOUNT_ENDPOINT = '/discount';

export const getDiscounts = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(DISCOUNT_ENDPOINT + "/list");

		dispatch(getDiscountsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getDiscounts) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const saveDiscount = async (dispatch, args, callback) => {
	try {
		const response = await api.post(DISCOUNT_ENDPOINT + "/add", args);

		dispatch(saveDiscountSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(saveDiscount) Status:", error);
		callback(false);
	}
};

export const updateDiscount = async (dispatch, args, callback) => {
	try {
		const response = await api.post(DISCOUNT_ENDPOINT + "/update", args);

		dispatch(updateDiscountSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(updateDiscount) Status:", error);
		callback(false);
	}
};
