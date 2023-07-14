import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout, theme } from "antd";
import { useState } from "react";
import Header from "./test/temp/Header";
import Sider from "./test/temp/Sider";
import Dashboard from "./test/temp/dashboard";
import Main from "./test/temp/Main";
import "./index.css";

const { Content } = Layout;

const App = () => {
  const [collapse, setCollapse] = useState();
  const colChange = (value) => {
    setCollapse(value);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout >
      <Header onValueChange={colChange} style={{paddingTop: '60px'}}/>
        <Layout>
        <Sider collapsed={collapse} />
          <Layout >
            <Content
              style={{

                background: colorBgContainer,
                justifyContent: "space-between",
                alignItems: "center",
  
              }}
            >
              <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/temp/report-down" element={<Dashboard />}></Route>
                <Route path="/temp/monitoring/alarm"></Route>
                <Route path="/temp/monitoring/alarm-story"></Route>
                <Route path="/temp/media/upload"></Route>
                <Route path="/temp/media/export"></Route>
                <Route path="/temp/media/download"></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
