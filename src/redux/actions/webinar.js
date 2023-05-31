export const GET_WEBINARS = 'GET_WEBINARS';
export const UPDATE_WEBINAR = 'UPDATE_WEBINAR';
export const ADD_WEBINAR = 'ADD_WEBINAR';

export function getWebinarsSuccess(data) {
    return { type: GET_WEBINARS, data };
};

export function updateWebinarsSuccess(data) {
    return { type: UPDATE_WEBINAR, data };
}

export function addWebinarSuccess(data) {
    return { type: ADD_WEBINAR, data };
}