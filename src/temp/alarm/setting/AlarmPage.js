import React, { useState,useEffect } from "react";
import { Button, Table, Select, Input, Breadcrumb, Form, Dropdown,Switch } from "antd";
import RecipientRow from "./RecipientRow";

import {
  SettingOutlined
} from "@ant-design/icons";
const { Search } = Input;

 const AlarmPage = () => {
  // const [form] = Form.useForm();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [onOff, setOnOff] = useState(true);
  const [addGroup, setAddGroup] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1, pageSize: 10, showSizeChanger: false },
    sorter: { field: "", order: "" },
  });

  const { sorter } = tableParams;
  const ManageDropdown=()=>{
    const option=[
      {
          key:1,
          label:'수정',
          value:'edit'
      },
      {
          key:2,
          label:'복사',
          value:'copy'
      },
      {
          key:3,
          label:'삭제',
          value:'delete'
      },
    ]
    return (
      <>
            <Dropdown
                menu={{
                    items:option,
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
  const columns = [
    {
      title: "ON/OFF",
      key: "switch",
      dataIndex: "switch",
      align: "center",
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
    },
    {
      title: "수신자 그룹명",
      key: "groupNm",
      dataIndex: "groupNm",
      align: "center",
      sorter: (a, b) => {
        // Extract the strings without numbers
        const aGroup = a.groupNm || ''; // Ensure 'a.group' is not null or undefined
        const bGroup = b.groupNm || ''; // Ensure 'b.group' is not null or undefined
  
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
    },
    {
      title: "수신자",
      key: "recipient",
      dataIndex: "recipient",
      align: "center",
    },
    {
      title: "생성자",
      key: "constructor",
      dataIndex: "constructor",
      align: "center",
    },
    { title: "생성 일시", key: "datetime", align: "center" },
    {
      title: "관리",
      key: "management",
      align: "center",
      render: () => <ManageDropdown />,
    },
  ];
  const dataSource = [];
  
  const team = ['기획','마케팅','홍보','기술','개발','디자인']
  for(let i =0; i<team.length; i++){
    for (let j = 1; j < 21; j++) {
      const dummyObj = {
        key: dataSource.length+1,
        switch: j%2===1? 'on':'off',
        groupNm: `${team[i]}${j}팀`,
        constructor: "김서연",
      };
      dataSource.push(dummyObj);
    }
  }

  const [data, setData] = useState(dataSource)

  const handlePageChange = (page, pageSize) => {
    console.log('page',page)
    console.log('pageSize',pageSize)
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: { current: 1, pageSize: page,showSizeChanger:false}
    }));
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log('pagination',pagination)
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: 
        pagination
      ,
    }));
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setSelectedRowKeys([])
  };

  useEffect(() => {
    if (searchText === "") {
      setData(dataSource);
    } else {
      const filteredData = dataSource.filter((item) => {
        const itemValues = Object.values(item);
        return itemValues.some((itemValue) =>
          itemValue.toString().toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setData(filteredData);
    }
  }, [searchText])



  const initialRecipientData = [
    {
      id: 1,
      name: "",
      katalkId: "",
      email: "",
    },
  ];
  const [recipientData, setRecipientData] = useState(initialRecipientData);



  const handleAddGroup = () => {
    setAddGroup(!addGroup);
    setRecipientData(initialRecipientData);
    console.log(recipientData);
  };
  const handleRecipientChange = (id, field, value) => {
    setRecipientData((prevData) =>
      prevData.map((recipient) =>
        recipient.id === id ? { ...recipient, [field]: value } : recipient
      )
    );
  };
  const handleAddRecipientRow = () => {
    setRecipientData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        name: "",
        katalkId: "",
        email: "",
      },
    ]);
  };
  const handleDeleteRecipientRow = (id) => {
    if (id === 1) {
      setRecipientData((prevData) => [
        {
          id: 1,
          name: "",
          katalkId: "",
          email: "",
        },
        ...prevData.slice(1),
      ]);
    } else {
      setRecipientData((prevData) =>
        prevData
          .filter((recipient) => recipient.id !== id)
          .map((recipient, index) => ({ ...recipient, id: index + 1 }))
      );
    }
  };
  const changeSwitch =(value)=>{
    if(value==='on'){
      const updatedData = data.map((item) => {
        if (selectedRowKeys.includes(item.key)) {
          return { ...item, switch: "on" };
        }
        return item;
      });
      console.log('updatedData',updatedData)
      setData(updatedData)
    }else if(value ==='off'){
      const updatedData = data.map((item) => {
        if (selectedRowKeys.includes(item.key)) {
          return { ...item, switch: "off" };
        }
        return item;
      });
      console.log('updatedData',updatedData)
      setData(updatedData)
    }
  }

  
  const ClickedSwitch=(value)=>{
    console.log('ClickedSwitch',value)
  }
  // console.log('dataSource',dataSource)
  console.log('tableParams',tableParams.pagination)
  return (
    <>
    <div>

      <div>
        <div
          style={{
            fontSize: "14px",
            paddingBottom: "0px",
            marginBottom: "50px", // 임시
            marginRight: 0,
            padding: "15px 10px 9px",
            marginLeft: "-25.5px",
          }}
        >
            <div style={{ width: "50%", float: "left", paddingLeft: "15px" }}>
              <Breadcrumb
                separator=">"
                items={[
                  { title: "모니터링 알림" },
                  { title: "알림 설정" },
                  { title: "알림 수신자 설정" },
                ]}
              />
            </div>
      </div>
      <div style={{ marginRight: "-15px", marginLeft: "-15px" }}>
        <div
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
            position: "relative",
            minHeight: "1px",
            float: "left",
            width: "100%",
          }}
        >
          {" "}
          {addGroup ? (
            <>
              <table className="custom_table font12">
                <colgroup>
                  <col width="10%"></col>
                  <col width="90%"></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>수신자 그룹명</th>
                    <td>
                      <Input
                        placeholder="수신자 그룹명을 입력하세요."
                        style={{ width: "60%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>수신자</th>
                    <td id="recipient_reg_div">
                      {recipientData.map((recipient, index) => (
                        <RecipientRow
                          key={recipient.id}
                          recipient={recipient}
                          onRecipientChange={handleRecipientChange}
                          onAddRecipient={
                            index === recipientData.length - 1
                              ? handleAddRecipientRow
                              : undefined
                          }
                          onDeleteRecipientRow={handleDeleteRecipientRow}
                        />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                className="fr"
                style={{ paddingTop: "15px", justifyContent: "space-between" }}
              >
                <Button type="default" onClick={handleAddGroup}>
                  취소
                </Button>
                <Button
                  type="primary"
                  onClick={handleAddGroup}
                  style={{ marginLeft: "8px" }}
                >
                  저장
                </Button>
              </div>
            </>
          ) : (
            <>
            <div className='WhiteBox'>
              <div className="fl">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#41b3f9",
                    padding: "5px 10px",
                    float: "left",
                    fontSize: "12px",
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",

                  }}
                  onClick={handleAddGroup}
                >
                  수신자 그룹 등록
                </Button>
                <Button
                  type="default"
                  style={{
                    padding: "5px 10px",
                    float: "left",
                    fontSize: "12px",
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                    zIndex: 1,
                  }}
                >
                  삭제
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
              </div>
              <div className="fr">
                <Select
                  defaultValue={{ value: 10, label: "10" }}
                  options={[
                    { value: 10, label: "10" },
                    { value: 25, label: "25" },
                    { value: 50, label: "50" },
                    { value: 100, label: "100" },
                  ]}
                  style={{ width: 80, float: "right" }}
                  onChange={handlePageChange}
                ></Select>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <Search
                    onChange={(event) => setSearchText(event.target.value)}
                  />
                </div>
              </div>
              <div>
                <Table
                  rowSelection={{
            selectedRowKeys, // Step 1: Pass the selected row keys
            onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys), // Step 1: Update selected row keys
          }}
          id="table"
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          showSorterTooltip={false}
          pagination={tableParams.pagination}
          size='small'
                />
              </div>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
      </div>
      </>
  );
};
export default AlarmPage