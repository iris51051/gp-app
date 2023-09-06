import React from 'react';
import Echart from 'echarts-for-react';

const MDTransBar = ({colors, data}) => {
  const sourceArray = [['product', '총 전환수', '총 전환율']];
  // data.map((item) => {
  //   const { ad_provider, m_conv, m_crt } = item;
  //     sourceArray.push([ad_provider, m_conv, m_crt]);
  // });
  for(const detail of data){
    console.log('detail',detail)
    console.log('data',data)
    const ad_provider = detail.ad_provider
    const m_conv = detail.m_conv
    const m_crt = detail.m_crt.toFixed(2)
    sourceArray.push([ad_provider,m_conv,m_crt])
  }
  console.log('sourceArray',sourceArray)
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
      },
    ],
    series: [
      { type: 'bar', name: '총 전환수', encode: { x: 'product', y: '총 전환수' },
      tooltip: {
        valueFormatter: function (value) {
          if(value>0){
            return value;
          }else{
          return '-';
        }
        }
      },},
      { type: 'bar', name : '총 전환율',yAxisIndex: 1,encode: { x: 'product', y: '총 전환율' },  tooltip: {
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
      <Echart option={option} colors={colors} style={{ width: '90%', height: 344 }} />
    </>
  );
};

export default MDTransBar;