import React, { useState, useEffect } from "react";
import { Space, Typography, Row,Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import Calendar from "../../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../../components/filter.js";
import AdPerformance from "../../components/ADPerfomance";
import ScoreCardChartComp from "../../components/ScoreChartCard";
import MultipleBarChart from "../../components/MuiltiBarChart";
import AdResultTable from "../../components/AdResultTable";
const { Text } = Typography;

const MainTab1 = () => {
  const dispop = 10;
  const [adList, setAdList] = useState([]);
  const [adsiteList, setAdStieList] = useState([]);
  const [mdList, setMdList] = useState([]);
  
  const [filterOptions, setFilterOptions] = useState([]);

  //모든 필터 선택된 상태로 초기 로딩.
  useEffect(() => {
    
    setFilterOptions([adoptions.map((item)=>item.value), adsiteoptions.map((item)=>item.value), mdoptions.map((item)=>item.value)]);
  }, []);

  // 광고주 선택 옵션
  const adoptions = [
    { label: "광고비 없음", value: "광고비 없음", children: [
      { name: "매출액",value :  230000}
    ]},
    { label: "매출액 없음", value: "매출액 없음", children: [
      { name: "광고비",value :  230000}
    ]},
    { label: "둘 다 없음", value: "둘 다 없음" },
    { label: "롯데푸드몰-PeopleDB", value: "롯데푸드몰-PeopleDB",children: [
      { name: "총 광고비", value : 130000},
      { name: "매출액",value :  230000}
    ]},
    { label: "모바일미샤", value: "모바일미샤",children: [
      { name: "총 광고비", value : 100000},
      { name: "매출액",value : 210000 }
    ]},
    { label: "비즈스프링_대행사", value: "비즈스프링_대행사",children: [
      { name: "총 광고비", value : 100000},
      { name: "매출액",value : 130000 }
    ]},
    { label: "A 비즈스프링", value: "A 비즈스프링",children: [
      { name: "총 광고비", value : 103000},
      { name: "매출액",value : 120000 }
    ]},
    {
      label: "옥경화_네스프레소_광고주 생성",
      value: "옥경화_네스프레소_광고주 생성",children: [
        { name: "총 광고비", value : 200000},
        { name: "매출액",value : 340000 }
      ]},
    { label: "옥경화_라이프하우스", value: "옥경화_라이프하우스",children: [
      { name: "총 광고비", value : 300000},
      { name: "매출액",value : 230000 }
    ]},
    { label: "진실 테스트 220726", value: "진실 테스트 220726" ,children: [
      { name: "총 광고비", value : 180000},
      { name: "매출액",value : 300000 }
    ]},
    { label: "재홍 테스트 230103", value: "재홍 테스트 230103" ,children: [
      { name: "총 광고비", value : 210000},
      { name: "매출액",value : 450000 }
    ]},
    { label: "oniontest", value: "oniontest" ,children: [
      { name: "총 광고비", value : 600000},
      { name: "매출액",value : 1000000 }
    ]},
    { label: "(주)교육지대", value: "(주)교육지대" ,children: [
      { name: "총 광고비", value : 324500},
      { name: "매출액",value : 543000 }
    ]},
    { label: "미샤 에이블씨엔씨", value: "미샤 에이블씨엔씨" ,children: [
      { name: "총 광고비", value : 203000},
      { name: "매출액",value : 452000 }
    ]},
  ];
  console.log("adoptions.value: ",)
  // 광고 사이트 옵션
  const adsiteoptions = [
    { label: "족보닷컴", value: "족보닷컴" },
    { label: "족보닷컴 모바일", value: "족보닷컴 모바일" },
    { label: "에이블샵", value: "에이블샵" },
    { label: "미샤 모바일", value: "미샤 모바일" },
    { label: "족보클라우드", value: "족보클라우드" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
    { label: "비즈스프링_대행사", value: "비즈스프링_대행사" },
    { label: "비즈스프링", value: "비즈스프링" },
    { label: "네스프레소", value: "네스프레소" },
    { label: "lifehouses", value: "lifehouses" },
    { label: "TAM", value: "TAM" },
    { label: "진실 테스트 220726", value: "진실 테스트 220726" },
    { label: "국가대표광고", value: "국가대표광고" },
    { label: "[재홍 테스트 230103]", value: "[재홍 테스트 230103]" },
    { label: "test.com", value: "test.com" },
    { label: "wjyang", value: "wjyang" },
    { label: "biz.com", value: "biz.com" },
    { label: "M롯데푸드몰", value: "M롯데푸드몰" },
  ];
  // 광고매체사 옵션
  const mdoptions = [
    { label: "네이버", value: "네이버" },
    { label: "카카오", value: "카카오" },
    { label: "페이스북", value: "페이스북" },
    { label: "ADN PC", value: "ADN PC" },
    { label: "DABLE", value: "DABLE" },
    { label: "모비온", value: "모비온" },
    { label: "구글", value: "트구글위터" },
    { label: "FACEBOOK", value: "FACEBOOK" },
  ];

  const chartdata = [
    {
      name: "총 노출수",
      value: [600, 501, 210, 580, 950, 707, 100],
    },
    {
      name: "총 클릭수",
      value: [10, 20, 81, 38, 95, 17, 81],
    },
    {
      name: "CTR",
      value: [40, 60, 84, 38, 55, 77, 40],
    },
    {
      name: "CPC",
      value: [50, 30, 24, 18, 35, 47, 60],
    },
  ];

  const adChange = (value) => {
    const AdfilteredValue = value.filter((option) => option !== "selectAll");
    //제거하지 말것 무한 루프에 들어감.
    //useMemo를 사용하면 해결이 가능하지만 코드가 길어짐.
    if (!isEqual(AdfilteredValue, adList)) {
      setAdList(AdfilteredValue);
    }
  };
  const mdChange = (value) => {
    const MdfilteredValue = value.filter((option) => option !== "selectAll");
    //제거하지 말것 무한 루프에 들어감.
    //useMemo를 사용하면 해결이 가능하지만 코드가 길어짐.
    if (!isEqual(MdfilteredValue, mdList)) {
      setMdList(MdfilteredValue);
    }
  };

  const adsiteChange = (value) => {
    const AdSitefilteredValue = value.filter(
      (option) => option !== "selectAll"
    );
    //제거하지 말것 무한 루프에 들어감.
    //useMemo를 사용하면 해결이 가능하지만 코드가 길어짐.
    if (!isEqual(AdSitefilteredValue, adsiteList)) {
      setAdStieList(AdSitefilteredValue);
    }
  };
  const updateFilter =()=>{
    setFilterOptions([adList, adsiteList,mdList ]);
  }
  console.log("filterOptionssssssssss",filterOptions[0])
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Calendar />
      </div>
      <div style={{ border: "1px solid #e8ecee", padding: "25px" }}>
        <Space size="large">
          <Text strong level={4}>
            분석대상 선택&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>

          <Adfilter options={adoptions} onValueChange={adChange} />
          <AdSitefilter options={adsiteoptions} onValueChange={adsiteChange} />
          <Mdfilter options={mdoptions} onValueChange={mdChange} />
          <Button type="primary" onClick={updateFilter}>확인</Button>
        </Space>
      </div>
      <div>
        
        <br />
        <h4 className="selected-analysis-targer">선택한 분석 대상</h4>
        <div className="selected-analysis-targer-div">
          <span className="selected-analysis-targer-span">광고사 </span>
          {adList.length <= dispop ? (
            <p className="selected-analysis-targer-p">{adList.join(", ")}</p>
          ) : (
            <>
              <p className="selected-analysis-targer-p">{`${adList.slice(0, dispop).join(" / ")} 외 ${
                adList.length - dispop
              }개`}</p>
            </>
          )}
          <span className="selected-analysis-targer-span">매체사 </span>
          {mdList.length <= dispop ? (
            <p className="selected-analysis-targer-p">{mdList.join(", ")}</p>
          ) : (
            <>
              <p  className="selected-analysis-targer-p">{`${mdList.slice(0, dispop).join(" / ")} 외 ${
                mdList.length - dispop
              }개`}</p>
            </>
          )}
        </div>
        <div className="selectedDateDescription">
          <p>
            <span style={{ fontSize: "20px" }}>• </span>
            <strong>비교기간</strong>은 조회한 날짜를 기준으로, 동일한 직전
            기간입니다.
          </p>
          <p>
            (예시. 조회기간: 2021-11-01~2021-11-07(7일) → 비교기간:
            2021-10-25~2021-10-31(7일))
          </p>
        </div>
      </div>
      <div>
        <ScoreCardChartComp />
      </div>
      <div className="AdPerformancediv">
        <h4>기간별 광고 성과</h4>
        <AdPerformance colors={colors} chartdata={chartdata} style={{ height: 350 }} />
      </div>
      <div className="MultipleBarChartDiv">
        <h4>광고주별 광고 성과</h4>
        <MultipleBarChart colors={colors} adoptions={adoptions} adList={adList}/>
        <AdResultTable/>
      </div>
    </>
  );
};
export default MainTab1;
