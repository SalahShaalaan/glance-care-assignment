import { Row, Col, Card, Table } from "antd";
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
import useTopPerformersData from "../components/shared/TopPerformersData";

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

export default function TopPerformers() {
  const { performers, chartData, columns } = useTopPerformersData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card
            title="Top 10 Performers"
            className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 2,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.raw}%`,
                    },
                  },
                },
                scales: {
                  x: {
                    display: true,
                    beginAtZero: false,
                    ticks: {
                      color: "#9ca3af",
                    },
                    grid: {
                      display: false,
                    },
                    position: "bottom",
                  },
                  y: {
                    beginAtZero: false,
                    min: 20,
                    max: 100,
                    ticks: {
                      stepSize: 20,
                      callback: (value) => `${value}%`,
                      color: "#9ca3af",
                      padding: 30,
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
              height={200}
            />
          </Card>
        </Col>
        <Col xs={24}>
          <Card
            title="All Performers"
            className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Table
              dataSource={performers}
              columns={columns}
              rowKey="name"
              className="overflow-hidden"
              rowClassName="hover:bg-blue-50 transition-colors duration-200"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
