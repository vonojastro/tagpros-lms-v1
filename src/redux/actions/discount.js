export const GET_DISCOUNTS = 'GET_DISCOUNTS';
export const SAVE_DISCOUNT = 'SAVE_DISCOUNT'
export const UPDATE_DISCOUNT = 'UPDATE_DISCOUNT'

export function getDiscountsSuccess(data) {
    return { type: GET_DISCOUNTS, data };
}

export function saveDiscountSuccess(data) {
    return { type: SAVE_DISCOUNT, data };
}

export function updateDiscountSuccess(data) {
    return { type: UPDATE_DISCOUNT, data };
}