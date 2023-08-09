import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout} from "antd";

import { useState } from "react";
import Header from "./test/temp/Header";
import Sider from "./test/temp/Sider";
import Bottom from "./test/temp/Bottom";
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
  const colors = [
    "#4180ec",
    "#4fd9bc",
    "#494e5f",
    "#30c7e9",
    "#6269e9",
    "#00aaaa",
    "#42c360",
    "#b5cf14",
    "#eaab2f",
    "#bababa",
  ].slice(0, 10);

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
                left: collapse ? 0 : 240,
                width: collapse ? '100%' : '87.4%',
                zIndex: 0,
                transition: "left 0.2s ease-in-out"
              }}
            >
              <Routes>
                <Route path="/" element={<Main selectedAd={selectedAd} colors={colors}/>}></Route>
                <Route path="/temp/modules" element={<Modules colors={colors}/>}></Route>
                <Route path="/temp/apitest" element={<Apitest/>}></Route>
                <Route path="/temp/alarm/setting" element={<Working/>}></Route>
                <Route path="/temp/alarm/story"element={<Working/>}></Route>
                <Route path="/temp/report/Exam"element={<ReportExam colors={colors}/>}></Route>
                <Route path="/temp/media/export"element={<Working/>}></Route>
                <Route path="/temp/media/download"element={<Working/>}></Route>

              </Routes>
            </Content>
            <Bottom/>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
