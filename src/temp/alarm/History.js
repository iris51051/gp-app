import React,{useState}  from 'react'
import { Breadcrumb,Tabs } from "antd";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";

import HistoryTab from './History-tab/historyTab';
import Calendar from '../../components/calendar'


export const History =()=>{
  // const [selectedDate, setSelectedDate] = useState([addDays(new Date(), -7), addDays(new Date(), -1)])
  const [selectedDate, setSelectedDate] = useState([])
    const items = [
        { title: " 모니터링알림", href: "/" },
        { title: "알림 히스토리" },
    ];
    const TabItems = [
      { key :1,
        label :'전체',
        children:(
          <div >
            <div style={{padding:'20px'}}>
            <HistoryTab config={'전체'}/>
            </div>
          </div>
        ),
      },{
        key :2,
        label :'네이버 광고',
        children:(
          <div className="WhiteBox">
            <div style={{padding:'20px'}}>
            <HistoryTab config={'네이버 광고'}/>
            </div>
          </div>
        ),
      },{
        key :3,
        label :'페이스북 광고',
        children:(
          <div>
            <div style={{padding:'20px'}}>
            <HistoryTab config={'페이스북 광고'}/>
            </div>
          </div>
        ),
      }

  ]
  const onChange = (key)=>{
    console.log(key)
  }
  const DateChange =(value)=>{
    // setSelectedDate(value)
    console.log('dateChagne',value)
  }

    return (
      <>
      <div style={{marginTop:10,display:'flex',justifyContent:'space-between'}}>
        <Breadcrumb separator=">" items={items}/>
        <Calendar onValueChange={DateChange}/>
        </div>
        <Tabs
          onChange={onChange}
          type="card"
          items={TabItems}
        >
        </Tabs>
      </>
    )

}
export default History;
