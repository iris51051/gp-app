import React, { useState, useEffect, useCallback } from "react";
import { Col, Tabs, Row,Space, Typography, Button,Switch,Tag,Radio} from "antd";
import {PlusSquareOutlined,MinusSquareOutlined} from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { IoMdTimer } from "react-icons/io";
import { useLocation} from "react-router-dom";


import Breadcrumb from "../components/Breadcrumd";
import MainTab1 from "./main-tab/main-Tab1";
import MainTab2 from "./main-tab/main-Tab2";
import Calendar from "../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../components/filter.js";
import ScoreCardChartComp from "../components/ScoreChartCard";
import AdData from "../data/AdData";
import AdSiteData from "../data/AdSiteData";
import adMediaData from "../data/AdMediaData";
import {ByDateData} from "../data/ByDateData";
import {StatDateData} from "../data/StatDateData";

//날짜 기반 데  이터
// const { StatDateData, VatStatDateData } = StatDateDatas(); //vat 미포함, vat 포함 기준 데이터
// const { ByDateData, VatByDateData } = ByDateDatas();       //vat 미포함, vat 포함 비교 데이터

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

const { TabPane } = Tabs;
const { Text } = Typography;

const Main = ({selectedAd}) => {
  const location = useLocation();
  const currentAd = (location.search).split('=')[1]
  
  const items = [
    { title: "AIR(매체 통합 리포트)", href: "/" },
    { title: "대시보드" },
  ];
  
  const [adFilter, setAdFilter] = useState([]);
  const [siteFilter, setSiteFilter] = useState([]);
  const [mdFilter, setMdFilter] = useState([]);
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);
  const [vatValue, setVatValue] = useState(true);
  const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
  const [BydateValue, setByDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
  
  const [VatByDateData, setVatByDateData] = useState([]);
  const [VatStatDateData, setVatStatDateData]= useState([]);
  const [datas, setDatas] = useState([])
  const defaultFilterOptions = {
    AdData: AdData,
    AdSiteData: AdSiteData,
    adMediaData: adMediaData,
    vatValue: vatValue,
    Datas : datas
  };
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
  
  useEffect(() => {
   
    const updatedData=StatDateData.map((item) => {
      return {
        ...item,
        m_rvn: (item.m_rvn + item.m_rvn * 0.1).toFixed(0),
        rvn: (item.rvn + item.rvn * 0.1).toFixed(0),
        m_cost: (item.m_cost + item.m_cost * 0.1).toFixed(0),
        m_cpc: (item.m_cpc + item.m_cpc * 0.1).toFixed(0),
        rvn_per_odr: (item.rvn_per_odr + item.rvn_per_odr * 0.1).toFixed(0),

      };
    });

    const  updatedByData=ByDateData.map((item) => {
      return {
        ...item,
        m_rvn: (item.m_rvn + item.m_rvn * 0.1).toFixed(0),
        rvn: (item.rvn + item.rvn * 0.1).toFixed(0),
        m_cost: (item.m_cost + item.m_cost * 0.1).toFixed(0),
        m_cpc: (item.m_cpc + item.m_cpc * 0.1).toFixed(0),
        rvn_per_odr: (item.rvn_per_odr + item.rvn_per_odr * 0.1).toFixed(0),
      };
    });
    setVatStatDateData([...updatedData])
    setVatByDateData([...updatedByData])

},[]);

  const coll1Change = () => {
    setCollapsed1(!collapsed1);
  };
  const coll2Change = () => {
    setCollapsed2(!collapsed2);
  };

  //모든 필터 선택된 상태로 초기 로딩.
 
 
  const updateFilter = () => {   

    // Filter the AdData based on the selected adFilter names
    const filteredAdData = AdData.filter((item) => adFilter.includes(item.name));
    const filteredAdSiteData = AdSiteData.filter((item) => siteFilter.includes(item.value));
    const filteredadMediaData =adMediaData.filter((item)=> mdFilter.includes(item.ad_provider));
    
    // You can use the spread operator to update the filterOptions state
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      AdData: filteredAdData,
      AdSiteData:filteredAdSiteData,
      adMediaData:filteredadMediaData,
      Datas : datas,
    })); 
  };



  const adChange = useCallback((value) => {
    const AdfilteredValue = AdData.filter((item) => value.includes(item.value)).map((item) => item.name);
      setAdFilter(AdfilteredValue);
  }, []);

  const mdChange = useCallback((value) => {
    const MdfilteredValue = value.filter((option) => option !== "selectAll");
    setMdFilter(MdfilteredValue);
  }, []);
  const adsiteChange = useCallback((value) => {
    const AdSitefilteredValue = value.filter(
      (option) => option !== "selectAll"
    );
      setSiteFilter(AdSitefilteredValue);
  }, []);
  const DateChange = useCallback((value) => {

    setDateValue(value);
    //value의 0,1간의 날짜 차이
    const daysDifference = ( new Date(value[1]) - new Date(value[0])) / (1000 * 3600 * 24);

    // //비교군의 날짜 산정
    //종료 일시
    const StatEndDate = new Date(value[0]);
    StatEndDate.setDate(StatEndDate.getDate() - 1);
    //시작일시
    const StatStartDate = new Date(StatEndDate);
    StatStartDate.setDate(StatEndDate.getDate() - daysDifference);
    setByDateValue([`${format(StatStartDate,"yyyy-MM-dd")}`,`${format(StatEndDate,"yyyy-MM-dd")}`]);
      let ByData = [];
      let StatData =[];
   
    for(const data of ByDateData){
      const by_day = data.by_day;
      if(by_day>=value[0] && by_day <=value[1]){
          ByData.push(data);
        }
    }
    if(new Date(value[1])!== new Date(value[0])){
      if(new Date(value[1]).getDate() === new Date().getDate()
        && new Date(value[1]).getMonth() ===new Date().getMonth()
        && new Date(value[1]).getFullYear()=== new Date().getFullYear()){
            const newValue ={
            "by_day": value[1],
            "m_rvn": 0,
            "m_impr": 0,
            "m_cost": 0,
            "m_odr": 0,
            "m_rgr": 0,
            "land": 0,
            "rvn": 0,
            "m_cart": 0,
            "odr": 0,
            "rgr": 0,
            "m_conv": 0,
            "m_click": 0,
            "m_cpc": 0,
            "m_ctr": 0,
            "m_crt": 0,
            "m_roas": 0,
            "rvn_per_odr": 0,
            "rgr_per_m_click": 0,
            "odr_per_m_cost": 0,
            "roas": 0}
            ByData.push(newValue);
            
          }
      }

    for(const data of StatDateData){
      const stat_date = data.stat_date;
      if(stat_date>=`${format(StatStartDate,"yyyy-MM-dd")}` && stat_date <=`${format(StatEndDate,"yyyy-MM-dd")}`){

        StatData.push(data);
      }
    }
      if(vatValue){
        const updatedByData =ByData.map((item) => {
          return {
            ...item,
            m_rvn: item.m_rvn + item.m_rvn * 0.1,
            rvn: item.rvn + item.rvn * 0.1,
            m_cost: item.m_cost + item.m_cost * 0.1,
            m_cpc: item.m_cpc + item.m_cpc * 0.1,
            rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
          };
        });
        const updatedStatData = StatData.map((item) => {
          return {
            ...item,
            m_rvn: item.m_rvn + item.m_rvn * 0.1,
            rvn: item.rvn + item.rvn * 0.1,
            m_cost: item.m_cost + item.m_cost * 0.1,
            m_cpc: item.m_cpc + item.m_cpc * 0.1,
            rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
          };
        });
    
        setDatas([updatedByData,updatedStatData]);
      }else{
        setDatas([ByData,StatData]);
      }
  }, [vatValue, VatStatDateData, VatByDateData]);



  const handleSwitchToggle =(value)=>{
    setVatValue(value)
  }

  const filterDivStyle = {
    border: "1px solid #e8ecee",
    padding: collapsed1 ? "0px" : "25px",
    height: collapsed1 ? "0px" : "132px",
    overflow: "hidden",
    transition: "height 0.5s ease, padding 0.5s ease"
  };

  const handleRenderTag = useCallback(() => {
    const providerArr = [];    return (
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
      <div>
        <div className="WhiteBox" style={{padding:"0px"}}>
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
              {currentAd >0 ?
                ''
              :              <>
              <Adfilter className="test" options={AdData} onValueChange={adChange} />
              <AdSitefilter options={AdSiteData} onValueChange={adsiteChange} />
              <Mdfilter options={adProviders} onValueChange={mdChange} />
              </>}
              <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked onClick={handleSwitchToggle}/>
            </Space>
            <br/>
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
              <ScoreCardChartComp collapsed={collapsed2} datas={filterOptions.Datas}/>
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
