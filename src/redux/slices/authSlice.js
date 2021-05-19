import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BoomApi from '../../api';

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, password }, { dispatch }) => {
    const result = await BoomApi.createUser(username, password);
    if (result.success) {
      dispatch(login({ username, password }))
      return result.success
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    return await BoomApi.getSession(username, password)
  }
)

// INITIAL STATE
const initialState = {
  username: null,
  accessToken: null,
  status: null,
};

// SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth() {
      return initialState;
    },
    resetAuthStatus(state) {
      state.status = null;
    }
  },
  extraReducers: {
    [signup.pending]: state => {
      state.status = 'loading';
    },
    [signup.rejected]: state => {
      state.status = 'failed';
    },
    [login.pending]: state => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.username = payload.username;
      state.status = 'success';
    },
    [login.rejected]: state => {
      state.status = 'failed';
    },
  },
});

// EXPORTS
export const { signout, resetAuthStatus, resetAuth } = authSlice.actions;

export const selectAuthStatus = state => state.auth.status;
export const selectAuthState = state => state.auth;

export const authReducer = authSlice.reducer;
