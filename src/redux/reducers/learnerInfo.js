import {
  ADD_LEARNER_ERROR,
  ADD_LEARNER_REQUEST,
  ADD_LEARNER_SUCCESS,
  UPDATE_LEARNER_ERROR,
  UPDATE_LEARNER_REQUEST,
  UPDATE_LEARNER_SUCCESS,
} from "../actions/learnerInfo";

const initialState = {
  add: { loading: false, success: false, error: null },
  update: { loading: false, success: false, error: null },
};

const learnerInfo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LEARNER_REQUEST:
      return { ...state, add: { ...state.add, loading: true } };
    case ADD_LEARNER_SUCCESS:
      return {
        ...state,
        add: { ...state.add, loading: false, success: true, error: null },
      };
    case ADD_LEARNER_ERROR:
      return { ...state, add: { ...state.add, loading: false, error: action.data } };
    case UPDATE_LEARNER_REQUEST:
      return { ...state, update: { ...state.add, loading: true } };
    case UPDATE_LEARNER_SUCCESS:
      return {
        ...state,
        update: { ...state.add, loading: false, success: true, error: null },
      };
    case UPDATE_LEARNER_ERROR:
      return { ...state, update: { ...state.add, loading: false, error: action.data } };
    default:
      return state;
  }
};

export default learnerInfo;
