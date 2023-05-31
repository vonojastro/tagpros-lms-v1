import { api } from "../api";
import {
  getAllTeachersSuccess,
  submitTeacherReviewSuccess,
  getTeacherApplicationAction,
  saveTeacherPayoutAccountSuccess,
  getTeacherPayoutAccountSuccess,
  getAllClassRecordingsSuccess,
  saveSelectedClassRecordingsSuccess,
  getAllSelectedVideos
} from "../redux/actions/teacher";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements"

const TEACHER_ENDPOINT = "/teacher";

export const getAllTeachers = async (dispatch, callback) => {
  try {
    /**
     * TODO: Dispatch login action for new user.
     */

    dispatch(onLoadingScreen());

    const response = await api.get(TEACHER_ENDPOINT + "/all"); // api object already has token
    // const message = response.data;
    callback && callback(true);
    console.log("Status Teacher: ", response.data);
    // const data = response.data;
    dispatch(getAllTeachersSuccess(response.data));
  } catch (error) {
    callback && callback(false);
    console.log("Status:", error);
    dispatch(offLoadingScreen());
  } finally {
		dispatch(offLoadingScreen());
	}
};

export const getApprovedTeachers = async (dispatch, callback) => {
  try {
    /**
     * TODO: Dispatch login action for new user.
     */

    dispatch(onLoadingScreen());

    const response = await api.get("/school-leader/approved"); // api object already has token
    // const message = response.data;
    callback && callback(true, response.data);
    console.log("Status Teacher: ", response.data);
    // const data = response.data;
    dispatch(getAllTeachersSuccess(response.data));
  } catch (error) {
    callback && callback(false);
    console.log("Status:", error);
    dispatch(offLoadingScreen());
  } finally {
		dispatch(offLoadingScreen());
	}
};

export const submitTeacherReview = async (dispatch, args, callback) => {
  try {
    const response = await api.patch(TEACHER_ENDPOINT + "/review", args);
    dispatch(submitTeacherReviewSuccess({index: args.index, message: response.data}));
    callback && callback(true);
  } catch (error) {
    callback && callback(false);
    console.log("Status:", error);
  }
};

export const getTeacherApplication = async (dispatch) => {
  try {
    const response = await api.get(TEACHER_ENDPOINT + "/me");
    dispatch(getTeacherApplicationAction(response.data));
  } catch (error) {
    console.log("getTeacherApplication error:", error);
  }
};

export const getTeacherPayoutAccount = async (dispatch) => {
  try {
    const response = await api.get(TEACHER_ENDPOINT + "/payout");
    dispatch(getTeacherPayoutAccountSuccess(response.data));
  } catch (error) {
    console.log("getTeacherPayoutAccount error:", error);
  }
};

export const saveTeacherPayoutAccount = async (dispatch, args, callback) => {
  try {
    const response = await api.post(TEACHER_ENDPOINT + "/payout", args);
    callback(true);
    dispatch(saveTeacherPayoutAccountSuccess(response.data));
  } catch (error) {
    callback(false);
    console.log("saveTeacherPayoutAccount error:", error);
  }
};

export const getAllClassRecordings = async (dispatch, callback) =>{
  try {
    dispatch(onLoadingScreen());
    const response = await api.get(TEACHER_ENDPOINT + "/recorded-videos");
    dispatch(getAllClassRecordingsSuccess(response.data));
    callback(true);
  } catch (error) {
    callback(false);
    console.log("getAllClassRecordings error:", error);
    dispatch(offLoadingScreen());
  }
  finally{
    dispatch(offLoadingScreen());
  }
};

export const saveSelectedClassRecordings = async (dispatch, args, callback) =>{
  try {
    dispatch(onLoadingScreen());
    const response = await api.post(TEACHER_ENDPOINT + "/recorded-videos", args);
    dispatch(saveSelectedClassRecordingsSuccess(response.data));
    callback(true);
  } catch (error) {
    callback(false);
    console.log("saveSelectedClassRecordings error:", error);
    dispatch(offLoadingScreen());
  }
  finally{
    dispatch(offLoadingScreen());
  }
};

export const getAllSelectedVideosByTeacher = async (dispatch, callback) =>{
  try {
    const response = await api.get(TEACHER_ENDPOINT + "/selected-videos");
    dispatch(getAllSelectedVideos(response.data));
    callback(true, response.data);
  } catch (error) {
    callback(false);
    console.log("getAllSelectedVideosByTeacher error:", error);
  }
};
