const default_state = {
    authorisationState: 0,
    loggedIn: false,
    token: '',
    loaded: false,
    playlists: [],
    selectedPlaylists: new Set(),
}

const spotify_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'UPDATE_AUTHORISATION_STATE':
            return {...state, authorisationState: action.payload.authorisationState }
        case 'LOG_IN_SPOTIFY':
            return {...state, token: action.payload.token, loggedIn: action.payload.loggedIn }
        case 'LOG_OUT_SPOTIFY':
            return default_state;
        case 'GET_PLAYLISTS_SPOTIFY':
            return {...state, playlists: action.payload.playlists, loaded: true }
        case 'STORE_PLAYLISTS_TO_TRANSFER_SPOTIFY':
            return {...state, selectedPlaylists: action.payload.playlists }
        default:
            return state;


    }
}

export default spotify_reducer