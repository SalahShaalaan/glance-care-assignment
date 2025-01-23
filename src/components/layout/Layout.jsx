import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Layout as AntLayout,
  Button,
  theme,
  Flex,
  Typography,
  Grid,
  Drawer,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";

const { Header, Sider, Content, Footer } = AntLayout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setCollapsed(screens.lg ? false : true);
  }, [screens.lg]);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {screens.lg && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          style={{
            overflow: "hidden",
            height: "100vh",
            position: "fixed",
            left: 0,
            zIndex: 1001,
            boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
          }}
          width={260}
        >
          <Sidebar
            collapsed={collapsed}
            mobileDrawerOpen={mobileDrawerOpen}
            screens={screens}
            onMobileClose={() => setMobileDrawerOpen(false)}
          />
        </Sider>
      )}

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
        }}
        width={260}
        closable={false}
      >
        <Sidebar
          collapsed={collapsed}
          mobileDrawerOpen={mobileDrawerOpen}
          screens={screens}
          onMobileClose={() => setMobileDrawerOpen(false)}
        />
      </Drawer>

      <AntLayout
        style={{
          marginLeft: screens.lg ? (collapsed ? 80 : 260) : 0,
          transition: "all 0.2s",
        }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Flex align="center" gap={16}>
            {screens.lg ? (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            ) : (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerOpen(true)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            )}
            <Title level={screens.sm ? 4 : 5} style={{ margin: 0 }}>
              {screens.sm ? "Movie Manager" : "MM"}
            </Title>
          </Flex>
        </Header>

        <Content
          style={{
            margin: screens.sm ? "24px 16px" : "16px 8px",
            padding: screens.sm ? 24 : 16,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>

        <Footer
          style={{
            textAlign: "center",
            padding: screens.sm ? "24px" : "12px",
          }}
        >
          Movies Dashboard Application ©{new Date().getFullYear()} Developed by
          <span className="italic"> Salah Shaalaan</span>
        </Footer>
      </AntLayout>
    </AntLayout>
  );
}
