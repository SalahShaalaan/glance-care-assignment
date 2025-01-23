import {
  selectAllMovies,
  selectFilteredMovies,
  selectMovieStatistics,
  selectTopPerformers
} from '../features/moviesSelectors';
import { describe, expect, test } from '@jest/globals';

describe('Movies Selectors', () => {
  const mockState = {
    movies: {
      items: [
        {
          id: 1,
          title: 'Test Movie',
          genre: ['Action'],
          language: ['English'],
          topPerformers: [{ name: 'Actor 1', role: 'Lead' }],
          oscarStatistics: { wins: 2, nominations: 5 },
          year: 2023,
          country: 'USA'
        }
      ],
      currentPage: 1,
      itemsPerPage: 8,
      filteredItems: [{ id: 1, title: 'Test Movie' }]
    }
  };

  test('selectAllMovies returns all movies', () => {
    expect(selectAllMovies(mockState)).toEqual(mockState.movies.items);
  });

  test('selectFilteredMovies returns paginated movies', () => {
    const filtered = selectFilteredMovies(mockState);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Test Movie');
  });

  test('selectMovieStatistics returns correct statistics', () => {
    const stats = selectMovieStatistics(mockState);
    expect(stats.totalMovies).toBe(1);
    expect(stats.totalActors).toBe(1);
    expect(stats.totalCountries).toBe(1);
    expect(stats.totalOscars).toBe(2);
    expect(stats.genreDistribution).toHaveProperty('Action', 1);
    expect(stats.languageDistribution).toHaveProperty('English', 1);
  });

  test('selectTopPerformers returns sorted performers list', () => {
    const performers = selectTopPerformers(mockState);
    expect(performers).toHaveLength(1);
    expect(performers[0].name).toBe('Actor 1');
    expect(performers[0].movieCount).toBe(1);
  });
});
