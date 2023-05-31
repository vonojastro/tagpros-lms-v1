export const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENTS';
export const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT';
export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT';
export const GET_ACTIVE_ANNOUNCEMENTS = 'GET_ACTIVE_ANNOUNCEMENTS';

export function getAnnouncementsSuccess(data) {
    return { type: GET_ANNOUNCEMENTS, data };
}

export function addAnnouncementSuccess(data) {
    return { type: ADD_ANNOUNCEMENT, data };
}

export function updateAnnouncementSuccess(data) {
    return { type: UPDATE_ANNOUNCEMENT, data };
}
export function getActiveAnnouncementsSuccess(data) {
    return { type: GET_ACTIVE_ANNOUNCEMENTS, data };
}