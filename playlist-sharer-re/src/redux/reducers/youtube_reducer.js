const default_state = {
    logged_in: false,
    token: '',
    api_key: '',
    loaded: false,
    playlists_to_transfer: [],
    selected_playlists_youtube: new Set(),
    created_playlists: [],
    songs_failed_to_transfer: []
}


const youtube_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'LOG_IN_YOUTUBE':
            return {...state, token: action.payload.token, api_key: action.payload.api_key, logged_in: action.payload.logged_in }
        case 'LOG_OUT_YOUTUBE':
            return default_state;
        case 'GET_PLAYLISTS_YOUTUBE':
            return {...state, playlists_to_transfer: action.payload.playlists_to_transfer, loaded: true }
        case 'STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE':
            return {...state, selected_playlists_youtube: action.payload.playlists }
        case 'ADD_PLAYLISTS_YOUTUBE':
            return {...state, created_playlists: action.payload.created_playlists }
        default:
            return state;

    }
}

export default youtube_reducer