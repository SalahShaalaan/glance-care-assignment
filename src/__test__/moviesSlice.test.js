import moviesReducer, {
  setSearchTerm,
  setFilters,
  clearFilters
} from '../features/moviesSlice';
import { describe, expect, test, } from '@jest/globals';

describe('Movies Slice', () => {
  const initialState = {
    items: [],
    filteredItems: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 0,
    searchTerm: '',
    filters: {
      genre: [],
      year: null,
      director: null,
      country: null,
      language: null
    }
  };

  test('should handle initial state', () => {
    expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setSearchTerm', () => {
    const actual = moviesReducer(initialState, setSearchTerm('test'));
    expect(actual.searchTerm).toEqual('test');
    expect(actual.currentPage).toEqual(1);
  });

  test('should handle setFilters', () => {
    const filters = { genre: ['Action'] };
    const actual = moviesReducer(initialState, setFilters(filters));
    expect(actual.filters.genre).toEqual(['Action']);
  });

  test('should handle clearFilters', () => {
    const stateWithFilters = {
      ...initialState,
      filters: { genre: ['Action'] },
      searchTerm: 'test'
    };
    const actual = moviesReducer(stateWithFilters, clearFilters());
    expect(actual.filters).toEqual(initialState.filters);
    expect(actual.searchTerm).toEqual('');
  });
});
