import React, { useState, useEffect } from "react";
import { Col, Tabs, Row, Divider } from "antd";
import Breadcrumb from "../components/Breadcrumd";
import { IoMdTimer } from "react-icons/io";
import MainTab1 from "./main-tab/main-Tab1";
import MainTab2 from "./main-tab/main-Tab2";
import { Space, Typography, Button,Switch,Tag } from "antd";
import {PlusSquareOutlined,MinusSquareOutlined} from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import Calendar from "../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../components/filter.js";
import AdPerformance from "../components/ADPerfomance";
import ScoreCardChartComp from "../components/ScoreChartCard";
import MultipleBarChart from "../components/MuiltiBarChart";
import AdResultTable from "../components/AdResultTable";
import MDResultTable from "../components/MDResultTable.js";
import MDTransBar from "../components/MediaTransition/MDTransBar.js";
import MDTransPie from "../components/MediaTransition/MDTransPie.js";
import DeviceTransPie from "../components/MediaTransition/DeviceTransPie.js";

const { TabPane } = Tabs;
const { Text } = Typography;

const Main = () => {
  const items = [
    { title: "AIR(매체 통합 리포트)", href: "/" },
    { title: "대시보드" },
  ];

  const dispop = 10;
  const [adList, setAdList] = useState([]);
  const [adsiteList, setAdStieList] = useState([]);
  const [mdList, setMdList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const handleChange = () => {
    setCollapsed(!collapsed);
  };
  
  const [filterOptions, setFilterOptions] = useState([]);
  const adoptions = [
    { label: "광고비 없음", value: "광고비 없음", children: [
      { name: "매출액",value :  230000}
    ]},
    { label: "매출액 없음", value: "매출액 없음", children: [
      { name: "광고비",value :  230000}
    ]},
    { label: "둘 다 없음", value: "둘 다 없음" },
    { label: "롯데푸드몰", value: "롯데푸드몰",children: [
      { name: "총 광고비", value : 130000},
      { name: "매출액",value :  230000}
    ]},
    { label: "모바일미샤", value: "모바일미샤",children: [
      { name: "총 광고비", value : 100000},
      { name: "매출액",value : 210000 }
    ]},
    { label: "비즈스프링", value: "비즈스프링_",children: [
      { name: "총 광고비", value : 100000},
      { name: "매출액",value : 130000 }
    ]},
    { label: "A 비즈스프링", value: "A 비즈스프링",children: [
      { name: "총 광고비", value : 103000},
      { name: "매출액",value : 120000 }
    ]},
    {
      label: "네스프레소",
      value: "네스프레소",children: [
        { name: "총 광고비", value : 200000},
        { name: "매출액",value : 340000 }
      ]},
    { label: "라이프하우스", value: "라이프하우스",children: [
      { name: "총 광고비", value : 300000},
      { name: "매출액",value : 230000 }
    ]},
    { label: "테스트", value: "테스트" ,children: [
      { name: "총 광고비", value : 180000},
      { name: "매출액",value : 300000 }
    ]},
    { label: "재테스트", value: "재테스트" ,children: [
      { name: "총 광고비", value : 210000},
      { name: "매출액",value : 450000 }
    ]},
    { label: "oniontest", value: "oniontest" ,children: [
      { name: "총 광고비", value : 600000},
      { name: "매출액",value : 1000000 }
    ]},
    { label: "(주)교육지대", value: "(주)교육지대" ,children: [
      { name: "총 광고비", value : 324500},
      { name: "매출액",value : 543000 }
    ]},
    { label: "미샤", value: "미샤" ,children: [
      { name: "총 광고비", value : 203000},
      { name: "매출액",value : 452000 }
    ]},
  ];
  const adsiteoptions = [
    { label: "족보닷컴", value: "족보닷컴" },
    { label: "족보닷컴 모바일", value: "족보닷컴 모바일" },
    { label: "에이블샵", value: "에이블샵" },
    { label: "미샤 모바일", value: "미샤 모바일" },
    { label: "족보클라우드", value: "족보클라우드" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
    { label: "비즈스프링_대행사", value: "비즈스프링_대행사" },
    { label: "비즈스프링", value: "비즈스프링" },
    { label: "네스프레소", value: "네스프레소" },
    { label: "lifehouses", value: "lifehouses" },
    { label: "TAM", value: "TAM" },
    { label: "진실 테스트 220726", value: "진실 테스트 220726" },
    { label: "국가대표광고", value: "국가대표광고" },
    { label: "[재홍 테스트 230103]", value: "[재홍 테스트 230103]" },
    { label: "test.com", value: "test.com" },
    { label: "wjyang", value: "wjyang" },
    { label: "biz.com", value: "biz.com" },
    { label: "M롯데푸드몰", value: "M롯데푸드몰" },
  ];

  // 광고매체사 옵션
  const mdoptions = [
    { label: "네이버", value: "네이버" },
    { label: "카카오", value: "카카오" },
    { label: "페이스북", value: "페이스북" },
    { label: "ADN PC", value: "ADN PC" },
    { label: "DABLE", value: "DABLE" },
    { label: "모비온", value: "모비온" },
    { label: "구글", value: "트구글위터" },
    { label: "FACEBOOK", value: "FACEBOOK" },
  ];
  //모든 필터 선택된 상태로 초기 로딩.
  useEffect(() => {
    
    setFilterOptions([adoptions.map((item)=>item.value), adsiteoptions.map((item)=>item.value), mdoptions.map((item)=>item.value)]);
  }, []);
  
  const adChange = (value) => {
    const AdfilteredValue = value.filter((option) => option !== "selectAll");
    //제거하지 말것 무한 루프에 들어감.
    //useMemo를 사용하면 해결이 가능하지만 코드가 길어짐.
    if (!isEqual(AdfilteredValue, adList)) {
      setAdList(AdfilteredValue);
    }
  };
  const mdChange = (value) => {
    const MdfilteredValue = value.filter((option) => option !== "selectAll");
    //제거하지 말것 무한 루프에 들어감.
    //useMemo를 사용하면 해결이 가능하지만 코드가 길어짐.
    if (!isEqual(MdfilteredValue, mdList)) {
      setMdList(MdfilteredValue);
    }
  };

  const adsiteChange = (value) => {
    const AdSitefilteredValue = value.filter(
      (option) => option !== "selectAll"
    );
    //제거하지 말것 무한 루프에 들어감.
    //useMemo를 사용하면 해결이 가능하지만 코드가 길어짐.
    if (!isEqual(AdSitefilteredValue, adsiteList)) {
      setAdStieList(AdSitefilteredValue);
    }
  };
  const updateFilter =()=>{
    setFilterOptions([adList, adsiteList,mdList ]);
  }
  const filterDivStyle = {
    border: "1px solid #e8ecee",
    padding: collapsed ? "0" : "25px",
    height: collapsed ? "0" : "auto",
    overflow: "hidden",
    transition: "height 0.3s ease",
  };
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
    <>
    <div className="MainContainer">
      <Row className="title-Row">
        <Col xs={24}>
            <Breadcrumb items={items} />
        </Col>
        <Col xs={24}>
          <div className="active-title">
            <IoMdTimer className="title-icon" />
            <span className="title-text">대시보드</span>
          </div>
        </Col>
      </Row>
      <div>
      <div style={{ border: "1px solid #e8ecee",paddingLeft:"20px", display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h6>필터 선택</h6>
        <Button
            type="text"
            icon={collapsed ? <PlusSquareOutlined /> :<MinusSquareOutlined />}
            onClick={handleChange}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              justifySelf: "flex-end",
            }}
          />
      </div>
      <div
      className="FilterDiv"
      collapsible
      collapsed={collapsed}
      collapsedHeight="0"
       style={filterDivStyle}>
        <Space size="large">
          <Text strong level={4}>
            대상&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>

          <Adfilter options={adoptions} onValueChange={adChange} />
          <AdSitefilter options={adsiteoptions} onValueChange={adsiteChange} />
          <Mdfilter options={mdoptions} onValueChange={mdChange} />
          {/* <Switch className="MainTabSwitch" checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked >
          </Switch> */}
           <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked />
        </Space>
        <br></br>
        <div style={{paddingTop:"20px"}}>
        <Space size="large">
          <Text strong level={4}>
            기간&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Calendar />
          <Button type="primary" onClick={updateFilter}>확인</Button>
        </Space>

        </div>
      </div>
      <div style={{border:'1px solid rgb(232, 236, 238)'}}>
        <div style={{display:'flex'}}>
          <span style={{fontSize:"10px"}}> 광고주:   </span>
          {adList.length <= dispop ? (
        <div className="selected-analysis-targer-p">
          {adList.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      ) : (
        <>
          <div className="selected-analysis-targer-p">
            {adList.slice(0, dispop).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
            <span>...</span>
          </div>
        </>
      )}
          <span>매체 : </span>
          {mdList.length <= dispop ? (
        <div className="selected-analysis-target-p">
          {mdList.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      ) : (
        <>
          <div className="selected-analysis-targer-p">
            {mdList.slice(0, dispop).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
            <span>...</span>
          </div>
        </>
      )}
      </div>
        </div>
        <Tabs>
          <TabPane tab="통합광고 대시보드" key="1">
            <MainTab1 />
          </TabPane>
          <TabPane tab="광고주/매체사별 요약 대시보드" key="2">
           {/* <MainTab2></MainTab2> */}
          </TabPane>
        </Tabs>
      </div>
      </div>
    </>
  );
};
export default Main;
