import { getPlaylists } from '../../spotify/spotify_funcs';



export const LOG_IN_SPOTIFY = 'LOG_IN_SPOTIFY';
export const LOG_OUT_SPOTIFY = 'LOG_OUT_SPOTIFY';
export const GET_PLAYLISTS_SPOTIFY = 'GET_PLAYLISTS_SPOTIFY';


export function loginSpotify(token, logged_in) {
    return { type: LOG_IN_SPOTIFY, payload: { token: token, logged_in: logged_in } };
}

export function logoutSpotify() {
    return { type: LOG_OUT_SPOTIFY };
}

export function getPlaylistsSpotify(token) {
    let result = [];
    getPlaylists(token).then((response) => {
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
    })

    return { type: GET_PLAYLISTS_SPOTIFY, payload: { playlists_to_transfer: result } };
}