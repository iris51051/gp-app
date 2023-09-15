import React, { useState,useMemo,useEffect } from 'react';
import {Button} from 'antd'
import {
PlusOutlined, 
MinusOutlined,
CaretUpOutlined,
CaretDownOutlined,
RightOutlined,
LeftOutlined
 } from '@ant-design/icons';
 import { useLocation} from "react-router-dom";



export const MdResult =React.memo(({Incomedata})=> {
  const location = useLocation();
  const currentAd = (location.search).split('=')[1]
  const [showingTablePlatform, setShowingTablePlatform] = useState([]);
  const [showingTableProgram, setShowingTableProgram] = useState([]);
  const [itemsPerPage] = useState(10); // 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [DataType, setDataType] = useState('MEDIA')
  console.log('MdResultIncomdata!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',Incomedata)
  const [sortConfig, setSortConfig] = useState({
    key: 'm_impr',
    direction: 'desc',
  });

  const columns = [
    {
      title: '광고매체사',
      dataIndex: 'ad_provider',
      key: 'ad_provider',
      width: '10%',
    },
    {
      title: '광고상품',
      dataIndex: 'ad_program',
      key: 'ad_program',
      width: '10%',
    },
    {
      title: '노출수',
      dataIndex: 'm_impr',
      key: 'm_impr',
      width: '8%',
    },
    {
      title: '클릭수',
      dataIndex: 'm_click',
      key: 'm_click',
      width: '8%',
    },
    {
      title: 'CTR',
      dataIndex: 'm_ctr',
      key: 'm_ctr',
      width: '8%',
    },
    {
      title: 'CPC',
      dataIndex: 'm_cpc',
      key: 'm_cpc',
      width: '8%',
    },
    {
      title: '총 광고비',
      dataIndex: 'm_cost',
      key: 'm_cost',
      width: '9%',
    },
  ];
  const TableData = [];
  // 테이블 테스트용 더미 데이터
  // Incomdata가 없을 때만 보여짐.
  // =>현재는 전체 광고주에 대한 API가 없어서 전체광고주 선택시 보여짐.
  if(Incomedata.length===0&&currentAd==='0'){
    const data = [
      {
        "ad_program": "test1",
        "ad_provider": "test",
        "land": 0,
        "rgr": 0,
        "odr": 0,
        "rvn": 0,
        "m_cost": 2598981,
        "m_impr": 1082246,
        "m_click": 173796,
        "m_conv": 2721,
        "m_rgr": 166,
        "m_odr": 0,
        "m_cart": 0,
        "m_rvn": 415283767.8,
        "m_ctr": 0.16058825812246014,
        "m_cpc": 14.954204929917836,
        "m_crt": 0.01565628668093627,
        "m_roas": 159.78715034854045,
        "rvn_per_odr": 0,
        "rgr_per_m_click": 0,
        "odr_per_m_cost": 0,
        "roas": 0
    },
    {
      "ad_program": "test2",
      "ad_provider": "test",
      "land": 0,
      "rgr": 0,
      "odr": 0,
      "rvn": 0,
      "m_cost": 2598981,
      "m_impr": 1082246,
      "m_click": 173796,
      "m_conv": 2721,
      "m_rgr": 166,
      "m_odr": 0,
      "m_cart": 0,
      "m_rvn": 415283767.8,
      "m_ctr": 0.16058825812246014,
      "m_cpc": 14.954204929917836,
      "m_crt": 0.01565628668093627,
      "m_roas": 159.78715034854045,
      "rvn_per_odr": 0,
      "rgr_per_m_click": 0,
      "odr_per_m_cost": 0,
      "roas": 0
  },
  {
    "ad_program": "test3",
    "ad_provider": "test",
    "land": 0,
    "rgr": 0,
    "odr": 0,
    "rvn": 0,
    "m_cost": 2598981,
    "m_impr": 1082246,
    "m_click": 173796,
    "m_conv": 2721,
    "m_rgr": 166,
    "m_odr": 0,
    "m_cart": 0,
    "m_rvn": 415283767.8,
    "m_ctr": 0.16058825812246014,
    "m_cpc": 14.954204929917836,
    "m_crt": 0.01565628668093627,
    "m_roas": 159.78715034854045,
    "rvn_per_odr": 0,
    "rgr_per_m_click": 0,
    "odr_per_m_cost": 0,
    "roas": 0
},
      {
        "ad_program": "test1",
        "ad_provider": "test1",
        "land": 0,
        "rgr": 0,
        "odr": 0,
        "rvn": 0,
        "m_cost": 2598981,
        "m_impr": 1082246,
        "m_click": 173796,
        "m_conv": 2721,
        "m_rgr": 166,
        "m_odr": 0,
        "m_cart": 0,
        "m_rvn": 415283767.8,
        "m_ctr": 0.16058825812246014,
        "m_cpc": 14.954204929917836,
        "m_crt": 0.01565628668093627,
        "m_roas": 159.78715034854045,
        "rvn_per_odr": 0,
        "rgr_per_m_click": 0,
        "odr_per_m_cost": 0,
        "roas": 0
    },
    {
      "ad_program": "test2",
      "ad_provider": "test1",
      "land": 0,
      "rgr": 0,
      "odr": 0,
      "rvn": 0,
      "m_cost": 2598981,
      "m_impr": 1082246,
      "m_click": 173796,
      "m_conv": 2721,
      "m_rgr": 166,
      "m_odr": 0,
      "m_cart": 0,
      "m_rvn": 415283767.8,
      "m_ctr": 0.16058825812246014,
      "m_cpc": 14.954204929917836,
      "m_crt": 0.01565628668093627,
      "m_roas": 159.78715034854045,
      "rvn_per_odr": 0,
      "rgr_per_m_click": 0,
      "odr_per_m_cost": 0,
      "roas": 0
  },
  {
    "ad_program": "test3",
    "ad_provider": "test1",
    "land": 0,
    "rgr": 0,
    "odr": 0,
    "rvn": 0,
    "m_cost": 2598981,
    "m_impr": 1082246,
    "m_click": 173796,
    "m_conv": 2721,
    "m_rgr": 166,
    "m_odr": 0,
    "m_cart": 0,
    "m_rvn": 415283767.8,
    "m_ctr": 0.16058825812246014,
    "m_cpc": 14.954204929917836,
    "m_crt": 0.01565628668093627,
    "m_roas": 159.78715034854045,
    "rvn_per_odr": 0,
    "rgr_per_m_click": 0,
    "odr_per_m_cost": 0,
    "roas": 0
},
      {
        "ad_program": "dummy",
        "ad_provider": "dummy",
        "land": 0,
        "rgr": 0,
        "odr": 0,
        "rvn": 0,
        "m_cost": 2598981,
        "m_impr": 1082246,
        "m_click": 173796,
        "m_conv": 2721,
        "m_rgr": 166,
        "m_odr": 0,
        "m_cart": 0,
        "m_rvn": 415283767.8,
        "m_ctr": 0.16058825812246014,
        "m_cpc": 14.954204929917836,
        "m_crt": 0.01565628668093627,
        "m_roas": 159.78715034854045,
        "rvn_per_odr": 0,
        "rgr_per_m_click": 0,
        "odr_per_m_cost": 0,
        "roas": 0
    },
    {
      "ad_program": "dummy1",
      "ad_provider": "dummy1",
      "land": 0,
      "rgr": 0,
      "odr": 0,
      "rvn": 0,
      "m_cost": 2598981,
      "m_impr": 1082246,
      "m_click": 173796,
      "m_conv": 2721,
      "m_rgr": 166,
      "m_odr": 0,
      "m_cart": 0,
      "m_rvn": 415283767.8,
      "m_ctr": 0.16058825812246014,
      "m_cpc": 14.954204929917836,
      "m_crt": 0.01565628668093627,
      "m_roas": 159.78715034854045,
      "rvn_per_odr": 0,
      "rgr_per_m_click": 0,
      "odr_per_m_cost": 0,
      "roas": 0
  },
  {
    "ad_program": "dummy2",
    "ad_provider": "dummy2",
    "land": 0,
    "rgr": 0,
    "odr": 0,
    "rvn": 0,
    "m_cost": 2598981,
    "m_impr": 1082246,
    "m_click": 173796,
    "m_conv": 2721,
    "m_rgr": 166,
    "m_odr": 0,
    "m_cart": 0,
    "m_rvn": 415283767.8,
    "m_ctr": 0.16058825812246014,
    "m_cpc": 14.954204929917836,
    "m_crt": 0.01565628668093627,
    "m_roas": 159.78715034854045,
    "rvn_per_odr": 0,
    "rgr_per_m_click": 0,
    "odr_per_m_cost": 0,
    "roas": 0
},
  {
    "ad_program": "dummy3",
    "ad_provider": "dummy3",
    "land": 0,
    "rgr": 0,
    "odr": 0,
    "rvn": 0,
    "m_cost": 2598981,
    "m_impr": 1082246,
    "m_click": 173796,
    "m_conv": 2721,
    "m_rgr": 166,
    "m_odr": 0,
    "m_cart": 0,
    "m_rvn": 415283767.8,
    "m_ctr": 0.16058825812246014,
    "m_cpc": 14.954204929917836,
    "m_crt": 0.01565628668093627,
    "m_roas": 159.78715034854045,
    "rvn_per_odr": 0,
    "rgr_per_m_click": 0,
    "odr_per_m_cost": 0,
    "roas": 0
},
  {
    "ad_program": "dummy4",
    "ad_provider": "dummy4",
    "land": 0,
    "rgr": 0,
    "odr": 0,
    "rvn": 0,
    "m_cost": 2598981,
    "m_impr": 1082246,
    "m_click": 173796,
    "m_conv": 2721,
    "m_rgr": 166,
    "m_odr": 0,
    "m_cart": 0,
    "m_rvn": 415283767.8,
    "m_ctr": 0.16058825812246014,
    "m_cpc": 14.954204929917836,
    "m_crt": 0.01565628668093627,
    "m_roas": 159.78715034854045,
    "rvn_per_odr": 0,
    "rgr_per_m_click": 0,
    "odr_per_m_cost": 0,
    "roas": 0
},
      {
          "ad_program": "ADN PC",
          "ad_provider": "ADN PC",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 2598981,
          "m_impr": 1082246,
          "m_click": 173796,
          "m_conv": 2721,
          "m_rgr": 166,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 415283767.8,
          "m_ctr": 0.16058825812246014,
          "m_cpc": 14.954204929917836,
          "m_crt": 0.01565628668093627,
          "m_roas": 159.78715034854045,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
        "ad_program": "ADN PC1",
        "ad_provider": "ADN PC",
        "land": 0,
        "rgr": 0,
        "odr": 0,
        "rvn": 0,
        "m_cost": 10000000,
        "m_impr": 10101010,
        "m_click": 1123456,
        "m_conv": 12345,
        "m_rgr": 124,
        "m_odr": 0,
        "m_cart": 0,
        "m_rvn": 789745645,
        "m_ctr": 0.16058825812246014,
        "m_cpc": 14.954204929917836,
        "m_crt": 0.01565628668093627,
        "m_roas": 159.78715034854045,
        "rvn_per_odr": 0,
        "rgr_per_m_click": 0,
        "odr_per_m_cost": 0,
        "roas": 0
    },
      {
          "ad_program": "카울리",
          "ad_provider": "CAULY",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 1650,
          "m_impr": 150,
          "m_click": 15,
          "m_conv": 3,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 880,
          "m_ctr": 0.1,
          "m_cpc": 110,
          "m_crt": 0.2,
          "m_roas": 0.5333333333333333,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
        "ad_program": "카울리2",
        "ad_provider": "CAULY",
        "land": 0,
        "rgr": 0,
        "odr": 0,
        "rvn": 0,
        "m_cost": 1650,
        "m_impr": 150,
        "m_click": 15,
        "m_conv": 3,
        "m_rgr": 0,
        "m_odr": 0,
        "m_cart": 0,
        "m_rvn": 880,
        "m_ctr": 0.1,
        "m_cpc": 110,
        "m_crt": 0.2,
        "m_roas": 0.5333333333333333,
        "rvn_per_odr": 0,
        "rgr_per_m_click": 0,
        "odr_per_m_cost": 0,
        "roas": 0
    },
      {
          "ad_program": "데이블",
          "ad_provider": "DABLE",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 26768523.1,
          "m_impr": 127423353,
          "m_click": 79440,
          "m_conv": 2669,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0.0006234336024731668,
          "m_cpc": 336.9652958207452,
          "m_crt": 0.03359768378650554,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "데이블1",
          "ad_provider": "DABLE1",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 26768523.1,
          "m_impr": 127423353,
          "m_click": 79440,
          "m_conv": 2669,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0.0006234336024731668,
          "m_cpc": 336.9652958207452,
          "m_crt": 0.03359768378650554,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "페이스북",
          "ad_provider": "FACEBOOK",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 165947.1,
          "m_impr": 43353,
          "m_click": 258,
          "m_conv": 0,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0.005951145249463705,
          "m_cpc": 643.2058139534884,
          "m_crt": 0,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "검색광고",
          "ad_provider": "구글",
          "land": 3088,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 2981167.2,
          "m_impr": 640188,
          "m_click": 9067,
          "m_conv": 5593,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 6507600,
          "m_ctr": 0.014163027110786207,
          "m_cpc": 328.79311790007716,
          "m_crt": 0.6168523216058233,
          "m_roas": 2.182903394348361,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "검색광고11",
          "ad_provider": "구글11",
          "land": 3088,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 2981167.2,
          "m_impr": 640188,
          "m_click": 9067,
          "m_conv": 5593,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 6507600,
          "m_ctr": 0.014163027110786207,
          "m_cpc": 328.79311790007716,
          "m_crt": 0.6168523216058233,
          "m_roas": 2.182903394348361,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "디스플레이",
          "ad_provider": "구글",
          "land": 3754,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 0,
          "m_impr": 0,
          "m_click": 0,
          "m_conv": 0,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0,
          "m_cpc": 0,
          "m_crt": 0,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "파트너 검색광고",
          "ad_provider": "구글",
          "land": 57,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 24550.9,
          "m_impr": 16005,
          "m_click": 155,
          "m_conv": 131,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 144100,
          "m_ctr": 0.009684473601999375,
          "m_cpc": 158.39290322580646,
          "m_crt": 0.8451612903225807,
          "m_roas": 5.869438594919127,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "GFA",
          "ad_provider": "네이버",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 24850447.6,
          "m_impr": 11632316,
          "m_click": 27706,
          "m_conv": 275,
          "m_rgr": 0,
          "m_odr": 110,
          "m_cart": 0,
          "m_rvn": 3255318,
          "m_ctr": 0.0023818128737217938,
          "m_cpc": 896.9337905146899,
          "m_crt": 0.009925647874106693,
          "m_roas": 0.1309963527578473,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "브랜드검색",
          "ad_provider": "네이버",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 0,
          "m_impr": 592726,
          "m_click": 214319,
          "m_conv": 0,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0.36158191137220236,
          "m_cpc": 0,
          "m_crt": 0,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "파워링크",
          "ad_provider": "네이버",
          "land": 3076,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 2068785807,
          "m_impr": 62047071,
          "m_click": 276062,
          "m_conv": 1140,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0.004449235000955968,
          "m_cpc": 7493.917333787337,
          "m_crt": 0.004129507139700502,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "클릭광고",
          "ad_provider": "롯데온",
          "land": 0,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 190520,
          "m_impr": 10300,
          "m_click": 64,
          "m_conv": 32,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 411950,
          "m_ctr": 0.006213592233009709,
          "m_cpc": 2976.875,
          "m_crt": 0.5,
          "m_roas": 2.162240184757506,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "키워드광고",
          "ad_provider": "카카오",
          "land": 202,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 347039,
          "m_impr": 222753,
          "m_click": 417,
          "m_conv": 235,
          "m_rgr": 2,
          "m_odr": 233,
          "m_cart": 0,
          "m_rvn": 128150,
          "m_ctr": 0.0018720286595466727,
          "m_cpc": 832.2278177458035,
          "m_crt": 0.5635491606714629,
          "m_roas": 0.36926685473390597,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      },
      {
          "ad_program": "페이스북",
          "ad_provider": "페이스북",
          "land": 14,
          "rgr": 0,
          "odr": 0,
          "rvn": 0,
          "m_cost": 95397.5,
          "m_impr": 16038,
          "m_click": 115,
          "m_conv": 0,
          "m_rgr": 0,
          "m_odr": 0,
          "m_cart": 0,
          "m_rvn": 0,
          "m_ctr": 0.007170470133433096,
          "m_cpc": 829.5434782608696,
          "m_crt": 0,
          "m_roas": 0,
          "rvn_per_odr": 0,
          "rgr_per_m_click": 0,
          "odr_per_m_cost": 0,
          "roas": 0
      }
  ]
  for (const item of data) {
    const ad_provider = item.ad_provider;
    const ad_program = item.ad_program;
    const ad_data = { ...item }; // Copy all properties from the current item
    delete ad_data.ad_provider; // Remove ad_provider property
    delete ad_data.ad_program;   // Remove ad_program property

    let providerEntry = TableData.find(entry => entry.ad_provider === ad_provider);

    if (!providerEntry) {
        providerEntry = {
            key: TableData.length + 1 || 1,
            ad_provider: ad_provider,
            children: []
        };
        TableData.push(providerEntry);
    }

    let programEntry = providerEntry.children.find(entry => entry.ad_program === ad_program);

    if (!programEntry) {
        const programKey = `${providerEntry.key}-${providerEntry.children.length + 1}`;
        programEntry = {
            key: programKey,
            ad_program: ad_program,
            ...ad_data,
        };
        providerEntry.children.push(programEntry);
    }
}
  }

  for (const item of Incomedata) {
      const ad_provider = item.ad_provider;
      const ad_program = item.ad_program;
      const ad_data = { ...item }; // Copy all properties from the current item
      delete ad_data.ad_provider; // Remove ad_provider property
      delete ad_data.ad_program;   // Remove ad_program property

      let providerEntry = TableData.find(entry => entry.ad_provider === ad_provider);

      if (!providerEntry) {
          providerEntry = {
              key: TableData.length + 1 || 1,
              ad_provider: ad_provider,
              children: []
          };
          TableData.push(providerEntry);
      }

      let programEntry = providerEntry.children.find(entry => entry.ad_program === ad_program);

      if (!programEntry) {
          const programKey = `${providerEntry.key}-${providerEntry.children.length + 1}`;
          programEntry = {
              key: programKey,
              ad_program: ad_program,
              ...ad_data,
          };
          providerEntry.children.push(programEntry);
      }
  }

  const totalPages = Math.ceil(TableData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
// 광고매체사별 존재하는 광고상품의 데이터를 각 항목별로 합산하여 광고매체사에 추가
  TableData.forEach(providerEntry => {
    let platformSum = {};
    providerEntry.children.forEach(programEntry => {
            for (const prop in programEntry) {
                if (
                    prop !== 'key' &&
                    prop !== 'm_ctr' &&
                    prop !== 'm_cpc' &&
                    prop !== 'm_crt' &&
                    prop !== 'm_roas' &&
                    prop !== 'rvn_per_odr' &&
                    prop !== 'rgr_per_m_click' &&
                    prop !== 'odr_per_m_cost' &&
                    prop !== 'roas'&&
                    prop !== 'ad_program'
                ) {
                  platformSum[prop] = (platformSum[prop] || 0) + programEntry[prop];
                }
            }
            platformSum['m_ctr'] = platformSum['m_impr'] !== 0 ? platformSum['m_click'] / platformSum['m_impr']  : 0;
            platformSum['m_cpc'] = platformSum['m_click'] !== 0 ? platformSum['m_cost'] / platformSum['m_click']  : 0;
            platformSum['m_crt'] = platformSum['m_click'] !== 0 ? platformSum['m_conv'] / platformSum['m_click']  : 0;
            platformSum['m_roas'] = platformSum['m_cost'] !== 0 ? platformSum['m_rvn'] / platformSum['m_cost']  : 0;
            platformSum['rvn_per_odr'] = platformSum['odr'] !== 0 ? platformSum['rvn'] / platformSum['odr']  : 0;
            platformSum['rgr_per_m_click'] = platformSum['m_click'] !== 0 ? platformSum['rgr'] / platformSum['m_click']  : 0;
            platformSum['odr_per_m_cost'] = platformSum['m_cost'] !== 0 ? platformSum['odr'] / platformSum['m_cost']  : 0;
            platformSum['roas'] = platformSum['m_cost'] !== 0 ? platformSum['rvn'] / platformSum['m_cost'] : 0;

            for (const prop in platformSum) {
              providerEntry[prop] = platformSum[prop];
            }
          });

    });
    




  const showTablePlatform = (key) => {
    setShowingTablePlatform((prevShowingPlatform) => {
      if (!prevShowingPlatform.includes(key)) {
        return [...prevShowingPlatform, key];
      } else {
        const mainkey=key.toString()[0]
        setShowingTableProgram((prevShowingProgram) => {
          return prevShowingProgram.filter((item) => item[0] !== mainkey);
        });
        return prevShowingPlatform.filter((item) => item !== key);
      }
    });
  };

  const sortedTableData = [...TableData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (!sortConfig.key){
      return 0;
    } else if(sortConfig.key==='ad_provider'){
      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }else{  
      if (sortConfig.direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = sortedTableData.slice(startIndex, endIndex);

  const sum = itemsToDisplay.reduce(
    (total, current) => {
      total.m_impr += current.m_impr;
      total.m_click += current.m_click;
      total.m_cost += current.m_cost;
      total.m_rvn += current.m_rvn;
      total.m_conv += current.m_conv
      total.rvn += current.rvn
      total.odr += current.odr
      total.rgr += current.rgr
      return total;
    },
    { m_impr: 0, m_click: 0, m_cost: 0, m_rvn: 0, m_conv:0 ,rvn:0,odr:0,rgr:0}
  );

  const calculate = (key) => {
     //sum으로 집계된 데이터에 key값이 있을 경우
    if (sum.hasOwnProperty(key)) {
      if(sum[key]===0){
        return '-'
      }else if (key === 'm_cost' || key === 'm_rvn' ||key ==='rvn') {
        return Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        })
          .format(sum[key])
          .replace('₩', '₩\u00A0');
      }
      return Intl.NumberFormat('ko-KR').format(sum[key]);
      //sum으로 집계된 데이터에 key값이 없을 경우
    } else if (key === 'm_ctr') {
      const res = sum.m_impr!==0?(sum.m_click / sum.m_impr) : 0;
      return res !==0 ? (res * 100).toFixed(2) + '%' : '-';
    } else if (key === 'm_cpc') {
      const res = sum.m_click!==0?sum.m_cost / sum.m_click : 0;
      return res !==0 ? Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
        .format(res)
        .replace('₩', '₩\u00A0') : '-';
    }else if (key === 'm_crt') {
      const res = sum.m_click !==0 ? (sum.m_conv/sum.m_click) : 0;
      return res !==0 ? (res * 100).toFixed(2) + '%' : '-'
    }else if (key === 'm_roas') {
      const res = sum.m_cost !==0 ? (sum.m_rvn/sum.m_cost) : 0;
      return res !==0 ? (res * 100).toFixed(2) + '%' : '-'
    }else if (key === 'roas') {
      const res = sum.m_cost !==0 ? (sum.rvn/sum.m_cost) : 0;
      return res !==0 ? ((res) * 100).toFixed(2) + '%' : '-'
    }else if (key === 'rvn_per_odr') {
      const res = sum.odr !==0 ? (sum.rvn/sum.odr) : 0;
      return res !==0 ? (res * 100).toFixed(2) + '%' : '-'
    }else if (key === 'rgr_per_m_click') {
      const res = sum.m_click !==0 ? (sum.rgr/sum.m_click) : 0;
      return res !==0 ? (res * 100).toFixed(2) + '%' : '-'
    }else if (key === 'odr_per_m_cost') {
      const res = sum.m_cost !==0 ? (sum.odr/sum.m_cost) : 0;
      return res !==0 ? (res * 100).toFixed(2) + '%' : '-'
    }
     else {
      return '';
    }
  };

  const currentPageData = columns.map((column) => {
    if (column.key === 'ad_provider') {
      return '총합계';
    } else {
      return calculate(column.key);
    }
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };
 
  const dataTableRender =(value,index)=>{
   if(index === 'm_ctr' ||  index==='m_roas'|| index==='m_crt' || index==='odr_per_m_cost' || index ==='roas'|| index === 'rgr_per_m_click'){
        return (value*100).toFixed(2)+'%'
    }else if(index ==='m_cost' || index === 'm_rvn' || index==='rvn'){
        return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          })
            .format(value)
            .replace('₩', '₩\u00A0');
    }else if(index === 'm_cpc' || index === 'rvn_per_odr'){
        return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(value)
            .replace('₩', '₩\u00A0');
    }else if (typeof value === 'string') {
        return value
    }else{
        return Intl.NumberFormat('ko-KR').format(value)
    }
  }
  const borderStyle = (key, index) => {
    if (!showingTableProgram.includes(key) && index === 'ad_provider') {
      return '1px solid #e4e7ea';
    }
  };



  return (
    <>
    <div>
        <p>조회된 항목 수: {TableData.map((item)=>item.key).length}</p>
    </div>
      <table className="ProdTable" style={{ border: '1px solid black',fontSize: '12px',  }}>
        <thead>
          <tr>
          {columns.map((item) => (
            <th
                style={{
                width: `${item.width}`, 
                textAlign: 'center' ,
                padding: '10px 8px',
                cursor: !['ad_program'].includes(item.key) ? 'pointer' : 'default',
                }}
                key={item.key}
                onClick={() => {
                if (!['ad_program'].includes(item.key)) {
                    requestSort(item.dataIndex);
                }
                }}
            >
                <span style={{ verticalAlign: 'middle' }}>{item.title}</span>
                {['ad_program'].includes(item.key) ? (
                sortConfig.key === item.dataIndex && (
                    sortConfig.direction === 'asc' ? (
                    <CaretUpOutlined style={{ fontSize: '10px' }} />
                    ) : (
                    <CaretDownOutlined style={{ fontSize: '10px' }} />
                    )
                )
                ) : (
                <div className="arrows-container">
                    {sortConfig.key === item.dataIndex && sortConfig.direction === 'asc' ? (
                    <CaretUpOutlined className='arrow-up' style={{ fontSize: '8px', marginBottom: '-2px', color:'blue'}} />
                    ) : (
                    <CaretUpOutlined className='arrow-up' style={{ fontSize: '8px', marginBottom: '-2px', opacity: 0.3 }} />
                    )}
                    {sortConfig.key === item.dataIndex && sortConfig.direction === 'desc' ? (
                    <CaretDownOutlined className='arrow-down' style={{ fontSize: '8px', color:'blue'}} />
                    ) : (
                    <CaretDownOutlined className='arrow-down' style={{ fontSize: '8px', opacity: 0.3 }} />
                    )}
                </div>
                )}
            </th>
            ))}

          </tr>
        </thead>
        <tbody>
        {itemsToDisplay.map((item) => (
         
          <React.Fragment key={item.key}>
            <tr>
              {columns.map((column) => (
                <td
                  style={{
                    width: `${column.width}`,
                  }}
                  key={column.key}
                  className={column.dataIndex === 'ad_provider' ? 'AdTd' : ''}
                >
                  {column.dataIndex === 'ad_program' ? (
                    !showingTablePlatform.includes(item.key) ? (
                      <PlusOutlined
                        onClick={() => showTablePlatform(item.key)}
                      />
                    ) : (
                      <MinusOutlined
                        onClick={() => showTablePlatform(item.key)}
                      />
                    )
                  ) : 
                  (item[column.dataIndex] === 0 ? '-' : dataTableRender(item[column.dataIndex], column.dataIndex))}
                </td>
              ))}
            </tr>
            {/* 광고 광고상품 데이터 */}
            {showingTablePlatform.includes(item.key) && (
              <>
                {item.children.map((child) => (
                  <React.Fragment key={`${child.key}`}>
                    <tr style={{ backgroundColor: "#f7fafc" }}>
                      {columns.map((column) => (
                        <td
                          style={{
                            width: `${column.width}`,
                            borderBottom: borderStyle(item.key, column.dataIndex),
                          }}
                          className={column.dataIndex === "ad_provider" ? "BlankTd" : ""}
                          key={column.key}
                        >
                          {column.dataIndex === "ad_provider" ? '' : child[column.dataIndex] === 0 ? (
                            "-"
                          ) : (
                            dataTableRender(child[column.dataIndex], column.dataIndex)
                          )}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
              </>
            )}
          </React.Fragment>
        ))}
        <tr className="total">
            {columns.map((column, index) => (
              <td
                className="BottomTd"
                style={{
                  width: `${column.width}`,
                }}
                key={column.key}
              >
                {currentPageData[index]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {pageNumbers!==0 || pageNumbers !== undefined ?
        <div className="pagination" style={{display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div style={{display:'flex', justifyContent:'center', height:'30px'}}>
            <Button
              style={{ border: 'none', background: 'none' }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <LeftOutlined />
            </Button>
              {pageNumbers.map((pageNumber) => (
                <button
                  style={{
                    border: pageNumber === currentPage ? '1px solid #4096ff' : 'none',
                    borderRadius: '10px',
                    background: 'none',
                    boxShadow: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '28px',
                  }}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  <span style={{ color: pageNumber === currentPage ? 'blue' : 'black' }}>{pageNumber}</span>
                </button>
              ))}
              <Button
                style={{ border: 'none', background: 'none', boxShadow: 'none' }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <RightOutlined />
              </Button>
          </div>
        </div>
        : ''
       }            
    </>
  );
});

export default MdResult;