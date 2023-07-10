import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Gnb = ({ onValueChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const lightTextRef = useRef(null);

  useEffect(() => {
    if (collapsed) {
      lightTextRef.current.style.width = "0";
    } else {
      lightTextRef.current.style.width = "auto";
    }
  }, [collapsed]);

  const hanldeChange = () => {
    setCollapsed(!collapsed);
  };
  onValueChange(collapsed);
  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
        }}
      >
        <Link to="/" className="Logo">
          <img
            src={process.env.PUBLIC_URL + "/admin-logo-dark.png"}
            alt="home"
            className="light-logo"
          />

          <img
            src={process.env.PUBLIC_URL + "/admin-text-dark.png"}
            alt="home"
            className="light-text"
            ref={lightTextRef}
          ></img>
        </Link>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={hanldeChange}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header>
    </Layout>
  );
};

export default Gnb;
