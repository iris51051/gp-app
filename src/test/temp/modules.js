import React,{useState,useCallback} from "react";
import {Space,Typography} from 'antd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";

import  {PieChart,DynamicChart,LineChart}  from "../components/moduleSample/ChartComponent";
import  {BLchart,BarChart,ScoreCard,ScoreCardChart }  from "../components/moduleSample/ChartScoreCard1";
import  { Type1,Type2,Type3}  from "../components/moduleSample/DataGridComponent";
import  { Adfilter,AdSitefilter,Mdfilter}  from "../components/moduleSample/filter";
import  {Calendar}  from "../components/moduleSample/calendar.js";
import {Datashow} from "../components/moduleSample/Datashow";
import {FilterTagAdder} from "../components/moduleSample/filterTagAdder";

import AdData from "../data/AdData";
import AdSiteData from "../data/AdSiteData";
import adMediaData from "../data/AdMediaData";

const { Text } = Typography;
const Modules = () => {
  const [adFilter, setAdFilter] = useState([]);
  const [siteFilter, setSiteFilter] = useState([]);
  const [mdFilter, setMdFilter] = useState([]);
  const [dateValue, setDateValue] = useState([`${format(new Date(),"yyyy-MM-dd")} - ${format(new Date(),"yyyy-MM-dd")}`])

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


  const adChange = useCallback((value) => {
    const AdfilteredValue = value.filter((item) => value.includes(item.value)).map((item) => item.name);
      setAdFilter(AdfilteredValue);
  }, []);

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

  return (
    <div style={{backgroundColor:'white', padding:5}}>
      <h2>1.필터</h2>
      <h4>a.상단필터</h4>
      <div style={{ border: "1px solid #e8ecee", padding: "25px" }}>
        <Space size="large">
          <Text strong level={4}>
            분석대상 선택&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Adfilter options={AdData} onValueChange={adChange} />
          <AdSitefilter options={AdSiteData} onValueChange={adsiteChange} />
          <Mdfilter options={adMediaData} onValueChange={mdChange} />
          <Datashow />
          <Calendar/>
          <Text strong level={4}>
            기간 선택&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Calendar />
        </Space>
      </div>
      <Space size="large">

      </Space>
      <h4>b.우측 패널 필터</h4>
      <div style={{ border: "1px solid", padding: "16px" }}>
          <FilterTagAdder />
        </div>
      <h2>2.스코어카드</h2>
      <h4>A.숫자형</h4>
      <ScoreCard/>
      <h4>b.차트형</h4>
      <ScoreCardChart/>
      <h2>3.데이터그리드</h2>
      <h4>A.Type1</h4>
      <Type1/>
      <h4>B.Type2</h4>
      <Type2/>
      <h4>C.Type3</h4>
      <Type3/>
      <h2>4.차트</h2>
      <h4>A.라인차트</h4>
      <LineChart colors={colors}/>
      <h4>B.파이차트</h4>
      <PieChart colors={colors}/>
      <h4>C.바차트</h4>
      <BarChart colors={colors}/>
      <h4>D.바차트 + 라인차트(Dynamic Chart)</h4>
      <DynamicChart colors={colors}/>
    </div>
  );
};
export default Modules;
