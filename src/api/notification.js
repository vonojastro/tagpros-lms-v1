import { api } from ".";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
// import { getNotificationsSuccess, addNotificationSuccess, updateNotificationSuccess, getActiveNotificationsSuccess } from "../redux/actions/notification";
import { getNotificationsSuccess, readNotificationsSuccess, getSelectedNotificationSuccess} from "../redux/actions/notification";

const NOTIFICATION_ENDPOINT = '/notification';

export const getNotifications = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(NOTIFICATION_ENDPOINT);

		dispatch(getNotificationsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getNotifications) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getSelectedNotification = async (dispatch, args, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(NOTIFICATION_ENDPOINT + "/getSelectedNotification", args);

		dispatch(getSelectedNotificationSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getNotifications) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const readNotifications = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(NOTIFICATION_ENDPOINT + "/read");

		dispatch(readNotificationsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(readNotifications) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

// export const addNotification = async (dispatch, args, callback) => {
// 	try {
// 		const response = await api.post(NOTIFICATION_ENDPOINT + "/add", args);

// 		dispatch(addNotificationSuccess(response.data));
// 		callback(true, response.data);
// 	} catch (error) {
// 		console.log("(addNotification) Status:", error);
// 		callback(false);
// 	}
// };

// export const updateNotification = async (dispatch, args, callback) => {
// 	try {
// 		const response = await api.post(NOTIFICATION_ENDPOINT + "/update", args);

// 		dispatch(updateNotificationSuccess(response.data));
// 		callback(true, response.data);
// 	} catch (error) {
// 		console.log("(updateNotification) Status:", error);
// 		callback(false);
// 	}
// };

// export const getActiveNotifications = async (dispatch, callback) => {
// 	try {
//         dispatch(onLoadingScreen());
// 		const response = await api.get(NOTIFICATION_ENDPOINT + "/active");

// 		dispatch(getActiveNotificationsSuccess(response.data));
// 	} catch (error) {
// 		console.log("(getActiveNotifications) Status:", error);
//         dispatch(offLoadingScreen());
// 	} finally {
// 		dispatch(offLoadingScreen());
// 	}
// };
