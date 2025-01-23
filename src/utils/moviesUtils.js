// for search and filter

export const applyFiltersAndSearch = (items, searchTerm, filters) => {
  let result = [...items];

  // Apply search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    result = result.filter(movie =>
      movie.title.toLowerCase().includes(searchLower) ||
      movie.director.toLowerCase().includes(searchLower) ||
      movie.plot.toLowerCase().includes(searchLower) ||
      movie.genre.some(g => g.toLowerCase().includes(searchLower))
    );
  }

  // Apply filters
  const { genre, year, director, country, language } = filters;

  if (genre?.length > 0) {
    result = result.filter(movie => genre.some(g => movie.genre.includes(g)));
  }

  if (year) {
    result = result.filter(movie => movie.year === parseInt(year));
  }

  if (director) {
    result = result.filter(movie =>
      movie.director.toLowerCase() === director.toLowerCase()
    );
  }

  if (country) {
    result = result.filter(movie =>
      movie.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (language) {
    result = result.filter(movie =>
      movie.language.some(lang => lang.toLowerCase() === language.toLowerCase())
    );
  }

  return result;
};