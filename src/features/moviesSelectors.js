export const selectAllMovies = (state) => state.movies.items;
export const selectCurrentPage = (state) => state.movies.currentPage;
export const selectTotalPages = (state) => state.movies.totalPages;
export const selectStatus = (state) => state.movies.status;
export const selectError = (state) => state.movies.error;
export const selectFilters = (state) => state.movies.filters;
export const selectSearchTerm = (state) => state.movies.searchTerm;

export const selectFilteredMovies = (state) => {
  const { filteredItems, currentPage, itemsPerPage } = state.movies;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredItems.slice(startIndex, startIndex + itemsPerPage);
};

export const selectMovieStatistics = (state) => {
  const movies = state.movies.items;
  return {
    totalMovies: movies.length,
    totalActors: [...new Set(movies.flatMap(m => m.topPerformers.map(p => p.name)))].length,
    totalCountries: [...new Set(movies.map(m => m.country))].length,
    totalOscars: movies.reduce((sum, movie) => sum + movie.oscarStatistics.wins, 0),
    genreDistribution: movies.reduce((acc, movie) => {
      movie.genre.forEach(g => { acc[g] = (acc[g] || 0) + 1; });
      return acc;
    }, {}),
    languageDistribution: movies.reduce((acc, movie) => {
      movie.language.forEach(l => { acc[l] = (acc[l] || 0) + 1; });
      return acc;
    }, {}),
    yearDistribution: movies.reduce((acc, movie) => {
      acc[movie.year] = (acc[movie.year] || 0) + 1;
      return acc;
    }, {})
  };
};

export const selectTopPerformers = (state) => {
  const movies = state.movies.items;
  const performersMap = movies.reduce((acc, movie) => {
    movie.topPerformers.forEach(performer => {
      if (!acc[performer.name]) {
        acc[performer.name] = {
          name: performer.name,
          movieCount: 1,
          movies: [{ title: movie.title, role: performer.role }]
        };
      } else {
        acc[performer.name].movieCount++;
        acc[performer.name].movies.push({
          title: movie.title,
          role: performer.role
        });
      }
    });
    return acc;
  }, {});

  // Convert map to array and sort by movie count
  return Object.values(performersMap)
    .sort((a, b) => b.movieCount - a.movieCount);
};

