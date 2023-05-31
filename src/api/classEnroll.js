import { api } from ".";
import {
  enrollClassSuccess,
  enrollClassSoloSuccess,
  viewAllClassSuccess,
} from 'redux/actions/class';

const ENROLL_ENDPOINT = '/class-enroll';

export const getLearnerSchedules = async (id) => {
  try {
    const data = (await api.get(`/class-enroll/viewMyLearnerSchedule/${id}`)).data;
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: classEnroll.js ~ line 7 ~ getLearnerSchedules ~ error",
      error
    );
    throw error;
  }
};



export const viewAllMyLearnersClass = async (dispatch) => {
  try {
    const response = await api.get(ENROLL_ENDPOINT + "/viewAllMyLearnersClass");
    console.log(response.data)
    dispatch(viewAllClassSuccess(response.data));

  } catch (error) {
    dispatch(viewAllClassSuccess(error.response? error.response.data : {}));
  } finally {
  }
};

export const enrollClassFamily = async (dispatch, params) => {
  try {
    const response = await api.post(ENROLL_ENDPOINT + "/saveEnrollment", params)
    dispatch(enrollClassSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(enrollClassSuccess(error.response.data));
  } finally {
  }
};

export const enrollClassSoloLearner = async (dispatch, params, callback) => {
  try {
    console.log(params)
    const response = await api.post(ENROLL_ENDPOINT + "/saveSoloEnrollment", params);
    console.log(response)
    dispatch(enrollClassSoloSuccess(response.data));

  } catch (error) {
    console.log(error.response)
    dispatch(enrollClassSuccess(error.response.data));
  }
};

export const getEnrollmentHistory = async (dispatch, callback) => {
  try {
    const response = await api.get(ENROLL_ENDPOINT + "/history");
    console.log(response.data)
    callback(true, response.data);
    //dispatch(getEnrollmentHistorySuccess(response.data));

  } catch (error) {
    callback(false);
    console.log(
      "🚀 ~ file: classEnroll.js ~ line 7 ~ getLearnerSchedules ~ error",
      error
    );
    throw error;
  }
};