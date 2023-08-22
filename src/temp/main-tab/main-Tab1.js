import React, { useState, useEffect } from "react";
import AdResultTable from "../../components/table/AdResultTable";
import MDResultTable from "../../components/table/MDResultTable.js";
import MDTransBar from "../../components/chart/MediaTransition/MDTransBar.js";
import MDTransPie from "../../components/chart/MediaTransition/MDTransPie.js";
import DeviceTransPie from "../../components/chart/MediaTransition/DeviceTransPie.js";
import LineChart from "../../components/chart/LineChart";

const MainTab1 = () => {

// 매체별 전환 비중 pie chart 데이터
  const MDTransData=[
      { value: 36260, name: '구글',children:
        { name: "총 전환율", value : 32.70}},
      { value: 9366, name: 'AND PC',children:
      { name: "총 전환율", value : 1.35} },
      { value: 9250, name: 'DABLE',children:
      { name: "총 전환율", value : 3.32} },
      { value: 359, name: '네이버',children:
      { name: "총 전환율", value : 1.57} },
      { value: 96, name: '카카오',children:
      { name: "총 전환율", value : 60.76} },
      { value: 0, name: 'FACEBOOK',children:
      { name: "총 전환율", value : 0} },
      { value: 0, name: '모비온' ,children:
      { name: "총 전환율", value : 0}},
      { value: 0, name: '페이스북',children:
      { name: "총 전환율", value : 0}},
  ]

  
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
        <MDResultTable/>
      </div>

      <div className="fotterChartCompdiv">
        <div className="fotterBarchart" style={{width: '45%',}}>
          <div>
        <h6 className="fotterBarchartTitle">매체별 전환수 & 전환율</h6>
        </div>
              <MDTransBar data={MDTransData} colors={colors}/>

        </div>
        <div className="fotterMDPiechart" style={{width:'25%'}}>
            <div>
                <h6 className="fotterMDPiecharttitle">매체별 전환 비중</h6>
            </div>
             <MDTransPie data ={MDTransData} colors={colors}/>
        </div>
        <div className="fotterDevPiechart"  style={{width:'25%'}}>
          <div>
          <h6 className="fotterDevPiechartTitle">디바이스별 광고비 비중</h6>
          </div>
              <DeviceTransPie  colors={colors}/>
        </div>
      </div>
    </>
  );
};
export default MainTab1;
