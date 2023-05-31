import { api } from "../api";
import {
    setClasses,
    setWatchClassInfo,
    setClassMaintenanceOptions,
    setDraftClass,
    saveClassSuccess,
    clearClassSuccess,
    saveClassAttempt,
    saveClassError,
    getClassesForApprovalSuccess,
    getClassesForApprovalError,
    getClassesForApprovalClear,
    setClassApprovalUpdateStatusMessage,
    setClassItems,
    getDraftAttempt,
    getClassesForApprovalLoading,
    saveClassLinkLoading,
    saveClassLinkSuccess,
    saveClassLinkError,
    saveModuleLoading,
    saveModuleSuccess,
    saveModuleError
} from 'redux/actions/classes';

const CLASS_ENDPOINT = '/class';

export const getClasses = async (dispatch, args) => {
    try {
        const response = await api.post(`/api/class`, args);
        dispatch(setClasses(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const getClassInfo = async (dispatch, slug) => {
    try {
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await api.post(`/api/class/info`, { slug }, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(setWatchClassInfo(response.data));
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.error(error);
    }
};

export const getClassMaintenanceOptions = async (dispatch, args) => {
    try {
        const response = await api.post(`/api/class/maintenance/options`, args);
        dispatch(setClassMaintenanceOptions(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const getDraft = async (dispatch, classId = '') => {
    try {
        const args = {}
        if (classId) {
            args.classId = classId
        }
        dispatch(getDraftAttempt());
        const token = localStorage.getItem('jwt');
        if (token) {
            // uncomment to enable draft again
            // const response = await api.post(`/api/class/${!classId ? 'draft' : 'edit'}`, args, {
            //     headers: { Authorization: "Bearer " + token },
            // });
            const response = await api.post(`/api/class/edit`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(setDraftClass(response.data));
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.error(error);
    }
};

export const saveClass = async (dispatch, args) => {
    try {
        dispatch(saveClassAttempt());
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await api.post(`/api/class/save`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(saveClassSuccess(response.data));
            setTimeout(() => {
                dispatch(clearClassSuccess());
            }, 3000);
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        dispatch(saveClassError(error.response.data.message));
        setTimeout(() => {
            dispatch(clearClassSuccess());
        }, 3000);
    }
};

export const getForApprovals = async (dispatch) => {
    try {
        dispatch(getClassesForApprovalLoading(true))
        const token = localStorage.getItem('admin_jwt');
        if (token) {
            const response = await api.post(`/api/class/approval`, {}, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(getClassesForApprovalSuccess(response.data));
            dispatch(getClassesForApprovalLoading(false))
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(getClassesForApprovalLoading(false))
    }
};

export const updateStatus = async (dispatch, args) => {
    try {
        const token = localStorage.getItem('admin_jwt');
        if (token) {
            const response = await api.post(`/api/class/approval/update-status`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(setClassApprovalUpdateStatusMessage(response.data));
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        dispatch(setClassApprovalUpdateStatusMessage(error.response.data.message));
    }
};

export const getClassItems = async (dispatch, args) => {
    try {
        const token = localStorage.getItem('admin_jwt');
        if (token) {
            const response = await api.post(`/api/class/approval/get-class-items`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(setClassItems(response.data));
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.log(error.response)
    }
};

export const onFilterChange = async (dispatch, args) => {
    try {
        dispatch(getClassesForApprovalLoading(true))
        const token = localStorage.getItem('admin_jwt');
        if (token) {
            const response = await api.post(`/api/class/approval`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(getClassesForApprovalSuccess(response.data));
            dispatch(getClassesForApprovalLoading(false))
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(getClassesForApprovalLoading(false))
    }
};

export const getMyClasses = async (dispatch) => {
    try {
        dispatch(getClassesForApprovalLoading(true))
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await api.post(`/api/class/my-classes`, {}, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(getClassesForApprovalSuccess(response.data));
            dispatch(getClassesForApprovalLoading(false))
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.log(error);
        dispatch(getClassesForApprovalLoading(false))
    }
};

export const getMyClassItems = async (dispatch, args) => {
    try {
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await api.post(`/api/class/my-class/get-class-items`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(setClassItems(response.data));
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.log(error.response)
    }
};

export const onMyClassFilterChange = async (dispatch, args) => {
    try {
        dispatch(getClassesForApprovalLoading(true))
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await api.post(`/api/class/my-classes`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(getClassesForApprovalSuccess(response.data));
            dispatch(getClassesForApprovalLoading(false))
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(getClassesForApprovalLoading(false))
    }
};

export const cancelClass = async (dispatch, args) => {
    try {
        dispatch(getClassesForApprovalClear());
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await api.post(`/api/class/my-class/cancel`, args, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(getClassesForApprovalSuccess(response.data));
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        dispatch(getClassesForApprovalError(error.response.data.message));
    }
};

export const saveClassLink = async (dispatch, link, classId) => {
    try {
        dispatch(saveClassLinkLoading(true));
        const token = localStorage.getItem('jwt');
        if (token) {
            await api.post(`/api/class/my-class/savelink`, { link, classId }, {
                headers: { Authorization: "Bearer " + token },
            });
            dispatch(saveClassLinkSuccess());
        } else {
            throw new Error('You are not logged in.');
        }
    } catch (error) {
        dispatch(saveClassLinkError());
    }
}

export const saveModule = async (dispatch, args, callback) =>{
    console.log(args);
    try {
        dispatch(saveModuleLoading(true));
        const response = await api.post(CLASS_ENDPOINT + `/module`, args);
        !!callback && callback(response.data);
        dispatch(saveModuleSuccess(response.data));
        dispatch(saveModuleLoading(false));
        
    } catch (error) {
        console.log(error);
        !!callback && callback(false);
        dispatch(saveModuleError(error));
        dispatch(saveModuleLoading(false));
    }
};