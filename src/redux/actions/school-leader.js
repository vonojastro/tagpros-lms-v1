export const GET_ALL_SHORT_LIST_TEACHER_SUCCESS = "GET_ALL_SHORT_LIST_TEACHER_SUCCESS";
export const GET_ALL_SHORT_LIST_TEACHER_FAIL = "GET_ALL_SHORT_LIST_TEACHER_FAIL";
export  const FOR_INTERVIEW_TEACHER_SUCCESS = "FOR_INTERVIEW_TEACHER_SUCCESS";
export  const FOR_INTERVIEW_TEACHER_FAIL = "FOR_INTERVIEW_TEACHER_FAIL";
export const GET_ALL_FOR_INTERVIEW_SUCCESS = "GET_ALL_FOR_INTERVIEW_SUCCESS";
export const GET_ALL_FOR_INTERVIEW_FAIL = "GET_ALL_FOR_INTERVIEW_FAIL";
export const UPDATE_FINAL_LIST_FAIL = "UPDATE_FINAL_LIST_FAIL";
export const UPDATE_FINAL_LIST_SUCCESS = "UPDATE_FINAL_LIST_SUCCESS";
export const GET_ACCEPTED_TEACHERS_FAIL = "GET_ACCEPTED_TEACHERS_FAIL";
export const GET_ACCEPTED_TEACHERS_SUCCESS = "GET_ACCEPTED_TEACHERS_SUCCESS";
export const GET_REJECTED_TEACHERS_SUCCESS = "GET_REJECTED_TEACHERS_SUCCESS";
export const GET_REJECTED_TEACHERS_FAIL = "GET_REJECTED_TEACHERS_FAIL";
export const ADD_INTERVIEW_NOTES_SUCCESS = "ADD_INTERVIEW_NOTES_SUCCESS";
export const ADD_INTERVIEW_NOTES_FAIL = "ADD_INTERVIEW_NOTES_FAIL";
export const GET_TEACHERS_BY_SCHOOL_LEADER_SUCCESS = "GET_TEACHERS_BY_SCHOOL_LEADER_SUCCESS";
export const GET_TEACHERS_BY_SCHOOL_LEADER_FAIL = "GET_TEACHERS_BY_SCHOOL_LEADER_FAIL";

export function getAllShortListedTeacherSuccess (data) {
	return { type: GET_ALL_SHORT_LIST_TEACHER_SUCCESS, data };
};

export function getAllShortListedTeacherFail (data) {
	return { type: GET_ALL_SHORT_LIST_TEACHER_FAIL, data };
};

export function forInterviewTeacherSuccess(data) {
	return { type: FOR_INTERVIEW_TEACHER_SUCCESS, data };
};

export function forInterviewTeacherFail (data) {
	return { type: FOR_INTERVIEW_TEACHER_FAIL, data };
};

export function getAllForInterviewTeacherSuccess (data) {
	return { type: GET_ALL_FOR_INTERVIEW_SUCCESS, data };
};

export function getAllForInterviewTeacherFail (data) {
	return { type: GET_ALL_FOR_INTERVIEW_FAIL, data };
};

export function updateFinalListFail (data) {
	return { type: UPDATE_FINAL_LIST_FAIL, data };
};

export function updateFinalListSuccess (data) {
	return { type: UPDATE_FINAL_LIST_SUCCESS, data };
};

export function getAcceptedTeachersSuccess (data) {
	return { type: GET_ACCEPTED_TEACHERS_SUCCESS, data };
};

export function getAcceptedTeachersFail (data) {
	return { type: GET_ACCEPTED_TEACHERS_FAIL, data };
};

export function getRejectedTeachersFail (data) {
	return { type: GET_REJECTED_TEACHERS_FAIL, data };
};

export function getRejectedTeachersSuccess (data) {
	return { type: GET_REJECTED_TEACHERS_SUCCESS, data };
};

export function addInterviewNotesSuccess (data) {
	return { type: ADD_INTERVIEW_NOTES_SUCCESS, data };
};

export function addInterviewNotesFail (data) {
	return { type: ADD_INTERVIEW_NOTES_FAIL, data };
};

export function getTeachersBySchoolLeaderSuccess (data) {
	return { type: GET_TEACHERS_BY_SCHOOL_LEADER_SUCCESS, data };
};

export function getTeachersBySchoolLeaderFail (data) {
	return { type: GET_TEACHERS_BY_SCHOOL_LEADER_FAIL, data };
};


