export const GET_CLASSES = 'GET_CLASSES';
export const GET_CLASSES_ADMIN = 'GET_CLASSES_ADMIN';
export const POST_CLASS_APPROVAL = 'POST_CLASS_APPROVAL';
export const GET_ACTIVE_CLASSES = 'GET_ACTIVE_CLASSES';
export const GET_LEARNER_ENROLLED_CLASSES = 'GET_LEARNER_ENROLLED_CLASSES';
export const GET_ALL_ENROLLED_CLASSES = 'GET_ALL_ENROLLED_CLASSES';
export const GET_CLASS_DETAILS = 'GET_CLASS_DETAILS';
export const ENROLL_CLASS = 'ENROLL_CLASS';
export const ENROLL_CLASS_SOLO = 'ENROLL_CLASS_SOLO';
export const GET_PENDING_ENROLLMENT = 'GET_PENDING_ENROLLMENT';
export const VIEW_ALL_CLASS= 'VIEW_ALL_CLASS';
export const GET_ENROLLMENT_HISTORY = 'GET_ENROLLMENT_HISTORY';
export const GET_FINAL_RECORDED_CLASSES = "GET_FINAL_RECORDED_CLASSES"

export function getClassesSuccess(data) {
    return { type: GET_CLASSES, data };
}

export function getClassesAdminSuccess(data) {
    return { type: GET_CLASSES_ADMIN, data };
}

export function submitClassApprovalAction(data) {
    return { type: POST_CLASS_APPROVAL, data };
}

export function getActiveClassesSuccess(data) {
    return { type: GET_ACTIVE_CLASSES, data };
}

export function getEnrolledClasses(data) {
	return { type: GET_LEARNER_ENROLLED_CLASSES, data };
}

export function getPendingEnrollmentSuccess(data) {
	return { type: GET_PENDING_ENROLLMENT, data };
}

export function getAllStudentsEnrolled(data) {
	return { type: GET_ALL_ENROLLED_CLASSES, data };
}

export function getClassDetailsSuccess(data) {
	return { type: GET_CLASS_DETAILS, data };
}

export function enrollClassSuccess(data) {
    return { type: ENROLL_CLASS, data };
}

export function enrollClassSoloSuccess(data) {
    return { type: ENROLL_CLASS_SOLO, data };
}

export function viewAllClassSuccess(data) {
    return { type: VIEW_ALL_CLASS, data };
}

export function getEnrollmentHistorySuccess(data){
    return { type: GET_ENROLLMENT_HISTORY, data };
}

export function getFinalRecordedClasses(data){
    return { type: GET_FINAL_RECORDED_CLASSES, data };
}