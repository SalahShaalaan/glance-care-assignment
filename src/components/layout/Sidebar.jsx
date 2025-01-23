import { Menu, Flex, Typography } from "antd";
import {
  DashboardOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  TrophyOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Sidebar({ collapsed, screens, onMobileClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "main",
      label: "Main",
      type: "group",
      children: [
        {
          key: "/",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
        {
          key: "/movies",
          icon: <VideoCameraOutlined />,
          label: "Movies",
        },
      ],
    },
    {
      key: "analytics",
      label: "Analytics",
      type: "group",
      children: [
        {
          key: "/statistics",
          icon: <BarChartOutlined />,
          label: "Statistics",
        },
        {
          key: "/top-performers",
          icon: <TrophyOutlined />,
          label: "Top Performers",
        },
      ],
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    if (!screens.lg) {
      onMobileClose();
    }
  };

  return (
    <Flex vertical style={{ height: "100vh" }}>
      {/* Logo and Title */}
      <Flex
        align="center"
        justify={collapsed ? "center" : "space-between"}
        style={{
          height: 64,
          padding: collapsed ? "0 8px" : "0 16px",
          borderBottom: "1px solid #f0f0f0",
          background: "#112240",
        }}
      >
        <Flex align="center" gap={8}>
          <PlayCircleOutlined style={{ fontSize: 24, color: "#1890ff" }} />
          {!collapsed && (
            <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
              Movie Manager
            </Title>
          )}
        </Flex>
      </Flex>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={screens.lg ? ["main", "analytics"] : []}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          borderRight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          background: "#16213E",
          color: "#E2E8F0",
        }}
        theme="dark"
      />
    </Flex>
  );
}
