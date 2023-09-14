import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import axios from 'axios';

import AdResultTable from "../../components/table/AdResultTable";
import MDResultTable from "../../components/table/MDResultTable.js";
import MDTransBar from "../../components/chart/MediaTransition/MDTransBar.js";
import MDTransPie from "../../components/chart/MediaTransition/MDTransPie.js";
import DeviceTransPie from "../../components/chart/MediaTransition/DeviceTransPie.js";
import LineChart from "../../components/chart/LineChart";

const MainTab1 = ({filterOptions}) => {
  const [providerResult, setProviderResult] = useState([])
  const [deviceResult, setDeviceResult] = useState([])
  const [programResult, setProgramResult] = useState([])
  const [providerData, setProviderData] = useState([])
  const [programData, setProgramData] = useState([])
  
  //광고 매체사별 성과 데이터
  const getProgramData = async ()=>{
    if(filterOptions.date[0] !==`${format(new Date(),"yyyy-MM-dd")}`){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["ad_provider","ad_program"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [filterOptions.date[0], filterOptions.date[1]],
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
        clientSeq: filterOptions.Ad,
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
        return setProgramResult(responseData);

      }catch(e){
        console.error(e)
        setProgramResult([])
      }
    }else{
      setProgramResult([])
    }
  }
  const getProviderData = async ()=>{
    if(filterOptions.date[0] !==`${format(new Date(),"yyyy-MM-dd")}`){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["ad_provider"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [filterOptions.date[0], filterOptions.date[1]],
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
        "roas",
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: filterOptions.Ad,
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
        return setProviderResult(responseData);

      }catch(e){
        console.error(e)
        setProviderResult([])
      }
    }else{
      setProviderResult([])
    }
  }
  const getDeviceData = async ()=>{
    if(filterOptions.date[0] !==`${format(new Date(),"yyyy-MM-dd")}`){
      const body =JSON.stringify({
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ["device"],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: [filterOptions.date[0], filterOptions.date[1]],
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
        metCd: [
        "m_cost",
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: filterOptions.Ad,
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
        return setDeviceResult(responseData);

      }catch(e){
        console.error(e)
        setDeviceResult([])
      }
    }else{
      setDeviceResult([])
    }
  }
  useEffect(() => {
    getProgramData()
    getProviderData()
    getDeviceData()
  }, [filterOptions])

  useEffect(() => {
    if(programResult.length>0){
        if(filterOptions.vatValue){
          const updatedProgramData =programResult?.map((item) => {
            return {
              ...item,
              m_rvn: item.m_rvn + item.m_rvn * 0.1,
              rvn: item.rvn + item.rvn * 0.1,
              m_cost: item.m_cost + item.m_cost * 0.1,
              m_cpc: item.m_cpc + item.m_cpc * 0.1,
              rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
            };
          });
          const updatedProviderData =providerResult?.map((item) => {
            return {
              ...item,
              m_rvn: item.m_rvn + item.m_rvn * 0.1,
              rvn: item.rvn + item.rvn * 0.1,
              m_cost: item.m_cost + item.m_cost * 0.1,
              m_cpc: item.m_cpc + item.m_cpc * 0.1,
              rvn_per_odr: item.rvn_per_odr + item.rvn_per_odr * 0.1,
            };
          });
          setProgramData(updatedProgramData)
          setProviderData(updatedProviderData);
        }else{
          setProgramData(programResult)
          setProviderData(providerResult);
        }
      }else{
        setProgramData([])
        setProviderData([]);
      }
  }, [providerResult,programResult,filterOptions]);

  
      //실제 데이터 (이름, 값)
      const defaultData = [
        {
          group: "광고그룹",
          groupname: "아트",
          name: "노출수",
          value: [60, 50, 21, 58, 95, 77, 21],
        },
        {
          group: "광고그룹",
          groupname: "아트",
          name: "클릭수",
          value: [10, 20, 81, 38, 95, 17, 81],
        },
        {
          group: "광고그룹",
          groupname: "아트",
          name: "CTR",
          value: [40, 60, 84, 38, 55, 77, 40],
        },
        {
          group: "광고그룹",
          groupname: "컴투펫",
          name: "노출수",
          value: [50, 30, 24, 18, 35, 47, 60],
        },
        {
          group: "광고그룹",
          groupname: "컴투펫",
          name: "클릭수",
          value: [60, 50, 21, 58, 95, 77, 21],
        },
        {
          group: "광고그룹",
          groupname: "컴투펫",
          name: "CTR",
          value: [10, 20, 81, 38, 95, 17, 81],
        },
        {
          group: "광고그룹",
          groupname: "휴라이트",
          name: "노출수",
          value: [40, 60, 84, 38, 55, 77, 40],
        },
        {
          group: "광고그룹",
          groupname: "휴라이트",
          name: "클릭수",
          value: [20, 40, 71, 68, 55, 17, 41],
        },
        {
          group: "광고그룹",
          groupname: "휴라이트",
          name: "CTR",
          value: [30, 50, 41, 58, 65, 77, 91],
        },
        {
          group: "광고그룹",
          groupname: "후퍼옵틱",
          name: "노출수",
          value: [110, 160, 91, 41, 65, 97, 20],
        },
        {
          group: "광고그룹",
          groupname: "후퍼옵틱",
          name: "클릭수",
          value: [160, 250, 21, 318, 95, 77, 21],
        },
        {
          group: "광고그룹",
          groupname: "후퍼옵틱",
          name: "CTR",
          value: [150, 20, 224, 218, 135, 47, 26],
        },
       
        {
          group: "매체",
          groupname: "검샷",
          name: "노출수",
          value: [110, 160, 91, 41, 65, 97, 20],
        },
        {
          group: "매체",
          groupname: "검샷",
          name: "클릭수",
          value: [160, 250, 21, 318, 95, 77, 21],
        },
        {
          group: "매체",
          groupname: "검샷",
          name: "CTR",
          value: [150, 20, 224, 218, 135, 47, 26],
        },
        {
          group: "매체",
          groupname: "컴샷",
          name: "노출수",
          value: [30, 50, 41, 58, 65, 77, 91],
        },
        {
          group: "매체",
          groupname: "컴샷",
          name: "클릭수",
          value: [110, 160, 91, 41, 65, 97, 20],
        },
        {
          group: "매체",
          groupname: "컴샷",
          name: "CTR",
          value: [160, 250, 21, 318, 95, 77, 21],
        },
      ];

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

 
      <h4>기간별 광고 비용 추세</h4>
      <LineChart colors={colors} defaultData={defaultData}/>
      <br/>
      <div>
      <AdResultTable/>
      </div>
      <div>
        <h4 className="MDResult">광고 매체사별 성과</h4>
        <MDResultTable
         Incomedata={programData}
          
         />
      </div>

      <div className="fotterChartCompdiv">
        <div className="fotterBarchart" style={{width: '45%',}}>
          <div>
        <h6 className="fotterBarchartTitle">매체별 전환수 & 전환율</h6>
        </div>
              <MDTransBar data={providerData} colors={colors}/>

        </div>
        <div className="fotterMDPiechart" style={{width:'25%'}}>
            <div>
                <h6 className="fotterMDPiecharttitle">매체별 전환 비중</h6>
            </div>
             <MDTransPie data ={providerData} colors={colors}/>
        </div>
        <div className="fotterDevPiechart"  style={{width:'25%'}}>
          <div>
          <h6 className="fotterDevPiechartTitle">디바이스별 광고비 비중</h6>
          </div>
              <DeviceTransPie incomedata ={deviceResult}  colors={colors}/>
        </div>
      </div>
    </>
  );
};
export default MainTab1;
