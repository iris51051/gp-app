import React,{useCallback, useState, useEffect} from 'react';
import { Col, Tabs, Row,Space, Typography, Button,Switch,Tag} from "antd";
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
import A_BizAd_Provider from '../../data/A_bizData/A_bizad_Provider';
import A_bizDetail from '../../data/A_bizData/A_bizDetail';
//모듈
import { Adfilter, Mdfilter, AdSitefilter,AdPlatform,AdCampaign,AdMaterial,AdDevice  } from "../../components/filter.js";
import {Datashow} from "../../components/Datashow";
import Breadcrumb from "../../components/Breadcrumd";
import Calendar from "../../components/calendar.js";

const { Text } = Typography;
const ExamReport =()=>{
    const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])
    const [vatValue, setVatValue] = useState(true);
    const [VatStatDateData, setVatStatDateData]= useState([]);
    const [datas, setDatas] = useState([])

    const [siteFilter, setSiteFilter] = useState([]);
    const [mdFilter, setMdFilter] = useState([]);
    const [pfFilter, setPfFilter] = useState([]);
    const [campFilter, setCampFilter] = useState([]);
    const [adMtFilter, setAdMtFilter] = useState([]);
    const [adDivFilter, setAdDivFilter] = useState([]);

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
    const adProviders = [];
    const adPlatform = [];
    const adCampaign = [];
    const adMaterial = [];
    const adDevice = [];
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
                        <div className="FilterDiv" style={{padding:25}}>
                            <Space size="large">
                                <Text strong level={4}>
                                    대상&nbsp;
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </Text>
                                <AdSitefilter options={AdSiteData} onValueChange={adsiteChange} />
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
                                <Datashow/>
                                <Switch checkedChildren="VAT포함" unCheckedChildren="VAT제외" defaultChecked onClick={handleSwitchToggle}/>

                                <Button className=""type="primary" onClick={updateFilter}>확인</Button>
                            </Space>
                            </div>
                        </div>
                </div>

                <div className="WhiteBox">

                </div>
            </div>
        </>
    )
}
export default ExamReport;