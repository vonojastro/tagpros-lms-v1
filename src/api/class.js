import { api } from "../api";
import { getClassesSuccess, getClassesAdminSuccess, submitClassApprovalAction, getActiveClassesSuccess, getEnrolledClasses, getAllStudentsEnrolled, getClassDetailsSuccess, getPendingEnrollmentSuccess, getFinalRecordedClasses } from "redux/actions/class";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements"

const CLASS_ENDPOINT = '/class';

export const getAllClasses = async (dispatch) => {
	try {
		const response = await api.get(CLASS_ENDPOINT + "/me");

		dispatch(getClassesSuccess(response.data));

		console.log(response)
	} catch (error) {
		console.log("(getAllClasses) Status:", error);
	}
};

export const getClassesAdmin = async (dispatch, callback) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get(CLASS_ENDPOINT + "/final");

		dispatch(getClassesAdminSuccess(response.data));
		!!callback && callback(true);
		console.log(response)
	} catch (error) {
		!!callback && callback(false);
		console.log("(getClassesAdmin) Status:", error);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getFinalRecordedClassesDispatch = async (dispatch, callback) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get(CLASS_ENDPOINT + "/final/recorded");

		dispatch(getFinalRecordedClasses(response.data));
		!!callback && callback(true);
		console.log(response)
	} catch (error) {
		!!callback && callback(false);
		console.log("(getFinalRecordedClasses) Status:", error);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const submitClassApproval = async (dispatch, args, callback) => {
	try {
		const response = await api.post(CLASS_ENDPOINT + "/review", args);
		callback && callback(true);
		dispatch(submitClassApprovalAction({index: args.index, status: response.data.data.STATUS}));
	} catch (error) {
		callback && callback(false, error.response);
		console.log("Status:", error);
	}
};


export const getAllActiveClasses = async (dispatch) => {
	try {
		dispatch(onLoadingScreen());
		await api.get("/class-learner/getAllActive").then((result) => {
			dispatch(getActiveClassesSuccess(result.data));
			console.log(result)
			return result;
		});
	
	} catch (error) {
		dispatch(offLoadingScreen());
		console.log("(getActiveClassesSuccess) Status:", error);
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getEnrolledClass = async (dispatch) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get("/class-enroll/viewMyClass");

		dispatch(getEnrolledClasses(response.data));

	} catch (error) {
		dispatch(offLoadingScreen());
		console.log("(getEnrolledClasses) Status:", error);
	} finally {
		dispatch(offLoadingScreen());
	}
}

export const getPendingEnrollment = async (dispatch) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get("/class-enroll/viewPendingEnrollment");

		dispatch(getPendingEnrollmentSuccess(response.data));

	} catch (error) {
		dispatch(offLoadingScreen());
		console.log("(getEnrolledClasses) Status:", error);
	} finally {
		dispatch(offLoadingScreen());
	}
}

export const getAllMyStudents = async (dispatch) => {
	try {
		const response = await api.get("/class-enroll/viewAllStudents");

		dispatch(getAllStudentsEnrolled(response.data));

	} catch (error) {
		console.log("(getAllMyStudents) Status:", error);
	}
}

export const getClassDetails = async (dispatch, args) => {
	try {
		dispatch(onLoadingScreen());
		const response = await api.get(CLASS_ENDPOINT + "/" + args.id);

		dispatch(getClassDetailsSuccess(response.data));

		console.log(response)
	} catch (error) {
		console.log("(getAllClasses) Status:", error);
		dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};