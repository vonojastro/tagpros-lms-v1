import { api } from '../api';

const RESOURCE = '/school-types';

export const getSchoolTypes = async (dispatch) => {
  try {
    dispatch?.(/* something */)
    return (await api.get(RESOURCE)).data
  } catch (error) {
    throw error;
  }
};