import { configureStore } from '@reduxjs/toolkit';
import ageReducer from './ageSlice';
import cashReducer from './cashSlice';
import possessionsReducer from './possessionsSlice';

export const store = configureStore ({
  reducer: {
    age: ageReducer,
    cash: cashReducer,
    possessions: possessionsReducer,
  },
}); //replace {} with your code

export default store;
