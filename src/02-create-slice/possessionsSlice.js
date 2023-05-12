import { createSlice } from "@reduxjs/toolkit";

export const possessionsSlice = createSlice ({
  name: "possesions",
  initialState: [],
  reducers: {
    receivedGift: (state, action) => {
      state.push(action.payload);
    },
  },
}); //replace {} with your code

export default possessionsSlice.reducer;
export const { receivedGift } = possessionsSlice.actions;
