import { getPlaylistsSpotify, transferToSpotify } from '../../spotify/spotify_funcs';


export const LOG_IN_SPOTIFY = 'LOG_IN_SPOTIFY';
export const LOG_OUT_SPOTIFY = 'LOG_OUT_SPOTIFY';
export const GET_PLAYLISTS_SPOTIFY = 'GET_PLAYLISTS_SPOTIFY';
export const STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY = 'STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY';
export const UPDATE_AUTHORISATION_STATE = 'UPDATE_AUTHORISATION_STATE';
export const SONGS_FAILED_TO_TRANSFER_SPOTIFY = 'SONGS_FAILED_TO_TRANSFER_SPOTIFY';
export const RAISE_ERROR_SPOTIFY = 'RAISE_ERROR_SPOTIFY';
export const RESET_FOR_NEXT_TRANSFER_SPOTIFY = 'RESET_FOR_NEXT_TRANSFER_SPOTIFY';

export function updateAuthorisationStateAction(state) {
    return { type: UPDATE_AUTHORISATION_STATE, payload: { authorisationState: state } };
}
export function loginSpotifyAction(token, loggedIn) {
    return { type: LOG_IN_SPOTIFY, payload: { token: token, loggedIn: loggedIn } };
}

export function logoutSpotifyAction() {
    return { type: LOG_OUT_SPOTIFY };
}

export function getPlaylistsSpotifyAction(token) {
    return (dispatch) => {
        getPlaylistsSpotify(token).then((response) => {
            let result = [];
            response[0].forEach((playlist_element) => {
                let image = null
                if (playlist_element.images[0]) {
                    image = playlist_element.images[0].url;
                }
                let playlist_element_obj = {
                    name: playlist_element.name,
                    owner: playlist_element.owner.display_name,
                    image: image,
                    description: playlist_element.description,
                    id: playlist_element.id,
                }
                result.push(playlist_element_obj);
            })

            dispatch({
                type: GET_PLAYLISTS_SPOTIFY,
                payload: { playlists: result }
            });
        }).catch((error) => {
            dispatch({
                type: RAISE_ERROR_SPOTIFY,
                payload: { error: error },
            });
        })
    }
}


export function storePlaylistsToTransferSpotifyAction(playlists) {
    return { type: STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY, payload: { playlists: playlists } };
}

export function resetErrorsSpotifyAction() {
    return (dispatch) => { dispatch({ type: RAISE_ERROR_SPOTIFY, payload: { error: "" } }) }
}

export function transferToSpotifyAction(playlists, spotifyToken, youtubeToken) {
    return (dispatch) => {
        transferToSpotify(playlists, spotifyToken, youtubeToken).then((failed) => {
            console.log(failed);
            dispatch({
                type: SONGS_FAILED_TO_TRANSFER_SPOTIFY,
                payload: { failedToTransfer: failed[0] }
            });
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: RAISE_ERROR_SPOTIFY,
                payload: { error: error },
            })
        })
    }
}

export function resetForAnotherTransferSpotifyAction() {
    return { type: RESET_FOR_NEXT_TRANSFER_SPOTIFY, payload: {} }
}