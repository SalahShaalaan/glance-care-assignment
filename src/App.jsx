import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/widgets/LoadingSpinner";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Movies = lazy(() => import("./pages/Movies"));
const TopPerformers = lazy(() => import("./pages/TopPerformers"));
const Statistics = lazy(() => import("./pages/Statistics"));

const pageLoadingMessages = {
  dashboard: "Loading Dashboard...",
  movies: "Loading Movies List...",
  topPerformers: "Loading Top Performers...",
  statistics: "Loading Statistics...",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense
                fallback={
                  <LoadingSpinner message={pageLoadingMessages.dashboard} />
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="movies"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner message={pageLoadingMessages.movies} />
                }
              >
                <Movies />
              </Suspense>
            }
          />
          <Route
            path="top-performers"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner message={pageLoadingMessages.topPerformers} />
                }
              >
                <TopPerformers />
              </Suspense>
            }
          />
          <Route
            path="statistics"
            element={
              <Suspense
                fallback={
                  <LoadingSpinner message={pageLoadingMessages.statistics} />
                }
              >
                <Statistics />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
