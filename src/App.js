import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout} from "antd";

import { useState } from "react";
import Header from "./temp/Header";
import Sider from "./temp/Sider";
import Bottom from "./temp/Bottom";
import Modules from "./temp/modules";
import Main from "./temp/Main";
import Apitest from "./temp/api-test/Apitest";
import Working from "./temp/workingonit";
import "./index.css";
import Report1 from './temp/Report/Report1';
import Report2 from './temp/Report/Report2';

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
            className="Content"
              style={{
                left: collapse ? 0 : 240,
                width: collapse ? '100%' : '87.4%',
              }}
            >
              <Routes>
                <Route path="/" element={<Main selectedAd={selectedAd} colors={colors}/>}></Route>
                <Route path="/temp/modules" element={<Modules colors={colors}/>}></Route>
                <Route path="/temp/apitest" element={<Apitest/>}></Route>
                <Route path="/temp/alarm/setting" element={<Working/>}></Route>
                <Route path="/temp/alarm/story"element={<Working/>}></Route>
                <Route path="/temp/report/Report1"element={<Report1 colors={colors}/>}></Route>
                <Route path="/temp/report/Report2"element={<Report2 colors={colors}/>}></Route>
                <Route path="/temp/media/export"element={<Working/>}></Route>
                <Route path="/temp/media/download"element={<Working/>}></Route>
              </Routes>
            </Content>
            <Bottom collapse={collapse}/>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
