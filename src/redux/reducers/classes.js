import { getStatusDisplay } from "components/common/ClassDetails";
import Immutable from "immutable";
import {
  GET_CLASSES,
  GET_CLASSES_ADMIN,
  GET_ACTIVE_CLASSES,
  GET_LEARNER_ENROLLED_CLASSES,
  GET_ALL_ENROLLED_CLASSES,
  // POST_CLASS_APPROVAL,
  GET_CLASS_DETAILS,
  ENROLL_CLASS,
  ENROLL_CLASS_SOLO,
  GET_PENDING_ENROLLMENT,
  VIEW_ALL_CLASS,
  GET_ENROLLMENT_HISTORY,
  GET_FINAL_RECORDED_CLASSES
} from "../actions/class";

const initialState = {
  data: {
    class: [],
    learner: [],
    enrolledClass: [],
    pendingEnrollment: [],
    familyClass: [],
    history: [],
  },
  enroll: {}
};

const classes = (state = Immutable.fromJS(initialState), action) => {
  let newState = state;

  switch (action.type) {
    case GET_CLASSES:
      newState = newState.setIn(["data", "class"], action.data);
      break;
    case GET_CLASSES_ADMIN:
      newState = newState.setIn(["data", "class"], action.data);
      break;
    case GET_ACTIVE_CLASSES:
      newState = newState.setIn(["data", "class"], action.data?.map((i)=>({statusDisplay: getStatusDisplay(i), ...i})));
      break;
    case GET_LEARNER_ENROLLED_CLASSES:
      newState = newState.setIn(["data", "enrolledClass"], action.data);
      break;
    case GET_ALL_ENROLLED_CLASSES:
      newState = newState.setIn(["data", "learner"], action.data);
      break;
    case  GET_PENDING_ENROLLMENT:
      newState = newState.setIn(["data", "pendingEnrollment"], action.data);
      break;
    case  GET_ENROLLMENT_HISTORY:
      newState = newState.setIn(["data", "history"], action.data);
      break;
    // case POST_CLASS_APPROVAL: 
    //   console.log('newStateClass', action.data);
    //   newState = newState.updateIn(["data", "class", action.data.index, "status"], () => action.data.status);
    //   break;
    case GET_CLASS_DETAILS:
      newState = newState.setIn(["data", "class"], action.data);
      break;
    case ENROLL_CLASS:
      newState = newState.set("enroll", action.data);
      break;
    case ENROLL_CLASS_SOLO:
      newState = newState.set("enroll", action.data);
      break;
    case VIEW_ALL_CLASS:
        newState = newState.setIn(["data", "familyClass"], action.data);
        break;
    case GET_FINAL_RECORDED_CLASSES:
      newState = newState.setIn(["data", "class"], action.data);
      break;
    // no default
  }
  return newState;
};

export default classes;
