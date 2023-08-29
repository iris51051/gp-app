import * as React from "react";
import { useState, useEffect,useMemo } from "react";
import ECharts from "echarts-for-react";
import { EmptyLineChart } from "./EmptyChart";

const BLchart = ({ colors, datas, SelectedChartOption,seriesNames }) => {

const selectedOption = SelectedChartOption[0].value
const xAxisData = [...new Set(datas.map((item) => item.stat_date))];



    for (const newData of datas) {
      const stat_date = newData.stat_date;
      const DateArr = datas.filter((item) => item.stat_date === stat_date);
      const ad_provider = [];
      for(const data of datas){
          const provider = data.ad_provider;
          if(!ad_provider.includes(provider)){
          ad_provider.push(provider);
        }
      }

      //비어있는 데이터 채우기
      //ad_providersms 실제 페이지에 사용시 Exam에서 mfFilter로 선택된 데이터를 받아오도록 바꿔줘야함.
      if(DateArr.length < ad_provider.length){
        const existProvider = DateArr.map(item => item.ad_provider);
        const addProvider = ad_provider.filter((item) => !existProvider.includes(item))
        for(const newData of addProvider){

          const newObj ={
            stat_date : stat_date,
            ad_provider : newData,
          }

          if (selectedOption === "m_conv/click") {
            newObj["m_conv"] = 0;
            newObj["m_click"] = 0;
            datas.push(newObj);
          } else {
            newObj[selectedOption] = 0;
            datas.push(newObj);
          }
        }
      }
    }

  //그래프에 표시될 data의 stat_date를 오름차순으로 정렬
  datas.sort((a, b) => {
    const dateA = new Date(a.stat_date);
    const dateB = new Date(b.stat_date);
    return dateA - dateB;
  });
  const adProviderRes = seriesNames.reduce((results, provider) => {
    if (selectedOption === 'm_ctr') {
      const { totClick, totImpression } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totClick += parseInt(item.m_click) >0? parseInt(item.m_click) : 0;
          totals.totImpression += parseInt(item.m_impr) >0? parseInt(item.m_impr) : 0 ;
        }

        return totals;
      }, { totClick: 0, totImpression: 0 });
      results[provider] = totImpression !== 0 ? totClick / totImpression : 0;

    }else if(selectedOption ==='m_cpc'){
      const { totClick, totCost } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totClick += parseInt(item.m_click) >0? parseInt(item.m_click) : 0;
          totals.totCost += parseInt(item.m_cost) >0? parseInt(item.m_cost) : 0 ;
        }
        return totals;
      }, { totClick: 0, totCost: 0 });
      results[provider] = totClick !== 0 ?  totCost/totClick : 0;

    }else if(selectedOption ==='m_roas'){
      const { totRvn, totCost } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totRvn += parseInt(item.m_rvn) > 0? parseInt(item.m_rvn) : 0;
          totals.totCost += parseInt(item.m_cost) >0? parseInt(item.m_cost) : 0 ;
        }
        return totals;
      }, { totRvn: 0, totCost: 0 });
      results[provider] = totCost !== 0 ?  totRvn/totCost : 0;


    }else if(selectedOption ==='roas'){
      const { totRvn, totCost } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totRvn += parseInt(item.rvn) > 0? parseInt(item.rvn) : 0;
          totals.totCost += parseInt(item.m_cost) >0? parseInt(item.m_cost) : 0 ;
        }
        return totals;
      }, { totRvn: 0, totCost: 0 });
      results[provider] = totCost !== 0 ?  totRvn/totCost : 0;


    }else if(selectedOption ==='odr_per_m_cost'){
      const { totOdr, totCost } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totOdr += parseInt(item.odr) > 0? parseInt(item.odr) : 0;
          totals.totCost += parseInt(item.m_cost) >0? parseInt(item.m_cost) : 0 ;
        }
        return totals;
      }, { totOdr: 0, totCost: 0 });
      results[provider] = totCost !== 0 ?  totOdr/totCost : 0;


    }else if(selectedOption ==='rvn_per_odr'){
      const { totRvn, totOdr } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totRvn += parseInt(item.rvn) > 0? parseInt(item.rvn) : 0;
          totals.totOdr += parseInt(item.odr) >0? parseInt(item.odr) : 0 ;
        }
        return totals;
      }, { totRvn: 0, totOdr: 0 });
      results[provider] = totOdr !== 0 ?  totRvn/totOdr : 0;


    }else if(selectedOption ==='rgr_per_m_click'){
      const { totRgr, totClick } = datas.reduce((totals, item) => {
        if (item.ad_provider === provider) {
          totals.totRgr += parseInt(item.rgr) > 0? parseInt(item.rgr) : 0;
          totals.totClick += parseInt(item.m_click) >0? parseInt(item.m_click) : 0 ;
        }
        return totals;
      }, { totRgr: 0, totClick: 0 });
      results[provider] = totClick !== 0 ?  totRgr/totClick : 0;


    }else{
      results[provider] = datas.reduce((result, item) => {
      if (item.ad_provider === provider) {
        result += parseInt(item[selectedOption]) >0? parseInt(item[selectedOption]):0;
      }
      return result;
    }, 0);
  }

    return( results);
  }, {});

  // seriesNames.sort((a, b) => adProviderSums[b] - adProviderSums[a]);
  const defaultSeriesOrder = ['ADN PC', 'DABLE', 'FACEBOOK', '구글', '네이버', '카카오', '페이스북'];
  seriesNames.sort((a, b) => {
    const sumA = adProviderRes[a] || 0; // If sum is undefined, set it to 0
    const sumB = adProviderRes[b] || 0; // If sum is undefined, set it to 0
  
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
    adProviderColors[provider] = colors[index];
  });

  const DataRender =(name)=>{
    const getData = datas.filter((item) => item.ad_provider === name)
  if(selectedOption === 'm_conv/click'){
    return getData.map((item) => {
      const m_conv = item.m_conv || 0; // Handle cases where m_conv is missing or null
      const m_click = item.m_click || 0; // To prevent division by zero
      const ratio = m_click===0 ? 0 : m_conv / m_click;
      return (ratio * 100).toFixed(2);
    });
  }else if(selectedOption === 'm_roas'){
    return getData.map((item) => {
    const m_roas = item.m_roas || 0;
    return (m_roas * 100).toFixed(2);
    });
  }
  else{
    return getData.map((item) => {
      const ratio = item[selectedOption] || 0; // Handle cases where m_conv is missing or null
      return ratio;
    });
    }
  }

  const option = {
    animationDuration: 0,
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        let tooltipContent = `${params[0].name}<br/>`;
        let formattedValue="";
        params.sort((a, b) => {
          const aIndex = seriesNames.indexOf(a.seriesName);
          const bIndex = seriesNames.indexOf(b.seriesName);
          return aIndex - bIndex;
      });
        for (const series of params) {
          const value = series.value;
          if (selectedOption === 'm_conv/click') {
            if(value>0){
            formattedValue = `${value}%`; // Add percentage sign for 'm_conv/click' series
            }else{
              formattedValue ='-';
            }
          } else if (selectedOption === 'm_rvn' || selectedOption === 'm_cost' || selectedOption ==='m_cpc' || selectedOption === 'rvn_per_odr' || selectedOption ==='rvn') {
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
      right: 37,
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
    series:
      seriesNames.map((name,index) => ({
        color: colors[index],
        name, 
        type: "line",
        data: DataRender(name),
      }))
  };

  return (
    <ECharts
      style={{ height: "350px" }}
      option={option}
    />
  );
};

export const MultiLinechart = ({ datas, colors, SelectedChartOption, ProviderFilter }) => {
  // Filter the data based on mdFilter

  const [seriesNames, setSeriesNames] = useState([]);
  useEffect(() => {
    const newSeriesNames = ProviderFilter.filter((provider) =>
      datas.some((item) => item.ad_provider === provider)
    );

    setSeriesNames(newSeriesNames); // Update the series names with the new values
  }, [datas, SelectedChartOption, ProviderFilter]);

  const chartKey = seriesNames.join(','); //ProviderFilter 변경시 BlChart강제 재랜더링을 위한 코드.
  return (
    <>
      {datas.length > 0 ? (
        <BLchart
          datas={datas}
          SelectedChartOption={SelectedChartOption}
          colors={colors}
          seriesNames={seriesNames}
          notMerge={true}
          key={chartKey}
        />
      ) : (
        <EmptyLineChart />
      )}
    </>
  );
};