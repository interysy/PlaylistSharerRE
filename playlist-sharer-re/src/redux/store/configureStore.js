import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import combined_reducers from '../reducers/combine_reducers'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, combined_reducers)
const composedEnhancer = compose(applyMiddleware(logger, thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(persistedReducer, composedEnhancer);

export const persistor = persistStore(store);