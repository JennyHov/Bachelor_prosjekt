import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from '../userStates/usersSlicer';
import formReducer from '../formStates/formSlicer';

// Combine user and form reducers into a single root reducer
const rootReducer = combineReducers({
  user: usersReducer,
  form: formReducer,
  // Additional reducers can be combined here
});

// Create a persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // You might want to specify individual reducers to persist if not all need persistence
};

// Apply persistence to the entire rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor for the store
export const persistor = persistStore(store);