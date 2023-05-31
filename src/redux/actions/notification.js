export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export const GET_ACTIVE_NOTIFICATIONS = 'GET_ACTIVE_NOTIFICATIONS';
export const READ_NOTIFICATIONS = 'READ_NOTIFICATIONS';
export const GET_SELECTED_NOTIFICATION = 'GET_SELECTED_NOTIFICATION';

export function getNotificationsSuccess(data) {
    return { type: GET_NOTIFICATIONS, data };
}

export function addNotificationSuccess(data) {
    return { type: ADD_NOTIFICATION, data };
}

export function updateNotificationSuccess(data) {
    return { type: UPDATE_NOTIFICATION, data };
}
export function getActiveNotificationsSuccess(data) {
    return { type: GET_ACTIVE_NOTIFICATIONS, data };
}

export function readNotificationsSuccess(data) {
    return { type: READ_NOTIFICATIONS, data };
}

export function getSelectedNotificationSuccess(data) {
    return { type: GET_SELECTED_NOTIFICATION, data };
}
