import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout, theme,Affix } from "antd";

import { useState } from "react";
import Header from "./test/temp/Header";
import Sider from "./test/temp/Sider";
import Modules from "./test/temp/modules";
import Main from "./test/temp/Main";
import Apitest from "./test/temp/api-test/Apitest";
import Working from "./test/temp/workingonit";
import "./index.css";
import ReportExam from './test/temp/Report/Exam';

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

  return (
    <BrowserRouter>
      <Layout >
      <Header onValueChange={colChange} style={{paddingTop: '60px'}}/>
        <Layout>

        <Sider collapsed={collapse} onValueChange={selectAd}/>

          <Layout >
            <Content
              style={{
                background: 'white',//content 배경 색
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                top : 61,
                left: 240,
                width: '87.4%',
                zIndex: 0,
              }}
            >
              <Routes>
                {selectedAd === '0'? <Route path="/" element={<Main/>}></Route> : <Route path="/" element={<Working/>}></Route>}
                <Route path="/temp/modules" element={<Modules />}></Route>
                <Route path="/temp/apitest" element={<Apitest/>}></Route>
                <Route path="/temp/monitoring/alarm" element={<Working/>}></Route>
                <Route path="/temp/monitoring/alarm-story"element={<Working/>}></Route>
                <Route path="/temp/report/Exam"element={<ReportExam/>}></Route>
                <Route path="/temp/media/export"element={<Working/>}></Route>
                <Route path="/temp/media/download"element={<Working/>}></Route>

              </Routes>
            </Content>

          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
