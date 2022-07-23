import { getPlaylists } from '../../youtube/youtube_funcs'

export const LOG_IN_YOUTUBE = 'LOG_IN_YOUTUBE';
export const LOG_OUT_YOUTUBE = 'LOG_OUT_YOUTUBE';
export const GET_PLAYLISTS_YOUTUBE = 'GET_PLAYLISTS_YOUTUBE';
export const STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE = 'STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE'

export function loginYoutube(token, api_key) {
    return { type: LOG_IN_YOUTUBE, payload: { token: token, api_key: api_key, logged_in: true } };
}

export function logoutYoutube() {
    return { type: LOG_OUT_YOUTUBE };
}

export function getPlaylistsYoutube(token, api_key) {
    return (dispatch) => {
        getPlaylists(token, api_key).then((response) => {
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
                payload: { playlists_to_transfer: results }
            })

        })
    }
}

export function storePlaylistsToTransferYoutube(playlists) {
    return { type: STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE, payload: { playlists: playlists } };
}