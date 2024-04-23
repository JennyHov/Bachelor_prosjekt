import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export const login = () => async (dispatch) => {
  // Perform login API request and receive token
  const tokenFromApi = 'example-token'; // Replace with actual token
  dispatch(setToken(tokenFromApi));
};

export default authSlice.reducer;