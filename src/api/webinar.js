import { api } from "../api";
import { addWebinarSuccess, getWebinarsSuccess, updateWebinarsSuccess } from "../redux/actions/webinar";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";

const WEBINAR_ENDPOINT = '/webinar';

export const getWebinars = async (dispatch, callback) => {
	try {
		dispatch(onLoadingScreen());

        await api.get(WEBINAR_ENDPOINT + "/").then((result) => {
			dispatch(getWebinarsSuccess(result.data));
			console.log("(getWebinars) Status:", result);
			return result;
		});

		
	} catch (error) {
		console.log("(getWebinars) Status:", error);
		!!callback && callback(false);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getActiveWebinars = async (dispatch, callback) => {
	try {
		dispatch(onLoadingScreen());

        await api.get(WEBINAR_ENDPOINT + "/active").then((result) => {
			dispatch(getWebinarsSuccess(result.data));
			console.log("(getWebinars) Status:", result);
			return result;
		});

		
	} catch (error) {
		console.log("(getWebinars) Status:", error);
		!!callback && callback(false);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const updateWebinar = async (dispatch, args, callback) => {
	try {
		//dispatch(onLoadingScreen());

		const response = await api.post(WEBINAR_ENDPOINT + "/update", args);
		dispatch(updateWebinarsSuccess(response.data));
		callback(true);
	} catch (error) {
		console.log("Status:", error);
		callback(false);
		//dispatch(offLoadingScreen());
	} finally {
		//dispatch(offLoadingScreen());
	}
};

export const saveWebinar = async (dispatch, args) => {
	try {
		//dispatch(onLoadingScreen());

		const response = await api.post(WEBINAR_ENDPOINT + "/add", args);
		dispatch(addWebinarSuccess(response.data));
	} catch (error) {
		console.log("Status:", error);
		//dispatch(offLoadingScreen());
	} finally {
		//dispatch(offLoadingScreen());
	}
};
