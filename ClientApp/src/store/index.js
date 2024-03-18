import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";

import popupReducer from "./popup/reducer";
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

  console.log(preloadedState.user.user);

  // Create store
  const store = configureStore({
    reducer: {
      popup: popupReducer,
      user: userReducer,
    },
    preloadedState,
  });

  return store;
};

export default initStore;
