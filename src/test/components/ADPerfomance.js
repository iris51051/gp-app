import React, { useEffect, useState, useCallback } from "react";
import { Radio } from "antd";
import ECharts from "echarts-for-react";

const AdPerformanceRange = ({ colors , chartdata}) => {
   //선택된 기간에 대한 x축 data값 생성(일, 주, 월)
  const generateDates = (start, end, interval) => {
    const dates = [];
    const current = new Date(start);
    while (current < end) {
      dates.push(current.toLocaleDateString());
      if (interval === "day") {
        current.setDate(current.getDate() + 1);
      } else if (interval === "week") {
        current.setDate(current.getDate() + 7);
      } else if (interval === "month") {
        current.setMonth(current.getMonth() + 1);
      }
    }
    dates.push(end.toLocaleDateString()); // 마지막 날짜 포함
    return dates;
  };

  const [startDate, setStartDate] = useState(new Date("2023/04/20"));
  const [endDate, setEndDate] = useState(new Date("2023/06/01"));
  const [xdata, setXData] = useState(generateDates(startDate, endDate, "day"));
  const [selectedBar, setSelectedBar] = useState(["총 노출수", "기준지표"]);
  const [selectedLine, setSelectedLine] = useState(["총 클릭수", "비교지표"]);
  //데이터

  console.log("xdata", xdata);
  const category = ["기준지표", "비교지표"];

  const handlexDataChange = (e) => {
    const value = e.target.value;
    if (value === "day") {
      const dates = generateDates(startDate, endDate, "day");
      setXData(dates);
    } else if (value === "week") {
      const dates = generateDates(startDate, endDate, "week");
      setXData(dates);
    } else if (value === "month") {
      const dates = generateDates(startDate, endDate, "month");
      setXData(dates);
    }
  };

  const handleLineChange = (e) => {
    const newValue = e.target.value;
    setSelectedLine([newValue, "기준지표"]);
  };
  const handleBarChange = (e) => {
    const newValue = e.target.value;
    setSelectedBar([newValue, "비교지표"]);
  };

  const [options, setOptions] = useState({
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: 50,
      right: 50,
      top: 10,
      bottom: 50,
    },
    color: colors,
    legend: {
      data: category,
      bottom: "bottom",
      icon: "circle",
      itemGap: 25,
    },
    xAxis: {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: true,
      },
      data: xdata,
    },
    yAxis: [
      {
        type: "value",
        name: category[0],
        position: "right",
        alignTicks: true,
      },
      {
        type: "value",
        name: category[1],
        position: "left",
        alignTicks: true,
      },
    ],
    series: [
      {
        name: category[0],
        type: "bar",
        barWidth: 20,
        data: chartdata.find((item) => item.name === selectedBar[0]).value,
        smooth: true,
      },

      {
        name: category[1],
        type: "line",
        yAxisIndex: 1,
        data: chartdata.find((item) => item.name === selectedLine[0]).value,
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  });

  const updateChartOptions = useCallback(() => {
    const updateOptions = {
      tooltip: {
        trigger: "axis",
      },
      // grid: {
      //   left: 50,
      //   right: 300,
      //   top: 10,
      //   bottom: 50,
      // },
      color: colors,
      legend: {
        data: category,
        bottom: "bottom",
        icon: "circle",
        itemGap: 25,
      },
      xAxis: {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        data: xdata,
      },
      yAxis: [
        {
          type: "value",
          name: category[0],
          position: "left",
          splitLine :{
            show : false,
          },
          axisLine: {
            show: true,
          },
          axisTick:{
            show: true,
          },
        },
        {
          type: "value",
          name: category[1],
          position: "right",
          alignTicks: true,
          axisLine: {
            show: true,
          },
          splitLine :{
            show : false,
          },
        },
      ],
      series: [
        {
          name: category[0],
          type: "bar",
          barWidth: 20,
          data: chartdata.find((item) => item.name === selectedBar[0]).value,
          smooth: true,
        },
        {
          name: category[1],
          type: "line",
          yAxisIndex: 1,
          data: chartdata.find((item) => item.name === selectedLine[0]).value,
          symbol: "circle",
          symbolSize: 6,
        },
      ],
    };
    console.log("selectedBar", selectedBar);
    console.log("selectedLine", selectedLine);
    setOptions(updateOptions);
  }, [xdata, colors, selectedBar, selectedLine]);

  useEffect(() => {
    updateChartOptions();
  }, [updateChartOptions]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <div className="AdPerformanceDiv">
          <table className="AdPerformanceTable">
            <tr>
              <th>Step 01. 기간 범위</th>
              <td>
                <Radio.Group defaultValue="day" onChange={handlexDataChange}>
                  <Radio.Button value="day">일별</Radio.Button>
                  <Radio.Button value="week">주별</Radio.Button>
                  <Radio.Button value="month">월별</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Step 02. 기준 지표</th>
              <td>
                <Radio.Group
                  className="standard"
                  defaultValue="총 노출수"
                  onChange={handleBarChange}
                >
                  <Radio.Button value="총 노출수" style={selectedBar[0] === '총 노출수' ? { background: colors[0],color:'white' } : {}}>
                  총 노출수</Radio.Button>
                  <Radio.Button value="총 클릭수"  style={selectedBar[0] === '총 클릭수' ? { background: colors[0],color:'white' } : {}}>
                  총 클릭수</Radio.Button>
                  <Radio.Button value="CTR"  style={selectedBar[0] === 'CTR' ? { background: colors[0],color:'white' } : {}}>
                  CTR</Radio.Button>
                  <Radio.Button value="CPC" style={selectedBar[0] === 'CPC' ? { background: colors[0],color:'white' } : {}}>
                  CPC</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Step 03. 비교 지표</th>
              <td>
                <Radio.Group
                  className="compare"
                  defaultValue="총 클릭수"
                  onChange={handleLineChange}
                >
                  <Radio.Button value="총 노출수" style={selectedLine[0] === '총 노출수' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}}>총 노출수</Radio.Button>
                  <Radio.Button value="총 클릭수" style={selectedLine[0] === '총 클릭수' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}}>총 클릭수</Radio.Button>
                  <Radio.Button value="CTR" style={selectedLine[0] === 'CTR' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}}>CTR</Radio.Button>
                  <Radio.Button value="CPC" style={selectedLine[0] === 'CPC' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}}>CPC</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <ECharts style={{ height: 350, width: '90%'}} option={options} notMerge={true} />
    </div>
  );
};

const AdPerformance = ({ colors,chartdata }) => {

  return (
    <>
      <AdPerformanceRange colors={colors} chartdata={chartdata} />
    </>
  );
};

export default AdPerformance;
