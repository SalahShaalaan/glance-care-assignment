import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovieStatistics } from "../../features/moviesSelectors";
import { fetchMovies } from "../../features/moviesThunks";

export default function useDashboardData() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const statistics = useSelector(selectMovieStatistics);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const oscarData = {
    labels: movies.slice(0, 5).map((movie) => movie.title),
    datasets: [
      {
        label: "Oscar Wins",
        data: movies.slice(0, 5).map((movie) => movie.oscarStatistics.wins),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  };

  const recentMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 5);

  return {
    movies,
    statistics,
    oscarData,
    recentMovies,
  };
}
