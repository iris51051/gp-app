import React, { useState, useEffect, useCallback,useMemo,useTransition  } from "react";
import { Col, Tabs, Row,Space, Typography, Button,Switch,Tag,Spin} from "antd";
import {PlusSquareOutlined,MinusSquareOutlined,LoadingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { IoMdTimer } from "react-icons/io";
import { useLocation} from "react-router-dom";
import axios from 'axios';


//
import {generateDummyDataByProvider} from '../function/CreateDummyByProvider'
import {generateDummyDataByDay} from '../function/CreateDummyByDay'

import Breadcrumb from "../components/Breadcrumd";
import MainTab1 from "./main-tab/main-Tab1";
import MainTab2 from "./main-tab/main-Tab2";
import Calendar from "../components/calendar.js";
import { Adfilter, Providerfilter, AdSitefilter } from "../components/filter/filter.js";
import ScoreCardChartComp from "../components/chart/ScoreChartCard";
import AdList from "../testData/AdData";

import adMediaData from "../testData/AdMediaData";
import {ByDateData} from "../testData/ByDateData";
import {StatDateData} from "../testData/StatDateData";
// import {DefaultData,filteredData} from "../testData/ApiReq"

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const dummyData = [{
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
  "roas": 0
}]

const { Text } = Typography;

const Main = () => {
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
  const [dateValue, setDateValue] = useState([`${format(addDays(new Date(), -6),"yyyy-MM-dd")}`,`${format(new Date(),"yyyy-MM-dd")}`])
  const [CompareDateValue, setCompareDateValue] = useState([`${format(addDays(new Date(), -12),"yyyy-MM-dd")}`,`${format(addDays(new Date(), -6),"yyyy-MM-dd")}`])
  const [datas, setDatas] = useState([])
  const [AllAdList, setAllAdList] = useState()
  const [adProviderList, setAdProviderList] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState([]) //조회 데이터
  const [fetchedCompareData, setFetchedCompareData] = useState([])  //비교 데이터
  const [adSiteList, setAdSiteList] = useState([]);
  const [dateGap, setDateGap] = useState();
  const [FilteredProviderData, setFilteredProviderData] = useState([])
  //광고매체사 옵션


  //초기 랜더링시 pfno(사이트),ad_provider(광고매체) 조회용 axios
  // => 데이터 조회 시 사이트,광고매체를 먼저 선택한 후 날짜를 선택하여 데이터를 조회하기에
  //    ad_porivder와 pfno는 무조건 초기 랜더링시에 필요
  //    ad_Provider,pfno에 대한 조회 범위가 너무 광범위해서 비효율적
  // => 별도의 조회 쿼리문이 없다면 전체 가입 기간에 대한 조회를 실행해야함.

  // ****************************조회 관련 api나올시 교체.******************************************
const fetchData = async ()=>{
  const body =JSON.stringify({
    rptNo: '1000000',
    lookupTp: 'agg',
    dimCd: ["ad_provider",'pfno'],
    where: [
      {
        field: 'stat_date',
        operation: 'between',
        value: ['2020-01-10', format(new Date(),'yyyy-MM-dd')],
      },
    ],
    sort: [{ field: 'land', order: 'asc' }],
    agencySeq: '1',
    clientSeq: currentAd,
    size: 10000,
  })
  const header = {
    headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
  }
  try{
    const response = await axios.post(
      // 로그인 필요
      // 'http://223.130.136.182:9080/report/data',
      'http://122.99.192.144:9080/report/data',
      body,
      header
    );
    return response.data.data
  }catch(e){
    console.error(e)
  }
}


useEffect(() => {
  setLoading(true)
  const getFilterData= async () => {
    if (currentAd === '0' || currentAd === undefined) {
      setLoading(false)
    } else {
      const data = await fetchData();
      const providers = new Set(data.map((item) => item.ad_provider));
      const pfno = new Set(data.map((item) => item.pfno));
      setAdProviderList(Array.from(providers).map(provider => ({
        name: provider,
        value: provider
      })));
      setAdSiteList(Array.from(pfno).map(site => ({
        name: site,
        value: site
      })));
    }
  };
  getFilterData();
}, [currentAd]);





  const defaultFilterOptions = {
    Ad: AdList,
    Pfno: adSiteList,
    AdProvider: adProviderList,
    date : dateValue,
  };

  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
  useEffect(() => {
    if (adProviderList.length > 0 && adSiteList.length > 0) {
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        Pfno: adSiteList,
        AdProvider: adProviderList,
      }));
    }
  }, [adProviderList, adSiteList]);


  const coll1Change = () => {
    setCollapsed1(!collapsed1);
  };
  const coll2Change = () => {
    setCollapsed2(!collapsed2);
  };

  //모든 필터 선택된 상태로 초기 로딩.
 
  const updateFilter = () => {
    if(currentAd === '0' || currentAd ===undefined){
      // Filter the AdData based on the selected adFilter names
      const filteredAd = AdList.filter((item) => adFilter.includes(item.name));
      const filteredAdSite = adSiteList.filter((item) => siteFilter.includes(item.value));
      const filteredAdProvider = adProviderList.filter((item)=> mdFilter.includes(item.value));
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          Ad: filteredAd,
          Pfno:filteredAdSite,
          AdProvider:filteredAdProvider,
          date:dateValue,
        }));
    }else{
      const filteredAdSite = adSiteList.filter((item) => siteFilter.includes(item.value));

      const filteredAdProvider = adProviderList.filter((item)=> mdFilter.includes(item.value));
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        Ad: currentAd,
        Pfno:filteredAdSite,
        AdProvider:filteredAdProvider,
        date:dateValue,
      }));
    }
  };


  useEffect(() => {
    if(filterOptions.AdProvider.length>0){
    getScoreCardData(); //스코어카드용 데이터 조회
    getScoreCardCompareData();  //스코어카드용 비교 데이터 조회
    getFilteredProviderData();
    // getCompareData();
    }
  }, [filterOptions]);


  //Filter에 따른 ScoreCard용 데이터
  const getScoreCardData = async ()=>{
    if(dateValue[0] !==`${format(new Date(),"yyyy-MM-dd")}`&& filterOptions.AdProvider.length>0){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["by_day"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [dateValue[0], dateValue[1]],
          },
          {
            field: 'ad_provider',
            operation: 'in',
            value: filterOptions.AdProvider.map((item)=>item.value),
          },
        ],
        metCd: [
        "m_rvn",
        "m_impr",
        "m_cost",
        "m_odr",
        "m_rgr",
        "land",
        "rvn",
        "m_cart",
        "odr",
        "rgr",
        "m_conv",
        "m_click",
        "m_cpc",
        "m_ctr",
        "m_crt",
        "m_roas",
        "rvn_per_odr",
        "rgr_per_m_click",
        "odr_per_m_cost",
        "roas"
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: currentAd,
        pfno:filterOptions.Pfno.map(item=>item.value),
        size: 100000,
      })
      const header = {
        headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
      }
      try{
        const response = await axios.post(
          // 'http://223.130.136.182:9080/report/data', 로그인 필요
          'http://122.99.192.144:9080/report/data',
          body,
          header
        );
        const responseData = response.data.data;
        const generateData = generateDummyDataByDay(responseData, dateValue);
        // if(filteredData.length===0){
        //   setFetchedData(dummyData)
        // }else{
          return setFetchedData(generateData);
        // }
      }catch(e){
        console.error(e)
      }
    }else{
      const newDummyData = dummyData.map((data) => ({
        ...data,
        "by_day": format(new Date(),'yyyy-MM-dd'),
      }));
      setFetchedData(newDummyData)
    }

  }

  //Filter선택에 따른 비교 데이터
  const getScoreCardCompareData = async ()=>{
    if(dateValue[0] !==`${format(new Date(),"yyyy-MM-dd")}` && filterOptions.AdProvider.length>0){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["by_day"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [CompareDateValue[0], CompareDateValue[1]],
          },
          {
            field: 'ad_provider',
            operation: 'in',
            value: filterOptions.AdProvider.map((item)=>item.value),
          },
        ],
        metCd: ["m_rvn",
        "m_impr",
        "m_cost",
        "m_odr",
        "m_rgr",
        "land",
        "rvn",
        "m_cart",
        "odr",
        "rgr",
        "m_conv",
        "m_click",
        "m_cpc",
        "m_ctr",
        "m_crt",
        "m_roas",
        "rvn_per_odr",
        "rgr_per_m_click",
        "odr_per_m_cost",
        "roas"
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: currentAd,
        pfno:filterOptions.Pfno.map(item=>item.value),
        size: 100000,
      })
      const header = {
        headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
      }
      try{
        const response = await axios.post(
          // 'http://223.130.136.182:9080/report/data', 로그인 필요
          'http://122.99.192.144:9080/report/data',
          body,
          header
        );
        const responseData = response.data.data;

        return setFetchedCompareData(responseData);
      }catch(e){
        const dummydata = {
          m_rvn: 0,
          m_impr: 0,
          m_cost: 0,
          m_odr: 0,
          m_rgr: 0,
          land: 0,
          rvn: 0,
          m_cart: 0,
          odr: 0,
          rgr: 0,
          m_conv: 0,
          m_click: 0,
          m_cpc: 0,
          m_ctr: 0,
          m_crt: 0,
          m_roas: 0,
          rvn_per_odr: 0,
          rgr_per_m_click: 0,
          odr_per_m_cost: 0,
          roas: 0,
        }
        console.error(e)
        return setFetchedCompareData([dummydata]);
        
      }
    }else{
      return null;
    }

  }
  
  //MainTab 데이터.

  const getFilteredProviderData = async ()=>{
    if(dateValue[0] !==`${format(new Date(),"yyyy-MM-dd")}`){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["ad_provider","ad_program"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [dateValue[0], dateValue[1]],
          },{
            field: 'pfno',
            operation: 'in',
            value: filterOptions.Pfno.map((item)=>item.value),
          },
          {
            field: 'ad_provider',
            operation: 'in',
            value: filterOptions.AdProvider.map((item)=>item.value),
          }
        ],
        metCd: ["m_rvn",
        "m_impr",
        "m_cost",
        "m_odr",
        "m_rgr",
        "land",
        "rvn",
        "m_cart",
        "odr",
        "rgr",
        "m_conv",
        "m_click",
        "m_cpc",
        "m_ctr",
        "m_crt",
        "m_roas",
        "rvn_per_odr",
        "rgr_per_m_click",
        "odr_per_m_cost",
        "roas"
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: currentAd,
        pfno:filterOptions.Pfno.map(item=>item.value),
        size: 10000,
      })
      const header = {
        headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
      }
      try{
        const response = await axios.post(
          // 'http://223.130.136.182:9080/report/data', 로그인 필요
          'http://122.99.192.144:9080/report/data',
          body,
          header
        );
        const responseData = response.data.data;
        return setFilteredProviderData(responseData);

      }catch(e){
        console.error(e)
      }
    }else{
      const newDummyData = dummyData.map((data) => ({
        ...data,
        "by_day": format(new Date(),'yyyy-MM-dd'),
      }));
      setFilteredProviderData(newDummyData)
    }
  }

  useEffect(() => {

    if(fetchedData.length>0){
      if (fetchedData && fetchedCompareData) {
        if(vatValue){
          const updatedData =fetchedData?.map((item) => {
            return {
              ...item,
              m_rvn: item.m_rvn + item.m_rvn * 0.1,
              rvn: item.rvn + item.rvn * 0.1,
              m_cost: item.m_cost + item.m_cost * 0.1,
              m_cpc: item.m_cpc + item.m_cpc * 0.1,
              rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
            };
          });
          const updatedCompareData = fetchedCompareData?.map((item) => {
            return {
              ...item,
              m_rvn: item.m_rvn + item.m_rvn * 0.1,
              rvn: item.rvn + item.rvn * 0.1,
              m_cost: item.m_cost + item.m_cost * 0.1,
              m_cpc: item.m_cpc + item.m_cpc * 0.1,
              rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
            };
          });
          setDatas([updatedData,updatedCompareData]);
        }else{
        setDatas([fetchedData, fetchedCompareData]);
        }
      }
    }
    setLoading(false)
  }, [fetchedData, fetchedCompareData,vatValue]);

  const adChange = useCallback((value) => {
    const AdfilteredValue = AdList.filter((item) => value.includes(item.value));
      setAdFilter(AdfilteredValue);
  }, []);

  const adProviderChange = useCallback((value) => {
    const filteredValue = value.filter((option) => option !== "selectAll");
    setMdFilter(filteredValue);
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
    setDateGap(daysDifference);
    // //비교군의 날짜 산정
    //종료 일시
    const StatEndDate = new Date(value[0]);
    StatEndDate.setDate(StatEndDate.getDate() - 1);
    //시작일시
    const StatStartDate = new Date(StatEndDate);
    StatStartDate.setDate(StatEndDate.getDate() - daysDifference);
    setCompareDateValue([`${format(StatStartDate,"yyyy-MM-dd")}`,`${format(StatEndDate,"yyyy-MM-dd")}`]);

  }, []);



  const handleSwitchToggle = (value) => {
    setVatValue(value);
  };


  const handleRenderTag = () => {
    return (
      <div className="FilterTagsDiv">
        {filterOptions.AdProvider.map((item) => (
          <Tag className="FilterTags" key={item.value}>
            {item.name}
          </Tag>
        ))}
      </div>
    );
  };

  return (
    <>
    {loading===true?
     <div
     style={{backgroundColor:"white",height: "80vh",display:'flex', justifyContent:'center',alignItems:'center'}}>
     <Spin indicator={antIcon} />
     </div>:

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
        <div className="WhiteBox" style={{padding:"0px", display: 'grid'}}>
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
          <Space
            className="FilterSelectorDiv"
            style={{
              height: collapsed1 ? 0 : 120,
              float: 'left',
              alignSelf: 'center',
              overflow: 'hidden'
            }}
            >
            <div style={{padding:10}}>
            <Space size="large">
              <Text strong level={4}>
                대상&nbsp;
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </Text>
              {currentAd >0 ?
                ''
              :<Adfilter className="test" options={AdList} onValueChange={adChange} />}
              <AdSitefilter options={adSiteList} onValueChange={adsiteChange} />
              <Providerfilter options={adProviderList} onValueChange={adProviderChange} />
              <Switch
                    checkedChildren="VAT포함"
                    unCheckedChildren="VAT제외"
                    defaultChecked
                    onChange={handleSwitchToggle}
                  />
            </Space>
            <div style={{paddingTop:20}}>
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
          </Space>
          <div className="FilterBox">
            <div style={{display:'flex', alignItems:'center'}}>
            {currentAd >0 || !Array.isArray(filterOptions.Ad)?
              ''
                :
                 <>
              <span style={{fontSize:"12px"}}>광고주 :&nbsp;</span>
              <div className="AdFilterTagsDiv">
                {filterOptions.Ad.map((item) => (
                  <Tag className="FilterTags" key={item.value}>{item.name}</Tag>
                ))
                }
              </div>
              </>}
              <span>매체 :&nbsp;</span>
              {handleRenderTag()}
            </div>
          </div>
        </div>
          <div className="WhiteBox" style={{padding:'10px 10px 0px 20px'}}>
            <div className="PerformanceDiv">
              <h6 style={{marginLeft:'-17px'}}>성과 지표</h6>
              <Button
              className="CustomButton"
                  type='text'
                  size="large"
                  icon={collapsed2 ? <PlusSquareOutlined /> :<MinusSquareOutlined />}
                  onClick={coll2Change}
                />
            </div>
              <ScoreCardChartComp collapsed={collapsed2} datas={datas} date={dateValue}/>
          </div>
          <Tabs 
            className="MainTab"
            type="card" 
            items={
              [
              {
                label : '통합광고 대시보드',
                key : '1',
                children:(
                  <div className="WhiteBox">
                    <div style={{padding:'20px'}}>
                    <MainTab1 data={FilteredProviderData}/>
                    </div>
                  </div>
                ),
              },
              // {
                
              //   label : '광고주/매체사별 요약 대시보드',
              //   key : '2',
              //   children:(
              //     <div className="WhiteBox">
              //       <div style={{padding:'20px'}}>
              //       <MainTab1/>
              //       </div>
              //     </div>
              //   ),
              // }
            ]
            }
          
          ></Tabs>
      </div>
    </div>
  }
  </>
  );
};
export default Main;
