import {
  addLearner as fetchAddLearner,
  updateLearner as fetchUpdateLearner,
  deleteLearner as fetchDeleteLearner,
} from "../../api/learners";
import { fetchLearners } from "./learners";

export const ADD_LEARNER = "ADD_LEARNER";
export const ADD_LEARNER_REQUEST = "ADD_LEARNER_REQUEST";
export const ADD_LEARNER_ERROR = "ADD_LEARNER_ERROR";
export const ADD_LEARNER_SUCCESS = "ADD_LEARNER_SUCCESS";

export const UPDATE_LEARNER = "UPDATE_LEARNER";
export const UPDATE_LEARNER_REQUEST = "UPDATE_LEARNER_REQUEST";
export const UPDATE_LEARNER_ERROR = "UPDATE_LEARNER_ERROR";
export const UPDATE_LEARNER_SUCCESS = "UPDATE_LEARNER_SUCCESS";

export function addLearner({ values, closeModal, handleSuccess }) {
  return async (dispatch) => {
    try {
      dispatch(addLearnerRequest());
      await fetchAddLearner({ values });
      dispatch(addLearnerSuccess());
      handleSuccess()
      dispatch(fetchLearners());
      closeModal();
    } catch (error) {
      // Error 😨
      const data = {};
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        data.status = error.response.status;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        data.status = 500;
      } else {
        data.status = 500;
      }
      dispatch(addLearnerError(data));
      return error;
    }
  };
}

export function updateLearner({ values, closeModal, handleSuccess }) {
  return async (dispatch) => {
    try {
      dispatch(updateLearnerRequest());
      await fetchUpdateLearner({ values });
      dispatch(updateLearnerSuccess());
      dispatch(fetchLearners());
      handleSuccess();
      closeModal();
    } catch (error) {
      // Error 😨
      const data = {};
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        data.status = error.response.status;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        data.status = 500;
      } else {
        data.status = 500;
      }
      dispatch(updateLearnerError(data));
      return error;
    }
  };
}

export function deleteLearner({ id, closeModal, handleSuccess, handleFailure }) {
  return async (dispatch) => {
    try {
      dispatch(updateLearnerRequest());
      await fetchDeleteLearner(id);
      dispatch(updateLearnerSuccess());
      dispatch(fetchLearners());
      handleSuccess();
      closeModal();
    } catch (error) {
      // Error 😨
      const data = {};
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        data.status = error.response.status;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        data.status = 500;
      } else {
        data.status = 500;
      }
      closeModal();
      handleFailure();

      return error;
    }
  };
}

export function addLearnerRequest(data) {
  return { type: ADD_LEARNER_REQUEST, data };
}

export function addLearnerError(data) {
  return { type: ADD_LEARNER_ERROR, data };
}

export function addLearnerSuccess(data) {
  return { type: ADD_LEARNER_SUCCESS, data };
}

export function updateLearnerRequest(data) {
  return { type: UPDATE_LEARNER_REQUEST, data };
}

export function updateLearnerError(data) {
  return { type: UPDATE_LEARNER_ERROR, data };
}

export function updateLearnerSuccess(data) {
  return { type: UPDATE_LEARNER_SUCCESS, data };
}
