import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, theme, Affix, Menu,Tag} from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined,BellFilled,AppstoreFilled,UserOutlined,CrownOutlined,PoweroffOutlined} from "@ant-design/icons";
import {MdOutlineApps} from 'react-icons/md'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Header } = Layout;

const Gnb = ({ onValueChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [top, setTop] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const lightTextRef = useRef(null);
  const leftpartRef = useRef(null);

  useEffect(() => {
      if (collapsed) {
        lightTextRef.current.style.width = "0";
        leftpartRef.current.style.width = "54";
        leftpartRef.current.style.paddingRight= "0";
      } else {
        lightTextRef.current.style.width = "auto";
        leftpartRef.current.style.width = "auto";
        leftpartRef.current.style.paddingRight= "34px";
      }
  }, [collapsed]);


  const gnbItems = [
    {
      label :(
        <a
          href="https://docs.google.com/document/d/1MekkUblxY_1wMOBO78BKGx7QckOBiFhT/edit?usp=sharing&ouid=107943518726383742638&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
        ><Tag color="geekblue">Guide</Tag>
        </a>
      ),
      key : 'guide',
    },
    {
      label: '',
      key: 'mail',
      icon: <BellFilled />,
      children: [
        {
          label: 'item 1'
        },
        {
          label: 'item 2'
        },
      ],
    },
    {
      label: '',
      key: 'SubMenu',
      icon: <AppstoreFilled />,
      children: [
        {
          label: 'Item 1',
        },
        {
          label: 'item 2'
        },
      ],
    },
    {
      icon: <UserOutlined />,
      label: '{Name}',
      key: 'user',
      children: [
        {
          icon: <UserOutlined/>,
          label: 'my account',
          key: 'myAccount',
        },
        {
          icon: <CrownOutlined />,
          label: 'admin',
          key: 'admin',
        },
        {
          icon: <PoweroffOutlined />,
          label: 'Log Out',
          key: 'logout'
        }
      ]
    },
];
  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    onValueChange(collapsed);
  }, [collapsed, onValueChange]);

  return (
    <Layout>
      <Affix offsetTop={top}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            width: "100%",
            height: "61px",
          }}
        >
          <div className="top-left-part" ref={leftpartRef}>

          <Link to="/" className="Logo">
            <div style={{height:'60px'}}>
            <img
              src={process.env.PUBLIC_URL + "/admin-logo-dark.png"}
              alt="home"
              className="light-logo"              
              />

            <img
              src={process.env.PUBLIC_URL + "/admin-text-dark.png"}
              alt="home"
              className="light-text"
              ref={lightTextRef}
              ></img>
              </div>
          </Link>
          </div>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleChange}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="top-right-part">
          < Menu mode="horizontal" items={gnbItems} style={{height:'60px', flexDirection: "row",
        justifyContent: "flex-end"}}/>
          </div>
        </Header>
      </Affix>
    </Layout>
  );
};

export default Gnb;
