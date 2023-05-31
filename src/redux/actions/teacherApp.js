import { api } from "api";
// import { getCheckBoxState } from "utils/teacherApplication";

export const FETCH_TEACHER_APP = "FETCH_TEACHER_APP";
export const FETCH_TEACHER_APP_REQUEST = "FETCH_TEACHER_APP_REQUEST";
export const FETCH_TEACHER_APP_ERROR = "FETCH_TEACHER_APP_ERROR";
export const FETCH_TEACHER_APP_SUCCESS = "FETCH_TEACHER_APP_SUCCESS";
export const UPDATE_TEACHER_APP_DATA = "UPDATE_TEACHER_APP_DATA";

export function fetchTeacherApp() {
  return async (dispatch, getState) => {
    const {
      auth: {
        user: { accountId },
      },
    } = getState();
    dispatch(fetchTeacherAppRequest());
    try {
      let data = (await api.get(`/teacher/me`)).data;
      if (!data.length) data = (await api.post("/teacher/submit", { accountId })).data;
      data = (await api.get(`/teacher/me`)).data;
      data = data[0];
      dispatch(
        fetchTeacherAppSuccess({
          ...data,
          refRecommendation: data.refRecommendation || "",
          teacherAchievement: data.teacherAchievement || "",
          readIntro: data.applicationStatus !== null,
          watchedVideo: data.watchedVideo,
          agreeTermsAndConditions: data.agreeTerms,
          agreeClassContentPolicy: data.agreeTerms,
          agreeCommunityStandards: data.agreeTerms,
        })
      );
    } catch (error) {
      const payload = { status: error.response ? error.response.status : "NetworkError" };
      dispatch(fetchTeacherAppError(payload));
    }
  };
}
export function fetchTeacherAppRequest(data) {
  return { type: FETCH_TEACHER_APP_REQUEST, data };
}

export function fetchTeacherAppError(data) {
  return { type: FETCH_TEACHER_APP_ERROR, data };
}

export function fetchTeacherAppSuccess(data) {
  return { type: FETCH_TEACHER_APP_SUCCESS, data };
}

export function updateTeacherAppData(data) {
  return { type: UPDATE_TEACHER_APP_DATA, data };
}
