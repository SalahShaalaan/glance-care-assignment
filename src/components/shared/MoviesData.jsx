import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentPage,
  selectFilteredMovies,
  selectTotalPages,
} from "../../features/moviesSelectors";
import { fetchMovies } from "../../features/moviesThunks";
import { setCurrentPage } from "../../features/moviesSlice";

export default function useMoviesData() {
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredMovies);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return {
    movies,
    currentPage,
    totalPages,
    handlePageChange,
  };
}
