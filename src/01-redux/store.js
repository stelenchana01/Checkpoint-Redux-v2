import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  petToPreview: {},
    petToAdopt: {},
    dogs: [],
    cats: []
};

export const stateSlice = createSlice ({
  name: "pets",
  initialState: initialState,
  reducers: {
    previewPet: (state, action) => {
      state.petToPreview = action.payload;
    },
    adoptPet: (state, action) => {
      state.petToAdopt = action.payload;
    },
    addNewDog: (state, action) => {
      state.dogs.push(action.payload);
    },
    addNewCat: (state,action) => {
      state.cats.push(action.payload);
    },
    removeDog: (state,action) => {
      state.dogs = state.dogs.filter((dog) => dog.id !== action.payload);
    },
    removeCat: (state, action) => {
      state.cats = state.cats.filter((cat) => cat.id !== action.payload);
    },
  },
}); //replace {} with your code

export const store =  configureStore({
  reducer: {
    stateValues: stateSlice.reducer,
  }
}); //replace {} with your code


export const { previewPet, adoptPet, addNewDog, addNewCat, removeDog, removeCat } =
  stateSlice.actions;
export default store;
