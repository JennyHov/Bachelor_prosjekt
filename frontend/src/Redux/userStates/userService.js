import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/user/${userId}/change-password`, { currentPassword, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);