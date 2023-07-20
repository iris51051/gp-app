import * as React from "react";
import { useState } from "react";
import {Space, Radio } from "antd";
import ECharts from "echarts-for-react";
import {
  CaretUpOutlined,
  CaretDownOutlined
} from "@ant-design/icons";

const ScoreCardChart = ({colors,collapsed}) => {

  const score = [
    {
      key: 0,
      title: "총 매출액",
      value: 217554857,
      unit: "원",
      percent: -2,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 1,
      title: "총 노출수",
      value: 123123,
      unit: "회",
      percent: 40,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 2,
      title: "평균 노출수",
      value: 300,
      unit: "회",
      percent: 10,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
    },
    {
      key: 3,
      title: "총 클릭수",
      value: 600,
      unit: "회",
      percent: 100,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 4,
      title: "평균 클릭 수",
      value: 100,
      unit: "회",
      percent: -20,
      data: [0, 95, 100, 275, 300, 140, 190, 200, 0],
    },
    {
      key: 5,
      title: "CTR",
      value: 542,
      unit: "%",
      percent: 100,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
    },

    {
      key: 6,
      title: "평균 CTR",
      value: 120,
      unit: "%",
      percent: 30,
      data: [0, 95, 100, 275, 300, 140, 190, 200, 0],
    },
    {
      key: 7,
      title: "CPC",
      value: 542,
      unit: "%",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },

    {
      key: 8,
      title: "평균 CPC",
      value: 120,
      unit: "%",
      percent: 30,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 9,
      title: "총 광고비",
      value: 3283872,
      unit: "원",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 10,
      title: "평균 광고비",
      value: 3283872,
      unit: "원",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 11,
      title: "ROAS(%)",
      value: 542,
      unit: "%",
      percent: 100,
      data: [0, 175, 211, 270, 234, 280, 130, 100, 0],
    },
    {
      key: 12,
      title: "평균 ROAS(%)",
      value: 542,
      unit: "%",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
  ];

  const defaultCheckedKeys = [0, 5, 9, 11];
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
              <span className="ScoreChartValue">{Intl.NumberFormat('ko-KR').format(item.value)}</span>
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
              <AreaLineChart data={item.data} />
            </div>
            </div>
          </Space.Compact>
        ))}
    </div>
    </>
  );
};
const AreaLineChart = ({ data }) => {
  if (!data) {
    data = [];
  }
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

  const [options] = useState({
    tooltip: {
      backgroundColor: "#636465",
      textStyle: {
        color: "white",
      },
      trigger: "axis",
      formatter: function (params) {
        var tooltipContent = "";
        params.forEach(function (item) {
          var color = "#30c7e9";
          var value = Intl.NumberFormat('ko-KR').format(item.data);
          tooltipContent +=
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:' +
            color +
            ';"></span>';
          tooltipContent += value;
        });
        return tooltipContent;
      },
    },

    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
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
              symbolSize: 6,
              coord: [index, minValue],
            })),
          ],
        },
      },
    ],
  });

  return (
    <div className="AreaChart">
      <ECharts
        option={options}
        style={{ height: "40px", width: "228px" }}
      />
    </div>
  );
};
const ScoreCardChartComp = ({collapsed}) => {

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
          <ScoreCardChart colors={color} collapsed={collapsed}/>
        </div>
      </div>
    </>
  );
};

export default ScoreCardChartComp;
