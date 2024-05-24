import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changePassword } from "./userService.js";

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      console.log("Retrieved token:", token);
      const response = await fetch(`/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch user:', errorData.message);
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log('Fetched user data:', userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedUserData, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/${updatedUserData.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData,
});

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};
  
const userSlice = createSlice({
  name: 'user',
  initialState,
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
    initialDeleteUser: (state) => {
      state.loading = true;
    },
    endDeleteUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    failDeleteUser: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    initialDeleteUser: (state) => {
      state.loading = true;
    },
    endDeleteUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    failDeleteUser: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
  
export const {signOut, initialDeleteUser, endDeleteUser, failDeleteUser, initialSignIn, endSignIn, failSignIn, initialUpdatedUser, endUpdatedUser, failUpdatedUser  } = userSlice.actions;

export default userSlice.reducer;
