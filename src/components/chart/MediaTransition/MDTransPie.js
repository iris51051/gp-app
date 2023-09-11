import React,{useState} from 'react';
import Echarts from 'echarts-for-react'

const MDTransPie =({colors,data})=>{
  console.log('MDTransPie',data)
  const convData= []
    for(const props of data){
      const conv = props.m_conv
      const ad_provider = props.ad_provider
      convData.push({
        name: ad_provider,
        value:conv,
      })
    }
    const defaultSeriesOrder = ['ADN PC', 'DABLE', 'FACEBOOK', '구글', '네이버', '카카오', '페이스북'];
    convData.sort((a, b) => {
      const testA = a.value || 0; // If sum is undefined, set it to 0
      const testB = b.value || 0; // If sum is undefined, set it to 0
    
      if (testA === testB) {
        const indexA = defaultSeriesOrder.indexOf(a);
        const indexB = defaultSeriesOrder.indexOf(b);
    
        if (indexA === -1) return 1; // If not found in defaultSeriesOrder, move it to the end
        if (indexB === -1) return -1; // If not found in defaultSeriesOrder, move it to the end
    
        return indexA - indexB;
      }
      return testB - testA;
    });

    const ColoredData = convData.map((item) => ({
      ...item,
      itemStyle: {
        color:
        item.name === "기타"
        ? "#bababa"
        : colors[convData.findIndex((d) => d.name === item.name)],
      },
    }));
    console.log('ColoredData',ColoredData)
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
            right: "1",
            top: "0",
            itemWidth: 9,
            itemHeight: 9,
            textStyle: {
              fontSize: 13,
            },
          },

        grid: {
            left: -40, // Adjust the left position of the chart
          },
        series: [
            {
              type: "pie",
              radius: "55%",
              selectedMode: 'multiple',
              selectedOffset: 10,
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
        <Echarts option={option} style={{width:'100%', height:'400px',marginLeft:"-30px"}}/>
    </>
    )
}

export default MDTransPie;