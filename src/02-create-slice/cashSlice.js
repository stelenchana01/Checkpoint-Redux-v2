 import { createSlice } from "@reduxjs/toolkit";

export const cashSlice = createSlice ({
  name: "cash",
  initialState: 0,
  reducers: {
    receivedPaycheck: (state, action) => {
      return state + action.payload;
    },
    paidBill: (state, action) => {
      return state - action.payload;
    },
  },
}); //replace {} with your code

export default cashSlice.reducer;
export const { receivedPaycheck, paidBill } = cashSlice.actions;
