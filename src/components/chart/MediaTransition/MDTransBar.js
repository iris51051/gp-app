import React from 'react';
import Echart from 'echarts-for-react';

const MDTransBar = ({colors, data}) => {

  const defaultSeriesOrder = ['ADN PC', 'DABLE', 'FACEBOOK', '구글', '네이버', '카카오', '페이스북'];
  const sortData = data.sort((a,b)=>{
    const testA = a.m_conv;
    const testB = b.m_conv;
    if (testA === testB) {
      const indexA = defaultSeriesOrder.indexOf(a);
      const indexB = defaultSeriesOrder.indexOf(b);
  
      if (indexA === -1) return 1; // If not found in defaultSeriesOrder, move it to the end
      if (indexB === -1) return -1; // If not found in defaultSeriesOrder, move it to the end
  
      return indexA - indexB;
    }
    return testB - testA;
  });

  const sourceArray = [['product', '총 전환수', '총 전환율']];
  for(const detail of sortData){
    const ad_provider = detail.ad_provider
    const m_conv = detail.m_conv
    const m_crt = ((detail.m_crt)*100).toFixed(2);
    sourceArray.push([ad_provider,m_conv,m_crt])
  }
  const option = {
    legend: {
      bottom: 'bottom',
    },
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      dimensions: ['product', '총 전환수', '총 전환율'],
      source: sourceArray.slice(1),
    },
    xAxis: { 
      type: 'category',
      axisLabel:{
        interval:0,
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '총 전환수',
        position: 'left',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333',
          },
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          formatter: function(value){
            if(value >=1000){
              return (value / 1000).toFixed() + "k";
            }
            return value;
          },
        },
      },
      {
        type: 'value',
        name: '총 전환율',
        position: 'right',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333',
          },
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          formatter: function(value){
            return value+'%';
          },
        },
      },
    ],
    series: [
      { type: 'bar', name: '총 전환수', encode: { x: 'product', y: '총 전환수' },
      itemStyle: {
        color: colors[0]
      },
      tooltip: {
        valueFormatter: function (value) {
          if(value>0){
            return value;
          }else{
          return '-';
        }
        }
      },},
      { type: 'bar', name : '총 전환율',yAxisIndex: 1,encode: { x: 'product', y: '총 전환율' },
      itemStyle: {
        color: colors[1]
      },
        tooltip: {
        valueFormatter: function (value) {
          if(value>0){
            return value + '%';
          }else{
          return '-';
        }
        }
      },},
    ],
  };

  return (
    <>
      <Echart option={option} style={{ width: '90%', height: 344 }} />
    </>
  );
};

export default MDTransBar;