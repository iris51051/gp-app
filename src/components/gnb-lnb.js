import React from "react";
import "./index.css";
import {
  MenuFoldOutlined,
  LaptopOutlined,
  UserOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Sider, Content } = Layout;
const items1 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
export const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div>
          <div className="logo" />
          <img
            src="./imges/admin-logo-dark.png"
            alt="home"
            className="light-logo"
          />
          <img
            src="./imges/admin-text-dark.png"
            alt="home"
            className="light-logo"
          ></img>

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
        </div>
      </Header>

      <Layout height={"100%"}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items1}
          />
        </Sider>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
          }}
        ></Content>
        +
      </Layout>
    </Layout>
  );
};
