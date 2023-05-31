export const GET_LIVE_CHAT_RECIPIENT = 'GET_LIVE_CHAT_RECIPIENT';
export const GET_LIVE_CHAT_WITH_RECIPIENT = 'GET_LIVE_CHAT_WITH_RECIPIENT';

export function getLiveChatRecipientsSuccess(data) {
    return { type: GET_LIVE_CHAT_RECIPIENT, data };
}

export function getLiveChatWithRecipientsSuccess(data) {
    return { type: GET_LIVE_CHAT_WITH_RECIPIENT, data };
}