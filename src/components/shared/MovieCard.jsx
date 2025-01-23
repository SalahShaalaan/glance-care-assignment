import { useState } from "react";
import {
  Card,
  Tag,
  Typography,
  Modal,
  Space,
  List,
  Rate,
  Badge,
  Avatar,
  Row,
  Col,
} from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Text, Paragraph, Title } = Typography;
const { Meta } = Card;

export default function MovieCard({ movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardContent = (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Badge
        count={movie.oscarStatistics.wins}
        overflowCount={99}
        offset={[-8, 8]}
      >
        <div
          style={{
            marginBottom: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          {movie.genre.slice(0, 2).map((genre) => (
            <Tag
              key={genre}
              color="blue"
              style={{ margin: 0, borderRadius: "15px" }}
            >
              {genre}
            </Tag>
          ))}
          {movie.genre.length > 2 && (
            <Tag style={{ margin: 0, borderRadius: "15px" }}>
              +{movie.genre.length - 2}
            </Tag>
          )}
        </div>
      </Badge>

      <Meta
        avatar={
          <Avatar
            icon={<TeamOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
        }
        title={<div style={{ wordBreak: "break-word" }}>{movie.director}</div>}
        description="Director"
      />

      <Rate disabled defaultValue={movie.oscarStatistics.wins} count={5} />
    </Space>
  );

  const modalContent = (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <img
            src={movie.poster}
            alt={movie.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <Card
            bordered={false}
            className="stats-card"
            style={{ height: "100%" }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12} md={6}>
                <Statistic
                  icon={<TrophyOutlined />}
                  value={movie.oscarStatistics.wins}
                  label="Wins"
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Statistic
                  icon={<TrophyOutlined />}
                  value={movie.oscarStatistics.nominations}
                  label="Nominations"
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Statistic
                  icon={<ClockCircleOutlined />}
                  value={`${movie.runtime}m`}
                  label="Duration"
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Statistic
                  icon={<GlobalOutlined />}
                  value={movie.country}
                  label="Country"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card title="Oscar Categories Won" bordered={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {movie.oscarStatistics.categoriesWon?.map((category) => (
            <Tag
              key={category}
              color="gold"
              style={{ margin: 0, fontSize: "14px" }}
            >
              <TrophyOutlined /> {category}
            </Tag>
          ))}
        </div>
      </Card>

      <Card title="Plot" bordered={false}>
        <Paragraph>{movie.plot}</Paragraph>
      </Card>

      <Card title="Top Performers" bordered={false}>
        <List
          itemLayout="horizontal"
          dataSource={movie.topPerformers}
          renderItem={(performer) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: "#87d068" }}>
                    {performer.name[0]}
                  </Avatar>
                }
                title={performer.name}
                description={`as ${performer.role}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );

  return (
    <>
      <Badge.Ribbon text={`${movie.year}`} color="blue">
        <Card
          hoverable
          onClick={() => setIsModalOpen(true)}
          cover={
            <div
              style={{
                height: 0,
                paddingBottom: "150%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              >
                <PlayCircleOutlined
                  style={{
                    fontSize: 64,
                    color: "#fff",
                  }}
                />
              </div>
            </div>
          }
          actions={[
            <Space>
              <TrophyOutlined style={{ color: "gold" }} />
              <Text>{movie.oscarStatistics.wins} wins</Text>
            </Space>,
          ]}
        >
          {cardContent}
        </Card>
      </Badge.Ribbon>

      <Modal
        title={
          <Space align="center" wrap>
            <TrophyOutlined style={{ color: "gold", fontSize: 24 }} />
            <Title level={4} style={{ margin: 0 }}>
              {movie.title} ({movie.year})
            </Title>
          </Space>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: 800 }}
      >
        {modalContent}
      </Modal>
    </>
  );
}

const Statistic = ({ icon, value, label }) => (
  <Space
    direction="vertical"
    size="small"
    align="center"
    style={{ width: "100%", textAlign: "center" }}
  >
    {icon}
    <Text strong style={{ wordBreak: "break-word" }}>
      {value}
    </Text>
    <Text type="secondary">{label}</Text>
  </Space>
);
