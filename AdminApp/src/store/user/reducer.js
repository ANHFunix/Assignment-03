import { createSlice } from "@reduxjs/toolkit";
import { load, login, logout, save } from "./actions";

// Create slice
const slice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
    user: null,
  },
  reducers: {
    changeCartProductQty(state, action) {
      // Get action payload
      const product = action.payload.product;
      const qty = action.payload.qty;

      // Get cart
      const user = JSON.parse(JSON.stringify(state.user));
      const cart = user.cart;

      // Find product index in current cart
      const index = cart.products.findIndex((prod) => prod.product._id === product._id);

      // Update cart products
      if (index === -1) cart.products.push({ product, qty });
      else {
        console.log(cart.products[index].qty);
        cart.products[index].qty += qty;
        console.log(cart.products[index].qty);
      }
      cart.products = cart.products.filter((prod) => prod.qty > 0);
      cart.total_price = cart.products.reduce((price, prod) => (price += prod.product.price * prod.qty), 0);

      // Update cart
      state.user.cart = cart;
    },
    clearCart(state) {
      state.user.cart = { products: [], total_price: 0 };
    },
  },
  extraReducers: {
    // Login action
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      alert(action.payload.message);
    },
    [login.rejected]: (state, action) => {
      const error = action.payload.error;
      state.isLoading = false;
      state.error = error;
      throw error;
    },
    // Logout action
    [logout.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = null;
      alert(action.payload.message);
    },
    [logout.rejected]: (state, action) => {
      const error = action.payload.error;
      state.isLoading = false;
      state.error = error;
      throw error;
    },
    // Load current user
    [load.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [load.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    [load.rejected]: (state, action) => {
      const error = action.payload.error;
      state.isLoading = false;
      state.error = error;
      throw error;
    },
    // Save user
    [save.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [save.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.user = action.payload.item;
    },
    [save.rejected]: (state, action) => {
      const error = action.payload.error;
      state.isLoading = false;
      state.error = error;
      throw error;
    },
  },
});

export const userActions = { ...slice.actions, login, logout, load, save };
export default slice.reducer;
