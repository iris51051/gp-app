import * as React from "react";
import { useState } from "react";
import { Row, Col, Dropdown, Checkbox, Space, Button } from "antd";
import ECharts from "echarts-for-react";
import {
  CaretUpOutlined,
  PlusCircleFilled,
  CloseOutlined,
  CaretDownOutlined
} from "@ant-design/icons";

const ScoreCardChart = (colors) => {
  const score = [
    {
      key: 0,
      title: "총 매출액",
      value: "7,554,857",
      unit: "원",
      percent: -2,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 1,
      title: "총 노출수",
      value: "123123",
      unit: "회",
      percent: 40,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 2,
      title: "평균 노출수",
      value: "300",
      unit: "회",
      percent: 10,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
    },
    {
      key: 3,
      title: "총 클릭수",
      value: "600",
      unit: "회",
      percent: 100,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 4,
      title: "평균 클릭 수",
      value: "100",
      unit: "회",
      percent: -20,
      data: [0, 95, 100, 275, 300, 140, 190, 200, 0],
    },
    {
      key: 5,
      title: "CTR",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
    },

    {
      key: 6,
      title: "평균 CTR",
      value: "120",
      unit: "%",
      percent: 30,
      data: [0, 95, 100, 275, 300, 140, 190, 200, 0],
    },
    {
      key: 7,
      title: "CPC",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },

    {
      key: 8,
      title: "평균 CPC",
      value: "120",
      unit: "%",
      percent: 30,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 9,
      title: "총 광고비",
      value: "3,283,872",
      unit: "원",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 10,
      title: "평균 광고비",
      value: "3,283,872",
      unit: "원",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 11,
      title: "ROAS(%)",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 175, 211, 270, 234, 280, 130, 100, 0],
    },
    {
      key: 12,
      title: "평균 ROAS(%)",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
  ];

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const defaultCheckedKeys = [0, 5, 9, 11];
  const [chartCardList, setChartCardList] = useState(defaultCheckedKeys);
  const [selectAll, setSelectAll] = useState(false);

  const FilterOptions = score.map(({ key, title }) => ({
      label: title,
      value: key,
      disabled: defaultCheckedKeys.includes(key),
    }));

  const chartAdd = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const HandleChangeValue = (checkedValues) => {
    if(checkedValues.length > 0) {
    checkedValues.length === score.length ? setSelectAll(true) : setSelectAll(false);
    const newValue = checkedValues
    setChartCardList([...newValue]);
    }else{
      setChartCardList([0, 5, 9, 11]);
    }
  };
  const closeDropdown = () => {
    setDropdownVisible(false);
  };
  const SelectedAll = (value) => {
    if(value){
      setSelectAll(value);
      const keyArray = score.map((item) => item.key);
      console.log("keyArray",keyArray)
      HandleChangeValue(keyArray)
    }else{
      setSelectAll(value);
      HandleChangeValue([]);
    }
  };
  console.log("CharCardList", chartCardList);
  return (
    <div className="ScoreChartDiv">
      {/* Chart 추가 */}
      <Space className="ScoreChartAdd">
        <div className="ScoreChartAddContainer">
          <div>
            <Dropdown
              className="chartDropdown"
              open={dropdownVisible}
              overlay={
                <div className="DropDownLayer">
                  <div className="DropDownHeader">
                    <span className="DropdownHeaderText">표현 항목</span>
                    <Button className="ResetButton" size="small" onClick={() => SelectedAll(!selectAll)}>전체 선택/해제</Button>
                    <div className="DropDownCloseContainer">
                      <CloseOutlined
                        className="DropDownClose"
                        onClick={closeDropdown}
                      />
                    </div>
                  </div>
                  <Checkbox.Group
                    style={{
                      width: "238px",
                    }}
                    defaultValue={defaultCheckedKeys}
                    onChange={HandleChangeValue}
                    value={chartCardList}
                  >
                    <Row className="">
                      {FilterOptions.map(
                        (option) => (
                          <Col span={12}>
                            <Checkbox
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </Checkbox>
                          </Col>
                        )
                      )}
                    </Row>
                  </Checkbox.Group>
                </div>
              }
            >
              <PlusCircleFilled className="ChartAdder" onClick={chartAdd} />
            </Dropdown>
          </div>
        </div>
      </Space>
      {score
        .filter((item) => chartCardList.includes(item.key))
        .map((item) => (
          <Space.Compact
            key={item.key}
            className="ScoreChartCol"
            direction="vertical"
          >
            <h3 className="ScoreChartTitle">{item.title}</h3>
            <div className="ScoreChartValueDiv">
              <span className="ScoreChartValue">{item.value}</span>
              <span className="ScoreChartUnit"> {item.unit}</span>
            </div>
            <div className="ScoreChartPercent">
              ({item.percent}%
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
          </Space.Compact>
        ))}
    </div>
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
          var value = item.data;
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
        style={{ height: "30px", width: "90%" }}
        // opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};
const ScoreCardChartComp = () => {
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
          <ScoreCardChart colors={color} />
        </div>
      </div>
    </>
  );
};

export default ScoreCardChartComp;
