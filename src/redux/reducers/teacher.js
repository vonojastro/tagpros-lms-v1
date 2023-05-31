import Immutable from 'immutable';
import {
    GET_ALL_TEACHERS,
    GET_TEACHER_APPLICATION,
    SUBMIT_TEACHER_REVIEW,
    SAVE_TEACHER_PAYOUT,
    GET_TEACHER_PAYOUT,
    GET_ALL_RECORDED_VIDEOS,
    SAVE_TEACHER_SELECTED_VIDEOS,
    GET_SELECTED_RECORDED_VIDEOS
} from 'redux/actions/teacher';

const initialState = {
    applications: {
        teacher: [],
        application: {}
    },
    application: {},
    message: '',
    status: '',
    payoutAccount: {},
    recordedClasses:{
        recorded:[],
        featured:[]
    }
};

const teacher = (state = Immutable.fromJS(initialState), action) => {
    let newState = state;
    // console.log(action)

    switch (action.type) {
        case GET_ALL_TEACHERS:
            newState = newState.setIn(["applications", "teacher"], action.data);
            // return state.set('applications', action.data)
            // newState = newState.set('message', 'hello');
            break;
        case SUBMIT_TEACHER_REVIEW:
            newState = newState.set("message", action.data.message);
            // newState = newState.updateIn(["applications", "teacher", action.data.index, "applicationStatus"], () => action.data.message.APPLICATION_STATUS);
            break;
        // no default
        case GET_TEACHER_APPLICATION:
            let data = action.data[0];
            data.agreeTermsAndConditions = data.agreeTerms;
            data.agreeClassContentPolicy = data.agreeTerms;
            data.agreeCommunityStandards = data.agreeTerms;

            newState = newState.setIn(["applications", "application"], action.data[0]);
            break;
        case SAVE_TEACHER_PAYOUT:
        case GET_TEACHER_PAYOUT:
            newState = newState.set("payoutAccount", action.data);
            break;
        case GET_ALL_RECORDED_VIDEOS:
            newState = newState.setIn(["recordedClasses", "recorded"], action.data);
            break;
        case SAVE_TEACHER_SELECTED_VIDEOS:
            newState = newState.setIn(["recordedClasses", "featured"], action.data);
            break;
        case GET_SELECTED_RECORDED_VIDEOS:
            newState = newState.setIn(["recordedClasses", "featured"], action.data);
            break;
        default:
            return newState;
    }
    return newState;
};

export default teacher;
