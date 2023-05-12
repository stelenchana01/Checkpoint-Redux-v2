/*
    READ THIS FIRST

    Review the directory src/02-create-slice

    The object of these tests is to refactor the `oldStore` into a new store that
    has the same functionality, but is modularized into 3 slices.

    Included in the directory is a file called `x_oldStore.js` containing
    a store named `oldStore`. This file represents legacy code to refactor.
    You will not need to make any changes within the `x_oldStore.js` file.

    Instead, you will refactor the code into 4 new files:
      - The `store.js` file, which where you will configure the refactored store.
      - The files `ageSlice.js`, `cashSlice.js`, and `possessionsSlice.js`, which each contain
        empty slices and return a reducer. All 3 reducers are imported into `store.js`.

    Hint: You will have to subtly refactor the reducer code itself, as the original version
    was operating on an entire state object, while these new reducers will be tightly
    scoped to either the `age`, `cash`, or `possessions` slice of state.
*/

import { expect } from 'chai';
import { configureStore } from '@reduxjs/toolkit';

import { store } from '../src/02-create-slice/store';
import { ageSlice } from '../src/02-create-slice/ageSlice';
import { cashSlice } from '../src/02-create-slice/cashSlice';
import { possessionsSlice } from '../src/02-create-slice/possessionsSlice';

describe('Refactored Store', () => {
  describe('sets appropriate default values for initial state', () => {
    it('sets initial state within the store', () => {
      // this test uses the store you created in the `src/01-redux/store.js` file
      const realStore = store;
      expect(realStore.getState().age).to.be.a('number');
      expect(realStore.getState().cash).to.be.a('number');
      expect(realStore.getState().possessions).to.be.an('array');
    });
  });
  describe('has the same functionality as the old store', () => {
    // the following specs use a test store to isolate changes
    let testStore;

    beforeEach(() => {
      testStore = configureStore({
        reducer: {
          age: ageSlice.reducer,
          cash: cashSlice.reducer,
          possessions: possessionsSlice.reducer,
        },
      });
    });
    it('increments age when a person has a birthday', () => {
      testStore.dispatch(ageSlice.actions.hadBirthday());
      testStore.dispatch(ageSlice.actions.hadBirthday());
      testStore.dispatch(ageSlice.actions.hadBirthday());

      expect(testStore.getState().age).to.equal(3);
    });

    it('adds to cash when a person receives a paycheck', () => {
      testStore.dispatch(cashSlice.actions.receivedPaycheck(2300));
      testStore.dispatch(cashSlice.actions.receivedPaycheck(2300));

      expect(testStore.getState().cash).to.equal(4600);
    });

    it('subtracts from cash when a person pays a bill', () => {
      testStore.dispatch(cashSlice.actions.receivedPaycheck(1000));
      testStore.dispatch(cashSlice.actions.paidBill(100));
      testStore.dispatch(cashSlice.actions.paidBill(15));

      expect(testStore.getState().cash).to.equal(885);
    });

    it('lists new possessions after a person receives a gift', () => {
      testStore.dispatch(possessionsSlice.actions.receivedGift('Sneakers'));
      testStore.dispatch(possessionsSlice.actions.receivedGift('A Pony'));
      testStore.dispatch(possessionsSlice.actions.receivedGift('Friendship'));

      expect(testStore.getState().possessions).to.deep.equal([
        'Sneakers',
        'A Pony',
        'Friendship',
      ]);
    });
  });
});
