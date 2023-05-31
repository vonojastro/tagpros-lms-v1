export const REGISTRATION_PROCESS = "REGISTRATION_PROCESS";

export function setRegisterStatus (data) {
	return { type: REGISTRATION_PROCESS, data };
}