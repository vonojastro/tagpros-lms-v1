import { api } from "../api";
import { getSchoolLeadersSuccess, submitSchoolLeaderReviewSuccess } from "redux/actions/schoolLeader";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements"

const SCHOOL_LEADERS_ENDPOINT = '/school-leader';


export const getSchoolLeaders = async (dispatch, callback) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get(SCHOOL_LEADERS_ENDPOINT + "/all");

		dispatch(getSchoolLeadersSuccess(response.data));
		!!callback && callback(true);
		console.log(response)
	} catch (error) {
		!!callback && callback(false);
		console.log("(getSchoolLeaders) Status:", error);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const submitSchoolLeaderReview = async (dispatch, args, callback) => {
	try {
		const response = await api.post(SCHOOL_LEADERS_ENDPOINT + "/review", args);
		dispatch(submitSchoolLeaderReviewSuccess({ index: args.index, message: response.data }));
		callback && callback(true);
		console.log(response)
	} catch (error) {
		callback && callback(false);
		console.log("(submitSchoolLeaderReview) Status:", error);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};
