import Immutable from 'immutable';
import {
    GET_ALL_SCHOOL_LEADERS,
    SUBMIT_SCHOOL_LEADER_REVIEW
} from 'redux/actions/schoolLeader';

const initialState = {
    data: {
        schoolLeader: [],
    },
    message: '',
};

const schoolLeader = (state = Immutable.fromJS(initialState), action) => {
    let newState = state;

    switch (action.type) {
        case GET_ALL_SCHOOL_LEADERS:
            newState = newState.setIn(["data", "schoolLeader"], action.data);
            break;
        case SUBMIT_SCHOOL_LEADER_REVIEW:
            newState = newState.set("message", action.data.message);
            break;
        default:
            return newState;
    }
    return newState;
};

export default schoolLeader;
