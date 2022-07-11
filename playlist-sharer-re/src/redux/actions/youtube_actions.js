export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';

export function loginYoutube(token) {
    return { type: LOG_IN, token: token };
}

export function logoutYoutube() {
    return { type: LOG_OUT };
}