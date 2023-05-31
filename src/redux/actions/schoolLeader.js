export const GET_ALL_SCHOOL_LEADERS = 'GET_ALL_SCHOOL_LEADERS';
export const SUBMIT_SCHOOL_LEADER_REVIEW = 'SUBMIT_SCHOOL_LEADER_REVIEW';

export function getSchoolLeadersSuccess(data) {
    return { type: GET_ALL_SCHOOL_LEADERS, data };
}

export function submitSchoolLeaderReviewSuccess(data) {
    return { type: SUBMIT_SCHOOL_LEADER_REVIEW, data };
}