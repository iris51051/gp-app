import React,{useEffect, useState} from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SelectPicker } from "rsuite";
import { Layout, Menu, Divider } from "antd";
import AdData from "../data/AdData";




const { Sider } = Layout;

const Lnb = ({ collapsed ,onValueChange}) => {
  const [selectedAd,setSelectedAd] = useState('0');

  const Adselect = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const adSelect =(data)=>{
      setSelectedAd(data);
      onValueChange(data)
    }
    const data =[{label:'전체광고주', value:'0'},...AdData.map((item) => ({ label: item.name, value: item.value }))];
    const handleMouseEnter = () => {
      setIsMenuOpen(true);
    };
  
    const handleMouseLeave = () => {
      setIsMenuOpen(false);
    };
  
    return (
    // <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    // <SelectPicker data={data} open={isMenuOpen} style={{ width: 224 }} cleanable={false} defaultValue={0} value={selectedAd} onChange={adSelect}/>
    // </div>
    <SelectPicker data={data} style={{ width: 224 }} cleanable={false} defaultValue={0} value={selectedAd} onChange={adSelect}/>
    )
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
        items={[
          {
            key: "0",
            icon: <UserOutlined />,
            label: <Link to="/">통합대시보드</Link>,
          },
          {
            key: "1",
            icon: <VideoCameraOutlined />,
            label: <Link to="/temp/modules">모듈샘플</Link>,
          },
          {
            key: "2",
            icon: <UploadOutlined />,
            label: <Link to="/temp/report-down">보고서 다운로드</Link>,
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: <Link to="/temp/monitoring/alarm">모니터링 알람</Link>,
            children: [
              {
                key: "3-1",
                label: (
                  <Link to="/temp/monitoring/alarm-setting">알람 설정</Link>
                  ),
                },
              {
                key: "3-2",
                label: (
                  <Link to="/temp/monitoring/alarm-story">
                    알람 실행 스토리
                  </Link>
                ),
              },
            ],
          },
          {
            key: "4",
            icon: <UploadOutlined />,
            label: <Link to="/temp/media/upload">매체 파일 업로드</Link>,
          },
          {
            key: "5",
            icon: <UploadOutlined />,
            label: <Link to="/temp/media/export">매체 데이터 내보내기</Link>,
          },
          {
            key: "6",
            icon: <UploadOutlined />,
            label: <Link to="/temp/media/download">매체 데이터 다운로드</Link>,
          },
        ]}
        />
    </Sider>
        </>
  );
};
export default Lnb;
