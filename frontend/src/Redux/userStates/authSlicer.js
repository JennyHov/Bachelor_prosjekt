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
  const tokenFromApi = 'example-token'; 
  dispatch(setToken(tokenFromApi));
};

export default authSlice.reducer;