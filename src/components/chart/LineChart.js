import React, { useEffect, useState } from "react";
import ECharts from "echarts-for-react";
import { Radio } from "antd";



const LineChart = ({ colors, defaultData }) => {
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
  

  
    const [data, setData] = useState(defaultData);
    const [filteredData, setFilteredData] = useState(
      defaultData.filter(
        (item) =>
          item.group === defaultData[0].group && item.name === defaultData[0].name
      )
    );
    const [selectedGroup, setSelectedGroup] = useState(defaultData[0].group);
    const [selectedName, setSelectedName] = useState(defaultData[0].name);
  
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
  
    //group별 필터링
    const handleGroupChange = (e) => {
      setSelectedGroup(e.target.value);
    };

    const [options, setOptions] = useState({});


const [, setDataAverage] = useState([]);

useEffect(() => {
  const calculateAverage = () => {
    const groupedData = {};
    defaultData.forEach((item) => {
      const key = `${item.group}_${item.name}`;
      if (!groupedData[key]) {
        groupedData[key] = { ...item, count: 1 };
      } else {
        groupedData[key].value = groupedData[key].value.map(
          (val, index) => (val + item.value[index])
        );
        groupedData[key].count += 1;
      }
      if (Object.keys(groupedData).length === defaultData.length) {
        Object.values(groupedData).forEach((data, index) => {
          data.value = data.value.map((val) => val / data.count);
        });
      }
      
    });
    const averageData = Object.values(groupedData).map((item) => ({
      ...item,
      groupname: `평균 ${item.groupname}`,
    }));
    setDataAverage(averageData);
  };
  calculateAverage();
}, [defaultData]);

    useEffect(() => {
      const filteredData = defaultData.filter(
        (item) => item.group === selectedGroup && item.name === selectedName
      );
      setFilteredData(filteredData);
    }, [selectedGroup, selectedName]);
  
    useEffect(() => {
      const updateOptions = {
        tooltip: {
          trigger: "axis",
        },
        grid:{
          top:10,
          left:40,
          right:40,
          bottom:60,
        },
        color: colors,
        legend: {
          data: filteredData.map((item) => item.groupname),
          bottom: "bottom",
          icon: "circle",
          itemGap: 25,
        },
        xAxis: {
          type: "category",
          data: xdata,
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          splitLine: {
          lineStyle:{
            type: "dashed",
          }
        },
          axisLine: {
            show: true,

          },
        },
        series: dataSeries(filteredData),
      };
      setOptions(updateOptions);
    }, [xdata, filteredData, data]);
  
    //차트에 데이터값 출력
    const dataSeries = (filteredData) => {
      return filteredData.map((item) => ({
        name: item.groupname,
        type: "line",
        smooth: true,
        data: item.value,
        symbol: "circle",
        symbolSize: 6,
      }));
    };
  
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <div>
            <Radio.Group value={selectedGroup} size='small' onChange={handleGroupChange}>
              <Radio.Button value="매체">매체</Radio.Button>
              <Radio.Button value="갬페인">캠페인</Radio.Button>
              <Radio.Button value="광고그룹">광고그룹</Radio.Button>
              <Radio.Button value="광고유형">광고유형</Radio.Button>
              <Radio.Button value="디바이스">디바이스</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Radio.Group defaultValue="day" onChange={handlexDataChange}>
              <Radio.Button value="day">일</Radio.Button>
              <Radio.Button value="week">주</Radio.Button>
              <Radio.Button value="month">월</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div >
        <ECharts
        style={{height: "450px"}}
            option={options}
            notMerge={true}
        />
        </div>
      </div>
    );
  };

export default LineChart;