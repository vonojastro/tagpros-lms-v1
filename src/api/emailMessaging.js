import {
  getEmailThread,
  getEmailThreadError,
  getEmailThreads,
  getEmailThreadsError,
  getEmailThreadsSuccess,
  getEmailThreadSuccess,
} from 'redux/actions/mailView';
import _ from 'lodash';

import { api } from '../api';

const EMAIL = '/email';

/**
 * @typedef {Object} EmailThread
 * @property {string} threadId
 * @property {string} subject
 * @property {string} createdDate
 * @property {string} updatedDate
 * @property {string} sender
 */

export const getAllEmailThreadsByUser = async dispatch => {
  try {
    if(dispatch)
      dispatch(getEmailThreads());
    const response = await api.post(EMAIL + '/getAllEmailThreadsByUser');
    if(dispatch)
      dispatch(getEmailThreadsSuccess(response.data));
    return response.data
  } catch (error) {
    console.log('🚀 ~ file: emailMessaging.js ~ line 29 ~ error', error);
    if(dispatch)
      dispatch(getEmailThreadsError(error.response || error.request || error));
    throw error;
  }
};

export const getAllMessagesByThreadId = async (dispatch, { threadId }) => {
  try {
    dispatch(getEmailThread());
    const response = await api.post(EMAIL + '/getAllMessagesByThreadId', { threadId });
    dispatch(
      getEmailThreadSuccess(
        _.filter(
          response.data,
          ({ isDeleted, isPermanentlyDeleted }) => !isDeleted && !isPermanentlyDeleted
        )
      )
    );
  } catch (error) {
    console.log('🚀 ~ file: emailMessaging.js ~ line 40 ~ error', error);
    dispatch(getEmailThreadError(error.response || error.request || error));
    throw error;
  }
};

export const sendEmail = async (dispatch, requestPayload) => {
  try {
    const response = await api.post(EMAIL + '/sendEmail', requestPayload);
    console.log('🚀 ~ file: emailMessaging.js ~ line 48 ~ response', response);
    return response.data;
  } catch (error) {
    console.log('🚀 ~ file: emailMessaging.js ~ line 52 ~ error', error);
    throw error;
  }
};

export const deleteEmailMessage = async (dispatch, requestPayload) => {
  try {
    const response = await api.post(EMAIL + '/deleteEmailMessage', requestPayload);
    return response.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: emailMessaging.js ~ line 61 ~ deleteEmailMessage ~ error',
      error
    );
    throw error;
  }
};

export const markEmailThreadsAsRead = async (dispatch, requestPayload) => {
  try {
    const response = await api.post(EMAIL + '/markEmailThreadsAsRead', requestPayload);
    return response.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: emailMessaging.js ~ line 74 ~ markEmailThreadsAsRead ~ error',
      error
    );
    throw error;
  }
};

export const getAllEmailDraftsOfUser = async dispatch => {
  try {
    dispatch(getEmailThreads());
    const response = await api.post(EMAIL + '/getAllEmailDraftsOfUser');
    dispatch(getEmailThreadsSuccess(response.data));
  } catch (error) {
    dispatch(getEmailThreadsError(error.response || error.request || error));
    console.log(
      '🚀 ~ file: emailMessaging.js ~ line 89 ~ getAllEmailDraftsOfUser ~ error',
      error
    );
    throw error;
  }
};

export const saveEmailDraft = async ( dispatch, requestPayload ) => {
  try {
    const response = await api.post(EMAIL + '/saveEmailDraft', requestPayload);
    return response.data
  } catch (error) {
    console.log("🚀 ~ file: emailMessaging.js ~ line 111 ~ saveEmailDraft ~ error", error)
    throw error;
  }
};