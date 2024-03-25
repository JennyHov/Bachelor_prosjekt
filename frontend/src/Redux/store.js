import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './userStates/usersSlicer';

const rootReducer = combineReducers({
  user: usersReducer,
});

const persistConfig = {
  key: 'sefioPersisting',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);