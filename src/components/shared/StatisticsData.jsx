import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovieStatistics } from "../../features/moviesSelectors";
import { fetchMovies } from "../../features/moviesThunks";

export default function useStatisticsData() {
  const dispatch = useDispatch();
  const statistics = useSelector(selectMovieStatistics);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const oscarData = {
    labels: ["Nominations", "Wins"],
    datasets: [
      {
        data: [statistics.totalOscars, statistics.totalOscars],
        backgroundColor: ["rgba(255, 206, 86, 0.5)", "rgba(75, 192, 192, 0.5)"],
      },
    ],
  };

  const genreData = {
    labels: Object.keys(statistics.genreDistribution),
    datasets: [
      {
        data: Object.values(statistics.genreDistribution),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  const languageData = {
    labels: Object.keys(statistics.languageDistribution),
    datasets: [
      {
        data: Object.values(statistics.languageDistribution),
        backgroundColor: [
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };

  return {
    oscarData,
    genreData,
    languageData,
  };
}
