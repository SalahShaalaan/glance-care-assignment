import { Row, Col } from "antd";
import FilterPanel from "../components/widgets/FilterPanal";
import MovieCard from "../components/shared/MovieCard";
import Pagination from "../components/shared/Pagination";
import useMoviesData from "../components/shared/MoviesData";

export default function Movies() {
  const { movies, currentPage, totalPages, handlePageChange } = useMoviesData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <FilterPanel />

      <Row gutter={[16, 16]} className="my-6">
        {movies.map((movie) => (
          <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
