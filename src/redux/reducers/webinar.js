import Immutable from 'immutable';
import {
    GET_WEBINARS
} from '../actions/webinar';

const initialState = {
    data: {
        webinar: []
    },
};

const webinar = (state = Immutable.fromJS(initialState), action) => {
    let newState = state;

    switch (action.type) {
        case GET_WEBINARS:
            newState = newState.setIn(["data", "webinar"], action.data);
            break;
        // no default
    }
    return newState;
};

export default webinar;
