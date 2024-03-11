import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userStates/usersSlicer';

export const store = configureStore({
  reducer: { user: usersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});