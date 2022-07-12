export const LOG_IN_SPOTIFY = 'LOG_IN_SPOTIFY';
export const LOG_OUT_SPOTIFY = 'LOG_OUT_SPOTIFY';
export const GET_PLAYLISTS_SPOTIFY = 'GET_PLAYLISTS_SPOTIFY';

export function loginSpotify(token, logged_in) {
    return { type: LOG_IN_SPOTIFY, payload: { token: token, logged_in: logged_in } };
}

export function logoutSpotify() {
    return { type: LOG_OUT_SPOTIFY };
}