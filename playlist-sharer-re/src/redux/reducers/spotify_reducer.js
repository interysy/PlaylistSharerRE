const default_state = {
    logged_in: false,
    token: '',
    loaded: false,
    playlists_to_transfer: [],
    selected_playlists_spotify: new Set(),
    songs_failed_to_transfer: [],
}



const spotify_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'LOG_IN_SPOTIFY':
            return {...state, token: action.payload.token, logged_in: action.payload.logged_in }
        case 'LOG_OUT_SPOTIFY':
            return default_state;
        case 'GET_PLAYLISTS_SPOTIFY':
            return {...state, playlists_to_transfer: action.payload.playlists_to_transfer, loaded: true }
        case 'STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY':
            return {...state, selected_playlists_spotify: action.payload.playlists }
        default:
            return state;


    }
}

export default spotify_reducer