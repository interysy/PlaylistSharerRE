const default_state = {
    logged_in: false,
    token: null,
    playlistsToShare: [],
    failedToShare: []
}


const youtube_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'LOG-IN':
            return state;
        case 'LOG-OUT':
            return state;
        default:
            return state;

    }
}

export default youtube_reducer