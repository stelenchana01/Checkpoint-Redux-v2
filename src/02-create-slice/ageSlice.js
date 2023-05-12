import { createSlice } from "@reduxjs/toolkit";

export const ageSlice = createSlice ({
  name: "age",
  initialState: 0,
  reducers: {
    hadBirthday: (state) => {
      return state + 1;
    },
  },
}); //replace {} with your code

export default ageSlice.reducer;
export const { hadBirthday} = ageSlice.actions;

