import {
  FETCH_LEARNERS_ERROR,
  FETCH_LEARNERS_REQUEST,
  FETCH_LEARNERS_SUCCESS,
} from "../actions/learners";

const initialState = { loading: false, success: false, error: null, data: [] };

const learners = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARNERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_LEARNERS_SUCCESS:
      return { ...state, loading: false, success: true, data: action.data };
    case FETCH_LEARNERS_ERROR:
      return { ...state, loading: false, error: action.data };
    default:
      return state;
  }
};

export default learners;
