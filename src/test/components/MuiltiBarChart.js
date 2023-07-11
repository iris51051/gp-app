import React from "react";
import ECharts from "echarts-for-react";

const MultipleBarChart = ({ colors, adList, adoptions }) => {
  console.log("colors.multipleBarChart",colors)
  console.log("adList.multipleBarChart"+adList)
  console.log("adoptions.multipleBarChart",adoptions)

  const filteredAdoptions = adoptions.filter((adoption) =>
  adList.includes(adoption.value)
);
const sourceArray = [["product", "총 광고비", "매출액", "ROAS(%)"]];
filteredAdoptions.forEach((adoption) => {
  const { label, children } = adoption;

  if (children) {
    const totalAdSpendChild = children.find((child) => child.name === "총 광고비");
    const revenueChild = children.find((child) => child.name === "매출액");

    if (totalAdSpendChild && revenueChild) {
      const totalAdSpend = totalAdSpendChild.value;
      const revenue = revenueChild.value;
      const roasPercentage = (revenue / totalAdSpend * 100).toFixed(2);
      sourceArray.push([label, totalAdSpend, revenue, roasPercentage]);
    }
  }
});
console.log("sourceArray",sourceArray)
  const options = {
    legend: {
      data: ['총 광고비', '매출액', 'ROAS'],
      bottom: -5,
    },
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      dimensions: ['product', '총 광고비', '매출액', 'ROAS'],
      source: sourceArray.slice(1)
    },
    // grid:{
    //   left : 100,
    //   right : 200,
    //   top : 50,
    // },
    xAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#333",
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "총 광고비",
        position: "left",
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
        axisLabel: {
          formatter: function (value) {
            if (value >= 1000) {
              return (value / 1000).toFixed() + "k";
            }
            return value;
          },
        },
  },
    {
      type:"value",
      name:"ROAS(%)",
      position: "right",
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
      axisLabel: {
        formatter: "{value} %",
      },
    },
],
series: [
  { name: '총 광고비', type: 'bar',tooltip: {
    valueFormatter: function (value) {
      return new Intl.NumberFormat('ko-KR',
      {style : 'currency', currency : 'KRW'}
      ).format(value);
    }
  }, encode: { x: 'product', y: '총 광고비' } },
  { name: '매출액', type: 'bar', encode: { x: 'product', y: '매출액' } },
  { name: 'ROAS', type: 'bar', yAxisIndex: 1, encode: { x: 'product', y: 'ROAS' } },
],
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
