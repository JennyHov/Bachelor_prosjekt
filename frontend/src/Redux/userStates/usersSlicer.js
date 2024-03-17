import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    currentUser: null,
    loading: false,
    error: false,
  };
  
  const userSlice = createSlice({
      name: 'user',
      initialState ,
      reducers: {
          initialSignIn: (state) => {
              state.loading = true;
          },
          endSignIn: (state, action) => {
              state.currentUser = action.payload;
              state.loading = false;
              state.error = false;
          },
          failSignIn: (state, action) => {
              state.loading = false;
              state.error = action.payload;
          },
          initialUpdatedUser: (state) => {
              state.loading = true;
          },
          endUpdatedUser: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
          },
          failUpdatedUser: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
      },
  });
  
  export const { initialSignIn, endSignIn, failSignIn, initialUpdatedUser, endUpdatedUser, failUpdatedUser } = userSlice.actions;
  
  export default userSlice.reducer;