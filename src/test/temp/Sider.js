import React,{useEffect, useState} from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link,useLocation  } from "react-router-dom";
import { SelectPicker } from "rsuite";
import { Layout, Menu, Divider,Select } from "antd";
import AdData from "../data/AdData";




const { Sider } = Layout;

const Lnb = ({ collapsed ,onValueChange}) => {
  // const [data,setData] = useState();

  const location = useLocation();
  const currentPath = location.pathname;
  console.log('currentPath',currentPath)
  
  const sideItems =[{
    key: "0",
    icon: <UserOutlined />,
    value : "/",
    label: <Link to="/">통합대시보드</Link>,
  },
  {
    key: "1",
    icon: <VideoCameraOutlined />,
    value : "/temp/modules",
    label: <Link to="/temp/modules">모듈샘플</Link>,
  },
  {
    key: "2",
    icon: <UploadOutlined />,
    value : "/temp/apitest",
    label: <Link to="/temp/apitest">API테스트 페이지</Link>,
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    value : "/temp/report/Exam",
    label: <Link to="/temp/report/Exam">리포트</Link>,
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    value : "/temp/monitoring/alarm",
    label: <Link to="/temp/monitoring/alarm">모니터링 알람</Link>,
    children: [
      {
        key: "4-1",
        value : "/temp/monitoring/alarm-setting",
        label: (
          <Link to="/temp/monitoring/alarm-setting">알람 설정</Link>
          ),
        },
      {
        key: "4-2",
        value : "/temp/monitoring/alarm-story",
        label: (
          <Link to="/temp/monitoring/alarm-story">
            알람 실행 스토리
          </Link>
        ),
      },
    ],
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    value : "/temp/media/export",
    label: <Link to="/temp/media/export">매체 데이터 내보내기</Link>,
  },
  {
    key: "6",
    icon: <UploadOutlined />,
    value :"/temp/media/download",
    label: <Link to="/temp/media/download">매체 데이터 다운로드</Link>,
  },

  ]
  const [selectedAd,setSelectedAd] = useState();


  const Adselect = () => {

    let data;
    let defaultValue;
    
    if (location.pathname === "/") {
      data = [
        { label: "전체광고주", value: "0" },
        ...AdData.map((item) => ({ label: item.name, value: item.value })),
      ];
      defaultValue = '0'; // Set the default value to "0" if the current path is "/"

    } else {
      data = AdData.map((item) => ({ label: item.name, value: item.value }));
      const ad = AdData.find((item) => item.value === location.pathname.split("/")[2]);
      defaultValue =AdData[0].value; // Find the corresponding ad value in AdData based on the current path

    }
    console.log("defalut 설정 준비 중",AdData[0].value, data[0].value, AdData[0].value===data[0].value)
    console.log("defalut 설정 준비 중",data)
    console.log("defalut 설정 준비 중",location.pathname ==='/')
    const adSelect =(data)=>{
      setSelectedAd(data);
      onValueChange(data)
    }
    return (
      <>
          {/* <SelectPicker
            data={data}
            style={{ width: 224 }}
            cleanable={false}
            defaultValue={defaultValue}
            value={selectedAd}
            onSelect={adSelect}
          /> */}
            <Select
              showSearch
              style={{
                width: 200,
              }}
              options={data}
              placeholder="Search to Select"
              optionFilterProp="children"
              defaultValue={defaultValue}
              filterOption={(input, option) => (option?.label ?? '').includes(input)}>

              </Select>
      </>
    );
  };
  useEffect(() => {
    onValueChange(selectedAd);
  }, [selectedAd,onValueChange]);

  return (
<>
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        height: "100vh",
        position: 'fixed',
        top: 61,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
      width= '240px'
      collapsedWidth="0"
      >
      <div className="demo-logo-vertical" />
      <div className="sider-selector">
        <span>광고주 선택</span>
        <Adselect />
      </div>
      <Divider style={{ borderColor: "#273240" }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={sideItems}
        // selectedKeys={(sideItems.find((item)=> item.value === currentPath)).key}
        />
    </Sider>
        </>
  );
};
export default Lnb;
