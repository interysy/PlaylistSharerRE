import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import combined_reducers from '../reducers/combine_reducers'

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, combined_reducers)
export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const persistor = persistStore(store)