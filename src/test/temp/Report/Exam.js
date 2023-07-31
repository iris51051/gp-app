import React,{useCallback, useState, useEffect} from 'react';
import { Col, Tabs, Row,Space, Typography, Button,Switch,Divider,Select} from "antd";
import format from "date-fns/format";
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
import { Adfilter, Mdfilter, AdSitefilter,AdPlatform,AdCampaign,AdMaterial,AdDevice  } from "../../components/filter.js";
import {Datashow} from "../../components/Datashow";
import Breadcrumb from "../../components/Breadcrumd";
import Calendar from "../../components/calendar.js";
import {MultiLinechart} from "../../components/MultiLinechart";
import {PieChart} from "../../components/ChartComponent";


const { Text } = Typography;
const ExamReport =({colors})=>{
    const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
    const [vatValue, setVatValue] = useState(true);
    const [VatStatDateData, setVatStatDateData]= useState([]);
    const [datas, setDatas] = useState([])

    const [siteFilter, setSiteFilter] = useState([]);
    const [mdFilter, setMdFilter] = useState([]);
    const [dataType, setDataType] =useState();
    
    const [pfFilter, setPfFilter] = useState([]);
    const [campFilter, setCampFilter] = useState([]);
    const [adMtFilter, setAdMtFilter] = useState([]);
    const [adDivFilter, setAdDivFilter] = useState([]);
    const [data,setData] = useState([]);


    const defaultFilterOptions = {
        AdSiteData: AdSiteData,
        adMediaData: adMediaData,
        vatValue: vatValue,
        Datas : datas
      };
    const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
    const items = [
        { title: "AIR(매체 통합 리포트)", href: "/" },
        { title: "리포트" },
    ];
    

    useEffect(() => {
        const uniqueSiteValues = new Set(A_bizDetail.map((detail) => detail.pfno));
        const uniqueSites = AdSiteData.filter((site) => uniqueSiteValues.has(site.value));
        console.log('Unique Site objects for A_bizDetail:', uniqueSites);
        setSiteFilter(uniqueSites);
      }, [A_bizDetail]);
      
    console.log("siteFiltersiteFiltersiteFiltersiteFiltersiteFiltersiteFiltersiteFiltersiteFiltersiteFiltersiteFilter",siteFilter)
    const DateChange = useCallback((value) => {
        setDateValue(value);
        //value의 0,1간의 날짜 차이
        const daysDifference = ( new Date(value[1]) - new Date(value[0])) / (1000 * 3600 * 24);
        console.log("daysDifference",daysDifference)
        
        let StatData =[];
        for(const data of AbizStatData){
            const stat_date = data.stat_date;
            if(stat_date>=`${format(new Date(value[0]),"yyyy-MM-dd")}` && stat_date <=`${format(new Date(value[1]),"yyyy-MM-dd")}`){
            console.log(1);
            StatData.push(data);
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
                StatData.push(newValue);
            }
        }
        if(vatValue){
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
            
            setDatas(updatedStatData);
            console.log('VatData 내용 ::::::',updatedStatData)
        }else{
            setDatas(StatData);
            console.log('SatData 내용 ::::::',StatData)
        }
    }, [vatValue, VatStatDateData]);
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
    const ChartOptions = [
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
        label: '주물율',
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
    ]
    const [ChartOption, setChartOption] = useState(ChartOptions[0].value);
    for (const data of A_bizDetail) {
        // Check if the ad provider is not already present in the adProviders array
        const isAdProviderExist = adSite.some(
          (adSite) => adSite.value === data.pfno
        );
      
        if (!isAdProviderExist) {
          // If it's not present, add it to the adProviders array
          const SiteValue = AdSiteData.find((item)=> item.value === data.pfno);
          adSite.push({ name: SiteValue.name, value: SiteValue.value });
        }
      }
    for (const data of adProvider) {
        // Check if the ad provider is not already present in the adProviders array
        const isAdProviderExist = adProviders.some(
          (provider) => provider.name === data.ad_provider
        );
      
        if (!isAdProviderExist) {
          adProviders.push({ name: data.ad_provider, value: data.ad_provider });
        }
      }
    for (const data of A_bizDetail) {
        // Check if the ad provider is not already present in the adProviders array
        const isAdPlatformExist = adPlatform.some(
          (platfrom) => platfrom.name === data.ad_platform
        );
      
        if (!isAdPlatformExist) {
          // If it's not present, add it to the adProviders array

          adPlatform.push({ name: data.ad_platform, value: data.ad_platform });
        }
      }
    for (const data of A_bizDetail) {
        if(data.campaign !==""){
          // Check if the ad provider is not already present in the adProviders array
          const isAdcampaignExist = adCampaign.some(
            (campaign) => campaign.name === data.campaign
          );
        
          if (!isAdcampaignExist) {
            // If it's not present, add it to the adProviders array
            adCampaign.push({ name: data.campaign, value: data.campaign });
          }
        }
      }


    const updateFilter = () => {   

        // Filter the AdData based on the selected adFilter names
        const filteredAdSiteData = AdSiteData.filter((item) => siteFilter.includes(item.value));
        const filteredadMediaData =adMediaData.filter((item)=> mdFilter.includes(item.ad_provider));
        
        // You can use the spread operator to update the filterOptions state
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          AdSiteData:filteredAdSiteData,
          adMediaData:filteredadMediaData,
          Datas : datas,
        })); 
      };

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
      const handleSwitchToggle =(value)=>{
        setVatValue(value)
      }
    const ChartFilter = useCallback((value) => {
      setChartOption(value);
    },[])
    const DataTypeChange = useCallback((value)=>{
      setDataType(value);
    },[])
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

              <div style={{display:'flex', justifyContent:'end'}}>
                <Calendar onValueChange={DateChange}/>
              </div>

              <div className="WhiteBox">
                    <Space size="large">
                       <Text strong level={4}>
                                    대상&nbsp;
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </Text>
                                <AdSitefilter options={adSite} onValueChange={adsiteChange} />
                                <Mdfilter options={adProviders} onValueChange={mdChange} />
                                <AdPlatform options={adPlatform} onValueChange={mdChange} />
                                <AdCampaign options={adCampaign} onValueChange={mdChange} />
                            </Space>
                            <br/>
                            <div style={{paddingTop:"20px"}}>
                            <Space size="large">
                                <Text strong level={4}>
                                    필터&nbsp;
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </Text>
                                <AdMaterial options={adMaterial} onValueChange={mdChange} />
                                <AdDevice options={adDevice} onValueChange={mdChange} />
                                <Datashow onValueChange={DataTypeChange} />
                                <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked onClick={handleSwitchToggle}/>

                                <Button className=""type="primary" onClick={updateFilter}>확인</Button>
                            </Space>
                            </div>

                </div>

                <div className="WhiteBox">
                  <div style={{}}>
                  <Select
                    className='ChartFilter'
                    showSearch
                    style={{
                      width: 200,
                    }}
                    defaultValue={ChartOptions[0].value}
                    options={ChartOptions}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    onChange={ChartFilter}
                    >
                    </Select>
                    <span>{ChartOption}</span>
                    <br/>
                    <span>{dataType}</span>
                    <div style={{display:'flex', justifyContent:'start', alignContent:'center'}}>
                      <div style={{width:'70%'}}>
                      <MultiLinechart data={data} colors={colors}/>
                      </div>
                      <div>
                      <Divider style={{height:'300px'}}type='vertical' />
                      </div>
                      <div style={{width:"30%"}}>
                      <PieChart colors={colors} ></PieChart>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </>
    )
}
export default ExamReport;