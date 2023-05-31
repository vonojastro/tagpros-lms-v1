import { api } from "../api";
import { getEmailTemplatesSuccess, updateTemplateAction, addTemplateAction } from "../redux/actions/email-template";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";

const EMAIL_TEMPLATE_ENDPOINT = '/email-template';

export const getEmailTemplates = async (dispatch, callback) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get(EMAIL_TEMPLATE_ENDPOINT + "/");

		dispatch(getEmailTemplatesSuccess(response.data));
		!!callback && callback(true);
		console.log(response)
	} catch (error) {
		console.log("(getEmailTemplates) Status:", error);
		!!callback && callback(false);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const updateEmailTemplate = async (dispatch, args, callback) => {
	try {
		//dispatch(onLoadingScreen());

		const response = await api.post(EMAIL_TEMPLATE_ENDPOINT + "/update", args);
		dispatch(updateTemplateAction(response.data));
		callback(true);
	} catch (error) {
		console.log("Status:", error);
		callback(false);
		//dispatch(offLoadingScreen());
	} finally {
		//dispatch(offLoadingScreen());
	}
};

export const addEmailTemplate = async (dispatch, args) => {
	try {
		//dispatch(onLoadingScreen());

		const response = await api.post(EMAIL_TEMPLATE_ENDPOINT + "/add", args);
		dispatch(addTemplateAction(response.data));
	} catch (error) {
		console.log("Status:", error);
		//dispatch(offLoadingScreen());
	} finally {
		//dispatch(offLoadingScreen());
	}
};
