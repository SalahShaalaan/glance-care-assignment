export const movieService = {
  async getAllMovies() {
    try {

      const response = await fetch('/movies.json');
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};