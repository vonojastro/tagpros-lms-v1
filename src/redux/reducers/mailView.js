import {
  TOGGLE_SIDEBAR,
  TOGGLE_EMAIL_COMPOSER,
  GET_EMAIL_THREADS,
  GET_EMAIL_THREADS_ERROR,
  GET_EMAIL_THREADS_SUCCESS,
  GET_EMAIL_THREAD,
  GET_EMAIL_THREAD_ERROR,
  GET_EMAIL_THREAD_SUCCESS,
  SET_ACTIVE_DRAFT
} from '../actions/mailView';

const initialState = {
  isSidebarExpanded: false,
  showEmailComposer: false,
  activeDraft: null,

  emailThreads: {
    data: [],
    get: {
      loading: true,
      success: false,
      error: null
    }
  },

  emailThread: {
    data: [],
    get: {
      loading: true,
      success: false,
      error: null
    }
  }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarExpanded: !state.isSidebarExpanded };
    case TOGGLE_EMAIL_COMPOSER:
      return {
        ...state,
        showEmailComposer: action.truthy ? action.truthy : !state.showEmailComposer
      };
    case GET_EMAIL_THREADS:
      return {
        ...state,
        emailThreads: {
          ...state.emailThreads,
          get: { ...state.emailThreads.get, loading: true }
        }
      };
    case GET_EMAIL_THREADS_ERROR:
      return {
        ...state,
        emailThreads: {
          ...state.emailThreads,
          get: {
            ...state.emailThreads.get,
            error: action.error,
            loading: false,
            success: false
          }
        }
      };
    case GET_EMAIL_THREADS_SUCCESS:
      return {
        ...state,
        emailThreads: {
          ...state.emailThreads,
          data: action.data,
          get: {
            error: null,
            loading: false,
            success: true
          }
        }
      };

    case GET_EMAIL_THREAD:
      return {
        ...state,
        emailThread: {
          ...state.emailThread,
          get: { ...state.emailThread.get, loading: true }
        }
      };
    case GET_EMAIL_THREAD_ERROR:
      return {
        ...state,
        emailThread: {
          ...state.emailThread,
          get: {
            ...state.emailThread.get,
            error: action.error,
            loading: false,
            success: false
          }
        }
      };
    case GET_EMAIL_THREAD_SUCCESS:
      return {
        ...state,
        emailThread: {
          ...state.emailThread,
          data: action.data,
          get: {
            ...state.emailThread.get,
            loading: false,
            success: true
          }
        }
      };
    case SET_ACTIVE_DRAFT:
      return {
        ...state,
        activeDraft: action.activeDraft
      };
    default:
      return state;
  }
};

export default auth;
