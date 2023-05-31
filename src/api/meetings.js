import { setMeeting } from 'redux/actions/meetings';
import { api } from '../api';
export const getMeeting = async (dispatch, id) => {
  const response = await api.get(`/meetings/${id}`);
  console.log("🚀 ~ file: meetings.js ~ line 5 ~ getMeeting ~ response", response)
  dispatch(setMeeting(response.data));
  return response.data;
};
