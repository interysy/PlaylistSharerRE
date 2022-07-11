const default_state = {
    logged_in: false,
    token: null,
    playlistsToTransfer: [],
    failedToTransfer: []
}



const spotify_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {...state, token: action.payload.token, logged_in: action.payload.logged_in }
        case 'LOG-OUT':
            return default_state;
        default:
            return state;

    }
}

export default spotify_reducer