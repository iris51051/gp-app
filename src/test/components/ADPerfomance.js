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
  const [selectedBar, setSelectedBar] = useState(["총 노출수"]);
  const [selectedLine, setSelectedLine] = useState(["총 클릭수"]);
  const [options, setOptions] = useState(null);
  //데이터

  const category = [selectedBar[0], selectedLine[0]];

  const handleXDataChange = useCallback(
    (value) => {
      const dates = generateDates(startDate, endDate, value);
      setXData(dates);
    },
    [startDate, endDate]
  );

  const handleLineChange = useCallback(
    (value) => {
      setSelectedLine([value]);
    },
    []
  );

  const handleBarChange = useCallback(
    (value) => {
      setSelectedBar([value]);
    },
    []
  );
  useEffect(() => {
  const updateChartOptions = () => {
    if (chartdata) {
      const barData = chartdata.find((item) => item.name === selectedBar[0]);
      const lineData = chartdata.find((item) => item.name === selectedLine[0]);
      if (barData && lineData) {
        const options = {
          tooltip: {
            trigger: "axis",
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
              name: selectedBar[0],
              position: "left",
              alignTicks: true,
              splitLine :{
                show : false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#333",
                },
              },
              axisTick:{
                show: true,
              },
            },
            {
              type: "value",
              name: selectedLine[0],
              position: "right",
              alignTicks: true,
              splitLine :{
                show : false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#333",
                },
              },
              axisTick:{
                show: true,
              },
            },
          ],
          series: [
            {
              name: selectedBar[0],
              type: "bar",
              barWidth: 20,
              data: barData.value,
              smooth: true,
            },
            {
              name: selectedLine[0],
              type: "line",
              yAxisIndex: 1,
              data: lineData.value,
              symbol: "circle",
              symbolSize: 6,
            },
          ],
        };
          setOptions(options);
          }
        }
      };
  updateChartOptions();
  }, [xdata, colors, selectedBar, selectedLine, chartdata]);

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
                <Radio.Group defaultValue="day" onChange={(e) => handleXDataChange(e.target.value)}>
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
                  onChange={(e) => handleBarChange(e.target.value)}
                >
                  <Radio.Button value="총 노출수" style={selectedBar[0] === '총 노출수' ? { background: colors[0],color:'white' } : {}}disabled={selectedLine[0] === "총 노출수"}>
                  총 노출수</Radio.Button>
                  <Radio.Button value="총 클릭수"  style={selectedBar[0] === '총 클릭수' ? { background: colors[0],color:'white' } : {}}disabled={selectedLine[0] === "총 클릭수"}>
                  총 클릭수</Radio.Button>
                  <Radio.Button value="CTR"  style={selectedBar[0] === 'CTR' ? { background: colors[0],color:'white' } : {}}disabled={selectedLine[0] === "CTR"}>
                  CTR</Radio.Button>
                  <Radio.Button value="CPC" style={selectedBar[0] === 'CPC' ? { background: colors[0],color:'white' } : {} }disabled={selectedLine[0] === "CPC"}>
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
                  onChange={(e) => handleLineChange(e.target.value)}
                >
                  <Radio.Button value="총 노출수" style={selectedLine[0] === '총 노출수' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}} disabled={selectedBar[0] === "총 노출수"}>총 노출수</Radio.Button>
                  <Radio.Button value="총 클릭수" style={selectedLine[0] === '총 클릭수' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}} disabled={selectedBar[0] === "총 클릭수"}>총 클릭수</Radio.Button>
                  <Radio.Button value="CTR" style={selectedLine[0] === 'CTR' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}} disabled={selectedBar[0] === "CTR"}>CTR</Radio.Button>
                  <Radio.Button value="CPC" style={selectedLine[0] === 'CPC' ? { background: colors[1],borderColor:colors[1],color:'white' } : {}} disabled={selectedBar[0] === "CPC"}>CPC</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
          </table>
        </div>
      </div>
      {options && (
      <ECharts style={{ height: 350, width: '90%'}} option={options} notMerge={true} />
      )}
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
