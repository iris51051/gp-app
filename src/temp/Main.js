import React, { useState, useEffect, useCallback,useMemo,useTransition  } from "react";
import { Col, Tabs, Row,Space, Typography, Button,Switch,Tag,Spin} from "antd";
import {PlusSquareOutlined,MinusSquareOutlined,LoadingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { IoMdTimer } from "react-icons/io";
import { useLocation} from "react-router-dom";
import axios from 'axios';

import Breadcrumb from "../components/Breadcrumd";
import MainTab1 from "./main-tab/main-Tab1";
import MainTab2 from "./main-tab/main-Tab2";
import Calendar from "../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../components/filter/filter.js";
import ScoreCardChartComp from "../components/chart/ScoreChartCard";
import AdData from "../testData/AdData";
// import AdSiteData from "../testData/AdSiteData";
import adMediaData from "../testData/AdMediaData";
import {ByDateData} from "../testData/ByDateData";
import {StatDateData} from "../testData/StatDateData";
import {DefaultData,filteredData} from "../testData/ApiReq"

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);


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
  const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")}`,`${format(new Date(),"yyyy-MM-dd")}`])
  const [CompareDateValue, setCompareDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")}`,`${format(new Date(),"yyyy-MM-dd")}`])
  const [datas, setDatas] = useState([])
  const [AllAdData, setAllAdData] = useState()
  const [adProviders, setAdProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState([]) //조회 데이터
  const [fetchedCompareData, setFetchedCompareData] = useState([])  //비교 데이터
  const [adSiteData, setAdSiteData] = useState([]);

  //광고매체사 옵션


const fetchData = async ()=>{
  const body =JSON.stringify({
    rptNo: '1000000',
    lookupTp: 'agg',
    dimCd: ["ad_provider",'pfno'],
    where: [
      {
        field: 'stat_date',
        operation: 'between',
        value: ['2023-01-10', format(new Date(),'yyyy-MM-dd')],
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
      //전체 광고주 일 때의 검색.
    } else {
      const data = await fetchData();
      const providers = new Set(data.map((item) => item.ad_provider));
      const pfno = new Set(data.map((item) => item.pfno));
      setAdProviders(Array.from(providers).map(provider => ({
        name: provider,
        value: provider
      })));
      setAdSiteData(Array.from(pfno).map(site => ({
        name: site,
        value: site
      })));
    }
    setLoading(false)
  };
  getFilterData();
}, [currentAd]);





  const defaultFilterOptions = {
    AdData: AdData,
    Pfno: adSiteData,
    AdProvider: adProviders,
    date : dateValue,
  };

  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
  useEffect(() => {
    if (adProviders.length > 0 && adSiteData.length > 0) {
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        Pfno: adSiteData,
        AdProvider: adProviders,
      }));
    }
  }, [adProviders, adSiteData]);


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
      const filteredAdData = AdData.filter((item) => adFilter.includes(item.name));
      const filteredAdSiteData = adSiteData.filter((item) => siteFilter.includes(item.value));
      const filteredAdProvider = adProviders.filter((item)=> mdFilter.includes(item.value));
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          AdData: filteredAdData,
          Pfno:filteredAdSiteData,
          AdProvider:filteredAdProvider,
          date:dateValue,
        }));
    }else{
      const filteredAdSiteData = adSiteData.filter((item) => siteFilter.includes(item.value));
      const filteredAdProvider = adProviders.filter((item)=> mdFilter.includes(item.value));
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        AdData: currentAd,
        Pfno:filteredAdSiteData,
        AdProvider:filteredAdProvider,
        date:dateValue,
      }));
    }
  };

  useEffect(() => {
    getData();
    getCompareData();
  }, [filterOptions]);

  const getData = async ()=>{
    if(dateValue[0] !==`${format(new Date(),"yyyy-MM-dd")}`){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["by_day","ad_provider",'pfno'],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [dateValue[0], dateValue[1]],
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
        // ad_providers:filterOptions.AdProvider.map((item)=>item.value),
        pfno:filterOptions.Pfno.map(item=>item.value),
        size: 10000,
      })
      const header = {
        headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
      }
      try{
        const response = await axios.post(
          'http://122.99.192.144:9080/report/data',
          body,
          header
        );
        const responseData = response.data.data;
        const filteredData = responseData.filter((item) => {
          return filterOptions.AdProvider.some((provider) => provider.value === item.ad_provider);
        });
        if(filteredData.length===0){
          console.log('들어왔어요!!!!!!!!!!!!!!')
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
          setFetchedData(dummyData)
        }else{
          return setFetchedData(filteredData);
        }
        console.log('Fetch 마지막 줄 filteredData확인',filteredData)
      }catch(e){
        console.error(e)
      }
    }else{
      const dummyData = [{
        "by_day": format(new Date(),'yyyy-MM-dd'),
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
      setFetchedData(dummyData)
    }
  }
  console.log('fetchedData',fetchedData)
  const getCompareData = async ()=>{
    if(dateValue[0] !==`${format(new Date(),"yyyy-MM-dd")}`){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["by_day","ad_provider",'pfno'],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [CompareDateValue[0], CompareDateValue[1]],
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
        // ad_providers:filterOptions.AdProvider.map((item)=>item.value),
        pfno:filterOptions.Pfno.map(item=>item.value),
        size: 10000,
      })
      const header = {
        headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
      }
      try{
        const response = await axios.post(
          'http://122.99.192.144:9080/report/data',
          body,
          header
        );
        const responseData = response.data.data;
        const filteredData = responseData.filter((item) => {
          return filterOptions.AdProvider.some((provider) => provider.value === item.ad_provider);
        });
        return setFetchedCompareData(filteredData);
      }catch(e){
        console.error(e)
      }
    }else{
      return null;
    }
  }
  useEffect(() => {
    if(fetchedData.length>0 && fetchedCompareData.length>0){
      if (fetchedData && fetchedCompareData) {
        if(vatValue){
          const updatedData =fetchedData?.map((item) => {
            return {
              ...item,
              m_rvn: Math.round(item.m_rvn + item.m_rvn * 0.1),
              rvn: Math.round(item.rvn + item.rvn * 0.1),
              m_cost: Math.round(item.m_cost + item.m_cost * 0.1),
              m_cpc: Math.round(item.m_cpc + item.m_cpc * 0.1),
              rvn_per_odr: Math.round(item.rvn_per_odr + item.rvn_per_odr * 0.1),
            };
          });
          const updatedCompareData = fetchedCompareData?.map((item) => {          
            return {
              ...item,
              m_rvn: Math.round(item.m_rvn + item.m_rvn * 0.1),
              rvn: Math.round(item.rvn + item.rvn * 0.1),
              m_cost: Math.round(item.m_cost + item.m_cost * 0.1),
              m_cpc: Math.round(item.m_cpc + item.m_cpc * 0.1),
              rvn_per_odr: Math.round(item.rvn_per_odr + item.rvn_per_odr * 0.1),
            };
          });
      
          setDatas([updatedData,updatedCompareData]);
        }else{
        setDatas([fetchedData, fetchedCompareData]);
        }
      }
    }
    // console.log('fetchedData',fetchedData)  
    // console.log('fetchedCompareData',fetchedCompareData)  
  }, [fetchedData, fetchedCompareData,vatValue]);

  

console.log('datas',datas)
  const adChange = useCallback((value) => {
    const AdfilteredValue = AdData.filter((item) => value.includes(item.value));
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
  console.log(filterOptions)

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
              :<Adfilter className="test" options={AdData} onValueChange={adChange} />}
              <AdSitefilter options={adSiteData} onValueChange={adsiteChange} />
              <Mdfilter options={adProviders} onValueChange={adProviderChange} />
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
            {currentAd >0 || !Array.isArray(filterOptions.AdData)?
              ''
                :
                 <>
              <span style={{fontSize:"12px"}}>광고주 :&nbsp;</span>
              <div className="AdFilterTagsDiv">
                {filterOptions.AdData.map((item) => (
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
              <ScoreCardChartComp collapsed={collapsed2} datas={datas}/>
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
                    <MainTab1/>
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




//api수정 전 코드
/*
import React, { useState, useEffect, useCallback,useMemo,useTransition  } from "react";
import { Col, Tabs, Row,Space, Typography, Button,Switch,Tag,Spin} from "antd";
import {PlusSquareOutlined,MinusSquareOutlined,LoadingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { IoMdTimer } from "react-icons/io";
import { useLocation} from "react-router-dom";
import axios from 'axios';

import Breadcrumb from "../components/Breadcrumd";
import MainTab1 from "./main-tab/main-Tab1";
import MainTab2 from "./main-tab/main-Tab2";
import Calendar from "../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../components/filter.js";
import ScoreCardChartComp from "../components/ScoreChartCard";
import AdData from "../testData/AdData";
// import AdSiteData from "../testData/AdSiteData";
import adMediaData from "../testData/AdMediaData";
import {ByDateData} from "../testData/ByDateData";
import {StatDateData} from "../testData/StatDateData";
import {DefaultData,filteredData} from "../../testData/ApiReq"

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);


const { Text } = Typography;

const Main = () => {
  const location = useLocation();
  const currentAd = (location.search).split('=')[1]
  
  const items = [
    { title: "AIR(매체 통합 리포트)", href: "/" },
    { title: "대시보드" },
  ];
 const [isPending, startTransition] = useTransition();
  const [adFilter, setAdFilter] = useState([]);
  const [siteFilter, setSiteFilter] = useState([]);
  const [mdFilter, setMdFilter] = useState([]);
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);
  const [vatValue, setVatValue] = useState(true);
  const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")}`,`${format(new Date(),"yyyy-MM-dd")}`])
  const [BydateValue, setByDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])

  const [datas, setDatas] = useState([])
  const [AllAdData, setAllAdData] = useState()
  const [adProviders, setAdProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)
  const [adSiteData, setAdSiteData] = useState([]);

  //광고매체사 옵션


const fetchData = async ()=>{
  const body =JSON.stringify({
    rptNo: '1000000',
    lookupTp: 'agg',
    dimCd: ["ad_provider",'pfno'],
    where: [
      {
        field: 'stat_date',
        operation: 'between',
        value: ['2023-01-10', '2023-07-11'],
      },
    ],
    sort: [{ field: 'land', order: 'asc' }],
    agencySeq: '1',
    clientSeq: currentAd,
    size: 30,
  })
  const header = {
    headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
  }
  try{
    const response = await axios.post(
      'http://122.99.192.144:9080/report/data',
      body,
      header
    );
    return response.data.data
  }catch(e){
    console.error(e)
  }
}
const getData= async () => {
    

  }
const updateData = async ()=>{
  const body =JSON.stringify({
    rptNo: '1000000',
    lookupTp: 'agg',
    dimCd: ["ad_provider",'pfno'],
    where: [
      {
        field: 'stat_date',
        operation: 'between',
        value: ['2023-01-10', '2023-07-11'],
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
    ad_Providers:filterOptions.AdProvider,
    pfno:filterOptions.Pfno,
    size: 30,
  })
  const header = {
    headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
  }
  try{
    const response = await axios.post(
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
  const getData= async () => {
    
    if (currentAd === '0' || currentAd === undefined) {
      //전체 광고주 일 때의 검색.
    } else {
      const data = await fetchData();
      const providers = new Set(data.map((item) => item.ad_provider));
      const pfno = new Set(data.map((item) => item.pfno));
      setAdProviders(Array.from(providers).map(provider => ({
        name: provider,
        value: provider
      })));
      setAdSiteData(Array.from(pfno).map(site => ({
        name: site,
        value: site
      })));
      
    }
    
    setLoading(false)
  };
  getData();
}, [location]);





  const defaultFilterOptions = {
    AdData: AdData,
    Pfno: adSiteData,
    AdProvider: adProviders,
    vatValue: vatValue,

  };

  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
  useEffect(() => {

    if (adProviders.length > 0 && adSiteData.length > 0) {
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        Pfno: adSiteData,
        AdProvider: adProviders,
      }));
    }
  }, [adProviders, adSiteData]);


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
    const filteredAdData = AdData.filter((item) => adFilter.includes(item.name));
    const filteredAdSiteData = adSiteData.filter((item) => siteFilter.includes(item.value));
    const filteredAdProvider = adProviders.filter((item)=> mdFilter.includes(item.value));
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      AdData: filteredAdData,
      Pfno:filteredAdSiteData,
      AdProvider:filteredAdProvider,

    }));
  }else{
    const filteredAdSiteData = adSiteData.filter((item) => siteFilter.includes(item.value));
    const filteredAdProvider = adProviders.filter((item)=> mdFilter.includes(item.value));
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      AdData: currentAd,
      Pfno:filteredAdSiteData,
      AdProvider:filteredAdProvider,

    }));
  }
    updateData();
  };



  const adChange = useCallback((value) => {
    const AdfilteredValue = AdData.filter((item) => value.includes(item.value)).map((item) => item.name);
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
            m_rvn: Math.round(item.m_rvn + item.m_rvn * 0.1),
            rvn: Math.round(item.rvn + item.rvn * 0.1),
            m_cost: Math.round(item.m_cost + item.m_cost * 0.1),
            m_cpc: Math.round(item.m_cpc + item.m_cpc * 0.1),
            rvn_per_odr: Math.round(item.rvn_per_odr + item.rvn_per_odr * 0.1),
          };
        });
        const updatedStatData = StatData.map((item) => {          
          return {
            ...item,
            m_rvn: Math.round(item.m_rvn + item.m_rvn * 0.1),
            rvn: Math.round(item.rvn + item.rvn * 0.1),
            m_cost: Math.round(item.m_cost + item.m_cost * 0.1),
            m_cpc: Math.round(item.m_cpc + item.m_cpc * 0.1),
            rvn_per_odr: Math.round(item.rvn_per_odr + item.rvn_per_odr * 0.1),
          };
        });
    
        setDatas([updatedByData,updatedStatData]);
      }else{
        setDatas([ByData,StatData]);
      }
  }, [vatValue]);




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
              :<Adfilter className="test" options={AdData} onValueChange={adChange} />}
              <AdSitefilter options={adSiteData} onValueChange={adsiteChange} />
              <Mdfilter options={adProviders} onValueChange={adProviderChange} />
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
            {currentAd >0 || !Array.isArray(filterOptions.AdData)?
              ''
                :
                 <>
              <span style={{fontSize:"12px"}}>광고주 :&nbsp;</span>
              <div className="AdFilterTagsDiv">
                {filterOptions.AdData.map((item) => (
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
              <ScoreCardChartComp collapsed={collapsed2} datas={datas}/>
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
                    <MainTab1/>
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


**/

