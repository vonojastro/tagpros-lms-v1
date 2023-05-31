import {
  FETCH_TEACHER_APP_ERROR,
  FETCH_TEACHER_APP_REQUEST,
  FETCH_TEACHER_APP_SUCCESS,
  UPDATE_TEACHER_APP_DATA,
} from "../actions/teacherApp";

const initialState = { loading: false, success: false, error: null, data: {} };

const teacherApp = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHER_APP_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEACHER_APP_SUCCESS:
      return { ...state, loading: false, success: true, data: action.data };
    case FETCH_TEACHER_APP_ERROR:
      return { ...state, loading: false, error: action.data };
    case UPDATE_TEACHER_APP_DATA:
      return { ...state, data: { ...state.data, ...action.data } };
    default:
      return state;
  }
};

export default teacherApp;
