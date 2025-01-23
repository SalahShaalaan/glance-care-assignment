import { Row, Col, Card, Typography, Table } from "antd";
import {
  VideoCameraOutlined,
  TrophyOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import useDashboardData from "../components/shared/DashboardData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

export default function Dashboard() {
  const { statistics, oscarData, recentMovies } = useDashboardData();

  const StatCard = ({ icon, title, value }) => (
    <Card
      className="stat-card"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
        border: "1px solid #ccc",
        borderRadius: "16px",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">{title}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {value}
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-blue-100">
          <span className="text-2xl text-blue-500">{icon}</span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="dashboard bg-gray-50 min-h-screen p-6">
      <AntTitle level={2} className="text-gray-800 mb-6">
        Dashboard
      </AntTitle>

      {/* Stats */}
      <Row gutter={[16, 16]} className="stats-cards">
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<VideoCameraOutlined />}
            title="Total Movies"
            value={statistics.totalMovies}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<TeamOutlined />}
            title="Total Actors"
            value={statistics.totalActors}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<GlobalOutlined />}
            title="Total Countries"
            value={statistics.totalCountries}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<TrophyOutlined />}
            title="Total Oscar Wins"
            value={statistics.totalOscars}
          />
        </Col>
      </Row>

      {/* Charts and Lists */}
      <Row gutter={[16, 16]} className="mt-6">
        {/* Oscar Chart */}
        <Col xs={24} lg={12}>
          <Card
            title="Top Oscar Winning Movies"
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <Line
              data={oscarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.05)",
                    },
                    ticks: {
                      font: {
                        size: 11,
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        size: 11,
                      },
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                    borderColor: "#3b82f6",
                    borderWidth: 2,
                  },
                  point: {
                    radius: 4,
                    backgroundColor: "#ffffff",
                    borderColor: "#3b82f6",
                    borderWidth: 2,
                    hoverRadius: 6,
                  },
                },
              }}
              height={200}
            />
          </Card>
        </Col>

        {/* Recent Movies */}
        <Col xs={24} lg={12}>
          <Card
            title="Recent Movies"
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <Table
              dataSource={recentMovies}
              columns={[
                {
                  title: "Poster",
                  dataIndex: "poster",
                  key: "poster",
                  render: (poster) => (
                    <img
                      src={poster}
                      alt="Movie Poster"
                      className="w-16 h-24 object-cover rounded-md"
                    />
                  ),
                },
                {
                  title: "Title",
                  dataIndex: "title",
                  key: "title",
                  render: (text) => <span className="font-medium">{text}</span>,
                },
                {
                  title: "Year",
                  dataIndex: "year",
                  key: "year",
                  className: "text-gray-600",
                },
                {
                  title: "Oscars",
                  dataIndex: "oscarStatistics",
                  key: "oscars",
                  render: (stats) => `${stats.wins}/${stats.nominations}`,
                  className: "text-blue-600 font-semibold",
                },
              ]}
              pagination={false}
              className="w-full"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
