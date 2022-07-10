const default_state = {
    logged_in: false,
    token: null,
    playlistsToTransfer: [],
    failedToTransfer: []
}



const spotify_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'LOG-IN':
            return state;
        case 'LOG-OUT':
            return state;
        default:
            return state;

    }
}

export default spotify_reducer