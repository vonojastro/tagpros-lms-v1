import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import { getAnnouncementsSuccess, addAnnouncementSuccess, updateAnnouncementSuccess, getActiveAnnouncementsSuccess } from "../redux/actions/announcement";

const ANNOUNCEMENT_ENDPOINT = '/announcement';

export const getAnnouncements = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(ANNOUNCEMENT_ENDPOINT);

		dispatch(getAnnouncementsSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(getAnnouncements) Status:", error);
		callback(false);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const addAnnouncement = async (dispatch, args, callback) => {
	try {
		const response = await api.post(ANNOUNCEMENT_ENDPOINT + "/add", args);

		dispatch(addAnnouncementSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(addAnnouncement) Status:", error);
		callback(false);
	}
};

export const updateAnnouncement = async (dispatch, args, callback) => {
	try {
		const response = await api.post(ANNOUNCEMENT_ENDPOINT + "/update", args);

		dispatch(updateAnnouncementSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
		console.log("(updateAnnouncement) Status:", error);
		callback(false);
	}
};

export const getActiveAnnouncements = async (dispatch, callback) => {
	try {
        dispatch(onLoadingScreen());
		const response = await api.get(ANNOUNCEMENT_ENDPOINT + "/active");

		dispatch(getActiveAnnouncementsSuccess(response.data));
	} catch (error) {
		console.log("(getActiveAnnouncements) Status:", error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};
