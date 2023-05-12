import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBalloonsAsync = createAsyncThunk(
  'balloons/fetchBalloons',
  async () => {
    try {
      const response = await axios.get('/balloons');
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
//replace () => {} with your code

export const addBalloonAsync = createAsyncThunk('balloons/addBalloon',
async (color) => {
  try {
    const response = await axios.post('balloons', {color});
    return response.data;
  } catch (error) {
      throw Error(error.message);
  }
}
); //replace () => {} with your code

export const balloonsSlice = createSlice({
  name: 'balloons',
  initialState: {
    balloons: [],
    error: null,
  },
  // create reducers
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchBalloonsAsync.pending, (state) => {
      state.error = null;
    })
    .addCase(fetchBalloonsAsync.fulfilled, (state,action) => {
      state.balloons = action.payload;
    })
    .addCase(fetchBalloonsAsync.rejected, (state, action) => {
      state.error = action.error;
    })
    .addCase(addBalloonAsync.pending, (state) => {
      state.error = null;
    })
    .addCase(addBalloonAsync.fulfilled, (state, action) => {
      state.balloons.push(action.payload);
    })
    .addCase(addBalloonAsync.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const store = configureStore({
  reducer: {
    balloons: balloonsSlice.reducer,
  },
});




