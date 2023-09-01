import React from 'react'
import { Breadcrumb,Select,Switch,Dropdown,Table } from "antd";

import SearchableTable from "../../../components/table/SearchableTable"



import {
    RightCircleFilled,
    SettingOutlined
  } from "@ant-design/icons";

export const ListSet =()=>{
    const items = [
        { title: " 모니터링알림", href: "/" },
        { title: "알림 설정",href: "/" },
        { title: "알람 목록 및 설정" },
    ];
    const SiteOption = [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]
      const GroupOption = [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]
      const ReceiveOption = [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]
      const ImpOption = [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]
      const slectorStyle ={
        marginRight:10,
        width: 200
      }
      const StandardColumn=[
        {
            key:1,
            title: 'ON/OFF',
            dataIndex: 'switch',
            width: '10%',
            align:'center'
        },{
            key:2,
            title : '알림 그룹',
            dataIndex: 'group',
            width: '10%',
            align:'center'
        },{
            key:3,
            title : '알림 이름',
            dataIndex: 'alarmname',
            width: '10%',
            align:'center'
        },{
            key:4,
            title:(
                <>
                    [사이트명]<br/>
                    도메인
                </>
            ),
            dataIndex: 'domain',
            width: '10%',
            align:'center'
        },{
            key:5,
            title : '조건',
            dataIndex: 'condition',
            width: '10%',
            align:'center'
        },{
            key:6,
            title : '수신 방법',
            dataIndex: 'method',
            width: '10%',
            align:'center'
        },{
            key:7,
            title : '수신자',
            dataIndex: 'receiver',
            width: '10%',
            align:'center'
        },{
            key:8,
            title : '주기',
            dataIndex: 'period',
            width: '10%',
            align:'center'
        },{
            key:8,
            title : '생성자',
            dataIndex: 'constructor',
            width: '10%',
            align:'center'
        },{
            key:9,
            title : '관리',
            dataIndex: 'manage',
            width: '10%',
            align:'center'
        },
      ]
      const manageOptions =[
        {
            key:1,
            label:'히스토리',
            value:'history'
        },
        {
            key:2,
            label:'알림항목',
            value:'history'
        },
        {
            key:3,
            label:'복사',
            value:'history'
        },
        {
            key:4,
            label:'설정',
            value:'history'
        },
      ]
      const StandardData = [
        {
            key:1,
            switch:(<Switch defaultChecked/>),
            group: '기본 알림',
            alarmname:'AD-ADC',
            domain:'bizspring',
            condition:(
                <>
                    광고<br/>유입/탐색<br/>전환
                </>
            ),
            method :'이메일',
            receiver:'마케팅1팀',
            period:(
                <>
                    매일 9시<br/>(주말제외)
                </>
            ),
            constructor:'BizSpring',
            manage:(
                <>
                <Dropdown
                    menu={{
                        items:manageOptions,
                    }}
                    trigger='click'
                    placement="bottomLeft"
                    arrow
                    >
                     <SettingOutlined style={{fontSize: '20px',padding:5,border:'1px solid black'}}/>
                    </Dropdown>
                    </>
           )
        }
      ]
      const CustomColumn=[

        {
            key:1,
            title: 'ON/OFF',
            dataIndex: 'switch',
            width: '7%',
            align:'center'
            
        },{
            key:2,
            title : '알림 그룹',
            dataIndex: 'group',
            width: '10%',
            align:'center'
        },{
            key:3,
            title : '알림 이름',
            dataIndex: 'alarmname',
            width: '10%',
            align:'center'
        },{
            key:4,
            title:(
                <>
                    [사이트명]<br/>
                    도메인
                </>
            ),
            dataIndex: 'domain',
            width: '10%',
            align:'center'
        },{
            key:5,
            title : '조건',
            dataIndex: 'condition',
            width: '10%',
            align:'center'
        },{
            key:6,
            title : '수신 방법',
            dataIndex: 'method',
            width: '10%',
            align:'center'
        },{
            key:7,
            title : '수신자',
            dataIndex: 'receiver',
            width: '10%',
            align:'center'
        },{
            key:8,
            title : '주기',
            dataIndex: 'period',
            width: '10%',
            align:'center'
        },{
            key:8,
            title : '생성자',
            dataIndex: 'constructor',
            width: '10%',
            align:'center'
        },{
            key:9,
            title : '관리',
            dataIndex: 'manage',
            width: '10%',
            align:'center'
        },
      ]
      const CustomData = [
        {
            key:1,
            switch:(<Switch defaultChecked/>),
            group: '기본 알림',
            alarmname:'AD-ADC',
            domain:'bizspring',
            condition:(
                <>
                    광고<br/>유입/탐색<br/>전환
                </>
            ),
            method :'이메일',
            receiver:'마케팅1팀',
            period:(
                <>
                    매일 9시<br/>(주말제외)
                </>
            ),
            constructor:'BizSpring',
            manage:(
                <>
                <Dropdown
                    menu={{
                        items:manageOptions,
                    }}
                    trigger='click'
                    placement="bottomLeft"
                    arrow
                    >
                     <SettingOutlined style={{fontSize: '20px',padding:5,border:'1px solid black'}}/>
                    </Dropdown>
                    </>
           )
        }
      ]
    return (
      <>
      <div style={{marginTop:10,marginBottom:10}}>
      <Breadcrumb separator=">" items={items}/>
      </div>
        <div className='WhiteBox'>
            <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:10}}>필터</span>
                <RightCircleFilled style={{marginRight:10}}/>
                <div className='SelectorDiv'>
                    <Select placeholder="사이트명" style={slectorStyle} options={SiteOption}/>
                    <Select placeholder="알림 그룹" style={slectorStyle} options={GroupOption}/>
                    <Select placeholder="수신 방법" style={slectorStyle} options={ReceiveOption}/>
                    <Select placeholder="알림 중요도" style={slectorStyle} options={ImpOption}/>
                </div>
            </div>
        </div>
        <div className='WhiteBox'>
            <div>
                <span style={{fontSize:20,fontWeight:1000, marginRight:10}}>기본 알림</span>
                <span>광고 운영, 유입/탐색, 전환 데이터 항목을 분류하여 정의된 SCORING으로 조건 설정없이 알림을 받을 수 있습니다.</span>
            </div>
            {/* <table style={{border:'1px solid black', borderCollapse:'true', width:'100%'}}>
                <thead>
                {StandardColumn.map((item)=>
                    <th style={{border:"1px solid black",whiteSpace:'pre'}} key={item.key} width={item.width}>
                    {item.label}
                    </th>
                )}
                </thead>
                <tbody>
                {StandardData.map((item)=>
                    <React.Fragment key={item.key}>
                    <tr>
                    {StandardColumn.map((column)=>
                        <td 
                        key={column.value}
                        style={{width:`${column.width}`,border:'1px solid black'}}
                        align='center'
                        >
                        {item[column.value]}

                        </td>
                    )}
                    </tr>
                    </React.Fragment>
                )}
                </tbody>
            </table> */}
            <Table className='StandardDataTable' bordered columns={StandardColumn} dataSource={StandardData} />
        </div>
        <div className='WhiteBox'>
            <div>
                <span style={{fontSize:20,fontWeight:1000, marginRight:10}}>맞춤 알림</span>
                <span>사용자가 정의한 맞춤 알림 항목입니다.</span>
            </div>
            <SearchableTable column={CustomColumn}  IncomeData={CustomData}/>
        </div>
      </>
    )

}

export default ListSet