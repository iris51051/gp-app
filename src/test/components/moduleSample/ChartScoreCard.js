import React, { useEffect, useState } from "react";
import { Row, Col, Checkbox, Dropdown } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CloseOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import ECharts from "echarts-for-react";

const AreaLineChart = ({ data }) => {
  // const data = [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2];

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

  const option = {
    tooltip: {
      backgroundColor: "#636465",
      textStyle: {
        color: "white",
      },
      trigger: "axis",
      axisPointer: {
        label: {
          show: false,
        },
      },
      formatter: function (params) {
        var tooltipContent = "";
        params.forEach(function (item) {
          var color = "#30c7e9";
          var value = item.data;
          tooltipContent +=
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
            color +
            ';"></span>';
          tooltipContent += value;
        });
        return tooltipContent;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      min: 2,
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
        symbol: "none",
        markPoint: {
          symbol: "circle",
          symbolSize: 3.5,
          lsbel: {
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
              coord: [index, minValue],
            })),
          ],
        },
      },
    ],
  };
  return <ECharts className="ScoreChart" option={option} />;
};

const ScoreCardChart = (colors) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [chartCardList, setChartCardList] = useState([]);
  const defaultCheckedKeys = [0, 5, 9, 11];

  const score = [
    {
      key: 0,
      title: "총 매출액",
      value: "7,554,857",
      unit: "원",
      percent: -2,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
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
      data: [0, 175, 211, 270, 234, 280, 130, 100, 0],
    },
    {
      key: 3,
      title: "총 클릭수",
      value: "600",
      unit: "회",
      percent: 100,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
    },
    {
      key: 4,
      title: "평균 클릭 수",
      value: "100",
      unit: "회",
      percent: -20,
      data: [0, 145, 211, 301, 234, 290, 130, 100, 0],
    },
    {
      key: 5,
      title: "CTR",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },

    {
      key: 6,
      title: "평균 CTR",
      value: "120",
      unit: "%",
      percent: 30,
      data: [0, 175, 211, 270, 234, 280, 130, 100, 0],
    },
    {
      key: 7,
      title: "CPC",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
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
      data: [0, 205, 211, 401, 234, 290, 130, 150, 0],
    },
    {
      key: 10,
      title: "평균 광고비",
      value: "3,283,872",
      unit: "원",
      percent: 100,
      data: [0, 175, 211, 270, 234, 280, 130, 100, 0],
    },
    {
      key: 11,
      title: "ROAS(%)",
      value: "542",
      unit: "%",
      percent: 100,
      data: [0, 95, 211, 275, 234, 190, 275, 200, 0],
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

  //defult chart 지정
  const FilterOptions = score.map(({ key, title }) => ({
    label: title,
    value: key,
    disabled: defaultCheckedKeys.includes(key),
  }));

  const chartAdd = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //dafultchart를 제외한 추가로 선택된 key값들 list에저장
  const HandleChangeValue = (checkedValues) => {
    const newValue = checkedValues.filter(
      (key) => !defaultCheckedKeys.includes(key)
    );
    // setChartCardList([...defaultCheckedKeys, ...newValue]);
    setChartCardList([...newValue]);
    console.log("chartCardList", chartCardList);
  };
  const closeDropdown = () => {
    setDropdownVisible(false);
  };
  return (
    <div className="ScoreChartDiv">
      <Row className="ScoreChartRow">
        {score
          .filter((item) => defaultCheckedKeys.includes(item.key))
          .map((item) => (
            <Col lg={4} key={item.key} className="ScoreChartCol">
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
            </Col>
          ))}
        {chartCardList.length > 0
          ? score
              .filter((item) => chartCardList.includes(item.key))
              .map((item) => (
                <Col lg={4} key={item.key} className="ScoreChartCol">
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
                </Col>
              ))
          : null}
        <Col lg={4} className="ScoreChartAdd">
          <div className="ScoreChartAddContainer">
            <div>
              <Dropdown
                className="chartDropdown"
                open={dropdownVisible}
                overlay={
                  <div className="DropDownLayer">
                    <div className="DropDownHeader">
                      <span className="DropdownHeaderText">표현 항목</span>
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
                    >
                      <Row className="">
                        {FilterOptions.filter(
                          (option) => option.value >= 0
                        ).map((option) => (
                          <Col span={12}>
                            <Checkbox
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </div>
                }
              >
                <PlusCircleFilled className="ChartAdder" onClick={chartAdd} />
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ScoreCardChart;
