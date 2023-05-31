export const GET_PROCESSORS = 'GET_PROCESSORS';
export const GET_PAYMENT_HISTORY = 'GET_PAYMENT_HISTORY';
export const GET_PAYOUTS = 'GET_PAYOUTS';

export function getProcessorsSuccess(data) {
    return { type: GET_PROCESSORS, data };
}

export function getPaymentsSuccess(data) {
    return { type: GET_PAYMENT_HISTORY, data };
}

export function getPayoutsSuccess(data) {
    return { type: GET_PAYOUTS, data };
}