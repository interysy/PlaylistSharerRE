import { getPlaylistsYoutube, transferToYoutube } from '../../youtube/youtube_funcs'


export const LOG_IN_YOUTUBE = 'LOG_IN_YOUTUBE';
export const LOG_OUT_YOUTUBE = 'LOG_OUT_YOUTUBE';
export const GET_PLAYLISTS_YOUTUBE = 'GET_PLAYLISTS_YOUTUBE';
export const STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE = 'STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE';
export const UPDATE_FAILED_SONGS = 'UPDATE_FAILED_SONGS'
export const RAISE_ERROR = 'RAISE_ERROR'

export function loginYoutubeAction(token, apiKey) {
    return { type: LOG_IN_YOUTUBE, payload: { token: token, apiKey: apiKey, loggedIn: true } };
}

export function logoutYoutubeAction() {
    return { type: LOG_OUT_YOUTUBE };
}

export function getPlaylistsYoutubeAction(token, api_key) {
    return (dispatch) => {
        getPlaylistsYoutube(token, api_key).then((response) => {
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
                type: RAISE_ERROR,
                payload: { error: error }
            })
        })
    }
}

export function storePlaylistsToTransferYoutubeAction(playlists) {
    return { type: STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE, payload: { playlists: playlists } };
}


export function transferToYoutubeAction(playlists, spotifyToken, youtubeToken, youtubeApiKey) {
    return (dispatch) => {
        transferToYoutube(playlists, spotifyToken, youtubeToken, youtubeApiKey).then((response) => {
                console.log(response);
            })
            // dispatch({
            //     type: UPDATE_FAILED_SONGS,
            //     payload: { failedSongs: failed },
            // })
    }
}