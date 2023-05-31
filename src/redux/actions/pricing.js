export const GET_PRICING = 'GET_ALL_PRICING';
export const SAVE_PRICING = 'SAVE_PRICING';
export const UPDATE_PRICING = 'UPDATE_PRICING';
export const DELETE_PRICING = 'DELETE_PRICING';

export function getPricingSuccess(data) {
    return { type: GET_PRICING, data };
}

export function savePricingSuccess(data) {
    return { type: SAVE_PRICING, data };
}

export function updatePricingSuccess(data) {
    return { type: UPDATE_PRICING, data };
}

export function deletePricingSuccess(data) {
    return { type: DELETE_PRICING, data };
}