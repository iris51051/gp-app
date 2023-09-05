import React,{useState} from 'react'
import { Breadcrumb,Select,Switch,Dropdown,Table,Button } from "antd";
import dayjs from 'dayjs';

import SearchableTable from "../../../components/table/SearchableTable"
import AddAlarm from "./AddAlarm"
import Demo from "./Demo"
import { Link } from 'react-router-dom';

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
            width: '5%',
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

      const StandardOptions =[
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
      const manageDrop =(value)=>{
        if(value ==='standard'){
          return (
            <>
            <Dropdown
                menu={{
                    items:StandardOptions,
                }}
                
                trigger='click'
                placement="bottomRight"
                arrow
                >
                <Button icon={<SettingOutlined/>}></Button>
                </Dropdown>
                </>
          )
        }else{
          return (
            <>
            <Dropdown
                menu={{
                    items:CustomOptions,
                }}
                trigger='click'
                placement="bottomRight"
                arrow
                >
                <Button icon={<SettingOutlined/>}></Button>
                </Dropdown>
                </>
          )
        }
      }
      const StandardData = [
        {
            key:1,
            switch:(<Switch defaultChecked size='small'/>),
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
            manage:manageDrop('standard')
        }
      ]
      const childrenSorter=(column)=>(a,b)=>{
          const strA=a[column].props.children.join("")
          const strB=b[column].props.children.join("")
          return strA.localeCompare(strB)
      }
      function dateSorter(a, b) {
        const dateA = dayjs(a.mkdate);
        const dateB = dayjs(b.mkdate);
        
        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;
        return 0;
      }

      const CustomColumn=[

        {
            key:'switch',
            title: 'ON/OFF',
            dataIndex: 'switch',
            width: '5%',
            align:'center'
            
        },{
            key:'group',
            title : '알림 그룹',
            dataIndex: 'group',
            width: '10%',
            align:'center',
            sorter: (a, b) => a.group.localeCompare(b.group), 
        },{
            key:'alarmname',
            title : '알림 이름',
            dataIndex: 'alarmname',
            width: '10%',
            align:'center',
            sorter: (a, b) => a.alarmname.localeCompare(b.alarmname), 
        },{
            key:'domain',
            title:(
                <>
                    [사이트명]<br/>
                    도메인
                </>
            ),
            dataIndex: 'domain',
            width: '10%',
            align:'center',
            sorter : childrenSorter('domain'),
          },{
            key:'condition',
            title : '조건',
            dataIndex: 'condition',
            width: '13%',
            align:'center',
            sorter: childrenSorter('condition'), 
        },{
            key:'method',
            title : '수신 방법',
            dataIndex: 'method',
            width: '9%',
            align:'center',
            sorter: childrenSorter('method'), 
        },{
            key:'receiver',
            title : '수신자',
            dataIndex: 'receiver',
            width: '7%',
            align:'center',
            sorter: (a, b) => a.receiver.localeCompare(b.receiver), 
        },{
            key:'period',
            title : '주기',
            dataIndex: 'period',
            width: '10%',
            align:'center',
            sorter: childrenSorter('period'), 
        },{
            key:'constructor',
            title : '생성자',
            dataIndex: 'constructor',
            width: '10%',
            align:'center',
            sorter: (a, b) => a.constructor.localeCompare(b.constructor), 
        },{
            key:'mkdate',
            title : '생성일시',
            dataIndex: 'mkdate',
            width: '10%',
            align:'center',
            sorter: dateSorter, 
        },{
          key:'manage',
          title : '관리',
          dataIndex: 'manage',
          width: '10%',
          align:'center',
          sorter: (a, b) => a.manage.localeCompare(b.manage), 
      },
      ]
      const CustomOptions =[
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
            label:'삭제',
            value:'history'
        },
      ]
      const CustomData = [
        {
            key:1,
            switch:'on',
            group: '네이버 광고',
            alarmname:'계정 알림',
            domain:<>
                  [비즈스프링]<br/>bizspring.co.kr
            </>,
            condition:(
                <>
                    네이버<br/> 광고비 잔액 1000원 미만<br/>
                </>
            ),
            method :<>
                    이메일<br/>
                    카카오톡<br/>
            </>,
            receiver:'마케팅1팀',
            period:(
                <>
                    매일 9시<br/>(주말제외)
                </>
            ),
            constructor:'김서연',
            mkdate:'2021/01/01',
            manage:manageDrop()
        },  {
          key:2,
          switch:'off',
          group: '카카오 광고',
          alarmname:'순위권 이탈 알림',
          domain:<>
                [A 비즈스프링]<br/>bizspring.co.kr
          </>,
          condition:(
              <>
                  카카오<br/> 순위권이 3위를 벗어날 경우<br/>
              </>
          ),
          method :<>
                  이메일<br/>
          </>,
          receiver:'마케팅3팀',
          period:(
              <>
                  매일 14시<br/>(주말제외)
              </>
          ),
          constructor:'팀 쿡',
          mkdate:'2022/07/15',
          manage: manageDrop()
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
            <Table style={{marginTop:16}}className='StandardDataTable' bordered columns={StandardColumn} dataSource={StandardData} />
        </div>
        <div className='WhiteBox'>
            <div>
                <span style={{fontSize:20,fontWeight:1000, marginRight:10}}>맞춤 알림</span>
                <span>사용자가 정의한 맞춤 알림 항목입니다.</span>
            </div>
            <SearchableTable column={CustomColumn}  IncomeData={CustomData}/>
            <div>
            <Button>
            <Link to="/Demo">새 알림 등록</Link>
            </Button>     
            </div>
        </div>
      </>
    )

}

export default ListSet