export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';

export function loginSpotify(token, logged_in) {
    return { type: LOG_IN, payload: { token: token, logged_in: logged_in } };
}

export function logoutSpotify() {
    return { type: LOG_OUT };
}