import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Login action
export const login = createAsyncThunk("user/login", async (account, { rejectWithValue }) => {
  try {
    // Create session
    const response = await api.session.create(account);
    return response.data;

    // Catch error
  } catch (error) {
    if (!error.response) throw error;
    const { status, data } = error.response;
    return rejectWithValue({ status, error: new Error(data.error) });
  }
});

// Logout action
export const logout = createAsyncThunk("user/logout", async (arg, { rejectWithValue }) => {
  try {
    // Delete session
    const response = await api.session.delete();
    return response.data;

    // Catch error
  } catch (error) {
    if (!error.response) throw error;
    const { status, data } = error.response;
    return rejectWithValue({ status, error: new Error(data.error) });
  }
});

// Load current user;
export const load = createAsyncThunk("user/load", async (arg, { rejectWithValue }) => {
  try {
    // Get session
    const response = await api.session.get();
    return response.data;

    // Catch error
  } catch (error) {
    if (!error.response) throw error;
    const { status, data } = error.response;
    return rejectWithValue({ status, error: new Error(data.error) });
  }
});

// Save current user;
export const save = createAsyncThunk("user/save", async (arg, { getState, rejectWithValue }) => {
  try {
    // Save user
    const user = getState().user.user;
    const response = await api.user.updateById(user._id, user);
    return response.data;

    // Catch error
  } catch (error) {
    if (!error.response) throw error;
    const { status, data } = error.response;
    return rejectWithValue({ status, error: new Error(data.error) });
  }
});
