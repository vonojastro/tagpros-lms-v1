import { api } from "../api";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import {
    getAllShortListedTeacherSuccess,
    getAllShortListedTeacherFail,
	forInterviewTeacherSuccess,
	forInterviewTeacherFail,
	getAllForInterviewTeacherSuccess,
	getAllForInterviewTeacherFail,
	updateFinalListFail,
	updateFinalListSuccess,
	getAcceptedTeachersFail,
	getAcceptedTeachersSuccess,
	getRejectedTeachersFail,
	getRejectedTeachersSuccess,
	addInterviewNotesFail,
	addInterviewNotesSuccess,
	getTeachersBySchoolLeaderSuccess,
	getTeachersBySchoolLeaderFail
} from "../redux/actions/school-leader";

const SCHOOL_LEADER_API = "/school-leader";


export const getAllShortListedTeacher = async(dispatch, callback) =>{
    try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/getAllShortListedTeacher");

		dispatch(getAllShortListedTeacherSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(getAllShortListedTeacherFail(error));
		console.log("(getAllShortListedTeacher) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getAllForInterviewTeacher = async(dispatch, callback) =>{
    try {
        dispatch(onLoadingScreen());
		const response = await api.get(SCHOOL_LEADER_API + "/getAllForInterviewTeacher");

		dispatch(getAllForInterviewTeacherSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(getAllForInterviewTeacherFail(error));
		console.log("(getAllForInterviewTeacher) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const forInterviewTeacher = async (dispatch, args, callback) =>{
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/forInterviewTeacher", args);

		dispatch(forInterviewTeacherSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(forInterviewTeacherFail(error));
		console.log("(forInterviewTeacher) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const updateFinalList = async (dispatch, args, callback) =>{
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/updateFinalList", args);

		dispatch(updateFinalListSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(updateFinalListFail(error));
		console.log("(updateFinalList) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const addInterviewNotes = async (dispatch, args, callback) =>{
	try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/addInterviewNotes", args);

		dispatch(addInterviewNotesSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(addInterviewNotesFail(error));
		console.log("(addInterviewNotes) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getAcceptedTeachers = async(dispatch, callback) =>{
    try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/getAcceptedTeachers");

		dispatch(getAcceptedTeachersSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(getAcceptedTeachersFail(error));
		console.log("(getAcceptedTeachers) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getRejectedTeachers = async(dispatch, callback) =>{
    try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/getRejectedTeachers");

		dispatch(getRejectedTeachersSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(getRejectedTeachersFail(error));
		console.log("(getRejectedTeachers) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};

export const getTeachersBySchoolLeader = async(dispatch, args, callback) =>{
    try {
        dispatch(onLoadingScreen());
		const response = await api.post(SCHOOL_LEADER_API + "/getTeachersBySchoolLeader", args);

		dispatch(getTeachersBySchoolLeaderSuccess(response.data));
		callback(true, response.data);
	} catch (error) {
        dispatch(getTeachersBySchoolLeaderFail(error));
		console.log("(getTeachersBySchoolLeader) Status:", error);
		callback(false, error);
        dispatch(offLoadingScreen());
	} finally {
		dispatch(offLoadingScreen());
	}
};