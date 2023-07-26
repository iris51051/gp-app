import * as React from "react";
import { useState } from "react";
import { Row, Col, Dropdown, Checkbox, Space } from "antd";
import ECharts from "echarts-for-react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  PlusCircleFilled,
  CloseOutlined,
} from "@ant-design/icons";
import './index2.css'

//BasicMultiLineChart

export const BLchart = (colors) => {
  const option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      icon: "circle",
      bottom: -3,
      left: "6%",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  return (
    <ECharts
      style={{
        width: "65%",
      }}
      option={option}
    />
  );
};
//BasicBarChart
export const BarChart = (colors) => {
  const option = {
    title: {
      text: "World Population",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
    },
    series: [
      {
        name: "2011",
        type: "bar",
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
    ],
  };
  return <ECharts color={colors} style={{ width: "30%" }} option={option} />;
};
//스코어카드
export const ScoreCard = (colors) => {
  const score = [
    { key: 1, label: "페이지뷰", value: 32 },
    { key: 2, label: "전체 방문수", value: 27 },
    { key: 3, label: "북마크/직접입력 방문수", value: 17 },
    { key: 4, label: "외부유입 방문 랜딩페이지 통과율", value: "44.44%" },
    { key: 5, label: "전체 반송수", value: 22 },
  ];
  return (
    <>
      <div>
        <table className="ScoreCardTable">
          <tr className="ScoreCardRow">
            {score.map((item) => (
              <td
                style={{ align: "center" }}
                className="ScoreCardCol"
                key={item.key}
              >
                {item.label}
                <br />
                <strong>{item.value}</strong>
              </td>
            ))}
          </tr>
        </table>
      </div>
    </>
  );
};

//스코어카드 차트
export const ScoreCardChart = (colors) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [chartCardList, setChartCardList] = useState([]);
  const defaultCheckedKeys = [0, 5, 9, 11];
  const Mrndata=[
    13200,
    19800,
    13200,
    8800,
    19800,
    0,
    8800,
    4400,
    2750,
    26400,
    13200,
    35200,
    26400,
    22000,
    8800,
    23100,
    14300,
    17600,
    35200,
    0,
    1100,
    0,
    0,
    0,
    550,
    550,
    0,
    550,
    550,
    550,
    0,
    0,
    550,
    0,
    0,
    0,
    0,
    0,
    0,
    550,
    0,
    550,
    0,
    550,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]
  const score = [
    {
      key: 0,
      title: "총 매출액",
      value: "7,554,857",
      unit: "원",
      percent: -2,
      data: Mrndata,
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

  const FilterOptions = score
    .filter(({ key }) => key >= 1)
    .map(({ key, title }) => ({
      label: title,
      value: key,
      disabled: defaultCheckedKeys.includes(key),
    }));

  const chartAdd = () => {
    setDropdownVisible(!dropdownVisible);
  };
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
      {score
        .filter((item) => defaultCheckedKeys.includes(item.key))
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
      {chartCardList.length > 0
        ? score
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
            ))
        : null}
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
                      {FilterOptions.filter((option) => option.value >= 1).map(
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
        style={{ height: "30px" }}
        // opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};

