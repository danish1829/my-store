// src/utils/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import clothesReducer from './clothSlice';
import wishlistReducer from './wishListSlice';
import cartReducer from './cartSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    clothes: clothesReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default appStore;
