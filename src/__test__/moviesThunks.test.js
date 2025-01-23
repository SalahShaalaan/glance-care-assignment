import { fetchMovies } from '../features/moviesThunks';
import { movieService } from '../services/api';
import { describe, expect, test, jest } from '@jest/globals';

jest.mock('../services/api.js');

describe('Movies Thunks', () => {
  test('fetchMovies success', async () => {
    const mockMovies = [{ id: 1, title: 'Test Movie' }];
    movieService.getAllMovies.mockResolvedValue(mockMovies);

    const dispatch = jest.fn();
    const thunk = fetchMovies();
    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls[0][0].type).toBe('movies/fetchMovies/pending');
    expect(calls[1][0].type).toBe('movies/fetchMovies/fulfilled');
    expect(calls[1][0].payload).toEqual(mockMovies);
  });

  test('fetchMovies failure', async () => {
    const errorMessage = 'Failed to fetch';
    movieService.getAllMovies.mockRejectedValue(new Error(errorMessage));

    const dispatch = jest.fn();
    const thunk = fetchMovies();
    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls[0][0].type).toBe('movies/fetchMovies/pending');
    expect(calls[1][0].type).toBe('movies/fetchMovies/rejected');
    expect(calls[1][0].payload).toBe(errorMessage);
  });
});
