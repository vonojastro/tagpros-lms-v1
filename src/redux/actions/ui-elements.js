export const ON_LOADING_SCREEN = "ON_LOADING_SCREEN";
export const OFF_LOADING_SCREEN = "OFF_LOADING_SCREEN";
export const TOGGLE_LOGOUT_MODAL = "TOGGLE_LOGOUT_MODAL";

export function onLoadingScreen() {
	return { type: ON_LOADING_SCREEN, data: true };
}

export function offLoadingScreen() {
	return { type: OFF_LOADING_SCREEN, data: false };
}

export function toggleLogoutModal(truthy) {
	return { type: TOGGLE_LOGOUT_MODAL, ...( truthy !== undefined && { truthy } ) }
}