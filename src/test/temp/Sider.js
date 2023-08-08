import React,{useCallback, useEffect, useMemo, useState} from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link,useLocation, useNavigate   } from "react-router-dom";
import { Layout, Menu, Divider,Select } from "antd";
import AdData from "../data/AdData";




const { Sider } = Layout;
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


const Lnb = ({ collapsed ,onValueChange}) => {
  const location = useLocation();
  
  const currentPath = location.pathname;
  const currentPage = (location.search).split('=')[1]
  const [selectedAd,setSelectedAd] = useState();
  const [selectedSider, setSelectedSider] = useState(sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key));

  useEffect(() => {
    setSelectedSider(sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key))
  }, [location,currentPath])
  


  console.log('selectedSider',selectedSider)


  console.log('location',location)


  const Adselect = () => {

    let data;
    let defaultValue;
    const navigate = useNavigate();
      if (currentPath === "/") {
        data = [
          { label: "전체광고주", value: "0" },
          ...AdData.map((item) => ({ label: item.name, value: item.value })),
        ];
        if(currentPage === undefined || currentPage === ''){
          setSelectedAd(data[0].value)
        }
        else{
          const value = data.findIndex((item)=> item.value===currentPage)
          setSelectedAd(currentPage)
        }
      } else {
        data = [...AdData.map((item) => ({ label: item.name, value: item.value }))];
        if (location.search === '') {
          setSelectedAd(data[0].value);
        }else{
          const value = data.findIndex((item)=> item.value===currentPage)
          setSelectedAd(currentPage);
        }
      }


    const adSelect =(option)=>{
      const index = data.findIndex((item)=>item.value = option.value)
      setSelectedAd(option.value);
      onValueChange(option)
      handleToMove(option.value)
    }
    const handleToMove = (clientSeq) => {
      navigate({
        pathname: currentPath,
        search: `?clientSeq=${clientSeq}`,
      });
    };

    return (
      <>
            <Select
              showSearch
              style={{
                width: 200,
              }}
              options={data}
              placeholder="Search to Select"
              optionFilterProp="children"
              value={selectedAd}
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              onChange={(value, option) => {
                adSelect(option)
                }}>
              </Select>
      </>
    );
  };
  


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
        defaultSelectedKeys={selectedSider}
        items={sideItems}
        // selectedKeys={(sideItems.find((item)=> item.value === currentPath)).key}
        />
    </Sider>
        </>
  );
};

export default Lnb;
