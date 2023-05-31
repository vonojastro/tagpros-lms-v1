import { SET_MEETING } from 'redux/actions/meetings';

const initialState = {
  meeting: null
};

const meetings = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETING:
      state = { ...state, meeting: action.data };
      break;
    default:
      return state;
  }
  return state;
};

export default meetings;
