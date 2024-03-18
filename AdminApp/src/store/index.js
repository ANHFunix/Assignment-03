import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";

import userReducer from "./user/reducer";

// Load current user
const loadUser = async () => {
  const response = await api.session.get();
  return response.data.user;
};

// Init store withe preloadState
const initStore = async () => {
  const preloadedState = {};

  // Get initial user
  preloadedState.user = {
    user: await loadUser(),
  };

  // Create store
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });

  return store;
};

export default initStore;
