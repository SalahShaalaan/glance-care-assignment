import { store } from '../store/store';
import { describe, expect, test } from '@jest/globals';
describe('Redux Store', () => {
  test('should create store with movies reducer', () => {
    expect(store.getState().movies).toBeDefined();
  });

  test('should handle initial state', () => {
    const initialState = store.getState();
    expect(initialState.movies).toEqual(expect.any(Object));
  });
});
