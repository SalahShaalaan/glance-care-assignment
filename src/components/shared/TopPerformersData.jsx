import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTopPerformers } from "../../features/moviesSelectors";
import { fetchMovies } from "../../features/moviesThunks";

export default function useTopPerformersData() {
  const dispatch = useDispatch();
  const performers = useSelector(selectTopPerformers);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const chartData = {
    labels: performers.slice(0, 10).map((p) => p.name),
    datasets: [
      {
        label: "Performance Rate",
        data: performers
          .slice(0, 10)
          .map((p) =>
            (
              (p.movieCount /
                Math.max(...performers.map((p) => p.movieCount))) *
              100
            ).toFixed(0)
          ),
        fill: {
          target: "origin",
          above: "rgba(59, 130, 246, 0.1)",
        },
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const columns = [
    {
      title: "Actor",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Movies Count",
      dataIndex: "movieCount",
      key: "movieCount",
      sorter: (a, b) => b.movieCount - a.movieCount,
    },
    {
      title: "Movies",
      dataIndex: "movies",
      key: "movies",
      render: (movies) => movies.map((m) => m.title).join(", "),
    },
  ];

  return {
    performers,
    chartData,
    columns,
  };
}
