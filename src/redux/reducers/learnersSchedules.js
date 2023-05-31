import {
  FETCH_LEARNER_SCHEDULES_ERROR,
  FETCH_LEARNER_SCHEDULES_REQUEST,
  FETCH_LEARNER_SCHEDULES_SUCCESS,
} from "../actions/learnersSchedules";
const initialState = {
  // active: null, Which one is active in My Learners' Schedules
  // loading:
  // success:
  // data:
  // {
  //   [ learnerId ]: [
  //     // Learner
  //     {
  //       // His schedules
  //       id: "1",
  //       classId: "CLS001",
  //       title: "Math Class",
  //       fullName: "sample1 sample",
  //       categoryCode: "Math",
  //       subCategoryCode: "Elementary Algebra",
  //       ageCategory: "11-16 years",
  //       skillLevel: "SLVL001",
  //       classIntroduction: "Introduction to Basic Math",
  //       learningGoals: "Achieve Math Comprehension",
  //       externalResources: "Kahoot",
  //       thumbnailImage:
  //         "https://th.bing.com/th/id/OIP.iFj2bAPzAquVtLaAEELmEwHaHa?pid=ImgDet&rs=1",
  //       classType: "Live/Scheduled Class",
  //       zoomLink: "",
  //       lengthSession: "2",
  //       currency: "USD",
  //       price: "0.02",
  //       startDate: "2022/01/02",
  //       endDate: "2022/01/03",
  //       startTime: "10:00 AM",
  //       endTime: "11:00 AM",
  //     },
  //   ],
  // },
  // ,
  active: null,
  loading: false,
  success: false,
  error: null,
  data: {},
};

const learnerInfo = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_LEARNER_REQUEST:
    //   return { ...state, add: { ...state.add, loading: true } };
    // case ADD_LEARNER_SUCCESS:
    //   return {
    //     ...state,
    //     add: { ...state.add, loading: false, success: true, error: null },
    //   };
    // case ADD_LEARNER_ERROR:
    //   return { ...state, add: { ...state.add, loading: false, error: action.data } };
    // case UPDATE_LEARNER_REQUEST:
    //   return { ...state, update: { ...state.add, loading: true } };
    // case UPDATE_LEARNER_SUCCESS:
    //   return {
    //     ...state,
    //     update: { ...state.add, loading: false, success: true, error: null },
    //   };
    // case UPDATE_LEARNER_ERROR:
    //   return { ...state, update: { ...state.add, loading: false, error: action.data } };
    // default:
    //   return state;

    case FETCH_LEARNER_SCHEDULES_REQUEST: {
      return {
        ...state,
        loading: true,
        success: false,
      };
    }

    case FETCH_LEARNER_SCHEDULES_SUCCESS: {
      return {
        ...state,
        loading: true,
        success: true,
        data: { ...state.data, ...action.data },
      };
    }

    case FETCH_LEARNER_SCHEDULES_ERROR: {
      return {
        ...state,
        loading: false,
        erorr: action.data,
        success: false,
      };
    }

    default:
      return state;
  }
};

export default learnerInfo;
