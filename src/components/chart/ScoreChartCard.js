import React,{ useState, useEffect } from "react";
import {Space, Radio } from "antd";
import ECharts from "echarts-for-react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  LineOutlined
} from "@ant-design/icons";

const ScoreCardChart = ({collapsed, datas,date}) => {

    //M:매체데이터
    //S: 비교 데이터
    //선택 데이터
    //총합
    //매체 데이터
    const [totalMCost, settotalMCost] =useState(0); //총광고비
    const [totalMRvn, setTotalMRvn] =useState(0);   //총매출액
    const [totalMImpr, setTotalMImpr] = useState(0);  //총노출수
    const [totalMClick, setTotalMClick] = useState(0);  //총클릭수
    const [totalMConv, setTotalMConv] = useState(0);    //총 전환수
    //스크립트 데이터
    const [totalOdr, setTotalOdr] = useState(0); //총 주문수
    const [totalRvn, setTotalRvn] = useState(0); //총 주문금액
    const [totalRgr, setTotalRgr] = useState(0); //총 회원가입수

    
    //평균
    const [AVGCPC, setAVGCPC] = useState(0);


    //데이터 Array
    const [MrvnArr,setMrvnArr ]=useState([]);//총매출액
    const [MCostArr,setMCostArr ]=useState([]);//총광고비
    const [MImprArr,setMImprArr ]=useState([]);//총노출수
    const [MClickArr,setMClickArr ]=useState([]);//총클릭수
    const [MCTRArr,setMCTRArr ]=useState([]);//CTR
    const [MCPCArr,setMCPCArr ]=useState([]);//CPC
    const [MROASArr,setMROASArr ]=useState([]);//ROAS
    const [MConvArr,setMConvArr ]=useState([]);//총전환수
    const [AVGMconvArr, setAVGMconvArr ]=useState([]);//총전환율
    
    //스크립트 데이터 Array
    const [RoasArr, setRoasArr ]=useState([]);//Roas
    const [OdrArr, setOdrArr ]=useState([]);//총 주문수
    const [RvnArr, setRvnArr ]=useState([]);//총 주문금액
    const [RgrArr, setRgrArr ]=useState([]);//총 회원가입수
    const [RgrpmcArr, setRgrpmcArr ]=useState([]);//총 회원가입수
    const [RpoArr, setRpoArr ]=useState([]);//총 구매단가
    const [OpmcArr, setOpmcArr ]=useState([]);//총 주문율


    //비교데이터
    //매체 data
    //총합
    const [totalSMCost, settotalSMCost] =useState(0); //총광고비
    const [totalSMRvn, setTotalSMRvn] =useState(0);   //총매출액
    const [totalSMImpr, setTotalSMImpr] = useState(0);  //총노출수
    const [totalSMClick, setTotalSMClick] = useState(0);  //총클릭수
    const [totalSMConv, setTotalSMConv] = useState(0);    //총 전환수

    //평균
    const [SAVGCPC, setSAVGCPC] = useState(0);
    //스크립트 Data
    const [totalSOdr, setTotalSOdr] = useState(0); //총 주문수
    const [totalSRvn, setTotalSRvn] = useState(0); //총 주문금액
    const [totalSRgr, setTotalSRgr] = useState(0); //총 회원가입수


    
  useEffect(()=>{

    //bydata
    //매체
    let MRvnsum=0;    //총매출액
    let MCostsum =0;  //총광고비
    let MImprsum =0;  //총노출수
    let MClicksum =0; //총클릭수
    let MCPCsum =0;   //CPC
    let MConvsum =0;  //총전환수
    //스크립트
    let Odrsum =0;  //총 주문수
    let Rvnsum =0;  //총 주문금액
    let Rgrsum =0;  //총 회원가입수


    //statdata
    //매체
    let SMRvnsum=0;
    let SMCostsum =0;
    let SMImprsum =0;
    let SMClicksum =0;
    let SMCPCsum =0;
    let SMConvsum =0;
    //스크립트
    let SOdrsum =0;  //총 주문수
    let SRvnsum =0;  //총 주문금액
    let SRgrsum =0;  //총 회원가입수


    if(datas.length>0){
      //bydata
      for(const item of datas[0] ){
        //매체
        if('m_rvn' in item) {
          const value =item.m_rvn
          MRvnsum +=value;
        }
        if('m_cost' in item){
          MCostsum+=item.m_cost;
        }
        if('m_impr' in item){        
          MImprsum+=item.m_impr;
        }
        if('m_click' in item){        
          MClicksum+=item.m_click;
        }
        if('m_cpc' in item){
          MCPCsum+=item.m_cpc;
        }
        if('m_conv' in item){
          MConvsum +=item.m_conv;
        }
        //스크립트
        if('rvn' in item){
          Rvnsum +=item.rvn;
        }
        if('odr' in item){
          Odrsum +=item.odr;
        }
        if('rgr' in item){
          Rgrsum +=item.rgr;
        }

      }
      //statData
      for(const item of datas[1] ){
        //매체
        if('m_rvn' in item) {
          const value =item.m_rvn
          SMRvnsum +=value;
        }
        if('m_cost' in item){
          SMCostsum+=item.m_cost;
        }
        if('m_impr' in item){
          SMImprsum+=item.m_impr;
        }
        if('m_click' in item){
          SMClicksum+=item.m_click;
        }
        if('m_conv' in item){
          SMConvsum +=item.m_conv;
        }
        //스크립트
        if('rvn' in item){
          SRvnsum +=item.rvn;
        }
        if('odr' in item){
          SOdrsum +=item.odr;
        }
        if('rgr' in item){
          SRgrsum +=item.rgr;
        }
      }
      const groupedData = {};
      datas[0].forEach(item => {
        const statDate = item.stat_date;
        
        if (!groupedData[statDate]) {
          groupedData[statDate] = {
            m_rvn: 0,  // 초기값 설정
            m_cost: 0, // 초기값 설정
            m_impr: 0, // 초기값 설정
            m_click: 0, // 초기값 설정
            m_conv: 0, // 초기값 설정
            odr: 0, // 초기값 설정
            rvn: 0, // 초기값 설정
            rgr: 0, // 초기값 설정
          };
        }
        groupedData[statDate].m_rvn += item.m_rvn;
        groupedData[statDate].m_cost += item.m_cost;
        groupedData[statDate].m_impr += item.m_impr;
        groupedData[statDate].m_click += item.m_click;
        groupedData[statDate].m_conv += item.m_conv;
        groupedData[statDate].odr += item.odr;
        groupedData[statDate].rvn += item.rvn;
        groupedData[statDate].rgr += item.rgr;
      });
      const combinedData = Object.values(groupedData);
      console.log('combinedData.rgr$$$$$$$$$$$$$$$$$$$$',combinedData)
      //byData
      //매체 데이터
      //배열
      setMrvnArr(combinedData.map(item => item.m_rvn));
      setMCostArr(combinedData.map(item => item.m_cost));
      setMImprArr(combinedData.map(item => item.m_impr));
      setMClickArr(combinedData.map(item => item.m_click));
      setMCTRArr(combinedData.map(item => item.m_impr === 0 ? 0 : parseFloat(((item.m_click/item.m_impr)* 100).toFixed(2))));
      setMCPCArr(combinedData.map(item => item.m_click === 0 ? 0 : parseFloat((item.m_cost/item.m_click).toFixed(0))));
      setMROASArr(combinedData.map(item => item.m_cost === 0 ? 0 : parseFloat(((item.m_rvn/item.m_cost)*100).toFixed(0))));
      setMConvArr(combinedData.map(item => item.m_conv));
      setAVGMconvArr(combinedData.map(item => item.m_click === 0 ? 0 : parseFloat((item.m_conv/item.m_click).toFixed(2))));
      //합계
      setTotalMRvn(MRvnsum);
      settotalMCost(parseInt((MCostsum).toFixed(0)))
      setTotalMImpr(MImprsum)
      setTotalMClick(MClicksum)
      setTotalMConv((MConvsum))
      //평균
      setAVGCPC(parseInt((MCPCsum/new Set(datas[0].map((item) => item.stat_date)).size).toFixed(0)))
      console.log('date',new Set(datas[0].map((item)=>item.stat_date)).size)
      console.log('m_cpc',datas[0].map((item)=>item.m_cpc))

 
      console.log('MCPCsum',MCPCsum)
      //스크립트 데이터
      //배열
      setOdrArr(combinedData.map(item => item.odr));
      setRgrArr(combinedData.map(item => item.rgr));
      setRpoArr(combinedData.map(item => item.odr === 0 ? 0 : parseFloat((item.rvn/item.odr).toFixed(0))));
      setRoasArr(combinedData.map(item =>item.m_cost === 0 ? 0 :  parseFloat(((item.rvn/item.m_cost)*100).toFixed(0))));
      setRgrpmcArr(combinedData.map(item => item.m_click === 0 || item.rgr===0? 0 : parseFloat(((item.rgr/item.m_click)*100).toFixed(0))));
      setOpmcArr(combinedData.map(item => item.m_click === 0 ? 0 : parseFloat((item.odr/item.m_click).toFixed(2))));
      setRvnArr(combinedData.map(item => parseFloat((item.rvn).toFixed(0))));
      
      //합계
      setTotalOdr(Odrsum);
      setTotalRvn(Rvnsum);
      setTotalRgr(Rgrsum);

      //statData
      //매체 data
      //합계
      setTotalSMRvn(parseInt((SMRvnsum).toFixed(0)));
      settotalSMCost(parseInt((SMCostsum).toFixed(0)))
      setTotalSMImpr(parseInt((SMImprsum).toFixed(0)))
      setTotalSMClick(parseInt((SMClicksum).toFixed(0)))
      setTotalSMConv((SMConvsum))
      //평균
      setSAVGCPC(parseInt((SMCPCsum/(new Set(datas[1].map((item) => item.stat_date)).size)).toFixed(0))) 
      //스크립트 data
      //합계
      setTotalSOdr(SOdrsum);
      setTotalSRvn(SRvnsum);
      setTotalSRgr(SRgrsum);
      console.log('SMCPCsum',SMCPCsum)
      console.log('date',new Set(datas[1].map((item)=>item.stat_date)).size)


    }
  },[datas])

  const renderTitle=(title)=>{
    return( 
       <div>
        <span>{title}</span><span className="ico-script">s</span>
      </div>
    )  
  }
  
  const score= [
    {
      key: 1,
      title: "CTR",
      value: (totalMClick / totalMImpr * 100).toFixed(2),
      unit: "%",
      percent: ((((totalMClick/totalMImpr)-((totalSMClick / totalSMImpr)))/(totalSMClick / totalSMImpr))*100).toFixed(0),
      data: MCTRArr,
    },
    {
      key: 2,
      title: "총 광고비",
      value: totalMCost,
      unit: "원",
      percent: (((totalMCost-totalSMCost)/totalSMCost)*100).toFixed(0),
      data: MCostArr,
    },
    {
      key: 3,
      title: "총 매출액",
      value : totalMRvn,
      unit: "원",
      percent: (((totalMRvn-totalSMRvn)/totalSMRvn)*100).toFixed(0),
      data: MrvnArr,
    },
    {
      key: 4,
      title: "ROAS",
      value: (totalMRvn/totalMCost*100).toFixed(2),
      unit: "%",
      percent: (((totalMRvn/totalMCost)-(totalSMRvn/totalSMCost))/(totalSMRvn/totalSMCost)*100).toFixed(0),
      data: MROASArr,
    },
    {
      key: 5,
      title: "총 노출수",
      value: totalMImpr,
      unit: "",
      percent: (((totalMImpr-totalSMImpr)/totalSMImpr)*100).toFixed(0),
      data: MImprArr,
    },
    {
      key: 6,
      title: "총 클릭수",
      value: totalMClick,
      unit: "",
      percent: ((totalMClick-totalSMClick)/(totalSMClick)*100).toFixed(0),
      data: MClickArr,
    },
    
    {
      key: 7,
      title: "CPC",
      value: (totalMCost/totalMClick).toFixed(0),
      unit: "원",
      percent: (((totalMCost/totalMClick)-(totalSMCost/totalSMClick))/(totalSMCost/totalSMClick)*100).toFixed(0),
      data: MCPCArr,
    },
    {
      key: 8,
      title: "총 전환수",
      value: totalMConv,
      unit: "",
      percent: ((totalMConv-totalSMConv)/(totalSMConv)*100).toFixed(0),
      data: MConvArr,
    },
    {
      key: 9,
      title: "전환율",
      value: (totalMConv/totalMClick*100).toFixed(2),
      unit: "%",
      percent: (((totalMConv/totalMClick)-(totalSMConv/totalSMClick))/(totalSMConv/totalSMClick)*100).toFixed(0),
      data: AVGMconvArr,
    },
    {
      key: 10,
      title: "평균 노출수",
      value: (totalMImpr/MImprArr.length).toFixed(0),
      unit: "",
      percent: (((totalMImpr/MImprArr.length)-(totalSMImpr/MImprArr.length))/(totalSMImpr/MImprArr.length)*100).toFixed(0),
      data : "",
    },
    {
      key: 11,
      title: "평균 클릭 수",
      value: (totalMClick/MClickArr.length).toFixed(0),
      unit: "",
      percent: (((totalMClick/MClickArr.length)-(totalSMClick/MClickArr.length))/(totalSMClick/MClickArr.length)*100).toFixed(0),
      data: "",
    },

    {
      key: 12,
      title: "평균 CPC",
      value: AVGCPC,
      unit: "원",
      percent: (((AVGCPC-SAVGCPC)/SAVGCPC)*100).toFixed(0),
      data: "",
    },
    {
      key: 13,
      title: "평균 광고비",
      value: (totalMCost/MCostArr.length).toFixed(0),
      unit: "원",
      percent: (((totalMCost/MCostArr.length)-(totalSMCost/MCostArr.length))/(totalSMCost/MCostArr.length)*100).toFixed(0),
      data: "",
    },
    {
      key: 14,
      title: "평균 전환수",
      value: (totalMConv/MConvArr.length).toFixed(0),
      unit: "",
      percent: (((totalMConv/MConvArr.length)-(totalSMConv/MConvArr.length))/(totalSMConv/MConvArr.length)*100).toFixed(0),
      data: '',
    },
    {
      key: 15,
      title: "평균 매출액",
      value: (totalMRvn/MrvnArr.length).toFixed(0),
      unit: "원",
      percent: (((totalMRvn/MrvnArr.length)-(totalSMRvn/MrvnArr.length))/(totalSMRvn/MrvnArr.length)*100).toFixed(0),
      data: '',
    },
    //스크립트
    {
      key: 16,
      title: renderTitle('총 주문수'),
      value: totalOdr,
      unit: "",
      percent: ((totalOdr-totalSOdr)/(totalSOdr)*100).toFixed(0),
      data: OdrArr,
    },
    {
      key: 17,
      title: renderTitle('총 주문율'),
      value: ((totalOdr/totalMClick)*100).toFixed(0),
      unit: "%",
      percent: (((totalOdr/totalMClick)-(totalSOdr/totalSMClick))/(totalSOdr/totalSMClick)*100).toFixed(0),
      data: OpmcArr,
    },
    {
      key: 18,
      title: renderTitle('총 주문금액'),
      value: (totalRvn).toFixed(0),
      unit: "원",
      percent: ((totalRvn-totalSRvn)/(totalSRvn)*100).toFixed(0),
      data: RvnArr,
    },
    {
      key: 19,
      title: renderTitle('ROAS(%)'),
      value: ((totalRvn/totalMCost)*100).toFixed(2),
      unit: "%",
      percent: (((totalRvn/totalMCost)-(totalSRvn/totalSMCost))/(totalSRvn/totalSMCost)*100).toFixed(0),
      data: RoasArr,
    },
    {
      key: 20,
      title: renderTitle('총 구매단가'),
      value: (totalRvn/totalOdr).toFixed(0),
      unit: "원",
      percent: (((totalRvn/totalOdr)-(totalSRvn/totalSOdr))/(totalSRvn/totalSOdr)*100).toFixed(0),
      data: RpoArr,
    },
    {
      key: 21,
      title: renderTitle('총 회원가입수'),
      value: totalRgr,
      unit: "",
      percent: ((totalRgr-totalSRgr)/(totalSRgr)*100).toFixed(0),
      data: RgrArr,
    },
    {
      key: 22,
      title: renderTitle('총 회원가입률'),
      value: (totalRgr/totalMClick).toFixed(0),
      unit: "%",
      percent: (((totalRgr/totalMClick)-(totalSRgr/totalSMClick))/(totalSRgr/totalSMClick*100)).toFixed(0),
      data: RgrpmcArr,
    },
  ];

  const defaultCheckedKeys = [1,2,3,4];
  const [chartCardList, setChartCardList] = useState(defaultCheckedKeys);


  const HandleChangeValue = (checkedValues) => {
    const newValue = parseInt(checkedValues)
    if(defaultCheckedKeys.includes(newValue)){
    }else if (chartCardList.includes(newValue)) {
      setChartCardList(chartCardList.filter((value) => value !== newValue));
    } else {
      setChartCardList([...chartCardList, newValue]);
    }
  };
  const RenderValue = (value,unit,key)=>{
    if (key === 19) {
      if (value > 0) {
        const formattedValue = new Intl.NumberFormat(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
        return formattedValue;
      } else {
        return "0.00";
      }
    }else if(unit === '%'){
      if(value>0){
      return parseFloat(value).toFixed(2);
      }else{
        return (0).toFixed(2);
      }
    }else{
      if(value>0){
     return Intl.NumberFormat('en-KR').format(value)
    }else{
      return 0
    }
    }
  }
  
  const renderAreaLineChart =(item)=>{
    if(item.data.length >1){
      return <AreaLineChart datas={item.data}/>
    }
  }
  const CompareValue = (value)=>{
    if(isFinite(value) &&  (value >0 || value < 0) ){
      return '('+Intl.NumberFormat('ko-KR').format(value)+'%'
    }else{
      return '';
    }
  }
  const arrowRender =(percent)=>{
    if(percent >0 && isFinite(percent)){
      return  (
      <span>
      <CaretUpOutlined className="ArrowUp" />
        )
      </span>
      )
    }else if(percent < 0  && isFinite(percent)){
      return (
        <span>
      <CaretDownOutlined className="ArrowDown" />
        )
      </span>
      )
    }else{
      return <LineOutlined />
    }
  }


  return (
    <>
          <Space className="ScoreCardSelector"
              style={{
              height: collapsed ? 0 : 120, // Adjust the width based on the collapsed state
              float: 'left',
              alignSelf: 'center',
              overflow: 'hidden'
            }}
          >
          <div className="ScoreSelectorDiv" >
            <table className="ScoreCardSelectorTable" >
            <tbody>
              <tr>
                <th style={{width:'10%'}}>지표 항목 선택</th>
                <td>
                {score.map((item) => (
                    <Radio.Button
                      className="ScoreButton"
                      key={item.key}
                      value={item.key}
                      checked={chartCardList.includes(item.key)}
                      onClick={(e) => HandleChangeValue(e.target.value)}
                    >
                      {item.title}
                    </Radio.Button>
                  ))}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          </Space>

    <div className="ScoreChartDiv">
      {score
        .filter((item) => chartCardList.includes(item.key))
        .map((item) => (
          <Space.Compact
            key={item.key}
            className="ScoreChartCard"
            direction="vertical"
          >
            <div className="ScoreCardContainer">
            <h3 className="ScoreChartTitle">{item.title}</h3>
            <div className="ScoreChartValueDiv">
              <span className="ScoreChartValue">
                {RenderValue(item.value,item.unit,item.key)}
                </span>
                <span className="ScoreChartValue">
                </span>
              <span className="ScoreChartUnit"> {item.unit}</span>
            </div>
            <div className="ScoreChartPercent">
              {CompareValue(item.percent)}
              {arrowRender(item.percent)}
            </div>
            <div>
              {/* <AreaLineChart datas={item.data} /> */}
              {renderAreaLineChart(item)}
            </div>
            </div>
          </Space.Compact>
        ))}
    </div>
    </>
  );
};

const AreaLineChart = ({ datas }) => {
  const [data, setData]= useState(datas);
  useEffect(() => {
    const updataData = datas;
      setData(updataData);
  },[datas])
  const minValues = [];
  const minValue = Math.min(...data);
  const maxValues = [];
  const maxValue = Math.max(...data);
  data.forEach((value, index) => {
    if (value === minValue) {
      minValues.push(index);
    }
    if (value === maxValue) {
      maxValues.push(index);
    }
  });
  
  const options = {
    tooltip: {
      backgroundColor: "#636465",
      textStyle: {
        color: "white",
      },
      trigger: "axis",
      formatter: function (datas) {
        var tooltipContent = "";
        datas.forEach(function (data) {
          var color = "#30c7e9";
          var value = Intl.NumberFormat('ko-KR').format(data.value);
          tooltipContent +=
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:' +
            color +
            ';"></span>';
          tooltipContent += value;
        }
      );
        return tooltipContent;
      },
    },

    grid: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
      min: minValue,
    },
    series: [
      {
        data: data,
        type: "line",
        areaStyle: {
          color: "rgba(65,128,236,0.2)",
        },
        color: "rgba(65,128,236,0.5)",
        symbol: "circle",
        symbolSize: 0,
        markPoint: {
          symbol: "circle",
          symbolSize: 3.5,
          label: {
            show: false,
          },
          data: [
            ...maxValues.map((index) => ({
              type: "max",
              name: "max",
              itemStyle: { color: "green" },
              coord: [maxValues[0], maxValue],
            })),
            ...minValues.map((index) => ({
              type: "min",
              name: "min",
              itemStyle: { color: "orange" },
              symbolSize: 4,
              coord: [minValues[0], minValue],
            })),
            ...minValues.map((index) => ({
              type: "min",
              name: "min",
              itemStyle: { color: "orange" },
              symbolSize: 4,
              coord: [minValues[minValues.length - 1], minValue],
            })),
          ],
        },
      },
    ],
  };

  return (
    <div className="AreaChart">
      <ECharts
        option={options}
        style={{ height: "50px", width: "auto" }}
      />
    </div>
  );
};
const ScoreCardChartComp = ({collapsed, datas, date}) => {
  console.log('스코어카드 데이터요!!!!!!!!!!!!!!!!!!!!',datas)
  return (
    <>
      <div style={{ padding: 5, height: "auto" }}>
        <div>
          <ScoreCardChart collapsed={collapsed} datas={datas} date={date}/>
        </div>
      </div>
    </>
  );
};

export default ScoreCardChartComp;
