export const LOG_IN_YOUTUBE = 'LOG_IN_YOUTUBE';
export const LOG_OUT_YOUTUBE = 'LOG_OUT_YOUTUBE';
export const GET_PLAYLISTS_YOUTUBE = 'GET_PLAYLISTS_YOUTUBE';

export function loginYoutube(token) {
    return { type: LOG_IN_YOUTUBE, payload: { token: token, logged_in: true } };
}

export function logoutYoutube() {
    return { type: LOG_OUT_YOUTUBE };
}