import React, { useState,useEffect } from 'react';
import { Button, Table, Input,Select,Switch,Dropdown } from 'antd';
import {
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import AddAlarm from "../../temp/alarm/setting/AddAlarm"

const SearchableTable = ({IncomeData}) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(IncomeData);
  const [searchOptions, setSearchOptions] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


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

  const columns=[
    {
        key:'switch',
        title: 'ON/OFF',
        dataIndex: 'switch',
        width: '5%',
        align:'center',
        render: (_, record) => {
          return (
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              size="small"
              checked={record.switch === "on"}
              onChange={() => changeSwitch(record.key)}
              onClick={() => ClickedSwitch(record.key)}
            />
          );
        },
    },{
        key:'group',
        title : '알림 그룹',
        dataIndex: 'group',
        width: '10%',
        align:'center',
        sorter: (a, b) => {
          // Extract the strings without numbers
          const aGroup = a.group || ''; // Ensure 'a.group' is not null or undefined
          const bGroup = b.group || ''; // Ensure 'b.group' is not null or undefined
    
          // Extract the strings without numbers
          const aStr = aGroup.replace(/\d+/g, '');
          const bStr = bGroup.replace(/\d+/g, '');
    
          // Compare the strings alphabetically
          const strComparison = aStr.localeCompare(bStr);
    
          // If the strings are equal, compare the numeric parts
          if (strComparison === 0) {
            const aNum = parseInt(aGroup.match(/\d+/)?.[0] || '0');
            const bNum = parseInt(bGroup.match(/\d+/)?.[0] || '0');
            return aNum - bNum;
          }
    
          return strComparison;
        },
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
        render: (_, record) => {
          return (
            `[${record.profile_nm}] ${record.site_url}`
          );
        },
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
        sorter: (a, b) => {
          // "receiver" 속성을 문자열로 변환하고 숫자만 추출하여 비교
          const aNum = parseInt(a.receiver.match(/\d+/)[0]);
          const bNum = parseInt(b.receiver.match(/\d+/)[0]);
    
          return aNum - bNum;
        },
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
      render: () => (
        <Dropdown
          menu={{
            items: CustomOptions,
          }}
          trigger='click'
          placement="bottomRight"
          arrow
        >
          <Button icon={<SettingOutlined />}></Button>
        </Dropdown>
      ),
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

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setSelectedRowKeys([])
  };

  const { Search } = Input;

  useEffect(() => {
    if (searchText === "") {
      setData(IncomeData);
    } else {
      const filteredData = IncomeData.filter((item) => {
        const itemValues = Object.values(item);
        return itemValues.some((itemValue) =>
          itemValue.toString().toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setData(filteredData);
    }
  }, [searchText])

  const pageOption=[
    {
      value: 10,
      label: '50',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 100,
      label: '100',
    },
  ]

const changeSwitch =(value)=>{
  if(value==='on'){
    const updatedData = data.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        return { ...item, switch: "on" };
      }
      return item;
    });
    setData(updatedData);
  }else if(value ==='off'){
    const updatedData = data.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        return { ...item, switch: "off" };
      }
      return item;
    });
    setData(updatedData);
  }
}
const ClickedSwitch = (key) => {
  const updatedData = data.map((item) => {
    if (item.key === key) {
      return { ...item, switch: item.switch === 'on' ? 'off' : 'on' };
    }
    return item;
  });
  setData(updatedData);
};
  
  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 16,
            marginTop : 16
          }}
        >
          <div style={{ marginRight: 'auto' }}>
            <Button
              className='addAlram'
              style={{marginRight:10}}
              type="primary"
              icon={<PlusOutlined />}
            >
            <Link to="/add-alarm">새 알림 등록</Link>
            </Button>
            <Button
            style={{borderRadius:0,}}
            className='checkedbtn'
            onClick={()=>changeSwitch('on')}
            >
              ON
            </Button>
            <Button
            style={{borderRadius:0,marginRight:10}}
            className='uncheckbtn'
            onClick={()=>changeSwitch('off')}
            >
              OFF
            </Button>
            <Button>
              삭제
            </Button>
          </div>

          <div style={{ display: 'flex' }}>
          <Select
          style={{marginRight:10}}
          options={searchOptions}
          >

          </Select>
          <Search
              placeholder="검색"
              onChange={(event) => setSearchText(event.target.value)}
              className="searchBtn"
            />

          </div>
        </div>
        <Table
          rowSelection={{
            selectedRowKeys, // Step 1: Pass the selected row keys
            onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys), // Step 1: Update selected row keys
          }}
          className='ADResultTable'
          id="table"
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          showSorterTooltip={false}
          size='small'
        />
      </div>
    </>
  );
};
export default SearchableTable;
