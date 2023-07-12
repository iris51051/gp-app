import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, theme, Affix} from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Gnb = ({ onValueChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [top, setTop] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const lightTextRef = useRef(null);
  const leftpartRef = useRef(null);

  useEffect(() => {
      if (collapsed) {
        lightTextRef.current.style.width = "0";
        leftpartRef.current.style.width = "54";
        leftpartRef.current.style.paddingRight= "0";
      } else {
        lightTextRef.current.style.width = "auto";
        leftpartRef.current.style.width = "auto";
        leftpartRef.current.style.paddingRight= "30px";
      }
  }, [collapsed]);

  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    onValueChange(collapsed);
  }, [collapsed, onValueChange]);

  return (
    <Layout>
      <Affix offsetTop={top}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            width: "100%",
            height: "61px",
          }}
        >
          <div className="top-left-part" ref={leftpartRef}>

          <Link to="/" className="Logo">
            <div style={{height:'60px'}}>
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
              </div>
          </Link>
          </div>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleChange}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
      </Affix>
    </Layout>
  );
};

export default Gnb;
