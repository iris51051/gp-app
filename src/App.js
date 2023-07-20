import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout, theme } from "antd";
import { useState } from "react";
import Header from "./test/temp/Header";
import Sider from "./test/temp/Sider";
import Dashboard from "./test/temp/dashboard";
import Main from "./test/temp/Main";
import Working from "./test/temp/workingonit";
import "./index.css";

const { Content } = Layout;

const App = () => {
  const [collapse, setCollapse] = useState();
  const [selectedAd, setSelectedAd] = useState();
  const colChange = (value) => {
    setCollapse(value);
  };
  const selectAd =(value)=>{
    setSelectedAd(value)
  }
  console.log("selectedAdselectedAdselectedAdselectedAd",selectedAd);
  return (
    <BrowserRouter>
      <Layout >
      <Header onValueChange={colChange} style={{paddingTop: '60px'}}/>
        <Layout>
        <Sider collapsed={collapse} onValueChange={selectAd}/>
          <Layout >
            <Content
              style={{

                background: '#edf1f5',
                justifyContent: "space-between",
                alignItems: "center",
  
              }}
            >
              <Routes>
                {selectedAd === '0'? <Route path="/" element={<Main/>}></Route> : <Route path="/" element={<Working/>}></Route>}
                <Route path="/temp/dashboard" element={<Dashboard />}></Route>
                <Route path="/temp/report-down" element={<Working/>}></Route>
                <Route path="/temp/monitoring/alarm" element={<Working/>}></Route>
                <Route path="/temp/monitoring/alarm-story"element={<Working/>}></Route>
                <Route path="/temp/media/upload"element={<Working/>}></Route>
                <Route path="/temp/media/export"element={<Working/>}></Route>
                <Route path="/temp/media/download"element={<Working/>}></Route>
                <Route path="*"element={<Working/>}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
