import { expect } from 'chai';
import { configureStore } from '@reduxjs/toolkit';

import { stateSlice, store } from '../src/01-redux/store';

const DOGS = [
  { id: 2, name: 'Reggie' },
  { id: 3, name: 'Pandora' },
  { id: 1, name: 'Taylor' },
];

const CATS = [
  { id: 3, name: 'Fellini' },
  { id: 2, name: 'Winnie' },
  { id: 1, name: 'Earl' },
];

function getRandomPet(pets) {
  return pets[Math.floor(Math.random() * pets.length)];
}

describe('Store', () => {
  describe('sets appropriate default values for initial state', () => {
    it('sets initial state within the stateSlice', () => {
      // configures a new store for testing using your slice from the `/src/01-redux/store` file
      const testStore = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
      });

      expect(testStore.getState().stateValues.dogs).to.be.an('array');
      expect(testStore.getState().stateValues.cats).to.be.an('array');
      expect(testStore.getState().stateValues.petToPreview).to.be.an('object');
      expect(testStore.getState().stateValues.petToAdopt).to.be.an('object');
    });
    it('sets initial state within the store', () => {
      // uses the store you created in the `src/01-redux/store.js` file
      const realStore = store;
      expect(realStore.getState().stateValues.dogs).to.be.an('array');
      expect(realStore.getState().stateValues.cats).to.be.an('array');
      expect(realStore.getState().stateValues.petToPreview).to.be.an('object');
      expect(realStore.getState().stateValues.petToAdopt).to.be.an('object');
    });
  });
});
describe('Reducer', () => {
  //the following tests use a temporary test version of the store
  describe('reduces on previewPet action', () => {
    it("sets the action's pet as the petToPreview on state (without mutating the previous state)", () => {
      // configures a store (for testing) using your (real) slice
      const store = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
      });
      const prevState = store.getState().stateValues;

      const pet = getRandomPet(DOGS);
      store.dispatch(stateSlice.actions.previewPet(pet));

      const newState = store.getState().stateValues;

      // ensures the state is updated properly - deep equality compares the values of two objects' key-value pairs
      expect(store.getState().stateValues.petToPreview).to.be.deep.equal(pet);
      // ensures we didn't mutate anything - regular equality compares the location of the object in memory
      expect(newState.petToPreview).to.not.be.equal(prevState.petToPreview);
      // ensures that unaffected state is preserved
      expect(newState.dogs).to.deep.equal(prevState.dogs);
      expect(newState.cats).to.deep.equal(prevState.cats);
      expect(newState.petToAdopt).to.deep.equal(prevState.petToAdopt);
    });
  });

  describe('reduces on adoptPet action', () => {
    it("sets the action's pet as the petToAdopt on state (without mutating the previous state)", () => {
      const store = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
      });
      const prevState = store.getState().stateValues;

      const pet = getRandomPet(DOGS);
      store.dispatch(stateSlice.actions.adoptPet(pet));

      const newState = store.getState().stateValues;

      expect(newState.petToAdopt).to.be.deep.equal(pet);
      expect(newState.petToAdopt).to.not.be.equal(prevState.petToAdopt);
      expect(newState.dogs).to.deep.equal(prevState.dogs);
      expect(newState.cats).to.deep.equal(prevState.cats);
      expect(newState.petToPreview).to.deep.equal(prevState.petToPreview);
    });
  });

  describe('reduces on addNewDog action', () => {
    it('adds the new dog to the end of the dogs array (without mutating the previous state)', () => {
      const store = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
      });
      const initialState = store.getState().stateValues;

      const firstPet = getRandomPet(DOGS);
      store.dispatch(stateSlice.actions.addNewDog(firstPet));

      const firstState = store.getState().stateValues;

      expect(firstState.dogs.length).to.be.equal(initialState.dogs.length + 1);
      expect(firstState.dogs[firstState.dogs.length - 1]).to.be.deep.equal(
        firstPet
      );
      expect(firstState.dogs).to.not.be.equal(initialState.dogs);
      expect(firstState.cats).to.deep.equal(initialState.cats);
      expect(firstState.petToAdopt).to.deep.equal(initialState.petToAdopt);
      expect(firstState.petToPreview).to.deep.equal(initialState.petToPreview);

      // If we add a second pet, it should not overwrite the first pet
      const secondPet = getRandomPet(DOGS);
      store.dispatch(stateSlice.actions.addNewDog(secondPet));

      const secondState = store.getState().stateValues;
      expect(secondState.dogs.length).to.be.equal(firstState.dogs.length + 1);
      expect(secondState.dogs[secondState.dogs.length - 1]).to.be.deep.equal(
        secondPet
      );
      expect(secondState.dogs).to.not.be.equal(firstState.dogs);
    });
  });
  describe('reduces on addNewCat action', () => {
    it('adds the new cat to the end of the cats array (without mutating the previous state)', () => {
      const store = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
      });
      const initialState = store.getState().stateValues;

      const firstPet = getRandomPet(CATS);
      store.dispatch(stateSlice.actions.addNewCat(firstPet));

      const firstState = store.getState().stateValues;

      expect(firstState.cats.length).to.be.equal(initialState.cats.length + 1);
      expect(firstState.cats[firstState.cats.length - 1]).to.be.deep.equal(
        firstPet
      );
      expect(firstState.cats).to.not.be.equal(initialState.cats);
      expect(firstState.dogs).to.deep.equal(initialState.dogs);
      expect(firstState.petToAdopt).to.deep.equal(initialState.petToAdopt);
      expect(firstState.petToPreview).to.deep.equal(initialState.petToPreview);

      // If we add a second pet, it should not overwrite the first pet
      const secondPet = getRandomPet(CATS);
      store.dispatch(stateSlice.actions.addNewCat(secondPet));

      const secondState = store.getState().stateValues;
      expect(secondState.cats.length).to.be.equal(firstState.cats.length + 1);
      expect(secondState.cats[secondState.cats.length - 1]).to.be.deep.equal(
        secondPet
      );
      expect(secondState.cats).to.not.be.equal(firstState.cats);
    });
  });
  describe('reduces on removeDog action', () => {
    it('removes a dog from the dogs array (without mutating the previous state)', () => {
      // this test needs some pre-loaded state in the store
      // the state.stateValues.dogs array is initialized as our DOGS array
      const store = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
        preloadedState: {
          stateValues: {
            dogs: DOGS,
            cats: [],
            petToPreview: {},
            petToAdopt: {},
          },
        },
      });

      const prevState = store.getState().stateValues;

      const petToRemove = getRandomPet(DOGS);
      store.dispatch(stateSlice.actions.removeDog(petToRemove.id));

      const newState = store.getState().stateValues;

      expect(newState.dogs.length).to.be.equal(prevState.dogs.length - 1);
      expect(newState.dogs.find((dog) => dog.id === petToRemove.id)).to.be
        .undefined;
      expect(newState.dogs).to.not.be.equal(prevState.dogs);
      expect(newState.cats).to.deep.equal(prevState.cats);
      expect(newState.petToAdopt).to.deep.equal(prevState.petToAdopt);
      expect(newState.petToPreview).to.deep.equal(prevState.petToPreview);
    });
  });
  describe('reduces on removeCat action', () => {
    it('removes a cat from the cats array (without mutating the previous state)', () => {
      // this test needs some pre-loaded state in the store
      // the state.stateValues.cats array is initialized as our CATS array
      const store = configureStore({
        reducer: {
          stateValues: stateSlice.reducer,
        },
        preloadedState: {
          stateValues: {
            dogs: [],
            cats: CATS,
            petToPreview: {},
            petToAdopt: {},
          },
        },
      });

      const prevState = store.getState().stateValues;

      const petToRemove = getRandomPet(CATS);
      store.dispatch(stateSlice.actions.removeCat(petToRemove.id));

      const newState = store.getState().stateValues;

      expect(newState.cats.length).to.be.equal(prevState.cats.length - 1);
      expect(newState.cats.find((cat) => cat.id === petToRemove.id)).to.be
        .undefined;
      expect(newState.cats).to.not.be.equal(prevState.cats);
      expect(newState.dogs).to.deep.equal(prevState.dogs);
      expect(newState.petToAdopt).to.deep.equal(prevState.petToAdopt);
      expect(newState.petToPreview).to.deep.equal(prevState.petToPreview);
    });
  });
});
