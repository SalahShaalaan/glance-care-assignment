import { Row, Col, Card } from "antd";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useStatisticsData from "../components/shared/StatisticsData";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  const { oscarData, genreData, languageData } = useStatisticsData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            title="Oscar Statistics"
            className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Pie data={oscarData} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title="Genre Distribution"
            className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Pie data={genreData} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title="Language Distribution"
            className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Pie data={languageData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
