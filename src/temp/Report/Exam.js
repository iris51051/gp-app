import React,{useCallback, useState, useEffect} from 'react';
import { Col, Tabs, Row,Space, Typography, Button,Switch,Divider,Select} from "antd";
import format from "date-fns/format";
import { useLocation} from "react-router-dom";

//icon
import { IoMdTimer } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

//data
import AdData from "../../testData/AdData";
import AdSiteData from "../../testData/AdSiteData";
import adMediaData from "../../testData/AdMediaData";
import AbizStatData from '../../testData/A_bizData/A_bizSatData';
import A_bizDetail from '../../testData/A_bizData/A_bizDetail';
import {adProvider} from '../../testData/A_bizData/Ad_Provider';

//모듈
import {Mdfilter, AdSitefilter,AdPlatform,AdCampaign,AdMaterial,AdDevice  } from "../../components/filter/filter.js";
import {Datashow} from "../../components/filter/Datashow";
import Breadcrumb from "../../components/Breadcrumd";
import Calendar from "../../components/calendar.js";
import {MultiLinechart} from "../../components/MultiLinechart";
import {PieChart} from "../../components/chart/ChartComponent";
import ReportTable from "../../components/table/ReportTable";


const { Text } = Typography;
const ExamReport =({colors})=>{
  const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
  const [vatValue, setVatValue] = useState(true);   //vat포함 여부
  const [datas, setDatas] = useState([])      //날자별 데이터
  const location = useLocation();
  const currentAd =location.search?.split('=')[1]


    const [ChartOptions, setChartOptions] = useState([
      {
        key: 1,
        label: '노출수',
        value: 'm_impr',
      },
      {
        key: 2,
        label: '클릭수',
        value: 'm_click',
      },
      {
        key: 3,
        label: 'CTR',
        value: 'm_ctr',
      },
      {
        key: 4,
        label: 'CPC',
        value: 'm_cpc',
      },
      {
        key: 5,
        label: '광고비',
        value: 'm_cost',
      },
      {
        key: 6,
        label: '주문수',
        value: 'odr',
      },
      {
        key: 7,
        label: '주문율',
        value: 'odr_per_m_cost',
      },
      {
        key: 8,
        label: '주문금액',
        value: 'rvn',
      },
      {
        key: 9,
        label: 'ROAS',
        value: 'roas',
      },
      {
        key: 10,
        label: '구매단가',
        value: 'rvn_per_odr',
      },
      {
        key: 11,
        label: '회원가입수',
        value: 'rgr',
      },
      {
        key: 12,
        label: '회원가입율',
        value: 'rgr_per_m_click',
      },
    ])
    const [siteFilter, setSiteFilter] = useState([]); //사이트
    const [mdFilter, setMdFilter] = useState([]);     //광고매체사
    const [dataType, setDataType] =useState();        //스크립트,매체
    
    const [pfFilter, setPfFilter] = useState([]);       //플랫폼
    const [campFilter, setCampFilter] = useState([]);   //캠페인
    const [adMtFilter, setAdMtFilter] = useState([]);   //소재
    const [adDevFilter, setAdDevFilter] = useState([]); //디바이스

    const [SelectedChartOption, setSelectedChartOption] = useState([ChartOptions[0]]);

  const DataTypeChange = useCallback((value)=>{
    setDataType(value);
    setSelectedChartOption(ChartOptions[0])
    ChartFilter(ChartOptions[0].value)
    if(value ==='script'){
      setChartOptions([
        {
          key: 1,
          label: '노출수',
          value: 'm_impr',
        },
        {
          key: 2,
          label: '클릭수',
          value: 'm_click',
        },
        {
          key: 3,
          label: 'CTR',
          value: 'm_ctr',
        },
        {
          key: 4,
          label: 'CPC',
          value: 'm_cpc',
        },
        {
          key: 5,
          label: '광고비',
          value: 'm_cost',
        },
        {
          key: 6,
          label: '주문수',
          value: 'odr',
        },
        {
          key: 7,
          label: '주문율',
          value: 'odr_per_m_cost',
        },
        {
          key: 8,
          label: '주문금액',
          value: 'rvn',
        },
        {
          key: 9,
          label: 'ROAS',
          value: 'roas',
        },
        {
          key: 10,
          label: '구매단가',
          value: 'rvn_per_odr',
        },
        {
          key: 11,
          label: '회원가입수',
          value: 'rgr',
        },
        {
          key: 12,
          label: '회원가입율',
          value: 'rgr_per_m_click',
        },
      ])
    }else{
      setChartOptions([
        {
          key: 1,
          label: '노출수',
          value: 'm_impr',
        },
        {
          key: 2,
          label: '클릭수',
          value: 'm_click',
        },
        {
          key: 3,
          label: 'CTR',
          value: 'm_ctr',
        },
        {
          key: 4,
          label: 'CPC',
          value: 'm_cpc',
        },
        {
          key: 5,
          label: '광고비',
          value: 'm_cost',
        },
        {
          key: 6,
          label: '전환수',
          value: 'm_conv',
        },
        {
          key: 7,
          label: '전환율',
          value: 'm_conv/click',
        },
        {
          key: 8,
          label: '매출액',
          value: 'm_rvn',
        },
        {
          key: 9,
          label: 'ROAS',
          value: 'm_roas',
        },
      ])
    }
  },[])

    const items = [
        { title: "AIR(매체 통합 리포트)", href: "/" },
        { title: "리포트" },
    ];

    const DateChange = useCallback((value) => {
      // //value의 0,1간의 날짜 차이
      // const daysDifference = ( new Date(value[1]) - new Date(value[0])) / (1000 * 3600 * 24);
      
      const StatData=[]
      // console.log("StatData선언 이후의 StatData", StatData)
      const start_date = format(new Date(value[0]), "yyyy-MM-dd");
      const end_date = format(new Date(value[1]), "yyyy-MM-dd");
      const ad_provider = [];
      for(const data of AbizStatData){
        const stat_date = data.stat_date;
        if( stat_date>= start_date && stat_date <= end_date){
          const provider = data.ad_provider;
          if(!ad_provider.includes(provider)){
          ad_provider.push(provider);
        }
        }
      }
      // console.log("ad_provider",ad_provider)
      for(const data of AbizStatData){
        // console.log("data",data)
        const stat_date = data.stat_date;
          if( stat_date>= start_date && stat_date <= end_date){
                StatData.push(data);
                // console.log(data);
          }
    }
    if(vatValue){

          const updatedStatData = StatData.map((item) => {
              return {
              ...item,
              m_rvn: (item.m_rvn + item.m_rvn * 0.1).toFixed(0),
              rvn: (item.rvn + item.rvn * 0.1).toFixed(0),
              m_cost: (item.m_cost + item.m_cost * 0.1).toFixed(0),
              m_cpc: (item.m_cpc + item.m_cpc * 0.1).toFixed(0),
              rvn_per_odr: (item.rvn_per_odr + item.rvn_per_odr * 0.1).toFixed(0),
              m_ctr : (item.m_ctr*100).toFixed(2),
            };
          });
          setDatas(updatedStatData);
      }else{
        const updatedStatData = StatData.map((item) => {
          return {
          ...item,
          m_ctr : (item.m_ctr*100).toFixed(2),
        };
      });
          setDatas(updatedStatData);
      }
    // const updateData = StatData.filter((item) => ad_provider.includes(item.ad_provider));

    //     setDatas(updateData.filter((item) => ad_provider.includes(item.ad_provider)));

  }, [vatValue, AbizStatData,ChartOptions,SelectedChartOption]);

  const adMaterial = [
    {
      key : 1,
      name : 'SA',
      value : 1,
    },
    {
      key : 2,
      name : 'DA',
      value : 2,
    },
    {
      key : 3,
      name : 'PL',
      value : 3,
    },
    {
      key : 4,
      name : 'SP',
      value : 4,
    },
  ];

  const adDevice = [
    {
      key : 1,
      name : 'PC',
      value : 1,
    },
    {
      key : 2,
      name : 'Mobile',
      value : 2,
    },
  ];

    
    const adSiteMap = new Map();
    const adProvidersSet = new Set();
    const adPlatformSet = new Set();
    const adCampaignSet = new Set();
    
    for (const data of A_bizDetail) {
      // Ad Site 처리
      if (!adSiteMap.has(data.pfno)) {
        const siteValue = AdSiteData.find(item => item.value === data.pfno);
        if (siteValue) {
          adSiteMap.set(data.pfno, { name: siteValue.name, value: siteValue.value });
        }
      }
    
      // Ad Providers 처리
      adProvidersSet.add(data.ad_provider);
    
      // Ad Platform 처리
      adPlatformSet.add(data.ad_platform);
    
      // Ad Campaign 처리
      if (data.campaign !== "") {
        adCampaignSet.add(data.campaign);
      }
    }
    
    const adSite = Array.from(adSiteMap.values());
    const adProviders = Array.from(adProvidersSet).map(provider => ({ name: provider, value: provider }));
    const adPlatform = Array.from(adPlatformSet).map(platform => ({ name: platform, value: platform }));
    const adCampaign = Array.from(adCampaignSet).map(campaign => ({ name: campaign, value: campaign }));






    //대상, 필터 데이터 변경
    const adsiteChange = useCallback((value) => {
      const AdSitefilteredValue = value.filter((option) => option !== "selectAll");
    setSiteFilter(AdSitefilteredValue);
     
      },[]);

    const mdChange = useCallback((value) => {
      const MdfilteredValue = value.filter((option) => option !== "selectAll");
      setMdFilter(MdfilteredValue);
    }, []);
    
    const pfChange = useCallback((value) => {
      const PffilteredValue = value.filter((option) => option !== "selectAll");
      setPfFilter(PffilteredValue);
    }, []);

    const CampChange = useCallback((value) => {
      const CampfilteredValue = value.filter((option) => option !== "selectAll");
      setCampFilter(CampfilteredValue);
    }, []);

    const AdMtChange = useCallback((value) => {
      const MeterialfilteredValue = value.filter((option) => option !== "selectAll");
      setAdMtFilter(MeterialfilteredValue);
    }, []);

    const AdDeviceChange = useCallback((value) => {
      const DevicefilteredValue = value.filter((option) => option !== "selectAll");
      setAdDevFilter(DevicefilteredValue);
    }, []);

   
    
    const ChartFilter = useCallback((value) => {
      const updateData = ChartOptions.filter((item) => item.value === value)
      setSelectedChartOption(updateData);
    },[ChartOptions])
    
    const handleSwitchToggle =(value)=>{
      setVatValue(value)
    }


        const updateFilter =()=>{
          console.log('update!')
        }
        


    return(
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
                        <span className="title-text">광고 매체 분석 종합</span>
                      </div>
                    </Col>
                  </Row>
              </div>

              <div style={{display:'flex', justifyContent:'end', paddingBottom:'10px'}}>
                <Calendar onValueChange={DateChange} />
              </div>
              <div className="WhiteBox">
                    <Space size="large">
                       <Text strong level={4}>
                                    대상&nbsp;
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </Text>
                                <AdSitefilter options={adSite} onValueChange={adsiteChange} />
                                <Mdfilter options={adProviders} onValueChange={mdChange} />
                                <AdPlatform options={adPlatform} onValueChange={pfChange} />
                                <AdCampaign options={adCampaign} onValueChange={CampChange} />
                            </Space>
                            <br/>
                            <div style={{paddingTop:"20px"}}>
                            <Space size="large">
                                <Text strong level={4}>
                                    필터&nbsp;
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </Text>
                                <AdMaterial options={adMaterial} onValueChange={AdMtChange} />
                                <AdDevice options={adDevice} onValueChange={AdDeviceChange} />
                                <Datashow onValueChange={DataTypeChange} />
                                <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked onClick={handleSwitchToggle}/>
                                <Button className=""type="primary" onClick={updateFilter}>확인</Button>
                            </Space>
                    </div>
                </div>
                <div className="WhiteBox">
                  <div>
                  <Select
                    className='ChartFilter'
                    showSearch
                    style={{
                      width: 200,
                    }}
                    defaultValue={ChartOptions[0].value}
                    options={ChartOptions}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    onChange={ChartFilter}
                    value={SelectedChartOption}
                    >
                    </Select>
                    <br/>
                    <br/>
                    <div style={{display:'flex', justifyContent:'start', alignContent:'center'}}>
                      <div style={{width:'70%'}}>
                      <MultiLinechart datas={datas} mdFilter={mdFilter} SelectedChartOption={SelectedChartOption} colors={colors}/>
                      </div>
                      <div>
                      <Divider style={{height:'300px'}}type='vertical' />
                      </div>
                      <div style={{width:"30%"}}>
                      <PieChart colors={colors} SelectedChartOption={SelectedChartOption}  datas={datas}></PieChart>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div>
              <ReportTable/>
            </div>
        </>
    )
}
export default ExamReport;