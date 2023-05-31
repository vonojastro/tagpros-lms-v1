export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_EMAIL_COMPOSER = 'TOGGLE_EMAIL_COMPOSER';
export const SET_ROUTE = 'SET_ROUTE';
export const SET_CURRENT_EMAIL = 'SET_CURRENT_EMAIL';
export const GET_EMAIL_THREADS = 'GET_EMAIL_THREADS';
export const GET_EMAIL_THREADS_ERROR = 'GET_EMAIL_THREADS_ERROR';
export const GET_EMAIL_THREADS_SUCCESS = 'GET_EMAIL_THREADS_SUCCESS';
export const GET_EMAIL_THREAD = 'GET_EMAIL_THREAD';
export const GET_EMAIL_THREAD_ERROR = 'GET_EMAIL_THREAD_ERROR';
export const GET_EMAIL_THREAD_SUCCESS = 'GET_EMAIL_THREAD_SUCCESS';
export const SET_ACTIVE_DRAFT = 'SET_ACTIVE_DRAFT';

export function toggleSidebar() {
  return { type: TOGGLE_SIDEBAR };
}

export function toggleEmailComposer(truthy) {
  return { type: TOGGLE_EMAIL_COMPOSER, truthy };
}

export function setRoute(newRoute) {
  return { type: SET_ROUTE, newRoute };
}

export function setCurrentEmail(currentEmail) {
  return { type: SET_CURRENT_EMAIL, currentEmail };
}

export function getEmailThreads() {
  return { type: GET_EMAIL_THREADS };
}

export function getEmailThreadsError(error) {
  return { type: GET_EMAIL_THREADS_ERROR, error };
}

export function getEmailThreadsSuccess(data) {
  return { type: GET_EMAIL_THREADS_SUCCESS, data };
}

export function getEmailThread() {
  return { type: GET_EMAIL_THREAD };
}

export function getEmailThreadError(error) {
  return { type: GET_EMAIL_THREAD_ERROR, error };
}

export function getEmailThreadSuccess(data) {
  return { type: GET_EMAIL_THREAD_SUCCESS, data };
}

export function setActiveDraft(activeDraft) {
  return { type: SET_ACTIVE_DRAFT, activeDraft };
}