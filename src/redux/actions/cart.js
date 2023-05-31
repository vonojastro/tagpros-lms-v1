export const GET_SHOPPING_CART = 'GET_SHOPPING_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export function getShoppingCartSuccess(data) {
    return { type: GET_SHOPPING_CART, data };
}

export function addCartItemSuccess(data) {
    return { type: ADD_TO_CART, data };
}

export function deleteFromCartSuccess(data) {
    return { type: DELETE_FROM_CART, data };
}

export function updateCartSuccess(data) {
    return { type: UPDATE_CART, data };
}