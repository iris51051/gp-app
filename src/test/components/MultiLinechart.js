import * as React from "react";
import { useState } from "react";
import ECharts from "echarts-for-react";
import {EmptyChart} from "./EmptyChart";

const BLchart = ({colors,data}) => {
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
        top:15,
        left:25,
        right : 10,
        bottom: 10,
        show: true,
        backgroundColor: '#f2f2f2',
        containLabel:false,
    },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      color:colors,
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
          width: '500px',
        }}
        option={option}
      />

    );
  };
  
  export const MultiLinechart =({data,colors})=>{

    return(
        <>
        {data.length >0 ?
        <BLchart data={data} colors={colors}/>
        :<EmptyChart />}
        </>
    )
  }