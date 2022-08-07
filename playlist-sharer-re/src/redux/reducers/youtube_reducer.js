import { LOG_IN_YOUTUBE, LOG_OUT_YOUTUBE, GET_PLAYLISTS_YOUTUBE, STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE, SONGS_FAILED_TO_TRANSFER_YOUTUBE, RAISE_ERROR_YOUTUBE } from '../actions/youtube_actions'

const default_state = {
    loggedIn: false,
    token: '',
    apiKey: '',
    loaded: false,
    playlists: [],
    selectedPlaylists: new Set(),
    failed: [],
    completedTransferYoutube: false,
    error: "",
}


const youtube_reducer = (state = default_state, action) => {
    switch (action.type) {
        case LOG_IN_YOUTUBE:
            return {...state, token: action.payload.token, apiKey: action.payload.apiKey, loggedIn: action.payload.loggedIn }
        case LOG_OUT_YOUTUBE:
            return default_state;
        case GET_PLAYLISTS_YOUTUBE:
            return {...state, playlists: action.payload.playlists, loaded: true }
        case STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE:
            return {...state, selectedPlaylists: action.payload.playlists }
        case SONGS_FAILED_TO_TRANSFER_YOUTUBE:
            return {...state, failed: action.payload.failed, completedTransferYoutube: true }
        case RAISE_ERROR_YOUTUBE:
            return {...state, error: action.payload.error }
        default:
            return state;

    }
}

export default youtube_reducer