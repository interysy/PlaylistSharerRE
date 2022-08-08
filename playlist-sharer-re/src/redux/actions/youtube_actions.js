import { getPlaylistsYoutube, transferToYoutube } from '../../youtube/youtube_funcs'


export const LOG_IN_YOUTUBE = 'LOG_IN_YOUTUBE';
export const LOG_OUT_YOUTUBE = 'LOG_OUT_YOUTUBE';
export const GET_PLAYLISTS_YOUTUBE = 'GET_PLAYLISTS_YOUTUBE';
export const STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE = 'STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE';
export const SONGS_FAILED_TO_TRANSFER_YOUTUBE = 'SONGS_FAILED_TO_TRANSFER_YOUTUBE';
export const RAISE_ERROR_YOUTUBE = 'RAISE_ERROR_YOUTUBE';
export const RESET_FOR_NEXT_TRANSFER_YOUTUBE = 'RESET_FOR_NEXT_TRANSFER';
export const UPDATE_AUTHORISATION_STATE_YOUTUBE = 'UPDATE_AUTHORISATION_STATE_YOUTUBE';


export function updateAuthorisationStateYoutubeAction(state) {
    return { type: UPDATE_AUTHORISATION_STATE_YOUTUBE, payload: { authorisationState: state } };

}
export function loginYoutubeAction(token) {
    return { type: LOG_IN_YOUTUBE, payload: { token: token, loggedIn: true } };
}

export function logoutYoutubeAction() {
    return { type: LOG_OUT_YOUTUBE };
}

export function getPlaylistsYoutubeAction(token) {
    return (dispatch) => {
        getPlaylistsYoutube(token).then((response) => {
            let results = [];
            response[0].map((element) => {
                let playlist = {
                    name: element.snippet.title,
                    description: element.snippet.description,
                    image: element.snippet.thumbnails.default.url,
                    id: element.id,
                    owner: element.channelTitle,
                }
                results.push(playlist);
            })
            dispatch({
                type: GET_PLAYLISTS_YOUTUBE,
                payload: { playlists: results }
            })

        }).catch((error) => {
            dispatch({
                type: RAISE_ERROR_YOUTUBE,
                payload: { error: error }
            })
        })
    }
}

export function storePlaylistsToTransferYoutubeAction(playlists) {
    return { type: STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE, payload: { playlists: playlists } };
}

export function resetErrorsYoutubeAction() {
    return (dispatch) => { dispatch({ type: RAISE_ERROR_YOUTUBE, payload: { error: "" } }) }
}

export function transferToYoutubeAction(playlists, spotifyToken, youtubeToken, youtubeApiKey) {
    return (dispatch) => {
        transferToYoutube(playlists, spotifyToken, youtubeToken, youtubeApiKey).then((response) => {
            dispatch({
                type: SONGS_FAILED_TO_TRANSFER_YOUTUBE,
                payload: { failed: response[0] }
            });
        }).catch((error) => {
            dispatch({
                type: RAISE_ERROR_YOUTUBE,
                payload: { error: error }
            });
        });
        // dispatch({
        //     type: UPDATE_FAILED_SONGS,
        //     payload: { failedSongs: failed },
        // })
    }
}

export function resetForAnotherTransferYoutubeAction() {
    return { type: RESET_FOR_NEXT_TRANSFER_YOUTUBE, payload: {} }
}