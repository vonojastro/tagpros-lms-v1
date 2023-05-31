import { getLearners } from "../../api/learners";

export const FETCH_LEARNERS = "FETCH_LEARNERS";
export const FETCH_LEARNERS_REQUEST = "FETCH_LEARNERS_REQUEST";
export const FETCH_LEARNERS_ERROR = "FETCH_LEARNERS_ERROR";
export const FETCH_LEARNERS_SUCCESS = "FETCH_LEARNERS_SUCCESS";

export function fetchLearners() {
  return async (dispatch) => {
    try {
      dispatch(fetchLearnersRequest());
      const learners = await getLearners(dispatch);
      dispatch(fetchLearnersSuccess(learners));
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
      dispatch(fetchLearnersError(data));
      return error;
    }
  };
}

export function fetchLearnersRequest(data) {
  return { type: FETCH_LEARNERS_REQUEST, data };
}

export function fetchLearnersError(data) {
  return { type: FETCH_LEARNERS_ERROR, data };
}

export function fetchLearnersSuccess(data) {
  console.log('data', data);
  return { type: FETCH_LEARNERS_SUCCESS, data };
}
