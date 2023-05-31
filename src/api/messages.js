import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import { getLiveChatRecipientsSuccess, getLiveChatWithRecipientsSuccess } from "../redux/actions/messages";

const LIVE_MESSAGES_ENDPOINT = '/messages/live';

export const getAPIKey = () =>{
	switch(process.env)
	{
		case 'Development':
			return 'a7ecc3541826dd4726fd';
		case 'Staging':
			return '139f92bdfd2074d69892';
		case 'Production':
			return 'bf80131454cd25174552';
		default:
			return 'a7ecc3541826dd4726fd';
	}
};

export const getCluster = () =>{
	switch(process.env)
	{
		case 'Development':
			return 'ap1';
		case 'Staging':
			return 'ap1';
		case 'Production':
			return 'ap1';
		default:
			return 'ap1';
	}
}

export const getLiveChatRecipients = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(LIVE_MESSAGES_ENDPOINT + "/me");
		callback && callback(true, response.data);
		dispatch(getLiveChatRecipientsSuccess(response.data));
	} catch (error) {
		console.log("(getLiveChatRecipients) Status:", error);
		callback && callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getLiveChatWithRecipients = async (recipientId,dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(LIVE_MESSAGES_ENDPOINT + "/" + recipientId);
		callback && callback(true, response.data);
		dispatch(getLiveChatWithRecipientsSuccess(response.data));
	} catch (error) {
		console.log("(getLiveChatWithRecipients) Status:", error);
		callback && callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getMyStudents = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(LIVE_MESSAGES_ENDPOINT + "/students");
		callback && callback(true, response.data);
	} catch (error) {
		console.log("(getMyStudents) Status:", error);
		callback && callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getMyTeachers = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(LIVE_MESSAGES_ENDPOINT + "/teachers");
		callback && callback(true, response.data);
	} catch (error) {
		console.log("(getMyTeachers) Status:", error);
		callback && callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const addLiveMessage = async (args, dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(LIVE_MESSAGES_ENDPOINT + "/add", args);
		callback && callback(true, response.data);
	} catch (error) {
		console.log("(addLiveMessage) Status:", error);
		callback && callback(false, error);
	} finally {
	}
};