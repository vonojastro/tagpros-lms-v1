export const GET_ALL_EMAIL_TEMPLATES = 'GET_ALL_EMAIL_TEMPLATES';
export const UPDATE_EMAIL_TEMPLATE = 'UPDATE_EMAIL_TEMPLATE';
export const ADD_EMAIL_TEMPLATE = 'ADD_EMAIL_TEMPLATE';

export function getEmailTemplatesSuccess(data) {
    return { type: GET_ALL_EMAIL_TEMPLATES, data };
};

export function updateTemplateAction(data) {
    return { type: UPDATE_EMAIL_TEMPLATE, data };
}

export function addTemplateAction(data) {
    return { type: ADD_EMAIL_TEMPLATE, data };
}