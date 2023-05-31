import Immutable from 'immutable';
import {
    GET_ALL_EMAIL_TEMPLATES
} from '../actions/email-template';
import he from 'he';

const initialState = {
    data: {
        templates: []
    },
};

const formatEmailTemplates = (data) => {
    return data.map((template) => {
        let ret = template
        try {
          ret.description = he.decode(ret.description)
        } catch (error) {
        } finally {
          return ret;
        }
    })
}

const templates = (state = Immutable.fromJS(initialState), action) => {
    let newState = state;

    switch (action.type) {
        case GET_ALL_EMAIL_TEMPLATES:
            newState = newState.setIn(["data", "templates"], formatEmailTemplates( action.data ));
            break;
        // no default
    }
    return newState;
};

export default templates;
