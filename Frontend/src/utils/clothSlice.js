import { createSlice } from "@reduxjs/toolkit";

const clothesSlice = createSlice({
  name: "clothes",
  initialState: {
    allClothes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setClothes: (state, action) => {
      state.allClothes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearClothes: (state) => {
      state.allClothes = [];
    },
  },
});

export const { setClothes, setLoading, setError, clearClothes } = clothesSlice.actions;

export default clothesSlice.reducer;
