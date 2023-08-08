/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link,useLocation, useNavigate   } from "react-router-dom";
import { SelectPicker } from "rsuite";
import { Layout, Menu, Divider,Select } from "antd";
import AdData from "../data/AdData";




const { Sider } = Layout;

const Lnb = ({ collapsed ,onValueChange}) => {
  // const [data,setData] = useState();
  
  
  
  const location = useLocation();
  const currentPath = location.pathname;
  const sideItems =[
    {
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
const [selectedAd,setSelectedAd] = useState(

);
const MatchedKey = sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key);
const [sideItemsValue, setSideItemsValue] = useState(MatchedKey)


const Adselect = () => {
  
    let data;
    let defaultValue;
    const navigate = useNavigate();
    const [search, setsearch] = useState(location.search)

    if (location.pathname === "/") {
      data = [
        { label: "전체광고주", value: "0" },
        ...AdData.map((item) => ({ label: item.name, value: item.value })),
      ];
      if(search === ''){
      defaultValue = '0'; // Set the default value to "0" if the current path is "/"
      }else{
        setSelectedAd(search.split('=')[1])
      }
    } else {
      data = AdData.map((item) => ({ label: item.name, value: item.value }));
      // const ad = AdData.find((item) => item.value === location.pathname.split("/")[2]);
      // defaultValue =AdData[0].value; // Find the corresponding ad value in AdData based on the current path
      if(search === ''){
      defaultValue = data[0]; 
      }else{
        if (selectedAd && selectedAd.value === "0") {
          setSelectedAd(data[0]);
        }else{
          setSelectedAd(search.split('=')[1])
        }
      }
    }

    const adSelect =(data)=>{
      setSelectedAd(data);
      onValueChange(data)
    }
    const handleToMove = (clientSeq) => {
      navigate({
        pathname: currentPath,
        search: `?clientSeq=${clientSeq}`,
      });
    };

    const handleSelectChange = (value, option) => {
      setSelectedAd(option);
    };
    return (
      <>
            <Select
              showSearch
              style={{
                width: 200,
              }}
              options={data}
              optionFilterProp="children"
              defaultValue={defaultValue}
              value={selectedAd}
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              onChange={(value, option) => {
                handleToMove(value);
                handleSelectChange(value, option);
                }}>
              </Select>
      </>
    );
  };



  useEffect(() => {
    onValueChange(selectedAd);
  }, [selectedAd,onValueChange]);

  useEffect(() => {
    setSideItemsValue(MatchedKey)
  },[currentPath]);
 
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
        zIndex: 4,
      }}
      width= '240px'
      collapsedWidth="0"
      >
      <div className="demo-logo-vertical" />
      <div className="sider-selector">
        <span style={{fontSize:'14px', color:'white'}}>광고주 선택</span>
        <Adselect />
      </div>
      <Divider style={{ borderColor: "#273240" }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={sideItemsValue}
        items={sideItems}
        // selectedKeys={(sideItems.find((item)=> item.value === currentPath)).key}
        />
    </Sider>
        </>
  );
};
export default Lnb;
