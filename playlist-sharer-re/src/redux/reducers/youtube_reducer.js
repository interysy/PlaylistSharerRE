const default_state = {
    logged_in: false,
    token: '',
    playlists_to_transfer: [],
    failed_to_transfer: []
}


const youtube_reducer = (state = default_state, action) => {
    switch (action.type) {
        case 'LOG_IN_YOUTUBE':
            return {...state, token: action.payload.token, logged_in: action.payload.logged_in }
        case 'LOG_OUT_YOUTUBE':
            return default_state;
        default:
            return state;

    }
}

export default youtube_reducer