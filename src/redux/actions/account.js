export const GET_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS';
export const UPDATE_ACCOUNT_STATUS = 'UPDATE_ACCOUNT_STATUS';

export function getAllAccountsSuccess(data) {
    return { type: GET_ALL_ACCOUNTS, data };
};

export function updateAccountStatusAction(data) {
    return { type: UPDATE_ACCOUNT_STATUS, data };
}