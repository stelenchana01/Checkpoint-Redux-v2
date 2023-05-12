/*
  READ THIS FIRST

  Review the file `src/03-thunks/store.js`

  Included are two functions you will need to create as async thunks:

  1. fetchBalloonsAsync: issue a GET request to `/balloons` with the axios library.

  2. addBalloonAsync: issue a POST request to `/balloons`, passing in a color string with the axios library.

  You will also need to create the appropriate reducers to go along with these thunks.
 */

import MockAxiosAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import {
  balloonsSlice,
  fetchBalloonsAsync,
  addBalloonAsync,
} from '../src/03-thunks/store';

let store;
let mockAxios;

describe('Thunks', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios);
    store = configureStore({
      reducer: {
        balloons: balloonsSlice.reducer,
      },
    });
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('GET /balloons succeeds', () => {
    beforeEach(() => {
      // simulate a successful GET request to '/balloons'
      // that responds with a 200 status and an array
      mockAxios
        .onGet('/balloons')
        .reply(200, ['red balloon', 'yellow balloon', 'green balloon']);
    });

    it('sets the received balloons on state', async () => {
      await store.dispatch(fetchBalloonsAsync());
      const state = store.getState();
      expect(state.balloons.balloons).to.deep.equal([
        'red balloon',
        'yellow balloon',
        'green balloon',
      ]);
    });
  });

  describe('POST /balloons succeeds', () => {
    beforeEach(() => {
      // simulate a successful POST request to '/balloons' with the req.body { color: 'blue' }
      // that responds with a 200 status and the string 'blue balloon'
      mockAxios
        .onPost('/balloons', { color: 'blue' })
        .reply(200, 'blue balloon');

      // simulate a successful POST request to '/balloons' with the req.body { color: 'purple' }
      // that responds with a 200 status and the string 'purple balloon'
      mockAxios
        .onPost('/balloons', { color: 'purple' })
        .reply(200, 'purple balloon');
    });

    it('adds the received new balloon on to the balloons state', async () => {
      await store.dispatch(addBalloonAsync('blue'));
      await store.dispatch(addBalloonAsync('purple'));
      const state = store.getState();
      expect(state.balloons.balloons).to.deep.equal([
        'blue balloon',
        'purple balloon',
      ]);
    });
  });

  describe('**Extra Credit** GET /balloons fails', () => {
    /*
      So far, you've created reducers to handle async thunks when they are "fulfilled".
      How can you handle async thunks when they are "rejected"?
      Check out this Redux documention for createAsyncThunk for guidance:
      https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-createasyncthunk
    */
    beforeEach(() => {
      // simulate a failed GET request to '/balloons'
      // that responds with a 404 error status
      mockAxios.onGet('/balloons').reply(404);
    });

    it('sets the thrown error on state', async () => {
      await store.dispatch(fetchBalloonsAsync());
      const state = store.getState();

      expect(state.balloons.error.name).to.deep.equal('Error');
      expect(state.balloons.error.message).to.deep.equal(
        'Request failed with status code 404'
      );
      expect(state.balloons.error.stack).to.be.a('string');
    });
  });
});
