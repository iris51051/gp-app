import React, { useState, useEffect, useCallback } from "react";
import { Col, Tabs, Row} from "antd";
import Breadcrumb from "../components/Breadcrumd";
import { IoMdTimer } from "react-icons/io";
import MainTab1 from "./main-tab/main-Tab1";
import MainTab2 from "./main-tab/main-Tab2";
import { Space, Typography, Button,Switch,Tag,Radio } from "antd";
import {PlusSquareOutlined,MinusSquareOutlined} from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../components/filter.js";
import ScoreCardChartComp from "../components/ScoreChartCard";
import AdData from "../data/AdData";
import adMediaData from "../data/AdMediaData";
import {VatStatDateData,StatDateData} from "../data/StatDateData";
import {VatByDateData,ByDateData} from "../data/ByDateData";
import AdSiteData from "../data/AdSiteData";
import format from "date-fns/format";


//광고매체사 옵션
const adProviders = [];
for (const data of adMediaData) {
  // Check if the ad provider is not already present in the adProviders array
  const isAdProviderExist = adProviders.some(
    (provider) => provider.name === data.ad_provider
  );

  if (!isAdProviderExist) {
    // If it's not present, add it to the adProviders array
    adProviders.push({ name: data.ad_provider, value: data.ad_provider });
  }
}
console.log(AdData);
console.log(adMediaData);
console.log(StatDateData);
console.log(VatStatDateData);
const { TabPane } = Tabs;
const { Text } = Typography;

const Main = () => {
  const items = [
    { title: "AIR(매체 통합 리포트)", href: "/" },
    { title: "대시보드" },
  ];
  
  const [adList, setAdList] = useState([]);
  const [adsiteList, setAdStieList] = useState([]);
  const [mdList, setMdList] = useState([]);
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);
  const [vatValue, setVatValue] = useState(true);
  const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
  const [BydateValue, setByDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
  const [startDate,setStartDate]=useState(`${format(new Date(),"yyyy-MM-dd")}`)
  const [endDate,setEndDate]=useState(`${format(new Date(),"yyyy-MM-dd")}`)
  const [datas, setDatas] = useState([VatStatDateData,VatByDateData])

  const coll1Change = () => {
    setCollapsed1(!collapsed1);
  };
  const coll2Change = () => {
    setCollapsed2(!collapsed2);
  };
  const defaultFilterOptions = {
    AdData: AdData,
    AdSiteData: AdSiteData,
    adMediaData: adMediaData,
    vatValue: vatValue,
    Datas : datas
  };
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);


  // const adoptions = [

  //   { label: "광고비 없음", value: "광고비 없음", children: [
  //     { name: "매출액",value :  230000}
  //   ]},
  //   { label: "매출액 없음", value: "매출액 없음", children: [
  //     { name: "광고비",value :  230000}
  //   ]},
  //   { label: "둘 다 없음", value: "둘 다 없음" },
  //   { label: "롯데푸드몰", value: "롯데푸드몰",children: [
  //     { name: "총 광고비", value : 130000},
  //     { name: "매출액",value :  230000}
  //   ]},
  //   { label: "모바일미샤", value: "모바일미샤",children: [
  //     { name: "총 광고비", value : 100000},
  //     { name: "매출액",value : 210000 }
  //   ]},
  //   { label: "비즈스프링", value: "비즈스프링_",children: [
  //     { name: "총 광고비", value : 100000},
  //     { name: "매출액",value : 130000 }
  //   ]},
  //   { label: "A 비즈스프링", value: "A 비즈스프링",children: [
  //     { name: "총 광고비", value : 103000},
  //     { name: "매출액",value : 120000 }
  //   ]},
  //   {
  //     label: "네스프레소",
  //     value: "네스프레소",children: [
  //       { name: "총 광고비", value : 200000},
  //       { name: "매출액",value : 340000 }
  //     ]},
  //   { label: "라이프하우스", value: "라이프하우스",children: [
  //     { name: "총 광고비", value : 300000},
  //     { name: "매출액",value : 230000 }
  //   ]},
  //   { label: "테스트", value: "테스트" ,children: [
  //     { name: "총 광고비", value : 180000},
  //     { name: "매출액",value : 300000 }
  //   ]},
  //   { label: "재테스트", value: "재테스트" ,children: [
  //     { name: "총 광고비", value : 210000},
  //     { name: "매출액",value : 450000 }
  //   ]},
  //   { label: "oniontest", value: "oniontest" ,children: [
  //     { name: "총 광고비", value : 600000},
  //     { name: "매출액",value : 1000000 }
  //   ]},
  //   { label: "(주)교육지대", value: "(주)교육지대" ,children: [
  //     { name: "총 광고비", value : 324500},
  //     { name: "매출액",value : 543000 }
  //   ]},
  //   { label: "미샤", value: "미샤" ,children: [
  //     { name: "총 광고비", value : 203000},
  //     { name: "매출액",value : 452000 }
  //   ]},
  // ];
  // const adsiteoptions = [
  //   { label: "족보닷컴", value: "족보닷컴" },
  //   { label: "족보닷컴 모바일", value: "족보닷컴 모바일" },
  //   { label: "에이블샵", value: "에이블샵" },
  //   { label: "미샤 모바일", value: "미샤 모바일" },
  //   { label: "족보클라우드", value: "족보클라우드" },
  //   { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
  //   { label: "비즈스프링_대행사", value: "비즈스프링_대행사" },
  //   { label: "비즈스프링", value: "비즈스프링" },
  //   { label: "네스프레소", value: "네스프레소" },
  //   { label: "lifehouses", value: "lifehouses" },
  //   { label: "TAM", value: "TAM" },
  //   { label: "진실 테스트 220726", value: "진실 테스트 220726" },
  //   { label: "국가대표광고", value: "국가대표광고" },
  //   { label: "[재홍 테스트 230103]", value: "[재홍 테스트 230103]" },
  //   { label: "test.com", value: "test.com" },
  //   { label: "wjyang", value: "wjyang" },
  //   { label: "biz.com", value: "biz.com" },
  //   { label: "M롯데푸드몰", value: "M롯데푸드몰" },
  // ];

  // 광고매체사 옵션
  // const mdoptions = [
  //   { label: "네이버", value: "네이버" },
  //   { label: "카카오", value: "카카오" },
  //   { label: "페이스북", value: "페이스북" },
  //   { label: "ADN PC", value: "ADN PC" },
  //   { label: "DABLE", value: "DABLE" },
  //   { label: "모비온", value: "모비온" },
  //   { label: "구글", value: "트구글위터" },
  //   { label: "FACEBOOK", value: "FACEBOOK" },
  // ];


  //모든 필터 선택된 상태로 초기 로딩.
 
 
  const updateFilter = () => {
    console.log("확인키를 눌렀음!!!!!!!!!!!!!!!!!!")
    
    if (vatValue) {
      setDatas([vatValue, VatStatDateData, VatByDateData]);
    } else {
      setDatas([vatValue, StatDateData, ByDateData]);
    }
    
    // Filter the AdData based on the selected adList names
    const filteredAdData = AdData.filter((item) => adList.includes(item.name));
    const filteredAdSiteData = AdSiteData.filter((item) => adsiteList.includes(item.value));
    const filteredadMediaData =adMediaData.filter((item)=> mdList.includes(item.ad_provider));
    
    // You can use the spread operator to update the filterOptions state
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      AdData: filteredAdData,
      AdSiteData:filteredAdSiteData,
      adMediaData:filteredadMediaData,
      Datas : datas,
    }));
  };

  console.log("필터 데이터 모음집이요~~~~~",filterOptions)
  console.log("AdDataAdDataAdDataAdDataAdData",filterOptions.AdData)
  console.log("AdDataAdDataAdDataAdDataAdData",filterOptions.AdSiteData)
  console.log("AdDataAdDataAdDataAdDataAdData",filterOptions.adMediaData)
  console.log("Datas",filterOptions.Datas)


  const adChange = useCallback((value) => {
    const AdfilteredValue = AdData.filter((item) => value.includes(item.value)).map((item) => item.name);
      setAdList(AdfilteredValue);
  }, []);

  const mdChange = useCallback((value) => {
    const MdfilteredValue = value.filter((option) => option !== "selectAll");
    setMdList(MdfilteredValue);
  }, []);

  const DateChange = useCallback((value) => {
    setDateValue(value);
    //value의 0,1간의 날짜 차이
    const daysDifference = ( new Date(value[1]) - new Date(value[0])) / (1000 * 3600 * 24);

    // //비교군의 날짜 산정
    const ByDate2 = new Date(value[0]);
    ByDate2.setDate(ByDate2.getDate() - 1);
    console.log("Bydate1Bydate1Bydate1Bydate1Bydate1Bydate1Bydate1",ByDate2)
    const ByDate1 = new Date(ByDate2);
    ByDate1.setDate(ByDate2.getDate() - daysDifference);
    setByDateValue([`${format(ByDate1,"yyyy-MM-dd")}`,`${format(ByDate2,"yyyy-MM-dd")}`]);
    setStartDate(`${format(new Date(value[0]),"yyyy-MM-dd")}`);
    setEndDate(`${format(new Date(value[1]),"yyyy-MM-dd")}`);
    if(vatValue){
      const VatData =[]
      for(const data of VatStatDateData){
        const stat_date = data.stat_date;
        if(stat_date>=startDate && stat_date <=endDate){
          console.log(1);
          VatData.push(data);
        }
      }
      setDatas(VatData);
    }else{
      const originData = [];
      for(const data of VatStatDateData){
        const stat_date = data.stat_date;
        if(stat_date>=`${format(ByDate1,"yyyy-MM-dd")}`&& stat_date <=`${format(ByDate2,"yyyy-MM-dd")}`){
          originData.push(data);
        }
      }
      setDatas(originData);
    }
    
  }, []);
  console.log("날짜 선택에 관한 datas!!!!!!!!!!!!!!!!",datas)
  console.log(startDate)
  const adsiteChange = useCallback((value) => {
    const AdSitefilteredValue = value.filter(
      (option) => option !== "selectAll"
    );
      setAdStieList(AdSitefilteredValue);
  }, []);

  const handleSwitchToggle =(value)=>{
    setVatValue(value)
  }
  console.log("ByDateValueByDateValueByDateValueByDateValueByDateValueByDateValueByDateValueByDateValueByDateValue",BydateValue)
  const filterDivStyle = {
    border: "1px solid #e8ecee",
    padding: collapsed1 ? "0px" : "25px",
    height: collapsed1 ? "0px" : "132px",
    overflow: "hidden",
    transition: "height 0.5s ease, padding 0.5s ease"
  };

  const handleRenderTag = useCallback(() => {
    const providerArr = [];
    console.log("providerArrproviderArrproviderArrproviderArr",providerArr)
    return (
      <div className="FilterTagsDiv">
        {filterOptions.adMediaData.map((item) => {
          if (!providerArr.includes(item.ad_provider)) {
            providerArr.push(item.ad_provider);
            return (
              <Tag className="FilterTags" key={item.ad_provider}>
                {item.ad_provider}
              </Tag>
            );
          }
          return null;
        })}
      </div>
    );
  }, [filterOptions.adMediaData]);

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
      <div className="WhiteBox">
        <div className="TitleBox">
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
        </div>
      </div>
      <div>
      <div className="WhiteBox">
        <div className="FilterSelDiv">
          <h6>필터 선택</h6>
          <Button
          className="CustomButton"
              type='text'
              size="large"
              icon={collapsed1 ? <PlusSquareOutlined /> :<MinusSquareOutlined />}
              onClick={coll1Change}
            />
        </div>
      <div
      className="FilterDiv"
       style={filterDivStyle}>
        <Space size="large">
          <Text strong level={4}>
            대상&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Adfilter options={AdData} onValueChange={adChange} />
          <AdSitefilter options={AdSiteData} onValueChange={adsiteChange} />
          <Mdfilter options={adProviders} onValueChange={mdChange} />
           <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked onClick={handleSwitchToggle}/>
        </Space>
        <br></br>
        <div style={{paddingTop:"20px"}}>
        <Space size="large">
          <Text strong level={4}>
            기간&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Calendar onValueChange={DateChange}/>
          <Button className=""type="primary" onClick={updateFilter}>확인</Button>
        </Space>

        </div>
      </div>

      <div className="FilterBox">
        <div style={{display:'flex', alignItems:'center'}}>
          <span style={{fontSize:"12px"}}>광고주 :&nbsp;</span>
          <div className="AdFilterTagsDiv">
            {filterOptions.AdData.map((item) => (
              <Tag className="FilterTags" key={item.value}>{item.name}</Tag>
            ))}
          </div>
          <span>매체 :&nbsp;</span>
          {handleRenderTag()}
        </div>
      </div>
      </div>
      <div className="WhiteBox">
        <div className="PerformanceDiv">
          <h6>성과 지표</h6>
          <Button
          className="CustomButton"
              type='text'
              size="large"
              icon={collapsed2 ? <PlusSquareOutlined /> :<MinusSquareOutlined />}
              onClick={coll2Change}
            />
         </div>
           <ScoreCardChartComp collapsed={collapsed2}/>
      </div>
        <Tabs className="MainTab" type="card">
          <TabPane  tab="통합광고 대시보드" key="1">
            <div className="WhiteBox">
              <div style={{padding:'20px'}}>
              <MainTab1/>
              </div>
            </div>
          </TabPane>
          <TabPane   tab="광고주/매체사별 요약 대시보드" key="2">
           {/*
            <div className="WhiteBox">
              <MainTab2></MainTab2> 
            </div>
              */}
          </TabPane>
        </Tabs>
        </div>
        </div>
    </>
  );
};
export default Main;
