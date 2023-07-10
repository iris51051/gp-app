import React from "react";
import ECharts from "echarts-for-react";

const MultipleBarChart = ({ colors }) => {
  const options = {
    legend: {
      bottom: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      source: [
        ["product", "2015", "2016", "2017"],
        ["Matcha Latte", 43.3, 85.8, 93.7],
        ["Milk Tea", 83.1, 73.4, 55.1],
        ["Cheese Cocoa", 86.4, 65.2, 82.5],
        ["Walnut Brownie", 72.4, 53.9, 39.1],
      ],
    },
    grid: {
      left: 30,
      right: 40,
      top: 20,
      bottom: 30,
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#333",
        },
      },
    },
    yAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#333",
        },
      },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  return (
    <ECharts
      style={{ height: "350px", width: "100%" }}
      option={options}
      colors={colors}
    ></ECharts>
  );
};
export default MultipleBarChart;
