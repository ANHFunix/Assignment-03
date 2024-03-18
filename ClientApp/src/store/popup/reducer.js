import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "popup",
  initialState: { isShow: false },
  reducers: {
    show(state, action) {
      state.isShow = true;
      state.item = action.payload.item;
      state.itemId = action.payload.item._id;
    },
    hide(state) {
      state.isShow = false;
    },
  },
});

export const popupActions = slice.actions;
export default slice.reducer;
