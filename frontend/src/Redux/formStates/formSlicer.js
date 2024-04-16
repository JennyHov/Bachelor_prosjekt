import { createSlice } from "@reduxjs/toolkit";


const formSlice = createSlice({
  name: 'form',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    initialSubmitForm: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    endSubmitForm: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    failSubmitForm: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  initialSubmitForm,
  endSubmitForm,
  failSubmitForm,
} = formSlice.actions;

export default formSlice.reducer;
