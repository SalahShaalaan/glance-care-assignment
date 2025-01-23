import { movieService } from '../services/api';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

describe('movieService', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  test('getAllMovies success', async () => {
    const mockMovies = [{ id: 1, title: 'Test Movie' }];
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovies
    });

    const result = await movieService.getAllMovies();
    expect(result).toEqual(mockMovies);
  });

  test('getAllMovies failure', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(movieService.getAllMovies()).rejects.toThrow('Failed to fetch movies');
  });
});
