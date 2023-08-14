import React,{useCallback, useState, useEffect} from 'react';
import { Col, Tabs, Row,Space, Typography, Button,Switch,Divider,Select} from "antd";
import format from "date-fns/format";
import { useLocation} from "react-router-dom";
//icon
import { IoMdTimer } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
//data
import AdData from "../../data/AdData";
import AdSiteData from "../../data/AdSiteData";
import adMediaData from "../../data/AdMediaData";
import AbizStatData from '../../data/A_bizData/A_bizSatData';
import A_bizDetail from '../../data/A_bizData/A_bizDetail';
import {adProvider} from '../../data/A_bizData/Ad_Provider';
//모듈
import {Mdfilter, AdSitefilter,AdPlatform,AdCampaign,AdMaterial,AdDevice  } from "../../components/filter.js";
import {Datashow} from "../../components/Datashow";
import Breadcrumb from "../../components/Breadcrumd";
import Calendar from "../../components/calendar.js";
import {MultiLinechart} from "../../components/MultiLinechart";
import {PieChart} from "../../components/ChartComponent";


const { Text } = Typography;
const ExamReport =({colors})=>{
    const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
    const [vatValue, setVatValue] = useState(true);   //vat포함 여부
    const [datas, setDatas] = useState([])      //날자별 데이터
    const location = useLocation();
    const currentPage = location.pathname;
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
      {
        key: 13,
        label: '추천수',
        value: 'g1',
      },
      {
        key: 14,
        label: '예약수',
        value: 'g2',
      },
      {
        key: 15,
        label: 'dddd',
        value: 'g3',
      },
      {
        key: 16,
        label: '전화걸기',
        value: 'g4',
      },
      {
        key: 17,
        label: '회사소개서 다운',
        value: 'g5',
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

    // console.log(pfFilter,campFilter,adMtFilter,adDevFilter,siteFilter,mdFilter,dataType)
    // console.log('사이트 선택',siteFilter)
  // console.log("캠페인 선택",campFilter)
  // console.log('소재유형',adMtFilter)
  // console.log('디바이스',adDevFilter)
  // console.log('플랫폼',pfFilter)
  // console.log('광고매체사',mdFilter)
  // console.log('스크립트',dataType)
  // console.log('Datas',datas)

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
        {
          key: 13,
          label: '추천수',
          value: 'g1',
        },
        {
          key: 14,
          label: '예약수',
          value: 'g2',
        },
        {
          key: 15,
          label: 'dddd',
          value: 'g3',
        },
        {
          key: 16,
          label: '전화걸기',
          value: 'g4',
        },
        {
          key: 17,
          label: '회사소개서 다운',
          value: 'g5',
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
    
      //siteFilter에 들어갈 데이터들의 중복 검사.
    useEffect(() => {
        const uniqueSiteValues = new Set(A_bizDetail.map((detail) => detail.pfno));
        const uniqueSites = AdSiteData.filter((site) => uniqueSiteValues.has(site.value));
        setSiteFilter(uniqueSites);
      }, [A_bizDetail]);


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

    const adSite =[];
    const adProviders = [];
    const adPlatform = [];
    const adCampaign = [];
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

  
    for (const data of A_bizDetail) {
        //A_bizDetail의 내용물을 data라는 새로운 객체로 지정.

        //adSite에 있는 value와 data의 pfno가 동일한게 있는지 확인하는 과정
        const isAdProviderExist = adSite.some(
          (adSite) => adSite.value === data.pfno
        );
      
        //동일한 데이터가 없다면 해당 데이터를 adSite에 저장.
        if (!isAdProviderExist) {
          const SiteValue = AdSiteData.find((item)=> item.value === data.pfno);
          adSite.push({ name: SiteValue.name, value: SiteValue.value });
        }
      }
    for (const data of adProvider) {
        const isAdProviderExist = adProviders.some(
          (provider) => provider.name === data.ad_provider
        );
        if (!isAdProviderExist) {
          adProviders.push({ name: data.ad_provider, value: data.ad_provider });
        }
      }
    for (const data of A_bizDetail) {
        const isAdPlatformExist = adPlatform.some(
          (platfrom) => platfrom.name === data.ad_platform
        );
      
        if (!isAdPlatformExist) {
          adPlatform.push({ name: data.ad_platform, value: data.ad_platform });
        }
      }
    for (const data of A_bizDetail) {
        if(data.campaign !==""){
          const isAdcampaignExist = adCampaign.some(
            (campaign) => campaign.name === data.campaign
          );
        
          if (!isAdcampaignExist) {
            adCampaign.push({ name: data.campaign, value: data.campaign });
          }
        }
      }

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

                                <Button className=""type="primary"
                                //확인키에 대한 액션으로 필터 적용 시킬지 확인 후 해당 내용 삽입.
                                //  onClick={updateFilter}   
                                 >확인</Button>
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
        </>
    )
}
export default ExamReport;