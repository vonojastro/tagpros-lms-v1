import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import { getShoppingCartSuccess, addCartItemSuccess, updateCartSuccess, deleteFromCartSuccess } from "../redux/actions/cart";

const CART_ENDPOINT = '/cart';

export const getShoppingCart = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(CART_ENDPOINT + "/me");
		callback && callback(true, response.data);
		dispatch(getShoppingCartSuccess(response.data));
	} catch (error) {
		console.log("(getShoppingCart) Status:", error);
		callback && callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const addItemToCart = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(CART_ENDPOINT + "/add", args);

		dispatch(addCartItemSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(addItemToCart) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const updateCartItem = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(CART_ENDPOINT + "/update", args);

		dispatch(updateCartSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(updateCartItem) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const deleteCartItem = async (dispatch, args, callback) => {
	try {
        // dispatch(onLoadingScreen());
		const response = await api.post(CART_ENDPOINT + "/remove", args);

		dispatch(deleteFromCartSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(deleteCartItem) Status:", error);
		callback(false);
        // dispatch(offLoadingScreen());
	} finally {
		// dispatch(offLoadingScreen());
	}
};
