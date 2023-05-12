/*
FOR REFERENCE ONLY
You do not need to make any edits to this file.
This is the old version of the store, which you will refactor into 3 slices.
*/

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    age: 0,
    cash: 0,
    possessions: [],
  },
  reducers: {
    hadBirthday(state) {
      state.age = state.age + 1;
    },
    receivedPaycheck(state, action) {
      state.cash = state.cash + action.payload;
    },
    paidBill(state, action) {
      state.cash = state.cash - action.payload;
    },
    receivedGift(state, action) {
      state.possessions.push(action.payload);
    },
  },
});

export const oldStore = configureStore({
  reducer: {
    stateValues: stateSlice.reducer,
  },
});
