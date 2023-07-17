import React from 'react';
import Echarts from 'echarts-for-react'

const MDTransPie =({colors})=>{

      const data=            
        [
          { value: 1748, name: 'P' },
          { value: 735, name: 'M' },
        ]

        const ColoredData = data.map((item) => ({
            ...item,
            itemStyle: {
              color:
                item.name === "기타"
                  ? "#bababa"
                  : colors[data.findIndex((d) => d.name === item.name)],
            },
          }));
    const option = {
        tooltip: {
            trigger: "item",
            textStyle: {
              fontSize: 10,
              color: "#000000",
            },
          },
        legend: {
            orient: "vertical",
            right: "50",
            top: "140",
            itemWidth: 9,
            itemHeight: 9,
            textStyle: {
              fontSize: 10,
            },
          },

        grid: {
            left: -40, // Adjust the left position of the chart
          },
        series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              selectedMode: 'multiple',
              selectedOffset: 20,
              label: {
                show: true,
                color: "#ffffff",
                align: "center",
                position: "inside",
                formatter: "{d}%",
                fontSize: 9,
                textBorderColor: 'black',
                textBorderWidth: 3
              },
              labelLine: { show: false },
              data: ColoredData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              itemStyle: {
                borderWidth: "1",
                borderColor: "#ffffff",
              },
            },
          ],
      };

    return(
    <>
        <Echarts option={option} color={colors} style={{width:'95%', height:'400px', marginLeft:'-50px'}}/>
    </>
    )
}

export default MDTransPie;