import { setAuthToken } from "redux/actions/auth";
import { api } from "../api";
import { setRegisterStatus } from "../redux/actions/registration";
import { onLoadingScreen, offLoadingScreen } from "../redux/actions/ui-elements";
import { setRegistrationId } from "../utils/auth/index"

export const submitRegistration = async (dispatch, params) => {
    try {
			dispatch?.(onLoadingScreen());
			const response = await api.post("/auth/register", params);
			setRegistrationId(response.data.registrationId);
			dispatch?.(setRegisterStatus(response.data));
			if(response.data.token) dispatch(setAuthToken(response.data.token))

    } catch (error) {
			dispatch?.(setRegisterStatus(error.response.data))
			throw error

    } finally {
			dispatch?.(offLoadingScreen())
		}
};