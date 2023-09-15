import React,{useCallback, useState, useEffect} from 'react';
import { Col, Tabs, Row,Space, Typography, Button,Switch,Divider,Select,Spin,Breadcrumb} from "antd";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { useLocation} from "react-router-dom";
import axios from 'axios';

//icon
import {LoadingOutlined,AreaChartOutlined } from '@ant-design/icons'
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
import {Providerfilter, AdSitefilter,AdPlatform,AdCampaign,AdType,AdDevice  } from "../../components/filter/filter.js";
import {Datashow} from "../../components/filter/Datashow";
import Calendar from "../../components/calendar.js";
import {MultiLinechart} from "../../components/chart/MultiLinechart";
import {PieChart} from "../../components/chart/ChartComponent";
import ReportTable from "../../components/table/ReportTable";
import EmptyReportTable from "../../components/table/EmptyReportTable";
import {generateDummyDataByDay} from '../../function/CreateDummyByDay'
import {generateDummyDataByProvider} from '../../function/CreateDummyByProvider'


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
const ExamReport =({colors})=>{
  const location = useLocation();
  const currentAd = location.search===undefined ? AdData[0].value : (location.search).split('=')[1]
  const [loading, setLoading] = useState(true)

  const [dateValue, setDateValue] = useState([`${format(addDays(new Date(), -7),"yyyy-MM-dd")}`,`${format(addDays(new Date(), -1),"yyyy-MM-dd")}`])
  const [CompareDateValue, setCompareDateValue] = useState([`${format(addDays(new Date(), -14),"yyyy-MM-dd")}`,`${format(addDays(new Date(), -8),"yyyy-MM-dd")}`])
  const [dateGap, setDateGap] = useState()
  const [vatValue, setVatValue] = useState(true);   //vat포함 여부
  const [ChartData, setChartData] = useState([])      //라인 데이터
  const [TableData, setTableData] = useState([])      //테이블 데이터

  const [adProviderList, setAdProviderList] = useState([])
  const [adSiteList, setAdSiteList] = useState([]);
  const [adPlatformList, setAdPlatformList] = useState([])
  const [adCampaignList, setAdCampaignList] = useState([])
  const [adTypeList,   setAdTypeList] = useState([])

  const [DeviceList, setDeviceList] = useState([])
  const [fetchedData, setFetchedData] = useState([]) //조회 데이터
  const [fetchedTableData, setFetchedTableData] = useState([])  //데이터 테이블  조회 데이터
  const [ChartOptions, setChartOptions] = useState(
      [
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
      ]
    )
    const [SiteFilter, setSiteFilter] = useState([]); //사이트
    const [ProviderFilter, setProviderFilter] = useState([]);     //광고매체사
    const [ConvType, setConvType] =useState("MEDIA");        //스크립트,매체
    const [PlatformFilter, setPlatformFilter] = useState([]);       //플랫폼
    const [CampaignFilter, setCampaignFilter] = useState([]);   //캠페인
    const [AdTypeFilter, setAdTypeFilter] = useState([]);   //소재
    const [DeviceFilter, setDeviceFilter] = useState([]); //디바이스

    const [SelectedChartOption, setSelectedChartOption] = useState(ChartOptions[0]);


    const fetchData = async ()=>{
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ['pfno',"ad_provider","ad_platform",'campaign',"device","ad_type"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: ['2022-01-10', format(addDays(new Date(), -1),'yyyy-MM-dd')],
          },
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: currentAd ||AdData[0].value,
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
        return response.data.data
      }catch(e){
        console.error(e)
      }
    }
    

    useEffect(() => {
      setLoading(true)
      const getData= async () => {
          const data = await fetchData();
          const providers = new Set(data.map((item) => item.ad_provider));
          const pfno = new Set(data.map((item) => item.pfno));
          const campaign = new Set(data.map((item) => item.campaign));
          const adPlatForm = new Set(data.map((item) => item.ad_platform));
          const adType = new Set(data.map((item) => item.ad_type));
          const device = new Set(data.map((item) => item.device));
          setAdProviderList(Array.from(providers).map(provider => ({
            name: provider,
            value: provider
          })));
          setAdSiteList(Array.from(pfno).map(site => ({
            name: site,
            value: site
          })));
          setAdCampaignList(Array.from(campaign).map(campaign => ({
            name: campaign,
            value: campaign
          })));
          setAdPlatformList(Array.from(adPlatForm).map(adPlatForm => ({
            name: adPlatForm,
            value: adPlatForm
          })));
          setDeviceList(Array.from(device).map(device => ({
            name: device,
            value: device
          })));
          setAdTypeList(Array.from(adType).map(AdType => ({
            name: AdType,
            value: AdType
          })));
        }
      getData();
    }, [currentAd]);

  const ConvTypeChange = useCallback((value)=>{
    setConvType(value);
    setSelectedChartOption(ChartOptions[0])
    ChartFilter(ChartOptions[0].value)
    if(value ==='SCRIPT'){
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

    //대상, 필터 데이터 변경
    const SiteChange = useCallback((value) => {
      const AdSiteSelectedValue = value.filter((option) => option !== "selectAll");
      setSiteFilter(AdSiteSelectedValue);
      },[]);

    const ProviderChange = useCallback((value) => {
      const ProviderSelectedValue = value.filter((option) => option !== "selectAll");
      setProviderFilter(ProviderSelectedValue);
    }, []);
    
    const PlatformChange = useCallback((value) => {
      const PlatformSelectedValue = value.filter((option) => option !== "selectAll");
      setPlatformFilter(PlatformSelectedValue);
    }, []);

    const CampaignChange = useCallback((value) => {
      const CampaignSelectedValue = value.filter((option) => option !== "selectAll");
      setCampaignFilter(CampaignSelectedValue);
    }, []);
    const AdTypeChange = useCallback((value) => {
      const AdTypeSelectedValue = value.filter((option) => option !== "selectAll");
      setAdTypeFilter(AdTypeSelectedValue);
    }, []);

    const AdDeviceChange = useCallback((value) => {
      const DeviceSelectedValue = value.filter((option) => option !== "selectAll");
      setDeviceFilter(DeviceSelectedValue);
    }, []);

   

    const ChartFilter = useCallback((value) => {
      const updateData = ChartOptions.filter((item) => item.value === value)
      setSelectedChartOption(updateData);
    },[ChartOptions])
    
    const handleSwitchToggle =(value)=>{
      setVatValue(value)
    }
    const defaultFilterOptions = {
      Pfno: adSiteList,
      AdProvider: adProviderList,
      Campaign : adCampaignList,
      PlatForm:adPlatformList,
      AdType: adTypeList,
      Device: DeviceList,
      ConvType:ConvType,
       
      VatValue:vatValue
    };

    const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
    useEffect(() => {
      if (adProviderList.length > 0 && adSiteList.length > 0 && adCampaignList.length>0 && adPlatformList.length>0 && DeviceList.length>0) {
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          Pfno: adSiteList,
          AdProvider: adProviderList,
          Campaign : adCampaignList,
          PlatForm:adPlatformList,
          AdType:adTypeList,
          Device: DeviceList,
          VatValue:vatValue
        }));
      }
    }, [adProviderList, adSiteList, adCampaignList,adPlatformList,vatValue,DeviceList,adTypeList]);
    
    useEffect(() => {
      if(currentAd === '0' || currentAd ===undefined){
        // Filter the AdData based on the selected adFilter names
        const SelectedAd = AdData[0].value;
        const SelectedAdSite = adSiteList.filter((item) => SiteFilter.includes(item.name));
        const SelectedAdProvider = adProviderList.filter((item)=> ProviderFilter.includes(item.value));
        const SelectedCampaign = adCampaignList.filter((item)=> CampaignFilter.includes(item.value));
        const SelectedPlatform = adPlatformList.filter((item)=> PlatformFilter.includes(item.value));
        const SelectedAdType = adTypeList.filter((item)=> AdTypeFilter.includes(item.value));
        const SelectedDevice = DeviceList.filter((item)=> DeviceFilter.includes(item.value));

          setFilterOptions((prevOptions) => ({
            ...prevOptions,
            Ad: SelectedAd,
            Pfno:SelectedAdSite,
            AdProvider:SelectedAdProvider,
            Campaign : SelectedCampaign,
            PlatForm:SelectedPlatform,
            AdType: SelectedAdType,
            Device: SelectedDevice,
            date:dateValue,
            ConvType:ConvType,
            VatValue:vatValue
          }));
      }else{
        const SelectedAdSite = adSiteList.filter((item) => SiteFilter.includes(item.value));
        const SelectedAdProvider = adProviderList.filter((item)=> ProviderFilter.includes(item.value));
        const SelectedCampaign = adCampaignList.filter((item)=> CampaignFilter.includes(item.value));
        const SelectedPlatform = adPlatformList.filter((item)=> PlatformFilter.includes(item.value));
        const SelectedAdType = adTypeList.filter((item)=> AdTypeFilter.includes(item.value));
        const SelectedDevice = DeviceList.filter((item)=> DeviceFilter.includes(item.value));
          setFilterOptions((prevOptions) => ({
            ...prevOptions,
            Pfno:SelectedAdSite,
            AdProvider:SelectedAdProvider,
            Campaign : SelectedCampaign,
            PlatForm:SelectedPlatform,
            AdType: SelectedAdType,
            Device: SelectedDevice,
            date:dateValue,
            ConvType:ConvType,
            VatValue:vatValue
          }));
      }
    }, [SiteFilter,ProviderFilter,PlatformFilter,CampaignFilter,AdTypeFilter,DeviceFilter,dateValue,ConvType])
    

    useEffect(() => {
      let test = 0;
      for (const key in filterOptions) {
        if (Array.isArray(filterOptions[key]) && filterOptions[key].length === 0) {
            test=1;
            setFetchedData([])
            break;
        }
    }
    if(test===0){
      getChartData(); //스코어카드용 데이터 조회
      getTableData(); //테이블 데이터 조회용
    // getCompareData();
    }

    }, [filterOptions]);

  
    //Filter에 따른 Line,Pie차트 데이터용 데이터
    //날짜,광고매체만 표시
    const getChartData = async ()=>{
      if(dateValue[0] !==`${format(new Date(),"yyyy-MM-dd")}`&& filterOptions.AdProvider.length>0){
        const body =JSON.stringify({
          rptNo: '1000000',
          lookupTp: 'agg',
          dimCd: ['by_day','ad_provider'],
          where: [
            {
              field: 'stat_date',
              operation: 'between',
              value: [dateValue[0], dateValue[1]],
            },
            {
              field: 'pfno',
              operation: 'in',
              value: filterOptions.Pfno.map((item)=>item.value),
            },
            {
              field: 'ad_provider',
              operation: 'in',
              value: filterOptions.AdProvider.map((item)=>item.value),
            },
            {
              field: 'ad_platform',
              operation: 'in',
              value: filterOptions.PlatForm.map((item)=>item.value),
            },
            {
              field: 'campaign',
              operation: 'in',
              value: filterOptions.Campaign.map((item)=>item.value),
            },
            {
              field: 'device',
              operation: 'in',
              value: filterOptions.Device.map((item)=>item.value),
            },
            {
              field: 'ad_type',
              operation: 'in',
              value: filterOptions.AdType.map((item)=>item.value),
            },
          ],
          metCd: [
          "m_impr",
          "m_click",
          "m_ctr",
          "m_cpc",
          "m_cost",
          "m_conv",
          "m_crt",
          "m_rvn",
          "m_roas",
          "m_odr",
          "m_rgr",
          "land",
          "rvn",
          "m_cart",
          "odr",
          "rgr",
          "rvn_per_odr",
          "rgr_per_m_click",
          "odr_per_m_cost",
          "roas"
          ],
          sort: [{ field: 'land', order: 'asc' }],
          agencySeq: '1',
          clientSeq: currentAd ||AdData[0].value,
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
        const generateData = generateDummyDataByProvider(responseData, dateValue);
        setLoading(false)
          return setFetchedData(generateData);
        }catch(e){
          console.error(e)
        }

      }

    }
    //데이터 테이블에 대한 데이터 요청
    //
    const getTableData = async ()=>{
      if(filterOptions.AdProvider.length>0){
        const body =JSON.stringify({
          rptNo: '1000000',
          lookupTp: 'agg',
          dimCd: ["ad_provider","ad_platform",'ad_program'],
          where: [
            {
              field: 'stat_date',
              operation: 'between',
              value: [dateValue[0], dateValue[1]],
            },
            {
              field: 'pfno',
              operation: 'in',
              value: filterOptions.Pfno.map((item)=>item.value),
            },
            {
              field: 'ad_provider',
              operation: 'in',
              value: filterOptions.AdProvider.map((item)=>item.value),
            },
            {
              field: 'ad_platform',
              operation: 'in',
              value: filterOptions.PlatForm.map((item)=>item.value),
            },
            {
              field: 'campaign',
              operation: 'in',
              value: filterOptions.Campaign.map((item)=>item.value),
            },
            {
              field: 'device',
              operation: 'in',
              value: filterOptions.Device.map((item)=>item.value),
            },
            {
              field: 'ad_type',
              operation: 'in',
              value: filterOptions.AdType.map((item)=>item.value),
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
          clientSeq: currentAd ||AdData[0].value,
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
          if((response.data.data).length>0){
          const responseData = response.data.data;
            return setFetchedTableData(responseData);
          }else{
            setFetchedTableData([])
          }
        }catch(e){
          return setFetchedTableData([])
        }
      }else{
        return setFetchedTableData([])
      }
    }



    useEffect(() => {
     if(fetchedData.length>0){
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
            const updatedTableData = fetchedTableData?.map((item)=>{
              return {
                ...item,
                m_rvn: item.m_rvn + item.m_rvn * 0.1,
                rvn: item.rvn + item.rvn * 0.1,
                m_cost: item.m_cost + item.m_cost * 0.1,
                m_cpc: item.m_cpc + item.m_cpc * 0.1,
                rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
              };
            })

            setChartData(updatedData);
            setTableData(updatedTableData);
          }
          else{
            setTableData(fetchedTableData)
            setChartData(fetchedData);
          }

      }else{
        setChartData(fetchedData);

      }
      
    }, [fetchedData,vatValue,filterOptions,fetchedTableData]);
    return(
        <>
           {loading===true?
          <div
          style={{backgroundColor:"white",height: "80vh",display:'flex', justifyContent:'center',alignItems:'center'}}>
          <Spin indicator={antIcon} />
          </div>:
          <>
          <div className="MainContainer">
              <div className="TitleBox">
                  <Row className="title-Row">
                    <Col xs={24}>
                      <Breadcrumb separator=">" items={items} />
                    </Col>
                    <Col xs={24}>
                      <div className="active-title">
                      <AreaChartOutlined className="title-icon"/>
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
                                <AdSitefilter options={adSiteList} onValueChange={SiteChange} /> 
                                <Providerfilter options={adProviderList} onValueChange={ProviderChange} />
                                <AdPlatform options={adPlatformList} onValueChange={PlatformChange} />
                                <AdCampaign options={adCampaignList} onValueChange={CampaignChange} />
                            </Space>
                            <br/>
                            <div style={{paddingTop:"20px"}}>
                            <Space size="large">
                                <Text strong level={4}>
                                    필터&nbsp;
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </Text>
                                <AdType options={adTypeList} onValueChange={AdTypeChange} /> 
                                <AdDevice options={DeviceList} onValueChange={AdDeviceChange} />
                                <Datashow onValueChange={ConvTypeChange} />
                                <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked onClick={handleSwitchToggle}/>
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
                      <MultiLinechart datas={ChartData} ProviderFilter={ProviderFilter} SelectedChartOption={SelectedChartOption} colors={colors}/>
                      </div>
                      <div>
                      <Divider style={{height:'300px'}}type='vertical' />
                      </div>
                      <div style={{width:"30%"}}>
                      <PieChart colors={colors} SelectedChartOption={SelectedChartOption}  datas={ChartData}></PieChart>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div>
            {ChartData.length>0 ? 
              <ReportTable Incomedata={TableData} ConvType={ConvType}/>
              : <EmptyReportTable/>
            }
            </div>
            </>
    }
        </>
    )
}

export default ExamReport;

