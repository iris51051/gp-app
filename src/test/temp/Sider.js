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
  value : "/temp/alarm",
  label: '모니터링 알람',
  children: [
    {
      key: "4-1",
      value : "/temp/alarm/setting",
      label: (
        <Link to="/temp/alarm/setting">알람 설정</Link>
        ),
      },
    {
      key: "4-2",
      value : "/temp/alarm/story",
      label: (
        <Link to="/temp/alarm/story">
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
  const [currentPage, setCurrentPage] = useState((location.search).split('=')[1]);
  const [selectedAd,setSelectedAd] = useState();
  const [selectedSider, setSelectedSider] = useState(sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key));
  const defaultData = [ { label: "전체광고주", value: 0 },...AdData.map((item) => ({ label: item.name, value: item.value }))]
  const [selectordata, setSelectordata] = useState(defaultData)
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [menuCollapsed, setMenuCollapsed] = useState(true)
  // let selectordata;

  useEffect(() => {
    setSelectedSider(sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key))
    setCurrentPage((location.search).split('=')[1]);
    const matchingKeys = findMatchingMenuItem(sideItems, currentPath);
    if(currentPath === '/'){
      setSelectordata(defaultData)
    }else{
      const newValue = defaultData.filter((item)=>item.value !== 0)
      setSelectordata(newValue)
      setSelectedSider(matchingKeys);
      setExpandedKeys((matchingKeys.slice(0, -1).toString()))
    }
  }, [location,currentPath])

  const Adselect = () => {

    // let selectordata;
    const navigate = useNavigate();
    
    useEffect(() => {
      if (currentPath === "/") {
        if(currentPage >0){
          setSelectedAd(currentPage)
        }
        else{
          setSelectedAd(0)
        }
      } else {
        if (currentPage >0 ) {
          setSelectedAd(currentPage);
        }else{
          setSelectedAd(selectordata[0].value);
        }
      }
    }, [location, currentPage, currentPath])
    const adSelect =(option)=>{
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
              options={selectordata}
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



  // Function to find the matching menu item and its parent keys
  const findMatchingMenuItem = (items, path, parentKeys = []) => {
    for (const item of items) {
      if (item.value === path) {
        return [...parentKeys, item.key];
      } else if (item.children) {
        const childResult = findMatchingMenuItem(item.children, path, [
          ...parentKeys,
          item.key,
        ]);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  };
  const onOpenChange = (keys) => {
    if (expandedKeys.length > 0) {
      // If expandedKeys has values, update the state with new keys
      setExpandedKeys(keys);
    } else {
      // If expandedKeys is empty, open/close submenus normally
      const latestOpenKey = keys.find((key) => expandedKeys.indexOf(key) === -1);
      if (sideItems.some((item) => item.key === latestOpenKey)) {
        setExpandedKeys([latestOpenKey]);
      } else {
        setExpandedKeys([]);
      }
    }
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
        selectedKeys={selectedSider}
        openKeys={expandedKeys}
        defaultOpenKeys={expandedKeys.length > 0 ? expandedKeys : []}
        onOpenChange={onOpenChange} // Pass the function here
        items={sideItems}
      />
    </Sider>
        </>
  );
};

export default Lnb;
