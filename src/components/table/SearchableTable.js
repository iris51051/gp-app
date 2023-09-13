import React, { useState,useEffect } from 'react';
import { Button, Table, Input,Select,Switch } from 'antd';
import {
  ReloadOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AddAlarm from "../../temp/alarm/setting/AddAlarm"

const SearchableTable = ({column,IncomeData}) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(IncomeData);
  const [searchOptions, setSearchOptions] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  
  const clearAll = () => {
    setData(IncomeData);
  };

  const { Search } = Input;

  const onSearch = (value) => {
    if(value===""){
      clearAll()
    }else{
      setSearchText(value);
      const filteredData = data.filter((item) => {
        const itemValues = Object.values(item);
        return itemValues.some((itemValue) =>
          itemValue.toString().toLowerCase().includes(value.toLowerCase())
        );
      });
      setData(filteredData);
    }
  };

  const pageOption=[
    {
      value: 10,
      label: '10',
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
  const pageChange =(value)=>{
    const newValue = {
      current: 1,
      pageSize: value,
    }

    setTableParams(newValue)
  }



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
            allowClear
            style={{marginRight:10}}
              placeholder="검색"
              onSearch={onSearch}
              className="searchBtn"
            />
            <Select
            style={{width:70}}
              defaultValue={10}
              options={pageOption}
              onChange={pageChange}
            ></Select>
          </div>
        </div>
        <Table
            rowSelection={{
              selectedRowKeys, // Step 1: Pass the selected row keys
              onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys), // Step 1: Update selected row keys
            }}
            columns={column.map((col) => ({
            ...col,
            render: (text, record) => {
                if (col.dataIndex === 'switch') {
                  return (
                    <Switch
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      size='small'
                      checked={record.switch === 'on'}
                      onChange={() => changeSwitch(record.key)}
                      onClick={() => ClickedSwitch(record.key)}
                       />
                  );
                }else{
                  return text
                }
            }
          }))}
            bordered
            dataSource={data}
            showSorterTooltip={false}
            pagination={tableParams.pagination}
            size='small'
        />
      </div>
    </>
  );
};
export default SearchableTable;
