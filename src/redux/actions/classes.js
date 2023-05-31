export const SET_CLASSES = "SET_CLASSES";
export const SET_WATCH_CLASS_INFO = "SET_WATCH_CLASS_INFO";
export const SET_CLASS_MAINTENANCE_OPTIONS = "SET_CLASS_MAINTENANCE_OPTIONS";
export const GET_DRAFT_ATTEMPT = "GET_DRAFT_ATTEMPT";
export const SET_DRAFT_CLASS = "SET_DRAFT_CLASS";
export const SAVE_CLASS_SUCCESS = "SAVE_CLASS_SUCCESS";
export const CLEAR_CLASS_SUCCESS = "CLEAR_CLASS_SUCCESS";
export const SAVE_CLASS_ATTEMPT = "SAVE_CLASS_ATTEMPT";
export const SAVE_CLASS_ERROR = "SAVE_CLASS_ERROR";
export const SUBMIT_APPLICATION_SUCCESS = "SUBMIT_APPLICATION_SUCCESS";
export const SUBMIT_APPLICATION_ATTEMPT = "SUBMIT_APPLICATION_ATTEMPT";
export const SUBMIT_APPLICATION_ERROR = "SUBMIT_APPLICATION_ERROR";
export const GET_CLASSES_FOR_APPROVAL_SUCCESS =
  "GET_CLASSES_FOR_APPROVAL_SUCCESS";
export const GET_CLASSES_FOR_APPROVAL_ERROR = "GET_CLASSES_FOR_APPROVAL_ERROR";
export const GET_CLASSES_FOR_APPROVAL_CLEAR = "GET_CLASSES_FOR_APPROVAL_CLEAR";
export const SET_CLASS_APPROVAL_UPDATE_STATUS_MESSAGE =
  "SET_CLASS_APPROVAL_UPDATE_STATUS_MESSAGE";
export const SET_CLASS_ITEMS = "SET_CLASS_ITEMS";
export const GET_CLASSES_FOR_APPROVAL_LOADING =
  "GET_CLASSES_FOR_APPROVAL_LOADING";
export const SAVE_CLASS_LINK_LOADING = "SAVE_CLASS_LINK_LOADING";
export const SAVE_CLASS_LINK_SUCCESS = "SAVE_CLASS_LINK_SUCCESS";
export const SAVE_CLASS_LINK_ERROR = "SAVE_CLASS_LINK_ERROR";

export const SAVE_MODULE_LOADING = "SAVE_MODULE_LOADING";
export const SAVE_MODULE_SUCCESS = "SAVE_MODULE_SUCCESS";
export const SAVE_MODULE_ERROR = "SAVE_MODULE_ERROR";

export function setClasses(data) {
  return { type: SET_CLASSES, data };
}

export function setWatchClassInfo(data) {
  return { type: SET_WATCH_CLASS_INFO, data };
}

export function setClassMaintenanceOptions(data) {
  return { type: SET_CLASS_MAINTENANCE_OPTIONS, data };
}

export function getDraftAttempt() {
  return { type: GET_DRAFT_ATTEMPT };
}

export function setDraftClass(data) {
  return { type: SET_DRAFT_CLASS, data };
}

export function saveClassAttempt() {
  return { type: SAVE_CLASS_ATTEMPT };
}

export function saveClassSuccess(data) {
  return { type: SAVE_CLASS_SUCCESS, data };
}

export function clearClassSuccess() {
  return { type: CLEAR_CLASS_SUCCESS };
}

export function saveClassError(data) {
  return { type: SAVE_CLASS_ERROR, data };
}

export function getClassesForApprovalSuccess(data) {
  return { type: GET_CLASSES_FOR_APPROVAL_SUCCESS, data };
}

export function getClassesForApprovalError(data) {
  return { type: GET_CLASSES_FOR_APPROVAL_ERROR, data };
}

export function getClassesForApprovalClear() {
  return { type: GET_CLASSES_FOR_APPROVAL_CLEAR };
}

export function getClassesForApprovalLoading(data) {
  return { type: GET_CLASSES_FOR_APPROVAL_LOADING, data };
}

export function setClassApprovalUpdateStatusMessage(data) {
  return { type: SET_CLASS_APPROVAL_UPDATE_STATUS_MESSAGE, data };
}

export function setClassItems(data) {
  return { type: SET_CLASS_ITEMS, data };
}

export function saveClassLinkLoading(data) {
  return { type: SAVE_CLASS_LINK_LOADING, data };
}

export function saveClassLinkSuccess() {
  return { type: SAVE_CLASS_LINK_SUCCESS };
}

export function saveClassLinkError() {
  return { type: SAVE_CLASS_LINK_ERROR };
}

export function saveModuleLoading(data) {
  return { type: SAVE_MODULE_LOADING, data };
}

export function saveModuleSuccess(data) {
  return { type: SAVE_MODULE_SUCCESS, data };
}

export function saveModuleError(error) {
  return { type: SAVE_MODULE_ERROR, error };
}