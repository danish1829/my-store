// src/utils/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import clothesReducer from './clothSlice';
import wishlistReducer from './wishListSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    clothes: clothesReducer,
    wishlist: wishlistReducer,
  },
});

export default appStore;
