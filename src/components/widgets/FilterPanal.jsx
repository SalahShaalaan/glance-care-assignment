import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, Space, Button, Typography, Divider, Empty } from "antd";
import { FilterOutlined, ClearOutlined } from "@ant-design/icons";
import { selectAllMovies, selectFilters } from "../../features/moviesSelectors";
import {
  setFilters,
  setSearchTerm,
  clearFilters,
} from "../../features/moviesSlice";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function FilterPanel() {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const currentFilters = useSelector(selectFilters);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const filteredItems = useSelector((state) => state.movies.filteredItems);

  const [uniqueValues, setUniqueValues] = useState({
    genres: [],
    years: [],
    directors: [],
    countries: [],
    languages: [],
  });

  useEffect(() => {
    if (movies.length > 0) {
      const values = movies.reduce(
        (acc, movie) => {
          movie.genre.forEach((g) => acc.genres.add(g));
          acc.years.add(movie.year);
          acc.directors.add(movie.director);
          acc.countries.add(movie.country);
          movie.language.forEach((l) => acc.languages.add(l));
          return acc;
        },
        // Set() => Used to remove duplicates from the array of movies data
        {
          genres: new Set(),
          years: new Set(),
          directors: new Set(),
          countries: new Set(),
          languages: new Set(),
        }
      );

      setUniqueValues({
        genres: [...values.genres].sort(),
        years: [...values.years].sort((a, b) => b - a),
        directors: [...values.directors].sort(),
        countries: [...values.countries].sort(),
        languages: [...values.languages].sort(),
      });
    }
  }, [movies]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleFilterChange = (type, value) => {
    dispatch(setFilters({ ...currentFilters, [type]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div
      className="filter-panel"
      style={{
        padding: "16px",
        background: "#fff",
        borderRadius: "8px",
        marginBottom: "24px",
      }}
    >
      <Title level={5} style={{ marginBottom: "16px" }}>
        <FilterOutlined /> Search & Filter Movies
      </Title>

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Search
          placeholder="Search movies by title, director, or plot..."
          allowClear
          enterButton
          size="large"
          onSearch={handleSearch}
          defaultValue={searchTerm}
        />

        <Divider style={{ margin: "12px 0" }} />

        <Space wrap>
          <Select
            style={{ width: 200 }}
            placeholder="Select Genre"
            mode="multiple"
            allowClear
            value={currentFilters.genre}
            onChange={(value) => handleFilterChange("genre", value)}
            maxTagCount={2}
          >
            {uniqueValues.genres.map((genre) => (
              <Option key={genre} value={genre}>
                {genre}
              </Option>
            ))}
          </Select>

          <Select
            style={{ width: 120 }}
            placeholder="Year"
            allowClear
            value={currentFilters.year}
            onChange={(value) => handleFilterChange("year", value)}
          >
            {uniqueValues.years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>

          <Select
            style={{ width: 200 }}
            placeholder="Director"
            allowClear
            value={currentFilters.director}
            onChange={(value) => handleFilterChange("director", value)}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {uniqueValues.directors.map((director) => (
              <Option key={director} value={director}>
                {director}
              </Option>
            ))}
          </Select>

          <Select
            style={{ width: 150 }}
            placeholder="Country"
            allowClear
            value={currentFilters.country}
            onChange={(value) => handleFilterChange("country", value)}
            showSearch
          >
            {uniqueValues.countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Select>

          <Select
            style={{ width: 150 }}
            placeholder="Language"
            allowClear
            value={currentFilters.language}
            onChange={(value) => handleFilterChange("language", value)}
            showSearch
          >
            {uniqueValues.languages.map((language) => (
              <Option key={language} value={language}>
                {language}
              </Option>
            ))}
          </Select>

          <Button onClick={handleClearFilters} icon={<ClearOutlined />}>
            Clear All
          </Button>
        </Space>
      </Space>
      {filteredItems.length === 0 && movies.length > 0 && (
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Empty
            description={
              <span style={{ fontSize: "16px" }}>
                No movies match the search and filter criteria
                {searchTerm && (
                  <div style={{ marginTop: "8px" }}>
                    Search for: <strong>{searchTerm}</strong>
                  </div>
                )}
              </span>
            }
          />
        </div>
      )}
    </div>
  );
}
