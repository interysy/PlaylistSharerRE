import spotify_reducer from './spotify_reducer'
import youtube_reducer from './youtube_reducer'
import { combineReducers } from 'redux'

const combined_reducers = combineReducers({
    spotify_reducer,
    youtube_reducer,
});

export default combined_reducers