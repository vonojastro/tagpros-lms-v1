export const GET_ALL_TEACHERS = 'GET_ALL_TEACHERS';
export const SUBMIT_TEACHER_REVIEW = 'SUBMIT_TEACHER_REVIEW';
export const GET_TEACHER_APPLICATION = 'GET_TEACHER_APPLICATION';
export const GET_TEACHER_PAYOUT = 'GET_TEACHER_PAYOUT';
export const SAVE_TEACHER_PAYOUT = 'SAVE_TEACHER_PAYOUT';
export const GET_ALL_RECORDED_VIDEOS = 'GET_ALL_RECORDED_VIDEOS';
export const SAVE_TEACHER_SELECTED_VIDEOS = 'SAVE_TEACHER_SELECTED_VIDEOS';
export const GET_SELECTED_RECORDED_VIDEOS = 'GET_SELECTED_RECORDED_VIDEOS';

export function getAllTeachersSuccess(data) {
    return { type: GET_ALL_TEACHERS, data };
}

export function submitTeacherReviewSuccess(data) {
    return { type: SUBMIT_TEACHER_REVIEW, data };
}

export function getTeacherApplicationAction(data) {
    return { type: GET_TEACHER_APPLICATION, data };
}

export function saveTeacherPayoutAccountSuccess(data) {
    return { type: SAVE_TEACHER_PAYOUT, data };
}

export function getTeacherPayoutAccountSuccess(data) {
    return { type: GET_TEACHER_PAYOUT, data };
}

export function getAllClassRecordingsSuccess(data){
    return {
        type: GET_ALL_RECORDED_VIDEOS, data
    };
}

export function saveSelectedClassRecordingsSuccess(data){
    return { type: SAVE_TEACHER_SELECTED_VIDEOS, data };
}

export function getAllSelectedVideos(data){
    return {
        type: GET_SELECTED_RECORDED_VIDEOS, data
    };
}