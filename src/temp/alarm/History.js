import React  from 'react'
import { Breadcrumb,Tabs } from "antd";
import HistoryTab from './History/historyTab'
export const History =()=>{
    const items = [
        { title: " 모니터링알림", href: "/" },
        { title: "알림 히스토리" },
    ];
    const TabItems = [
      { key :1,
        label :'전체',
        children:(
          <div className="WhiteBox">
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
          <div className="WhiteBox">
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

    return (
      <>
        <Breadcrumb separator=">" items={items}/>
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
