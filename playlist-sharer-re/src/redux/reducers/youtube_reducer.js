import { LOG_IN_YOUTUBE, LOG_OUT_YOUTUBE, GET_PLAYLISTS_YOUTUBE, STORE_PLAYLISTS_TO_TRANSFER_YOUTUBE, UPDATE_FAILED_SONGS, RAISE_ERROR } from '../actions/youtube_actions'

const default_state = {
    loggedIn: false,
    token: '',
    apiKey: '',
    loaded: false,
    playlists: [],
    selectedPlaylists: new Set(),
    failedSongs: [],
    completedTransfer: false,
    error: null,
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
        case UPDATE_FAILED_SONGS:
            return {...state, failedSongs: action.payload.failedSongs, completedTransfer: true }
        case RAISE_ERROR:
            return {...state, error: action.payload.error }
        default:
            return state;

    }
}

export default youtube_reducer