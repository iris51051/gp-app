import * as React from "react";
import { useState, useEffect } from "react";
import ECharts from "echarts-for-react";
import { EmptyLineChart } from "./EmptyChart";

const BLchart = ({ colors, data, SelectedChartOption,mdFilter }) => {
  const [seriesNames, setSeriesNames] = useState([]);


  useEffect(() => {
    const newSeriesNames = mdFilter.filter((provider) =>
      data.some((item) => item.ad_provider === provider)
    );
    setSeriesNames(newSeriesNames); // Update the series names with the new values
  }, [data, SelectedChartOption, mdFilter]);

const xAxisData = [...new Set(data.map((item) => item.stat_date))];

for (const newData of data) {
  const stat_date = newData.stat_date;
  const DateArr = data.filter((item) => item.stat_date === stat_date);
  if (DateArr.length < seriesNames.length) {
    const adProviders = DateArr.map((item) => item.ad_provider);
    const addProvider = seriesNames.filter(
      (item) => !adProviders.includes(item)
    );
    for (const newData of addProvider) {
      const newObj = {
        stat_date: stat_date,
        ad_provider: newData,
      };
      if (SelectedChartOption[0].value === "m_conv/click") {
        newObj["m_conv"] = 0;
        newObj["m_click"] = 0;
        data.unshift(newObj);
      } else {
        newObj[SelectedChartOption[0].value] = 0;
        data.unshift(newObj);
      }
    }
  }
}
  //그래프에 표시될 data의 stat_date를 오름차순으로 정렬
  data.sort((a, b) => {
    const dateA = new Date(a.stat_date);
    const dateB = new Date(b.stat_date);
    return dateA - dateB;
  });
  const adProviderSums = seriesNames.reduce((sums, provider) => {
    if(SelectedChartOption[0].value ==='m_ctr'){
      sums[provider] = data.reduce((sum, item) => {
        if (item.ad_provider === provider) {
          sum += item[SelectedChartOption[0].value];
        }
        return sum;
      }, 0);

    }else{
    sums[provider] = data.reduce((sum, item) => {
      if (item.ad_provider === provider) {
        sum += item[SelectedChartOption[0].value];
      }
      return sum;
    }, 0);
  }

    return( sums);

  }, {});
  // seriesNames.sort((a, b) => adProviderSums[b] - adProviderSums[a]);
  const defaultSeriesOrder = ['ADN PC', 'DABLE', 'FACEBOOK', '구글', '네이버', '카카오', '페이스북'];
  seriesNames.sort((a, b) => {
    const sumA = adProviderSums[a] || 0; // If sum is undefined, set it to 0
    const sumB = adProviderSums[b] || 0; // If sum is undefined, set it to 0
  
    if (sumA === sumB) {
      const indexA = defaultSeriesOrder.indexOf(a);
      const indexB = defaultSeriesOrder.indexOf(b);
  
      if (indexA === -1) return 1; // If not found in defaultSeriesOrder, move it to the end
      if (indexB === -1) return -1; // If not found in defaultSeriesOrder, move it to the end
  
      return indexA - indexB;
    }
  
    return sumB - sumA;
  });
  
   
  const adProviderColors = {};
  seriesNames.forEach((provider, index) => {
    adProviderColors[provider] = colors[index % colors.length];
  });

  const DataRender =(name)=>{
    const getData = data.filter((item) => item.ad_provider === name)
  if(SelectedChartOption[0].value === 'm_conv/click'){
    return getData.map((item) => {
      const m_conv = item.m_conv || 0; // Handle cases where m_conv is missing or null
      const m_click = item.m_click || 1; // To prevent division by zero
      const ratio = m_conv / m_click;
      return (ratio * 100).toFixed(2);
    });
  }else if(SelectedChartOption[0].value === 'm_roas'){
    return getData.map((item) => {
    const m_roas = item.m_roas || 0;
    return (m_roas * 100).toFixed(2);
    });
  }
  else{
    return getData.map((item) => {
      const ratio = item[SelectedChartOption[0].value] || 0; // Handle cases where m_conv is missing or null
      return ratio;
    });
    }
  }

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        let tooltipContent = `${params[0].name}<br/>`;
        let formattedValue="";

        for (const series of params) {
          const value = series.value;
          if (SelectedChartOption[0].value === 'm_conv/click') {
            if(value>0){
            formattedValue = `${value}%`; // Add percentage sign for 'm_conv/click' series
            }else{
              formattedValue ='-';
            }
          } else if (SelectedChartOption[0].value === 'm_rvn' || SelectedChartOption[0].value === 'm_cost') {
            if(value >0){
            formattedValue = Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            })
              .format(value)
              .replace('₩', '₩\u00A0');; 
            }else{
              formattedValue = '-';
            }
          } else {
            if(value>0){
            formattedValue = Intl.NumberFormat('ko-KR') .format(value);
            }else{
              formattedValue= '-';
            }
          }
          tooltipContent += `${series.marker}${series.seriesName}: ${formattedValue}<br/>`;
        }

        return tooltipContent;
      },
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
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              params.value
            );
          }
        }
      },
    },
    yAxis: {
      type: "value",
      gap : '10',
    },
    series: seriesNames.map((name,index) => ({
      color: colors[index],
      name, 
      type: "line",
      data: DataRender(name),
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
          notMerge={true}
        />
      ) : (
        <EmptyLineChart />
      )}
    </>
  );
};
