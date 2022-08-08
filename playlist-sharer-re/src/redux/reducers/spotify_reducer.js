import { LOG_IN_SPOTIFY, LOG_OUT_SPOTIFY, GET_PLAYLISTS_SPOTIFY, STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY, UPDATE_AUTHORISATION_STATE, SONGS_FAILED_TO_TRANSFER_SPOTIFY, RAISE_ERROR_SPOTIFY, RESET_FOR_NEXT_TRANSFER_SPOTIFY } from '../actions/spotify_actions'

const default_state = {
    authorisationState: 0,
    loggedIn: false,
    token: '',
    loaded: false,
    playlists: [],
    selectedPlaylists: new Set(),
    failedToTransfer: [],
    completedTransferSpotify: false,
    error: "",
}

const spotify_reducer = (state = default_state, action) => {
    switch (action.type) {
        case UPDATE_AUTHORISATION_STATE:
            return {...state, authorisationState: action.payload.authorisationState }
        case LOG_IN_SPOTIFY:
            return {...state, token: action.payload.token, loggedIn: action.payload.loggedIn }
        case LOG_OUT_SPOTIFY:
            return default_state;
        case GET_PLAYLISTS_SPOTIFY:
            return {...state, playlists: action.payload.playlists, loaded: true }
        case STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY:
            return {...state, selectedPlaylists: action.payload.playlists }
        case SONGS_FAILED_TO_TRANSFER_SPOTIFY:
            return {...state, failedToTransfer: action.payload.failedToTransfer, completedTransferSpotify: true }
        case RAISE_ERROR_SPOTIFY:
            return {...state, error: action.payload.error }
        case RESET_FOR_NEXT_TRANSFER_SPOTIFY:
            console.log("HJERE");
            return {...state, selectedPlaylists: new Set(), failedToTransfer: [], completedTransferSpotify: false, error: "" };
        default:
            return state;


    }
}

export default spotify_reducer