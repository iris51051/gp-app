import React  from 'react'
import { Breadcrumb } from "antd";
import BreadcrumbComp from '../../components/Breadcrumd';
export const History =()=>{
    const items = [
        { title: " 모니터링알림", href: "/" },
        { title: "알림 히스토리" },
    ];


    return (
      <>
        <Breadcrumb separator=">" items={items}/>
        <div className="WhiteBox">
        
        </div>
      </>
    )

}
export default History;
