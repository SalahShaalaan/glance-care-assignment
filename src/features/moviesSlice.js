import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './moviesThunks';
import { applyFiltersAndSearch } from "../utils/moviesUtils";

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

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      state.filteredItems = applyFiltersAndSearch(state.items, state.searchTerm, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / state.itemsPerPage);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      state.filteredItems = applyFiltersAndSearch(state.items, state.searchTerm, state.filters);
      state.totalPages = Math.ceil(state.filteredItems.length / state.itemsPerPage);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = '';
      state.currentPage = 1;
      state.filteredItems = [...state.items];
      state.totalPages = Math.ceil(state.items.length / state.itemsPerPage);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setSearchTerm,
  setFilters,
  setCurrentPage,
  clearFilters
} = moviesSlice.actions;

export default moviesSlice.reducer;