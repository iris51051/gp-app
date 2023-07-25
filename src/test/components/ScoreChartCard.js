import React,{ useState, useEffect } from "react";
import {Space, Radio } from "antd";
import ECharts from "echarts-for-react";
import {
  CaretUpOutlined,
  CaretDownOutlined
} from "@ant-design/icons";

const ScoreCardChart = ({colors,collapsed, datas}) => {


  //byData

    //총합
    const [totalMCost, settotalMCost] =useState(0); //총광고비
    const [totalMRvn, setTotalMRvn] =useState(0);   //총매출액
    const [totalMImpr, setTotalMImpr] = useState(0);  //총노출수
    const [totalMClick, setTotalMClick] = useState(0);  //총클릭수
    const [totalMConv, setTotalMConv] = useState(0);    //총 전환수

    //평균
    const [AVGCPC, setAVGCPC] = useState(0);


    //데이터 Array
    const [MrvnArr,setMrvnArr ]=useState([]);//총매출액
    const [MCostArr,setMCostArr ]=useState([]);//총광고비
    const [MImprArr,setMImprArr ]=useState([]);//총노출수
    const [MClickArr,setMClickArr ]=useState([]);//총클릭수
    const [MCTRArr,setMCTRArr ]=useState([]);//CTR
    const [MCPCArr,setMCPCArr ]=useState([]);//CPC
    const [MROASArr,setMROASArr ]=useState([]);//ROAS
    const [MConvArr,setMConvArr ]=useState([]);//총전환수
    const [AVGMconvArr, setAVGMconvArr ]=useState([]);//총전환율
    
  useEffect(()=>{

    //bydata
    let MRvnsum=0;
    let MCostsum =0;
    let MImprsum =0;
    let MClicksum =0;
    let MCPCsum =0;
    let MConvsum =0;

    //statdata
    let SMRvnsum=0;
    let SMCostsum =0;
    let SMImprsum =0;
    let SMClicksum =0;
    let SMCPCsum =0;
    let SMConvsum =0;

    if(datas.length>0){

      //bydata
      for(const item of datas[0] ){
        if('m_rvn' in item) {
          const value =item.m_rvn
          MRvnsum +=value;
        }
        if('m_cost' in item){
          MCostsum+=item.m_cost;
        }
        if('m_impr' in item){        
          MImprsum+=item.m_impr;
        }
        if('m_click' in item){        
          MClicksum+=item.m_click;
        }
        if('m_cpc' in item){
          MCPCsum+=item.m_cpc;
        }
        if('m_conv' in item){
          MConvsum +=item.m_conv;
        }
      }
      //statData
      for(const item of datas[1] ){
        if('m_rvn' in item) {
          const value =item.m_rvn
          MRvnsum +=value;
        }
        if('m_cost' in item){
          MCostsum+=item.m_cost;
        }
        if('m_impr' in item){        
          MImprsum+=item.m_impr;
        }
        if('m_click' in item){        
          MClicksum+=item.m_click;
        }
        if('m_cpc' in item){
          MCPCsum+=item.m_cpc;
        }
        if('m_conv' in item){
          MConvsum +=item.m_conv;
        }
      }



      setMrvnArr(datas[0].map(item => item.m_rvn));
      setMCostArr(datas[0].map(item => item.m_cost));
      setMImprArr(datas[0].map(item => item.m_impr));
      setMClickArr(datas[0].map(item => item.m_click));
      setMCTRArr(datas[0].map(item => parseFloat((item.m_ctr * 100).toFixed(2))));
      setMCPCArr(datas[0].map(item => parseFloat((item.m_cpc).toFixed(0))));
      setMROASArr(datas[0].map(item => parseFloat((item.m_roas*100).toFixed(0))));
      setMConvArr(datas[0].map(item => item.m_conv));
      setAVGMconvArr(datas[0].map(item => item.m_crt));

      setTotalMRvn(parseInt((MRvnsum).toFixed(0)));
      settotalMCost(parseInt((MCostsum).toFixed(0)))
      setTotalMImpr(parseInt((MImprsum).toFixed(0)))
      setTotalMClick(parseInt((MClicksum).toFixed(0)))
      setTotalMConv((MConvsum))


      setAVGCPC(parseInt((MCPCsum/datas[0].map(item => item.m_cpc).length).toFixed(0))) 
    }
  },[datas])
  
  const score= [
    {
      key: 1,
      title: "CTR",
      value: (totalMClick / totalMImpr * 100).toFixed(2),
      unit: "%",
      percent: 100,
      data: MCTRArr,
    },
    {
      key: 2,
      title: "총 광고비",
      value: totalMCost,
      unit: "원",
      percent: 100,
      data: MCostArr,
    },
    {
      key: 3,
      title: "총 매출액",
      value : totalMRvn,
      unit: "원",
      percent: -2,
      data: MrvnArr,
    },
    {
      key: 4,
      title: "ROAS",
      value: (totalMRvn/totalMCost*100).toFixed(2),
      unit: "%",
      percent: 100,
      data: MROASArr,
    },
    {
      key: 5,
      title: "총 노출수",
      value: totalMImpr,
      unit: "",
      percent: 40,
      data: MImprArr,
    },
    {
      key: 6,
      title: "총 클릭수",
      value: totalMClick,
      unit: "",
      percent: 100,
      data: MClickArr,
    },
    
    {
      key: 7,
      title: "CPC",
      value: (totalMCost/totalMClick).toFixed(0),
      unit: "원",
      percent: 30,
      data: MCPCArr,
    },
    {
      key: 8,
      title: "총 전환수",
      value: totalMConv,
      unit: "",
      percent: 100,
      data: MConvArr,
    },
    {
      key: 9,
      title: "전환율",
      value: (totalMConv/totalMClick*100).toFixed(2),
      unit: "%",
      percent: 100,
      data: AVGMconvArr,
    },
    {
      key: 10,
      title: "평균 노출수",
      value: (totalMImpr/MImprArr.length).toFixed(0),
      unit: "",
      percent: 10,
      data : "",
    },
    {
      key: 11,
      title: "평균 클릭 수",
      value: (totalMClick/MClickArr.length).toFixed(0),
      unit: "",
      percent: -20,
      data: "",
    },

    {
      key: 12,
      title: "평균 CPC",
      value: AVGCPC,
      unit: "원",
      percent: 30,
      data: "",
    },
    {
      key: 13,
      title: "평균 광고비",
      value: (totalMCost/MCostArr.length).toFixed(0),
      unit: "원",
      percent: 100,
      data: "",
    },
    {
      key: 14,
      title: "평균 전환수",
      value: (totalMConv/MConvArr.length).toFixed(0),
      unit: "",
      percent: 100,
      data: '',
    },
    {
      key: 15,
      title: "평균 매출액",
      value: (totalMRvn/MrvnArr.length).toFixed(0),
      unit: "원",
      percent: 100,
      data: '',
    },

  ];
  const [updatedScore, setUpdatedScore] = useState(score);
  const defaultCheckedKeys = [1,2,3,4];
  const [chartCardList, setChartCardList] = useState(defaultCheckedKeys);


  const HandleChangeValue = (checkedValues) => {
    const newValue = score.find((item)=> item.title ===checkedValues).key
    if(defaultCheckedKeys.includes(newValue)){
    }else if (chartCardList.includes(newValue)) {
      setChartCardList(chartCardList.filter((value) => value !== newValue));
    } else {
      setChartCardList([...chartCardList, newValue]);
    }
  };


  const ScoreCardSelector = {
    display : collapsed ? "none" : "flex",
    paddingLeft : collapsed ? "0px" : "20px",
    paddingRight : collapsed ? "0px" : "20px",
    alignItems: "center",
    width : '100%',
  };

  const renderAreaLineChart =(item)=>{
    if(item.data.length >1){
      return <AreaLineChart datas={item.data}/>
    }
  }

  return (
    <>
        <div className="ScoreCardSelector"
          style={ScoreCardSelector}
          >
          <div className="ScoreSelectorDiv">
            <table className="ScoreCardSelectorTable">
              <tr>
                <th style={{width:'10%'}}>지표 항목 선택</th>
                <td>
                {score.map((item) => (
                    <Radio.Button
                      key={item.key}
                      value={item.title}
                      checked={chartCardList.includes(item.key)}
                      onClick={(e) => HandleChangeValue(e.target.value)}
                      style={{ userSelect: 'none' }}
                    >
                      {item.title}
                    </Radio.Button>
                  ))}
                </td>
              </tr>
            </table>
          </div>
        </div>
    <div className="ScoreChartDiv">
      {score
        .filter((item) => chartCardList.includes(item.key))
        .map((item) => (
          <Space.Compact
            key={item.key}
            className="ScoreChartCard"
            direction="vertical"
          >
            <div className="ScoreCardContainer">
            <h3 className="ScoreChartTitle">{item.title}</h3>
            <div className="ScoreChartValueDiv">
              <span className="ScoreChartValue">
              { !isNaN(item.value) && item.value > 0
                ? Intl.NumberFormat('en-KR').format(item.value)
                : '0'}
                </span>
              <span className="ScoreChartUnit"> {item.unit}</span>
            </div>
            <div className="ScoreChartPercent">
              ({Intl.NumberFormat('ko-KR').format(item.percent)}%
              {item.percent > 0 ? (
                <CaretUpOutlined className="ArrowUp" />
              ) : (
                <CaretDownOutlined className="ArrowDown" />
              )}
              )
            </div>
            <div>
              {/* <AreaLineChart datas={item.data} /> */}
              {renderAreaLineChart(item)}
            </div>
            </div>
          </Space.Compact>
        ))}
    </div>
    </>
  );
};

const AreaLineChart = ({ datas }) => {
  const [data, setData]= useState(datas);
  useEffect(() => {
    const updataData = datas;
      setData(updataData);
  },[datas])
  const minValues = [];
  const minValue = Math.min(...data);
  const maxValues = [];
  const maxValue = Math.max(...data);
  data.forEach((value, index) => {
    if (value === minValue) {
      minValues.push(index);
    }
    if (value === maxValue) {
      maxValues.push(index);
    }
  });
  
  console.log("datas~~~~~~~~~",datas)
  const options = {
    tooltip: {
      backgroundColor: "#636465",
      textStyle: {
        color: "white",
      },
      trigger: "axis",
      formatter: function (datas) {
        var tooltipContent = "";
        datas.forEach(function (data) {
          var color = "#30c7e9";
          var value = Intl.NumberFormat('ko-KR').format(data.value);
          tooltipContent +=
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:' +
            color +
            ';"></span>';
          tooltipContent += value;
        }
      );
        return tooltipContent;
      },
    },

    grid: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
      min: minValue,
    },
    series: [
      {
        data: data,
        type: "line",
        areaStyle: {
          color: "rgba(65,128,236,0.2)",
        },
        color: "rgba(65,128,236,0.5)",
        symbol: "circle",
        symbolSize: 3,
        markPoint: {
          symbol: "circle",
          symbolSize: 3.5,
          label: {
            show: false,
          },
          data: [
            ...maxValues.map((index) => ({
              type: "max",
              name: "max",
              itemStyle: { color: "green" },
              coord: [index, maxValue],
            })),
            ...minValues.map((index) => ({
              type: "min",
              name: "min",
              itemStyle: { color: "orange" },
              symbolSize: 4,
              coord: [minValues[0], minValue],
            })),
            ...minValues.map((index) => ({
              type: "min",
              name: "min",
              itemStyle: { color: "orange" },
              symbolSize: 4,
              coord: [minValues[minValues.length - 1], minValue],
            })),
          ],
        },
      },
    ],
  };

  return (
    <div className="AreaChart">
      <ECharts
        option={options}
        style={{ height: "50px", width: "auto" }}
      />
    </div>
  );
};
const ScoreCardChartComp = ({collapsed, datas}) => {

  const color = [
    "#c23531",
    "#2f4554",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#6e7074",
    "#546570",
    "#c4ccd3",
  ];
  return (
    <>
      <div style={{ padding: 5, height: "auto" }}>
        <div>
          <ScoreCardChart colors={color} collapsed={collapsed} datas={datas}/>
        </div>
      </div>
    </>
  );
};

export default ScoreCardChartComp;
