import { createAsyncThunk } from '@reduxjs/toolkit';
import { movieService } from "../services/api";

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const data = await movieService.getAllMovies();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);