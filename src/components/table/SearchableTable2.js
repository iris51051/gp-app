import React, { useState,useEffect } from 'react';
import { Button, Table, Input,Select,Switch } from 'antd';
import {
  ReloadOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AddAlarm from "../../temp/alarm/setting/AddAlarm"

const SearchableTable = ({columns,IncomeData}) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(IncomeData);
  const [searchOptions, setSearchOptions] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setData(IncomeData);
    setSortedInfo({});
  };

  const { Search } = Input;

  const onSearch = (value) => {
    setSearchText(value);
    const filteredData = IncomeData.filter((item) => {
      const itemValues = Object.values(item);
      return itemValues.some((itemValue) =>
        itemValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredInfo({});
    setSortedInfo({});
    setData(filteredData);
  };

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
          <Button 
          style={{marginRight:10}}
          onClick={clearAll}>
              <ReloadOutlined />
            </Button>
          <Select
          style={{marginRight:10}}
          options={searchOptions}
          >

          </Select>
          <Search
              placeholder="검색"
              onSearch={onSearch}
              className="searchBtn"
            />

          </div>
        </div>
        <Table
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
