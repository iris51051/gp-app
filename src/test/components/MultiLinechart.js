import * as React from "react";
import { useState } from "react";
import ECharts from "echarts-for-react";
import { EmptyLineChart } from "./EmptyChart";

const BLchart = ({ colors, data, SelectedChartOption,mdFilter }) => {
  console.log('data', data);
  console.log('SelectedChartOption', SelectedChartOption);
  const seriesNames = mdFilter.filter(provider => data.some(item => item.ad_provider === provider));

  const xAxisData = [...new Set(data.map((item) => item.stat_date))];
  for(const newData of data){
    const stat_date = newData.stat_date;
    const DateArr = data.filter((item)=>item.stat_date === stat_date);
    if(DateArr.length < seriesNames.length){
      const adProviders = DateArr.map(item => item.ad_provider);
      const addProvider = seriesNames.filter((item)=>!adProviders.includes(item));

        for(const newData of  addProvider){
          // data.push({
          //   stat_date: stat_date,
          //   ad_provider : newData,
          //  [SelectedChartOption[0].value] : '0',
          // })          
          const newObj = {
            stat_date: stat_date,
            ad_provider: newData,
          };
          newObj[SelectedChartOption[0].value] = 0;
          data.unshift(newObj);
        }
    }
  }

  data.sort((a, b) => {
    const dateA = new Date(a.stat_date);
    const dateB = new Date(b.stat_date);
    return dateA - dateB;
  });
  const adProviderSums = seriesNames.reduce((sums, provider) => {
    sums[provider] = data.reduce((sum, item) => {
      if (item.ad_provider === provider) {
        sum += item[SelectedChartOption[0].value];
      }
      return sum;
    }, 0);
    return sums;
  }, {});
  seriesNames.sort((a, b) => adProviderSums[b] - adProviderSums[a]);

   
  const adProviderColors = {};
  seriesNames.forEach((provider, index) => {
    adProviderColors[provider] = colors[index % colors.length];
  });

  console.log("adProviderColors",adProviderColors)
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      show: true,
      data: seriesNames,
      icon: "circle",
      bottom: -5,
    },
    grid: {
      top: 10,
      left: 50,
      right: 20,
      bottom: 40,
      show: true,
      containLabel: false,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: seriesNames.map((name,index) => ({
      color: colors[index],
      name, 
      type: "line",
      data: data.filter((item) => item.ad_provider === name)
                        .map((item) => item[SelectedChartOption[0].value]),
    })),
  };

  return (
    <ECharts
      style={{ height: "350px" }}
      option={option}
    />
  );
};

export const MultiLinechart = ({ data, colors, SelectedChartOption, mdFilter }) => {
  // Filter the data based on mdFilter

  return (
    <>
      {data.length > 0 ? (
        <BLchart
          data={data}
          SelectedChartOption={SelectedChartOption}
          colors={colors}
          mdFilter={mdFilter}
        />
      ) : (
        <EmptyLineChart />
      )}
    </>
  );
};
