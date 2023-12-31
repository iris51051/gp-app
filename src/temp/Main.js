import React, { useState, useEffect, useCallback,useMemo,useTransition  } from "react";
import { Col, Tabs, Row,Space, Typography, Button,Switch,Tag,Spin,Breadcrumb} from "antd";
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

  const [adFilter, setAdFilter] = useState([]);       //전체 광고주 일 때의 선택된 광고주
  const [siteFilter, setSiteFilter] = useState([]);   //선택된 사이트
  const [mdFilter, setMdFilter] = useState([]);       //선택된 매체사 
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);
  const [vatValue, setVatValue] = useState(true);     //vat포함 여부
  const [dateValue, setDateValue] = useState([`${format(addDays(new Date(), -7),"yyyy-MM-dd")}`,`${format(new Date(),"yyyy-MM-dd")}`])
  const [CompareDateValue, setCompareDateValue] = useState([`${format(addDays(new Date(), -12),"yyyy-MM-dd")}`,`${format(addDays(new Date(), -6),"yyyy-MM-dd")}`])
  const [datas, setDatas] = useState([])              //scoreCard용으로 현재 선택 기간과 직전 기간 데이터 담을 객체
  const [adProviderList, setAdProviderList] = useState([])    //전체 광고매체사 리스트
  const [loading, setLoading] = useState(false)               
  const [fetchedData, setFetchedData] = useState([])  // 현재 기간에 대한 조회된 데이터
  const [fetchedCompareData, setFetchedCompareData] = useState([])  //직전 기간에 대한 비교 데이터
  const [adSiteList, setAdSiteList] = useState([]);


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
//전체 광고주에 대한 하드코딩 사이트 데이터
const AllpfnoList = Array.from(new Set(adMediaData.map((item)=>item.pfno))).map((item)=>({
  name:item,
  value:item,
}))
//전체 광고주에 대한 하드코딩 매체사 데이터
const AllProvider = Array.from(new Set(adMediaData.map((item)=>item.ad_provider))).map((item)=>({
  name:item,
  value:item,
}))


//광고주에 대한 pfno,provider 데이터 요청
useEffect(() => {
  setLoading(true)
  const getFilterData= async () => {
    //전체 광고주에 대한 api가 없음.
    //추후 api 수정시에 수정 요망.
    if (currentAd === '0' || currentAd === undefined) {
      setAdSiteList([...AllpfnoList])
      setAdProviderList([...AllProvider])
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


console.log("adSiteList",adSiteList)


//페이지 첫 로딩시 보여줘야할 filterOption의 기본 데이터
//모든 filter를 선택한 상태
  const defaultFilterOptions = {
    Ad: currentAd >0 ? currentAd : AdList,
    Pfno: currentAd >0 ? adSiteList : AllpfnoList,
    AdProvider: currentAd >0 ? adProviderList : AllProvider,
    date : dateValue,
    vatValue : vatValue
  };

  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

  //LNB의 광고주 선택을 통한 광고주 변경 시 사이트와 광고매체사 변경에 따른 filterOption 변경

  useEffect(() => {
    if (adProviderList.length > 0 && adSiteList.length > 0) {
      if(currentAd === '0' || currentAd ===undefined){
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          Ad:AdList,
          Pfno: AllpfnoList,
          AdProvider: AllProvider,
        }));
      }else{
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          Ad:currentAd,
          Pfno: adSiteList,
          AdProvider: adProviderList,
        }));
      }
    }
  }, [adProviderList, adSiteList]);


  //필터 선택 부분 collapse
  const coll1Change = () => {
    setCollapsed1(!collapsed1);
  };
  //성과지표(스코어카드) collapse
  const coll2Change = () => {
    setCollapsed2(!collapsed2);
  };

  //선택 된 필터를 확인 버튼을 눌러 적용
  const updateFilter = () => {
    if(currentAd === '0' || currentAd ===undefined){
      // Filter the AdData based on the selected adFilter names
      const filteredAd = AdList.filter((item) => adFilter.includes(item.name));
      const filteredAdSite = AllpfnoList.filter((item) => siteFilter.includes(item.value));
      const filteredAdProvider = AllProvider.filter((item)=> mdFilter.includes(item.value));
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          Ad: filteredAd,
          Pfno:filteredAdSite,
          AdProvider:filteredAdProvider,
          date:dateValue,
          vatValue : vatValue
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
        vatValue : vatValue
      }));
    }
  };

//필터 변경에 따른 데이터 조회
  useEffect(() => {
    if(filterOptions.AdProvider.length>0){
    getScoreCardData(); //스코어카드용 데이터 조회
    getScoreCardCompareData();  //스코어카드용 비교 데이터 조회

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
        return setFetchedData(generateData);
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

  //Filter선택에 따른 비교용 직전 동일 기간 데이터 조회
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
        console.error(e)
        return setFetchedCompareData(dummyData);
      }
    }else{
      return null;
    }

  }
  

//vat변경과 조회 데이터 변경에 따른 vat 적용
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

  //전체 광고주일 때의 광고주 선택
  const adChange = useCallback((value) => {
    const AdfilteredValue = AdList.filter((item) => value.includes(item.value));
      setAdFilter(AdfilteredValue);
  }, []);
  //광고매체사 선택
  const adProviderChange = useCallback((value) => {
    //filter 선택시에 전체 선택하면 "selectAll"이 포함 되기에 제거
    const filteredValue = value.filter((option) => option !== "selectAll");
    setMdFilter(filteredValue);
  }, []);

  const adsiteChange = useCallback((value) => {
        //filter 선택시에 전체 선택하면 "selectAll"이 포함 되기에 제거
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


  //vat 전환
  const handleSwitchToggle = (value) => {
    setVatValue(value);
  };

  //광고 매체사 선택에 따른 Tag 출력
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
              <Breadcrumb separator=">" items={items} />
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
                    <MainTab1 filterOptions={filterOptions}/>
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
