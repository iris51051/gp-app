import * as React from "react";
import { useState } from "react";
import ECharts from "echarts-for-react";
export const EmptyLineChart =()=>{
    const option = {
        grid: {
            top:15,
            left:25,
            right : 10,
            bottom: 10,
            show: true,
            backgroundColor: '#f2f2f2',
            containLabel:false,
        },
      silent: true,
      xAxis: {
        show: true,
        type: 'category',
        boundaryGap: false,
        axisLine:{
            show: true,
            color:'#c4c4c4',
        },
        axisTick:{
            show:false,
        },
        axisLabel :{
            show:false
        },
    },
      yAxis: {
        type: 'value',
        color:'black',
        min : 0.0,
        max: 1.0,
        axisLine :{
            show:true,
            color:'#8c8c8c'
        },
        axisTick:{
            show:true,
        },
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '데이터가 없습니다.',
            fill: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          },
          silent: true,
        },
        {
          type: 'rect',
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          style: {
            fill: 'gray',
          },
        },
      ],
      series: [
        {
          symbol: 'none',
          data: [1.0],
          type: 'line',
          areaStyle: {},
          lineStyle: {
            width: 0
          },
        }
      ]
    };
    
    return (
      <>
      <ECharts
      style={{ height: "350px"}} option={option}
    ></ECharts>
    </>
    )
  }
  export const EmptyPieChart =()=>{
    const option = {
        graphic: [
        {
          zlevel:10,
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '데이터가 없습니다.',
            fill: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          },
          silent: true,
        },
        {
          type: 'rect',
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          style: {
            fill: 'gray',
          },
        },
      ],
  series: [
    {
      type: 'pie',
      radius: '85%',
      selectedOffset: 10,
    }
  ]
};
    return (
      <>
      <ECharts
      style={{ height: "350px"}} option={option}
    ></ECharts>
    </>
    )
  }