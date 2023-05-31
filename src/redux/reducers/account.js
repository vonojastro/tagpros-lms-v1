import Immutable from 'immutable';
import {
    GET_ALL_ACCOUNTS,
} from '../actions/account';

const initialState = {
    data: {
        accounts: []
    },
};

const accounts = (state = Immutable.fromJS(initialState), action) => {
    let newState = state;

    switch (action.type) {
        case GET_ALL_ACCOUNTS:
            newState = newState.setIn(["data", "accounts"], action.data);
            break;
        // no default
    }
    return newState;
};

export default accounts;
