import { getLearnerSchedules } from "../../api/classEnroll";

export const FETCH_LEARNER_SCHEDULES = "FETCH_LEARNER_SCHEDULES";
export const FETCH_LEARNER_SCHEDULES_REQUEST = "FETCH_LEARNER_SCHEDULES_REQUEST";
export const FETCH_LEARNER_SCHEDULES_SUCCESS = "FETCH_LEARNER_SCHEDULES_SUCCESS";
export const FETCH_LEARNER_SCHEDULES_ERROR = "FETCH_LEARNER_SCHEDULES_ERROR";


export const fetchLearnerSchedules = ({ id }) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLearnerSchedulesRequest({ id }));
      const learners = await getLearnerSchedules(id);
      dispatch(fetchLearnerSchedulesSuccess({ [id]: learners }));
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
      dispatch(fetchLearnerSchedulesError(data));
      return error;
    }
  };
};

export function fetchLearnerSchedulesRequest(data) {
  return { type: FETCH_LEARNER_SCHEDULES_REQUEST, data };
}

export function fetchLearnerSchedulesSuccess(data) {
  return { type: FETCH_LEARNER_SCHEDULES_SUCCESS, data };
}

export function fetchLearnerSchedulesError(data) {
  return { type: FETCH_LEARNER_SCHEDULES_ERROR, data };
}
