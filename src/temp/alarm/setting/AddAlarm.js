import React, { useState } from 'react'
import { Breadcrumb,Button, Form,Input,Radio,ConfigProvider,Select,Divider,Checkbox,Space,Slider,Tooltip } from "antd";
import {FileSearchOutlined,VideoCameraOutlined,ColumnWidthOutlined} from '@ant-design/icons'
import {
    CaretDownOutlined,
    CaretUpOutlined
  } from "@ant-design/icons";

  import {
    FaFaceFrown,
    FaFaceFrownOpen,
    FaFaceMeh,
    FaFaceSmile,
  } from "react-icons/fa6";

  import SelectTargetModal from "./SelectTargetModal";

export const AddAlarm=()=>{
    const [collapse, setCollapse] = useState(false)
    const [selectedPreset, setSelectedPreset] = useState(null)
    const [form] = Form.useForm();
    const [radioValue, setRadioValue] = useState();
    const handleRadioChange = (e) => setRadioValue(e.target.value);
    const [targetList, setTargetList] = useState([]);
    const items = [
        { title: " 모니터링알림", href: "/" },
        { title: "알림 설정",href: "/" },
        { title: "새 알림 등록" },
    ];
    const options = [
        { label: "이메일 받기", value: "email" },
        { label: "카카오톡으로 알림 받기", value: "kakao" },
      ];
      const hourCycle = [];
      for (let hour = 0; hour < 24; hour++) {
        const formattedHour = hour < 10 ? `0${hour}시` : `${hour}시`;
        const dummyObj = {
          value: hour,
          label: formattedHour,
        };
        hourCycle.push(dummyObj);
      }
    
      const [selectedHour, setSelectedHour] = useState();
      const valueToHour = (value) => {
        const hour = value >= 0 && value < 3 ? value + 22 : `0${value - 2}`;
        return `${hour}시`;
      };
      const handleSliderChange = (value) => setSelectedHour(value);
      const [importance, setImportance] = useState("");
      const importanceData = [
        {
          value: "low",
          title: "low",
          icon: (
            <FaFaceSmile
              className={importance === "low" ? "face-active" : ""}
              style={{ color: "green", fontSize: "25PX" }}
            />
          ),
        },
        {
          value: "medium",
          title: "medium",
          icon: (
            <FaFaceMeh
              className={importance === "medium" ? "face-active" : ""}
              style={{ color: "#ffdc29", fontSize: "25PX" }}
            />
          ),
        },
        {
          value: "high",
          title: "high",
          icon: (
            <FaFaceFrownOpen
              className={importance === "high" ? "face-active" : ""}
              style={{ color: "orange", fontSize: "25PX" }}
            />
          ),
        },
        {
          value: "critical",
          title: "critical",
          icon: (
            <FaFaceFrown
              className={importance === "critical" ? "face-active" : ""}
              style={{ color: "red", fontSize: "25PX" }}
            />
          ),
        },
      ];
    
    
      const HanbleChangeCollapse =()=>{
        setCollapse((preValue)=>!preValue)
    }
    const collapseStyle={
        margin: '-1px 0 0',
        backgroundColor:'white',
        border:'1px solid #c7c7c7',
        borderCollapse: 'collapse',
        height: collapse ? '0px' : '100%',
        padding: collapse ? 0 : 20,
        flexDirection: 'column',
        width : '100%',
        overflow: 'hidden',
        display: 'flex',
        transition: 'height 0.3s ease',
    }

    const columns =[
        {
            title:'알람 설정 활용',
            border:'1px solid #c7c7c7',
            width:'30%',
            dataIndex:'use'
        },{

            title:'설정 가능한 대상',
            border:'1px solid #c7c7c7',
            width:'25%',
            dataIndex:'target'
        },{

            title:'자주 사용하는 알람 설정 활용 예시',
            border:'1px solid #c7c7c7',
            width:'40%',
            dataIndex:'example'
        },{

            title:'생성',
            border:'1px solid #c7c7c7',
            width:'10%',
            dataIndex:'generate'
        }
    ]
    const Generate =()=>{
        console.log("몰?루")
    }
        const generateBtn=()=>{
        return <Button onClick={Generate}>생성</Button>
    }
    const Examdata =[
        {
            key:1,
            use:'네이버 매체의 잔액이 입력한 조건이 되면 이메일 받기',
            target:'광고 매체사 : 네이버',
            exmaple:'계정 잔액이 10,000원 미만 시 이메일 알림 받기를 설정할 수 있습니다.',
            generate: generateBtn,

        },        {
            key:2,
            use:'네이버 특정 키워드가 입력한 조건이 되면 이메일 받기',
            target:'광고 매체사 : 네이버',
            exmaple:'A키워드의 평균 노출순위가 3위 이하 이면 이메일 받기를 설정 할 수 있습니다.',
            generate: generateBtn,

        }
    ]
    const ExamTdStyle={
        border:'1px solid #c7c7c7',
        padding:10
    }
    const presetData= [
        {
            key : '1',
            title :'Ad',
            icon :<VideoCameraOutlined />,
            text : '광고 운영 알림 조건',
        },
        {
            key: '2',
            title :'Discove',
            icon :<FileSearchOutlined />,
            text : '유입/탐색 알림 조건'
        },
        {
            key : '3',
            title :'Conversion',
            icon :<ColumnWidthOutlined />,
            text : '전환 알림 조건'
        },
    ]
    const selectPreset =(e)=>{
         console.log('누름!!!!!!!!',e.target.value)
         const value = e.currentTarget.getAttribute('data-key')
         if(selectedPreset===value){
            setSelectedPreset(null)
         }else{
            setSelectedPreset(value)
         }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showTargetModal = () => setIsModalOpen(true);
    const handleClose = () => {
      setIsModalOpen(false);
    };

  const onFinish = (values) => {
    // submit
    values.target = targetList;
    console.log(values);
  };
    return (
        <>
        <div style={{marginTop:10,marginBottom:10}}>
            <Breadcrumb separator=">" items={items}/>
        </div>
        <div className='WhiteBox' style={{
            display: 'grid',
            padding:0,
            border:'none'}}>
            <div style={{
                padding:5,
                border: '1px solid #c7c7c7',
                display: 'flex',
                justifyContent: 'flex-end',
                backgroundColor:'#f3f3f3'}}>

                <span style={{
                    marginRight:'auto'
                    }}> 자주 사용하는 알람 유형 활용하기</span>
                    
            {collapse===false ? 
            <CaretDownOutlined style={{ marginRight:'10', fontSize: '20px' }} onClick={HanbleChangeCollapse}/>
            :<CaretUpOutlined style={{marginRight:'10',fontSize: '20px' }} onClick={HanbleChangeCollapse}/>
            }
            </div>
            <div className='AlarmPreset' style={collapseStyle}>
                <div style={{display:'flex', justifyContent:"start"}} className='CardPreset'>
                    {presetData.map((item)=>(
                        <div className={`presetTab ${selectedPreset === item.key ? 'select' : ''}`} key={item.key} data-key={item.key} style={{width:200, height:100, border : '1px solid #c7c7c7', marginRight:20,display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',fontSize: 20}} onClick={selectPreset}>
                            <div  style={{marginBottom:10}}>
                                <span style={{marginRight:20}}>{item.title}</span>{item.icon}
                            </div>
                                <span>{item.text}</span>
                        </div>
                        ))}
                </div>
                <div style={{marginTop:20}}>
                    <table className='ExamTable'>
                        <thead>
                            <tr>
                                {columns.map((column,index) =>(

                                <th key={index} style={{width:column.width, border:column.border, height:50,backgroundColor:'#e7e6e6'}} border={column.border}>{column.title}</th>

                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Examdata.map((item,index)=>(
                                <tr key={index}>
                                    <td style={ExamTdStyle}>{item.use}</td>
                                    <td style={ExamTdStyle}>{item.target}</td>
                                    <td style={ExamTdStyle}>{item.exmaple}</td>
                                    <td style={ExamTdStyle}>{item.generate()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div>
            {/* <Form
                form={form}
                name="Alarm-Custom"
                onFinish={onFinish}
                style={{alignItems:'center'}}
            >
                <table className='AlarmCutromTable'>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th>알림 그룹</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='group'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <div style={{display:'flex', alignContents:'center'}}>
                                <Input></Input>
                                </div>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>알림 이름</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='name'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>알림 유형</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='type'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>대상</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='target'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>실행 유형</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='execute'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>조건</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='condition'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>실행 주기</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='perioid'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>에티켓 시간</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='group'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>중요도(심각도)</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='threat'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >   <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <th>수신자 설정</th>
                            <td style={{padding:10}}>
                            <Form.Item
                                name='reciever'
                                rules={[{
                                    required: true,
                                },]}
                                style={{display:'contents'}}
                            >
                                <Input></Input>
                            </Form.Item>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </Form> */}
            <Form
            form={form}
            onFinish={onFinish}
            // initialValues={{ target: targetList }}
          >
            <table className="custom_table font12">
              <colgroup>
                <col width="10%"></col>
                <col width="90%"></col>
              </colgroup>
              <tbody>
                <tr>
                  <th>알림 그룹</th>
                  <td>
                    <Form.Item
                      name="alarmgroup"
                      // rules={[{ required: true }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input style={{ width: "60%" }} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>알림 이름</th>
                  <td>
                    <Form.Item name="alarmNm" style={{ marginBottom: 0 }}>
                      <Input style={{ width: "60%" }} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>알림 유형</th>
                  <td>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#41b3f9",
                        },
                      }}
                    >
                      <Form.Item name="alarm-type" style={{ marginBottom: 0 }}>
                        <Radio.Group
                          onChange={handleRadioChange}
                          value={radioValue}
                        >
                          <Radio value="ad">광고 운영</Radio>
                          <Radio value="discover">유입/탐색</Radio>
                          <Radio value="conversion">전환 데이터</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </ConfigProvider>
                  </td>
                </tr>
                {radioValue === "ad" && (
                  <>
                    <tr>
                      <td colSpan="2">
                        <div
                          style={{
                            display: "flex",
                            marginTop: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          <div
                            style={{
                              //   borderRight: "2px solid gray",
                              paddingRight: "10px",
                            }}
                          >
                            <p
                              style={{
                                margin: "0 0 10px",
                                fontWeight: "bold",
                              }}
                            >
                              [사이트명] 도메인 선택
                            </p>
                            <Select size="small" style={{ width: 130 }} />
                          </div>
                          <Divider type="vertical" style={{ height: "60px" }} />
                          <div
                            style={{
                              // borderRight: "2px solid gray",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            <p
                              style={{ margin: "0 0 10px", fontWeight: "bold" }}
                            >
                              광고 매체사 선택
                            </p>
                            <Select size="small" style={{ width: 130 }} />
                          </div>
                          <Divider type="vertical" style={{ height: "60px" }} />
                          <div
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            <p
                              style={{ margin: "0 0 10px", fontWeight: "bold" }}
                            >
                              알림 대상 선택
                            </p>
                            <Select size="small" style={{ width: 130 }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>대상</th>
                      <td>
                        <p style={{ margin: "0 0 10px" }}>
                          알림을 설정할 대상을 선택하세요.(최대 100개 선택)
                        </p>
                        <SelectTargetModal
                          isModalOpen={isModalOpen}
                          targetList={targetList}
                          setTargetList={setTargetList}
                          handleClose={handleClose}
                        />
                        <Form.Item
                          name="target"
                          // initialValue={targetList}
                          // value={targetList}
                          valuePropName="target"
                          style={{ marginBottom: 0 }}
                        >
                          <Input
                            style={{ width: "60%" }}
                            onClick={showTargetModal}
                            value={targetList}
                            // value={["1", "2", "3", "4"]}
                          />
                        </Form.Item>
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>실행 유형</th>
                  <td>
                    <p style={{ margin: "0 0 10px" }}>
                      알림 실행 조건이 도달했을 때, 실행할 작업을 선택하세요.
                    </p>
                    <Form.Item
                      name="execution-type"
                      initialValue={["email", "kakao"]}
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox.Group
                        options={options}
                        // defaultValue={["email", "kakao"]}
                      />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>조건</th>
                  <td>
                    <p style={{ margin: "0 0 10px" }}>
                      알림 실행 조건인 비교 데이터 기간을 선택하세요.
                    </p>
                    <Select
                      size="small"
                      options={
                        [{
                        key:1,
                        label:'어제',
                        value:'어제'
                        },                        {
                        key:2,
                        label:'일주일 전',
                        value:'주일 전'
                        },                        {
                        key:3,
                        label:'한달 전',
                        value:'한달 전'
                        },]
                      }
                      defaultValue={'어제'}
                      style={{ width: 120, marginBottom: "10px" }}
                    />
                    <p style={{ margin: "0 0 10px" }}>
                      항목은 최대 2개까지 설정할 수 있습니다.
                    </p>
                    <div>
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                        options={
                        [{
                        key:1,
                        label:'클릭수',
                        value:'클릭수'
                        },                        {
                        key:2,
                        label:'예치금',
                        value:'예치금'
                        },                        {
                        key:3,
                        label:'순위',
                        value:'순위'
                        },]
                      }
                      defaultValue={'클릭수'}
                      />
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                        options={
                        [{
                        key:1,
                        label:'<(보다작음)',
                        value:'<'
                        },                        {
                        key:2,
                        label:'>(보다큼)',
                        value:'>'
                        },                        {
                        key:3,
                        label:'=(같음)',
                        value:'='
                        },]
                      }
                      defaultValue={'<'}
                      />
                      <Input style={{ width: 120, marginRight: "8px" }} />
                      <Button size="small">+ 삭제</Button>
                    </div>
                    <div>
                    <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                        options={
                        [{
                        key:1,
                        label:'클릭수',
                        value:'클릭수'
                        },                        {
                        key:2,
                        label:'예치금',
                        value:'예치금'
                        },                        {
                        key:3,
                        label:'순위',
                        value:'순위'
                        },]
                      }
                      defaultValue={'클릭수'}
                      />
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                        options={
                        [{
                        key:1,
                        label:'<(보다작음)',
                        value:'<'
                        },                        {
                        key:2,
                        label:'>(보다큼)',
                        value:'>'
                        },                        {
                        key:3,
                        label:'=(같음)',
                        value:'='
                        },]
                      }
                      defaultValue={'<'}
                      />
                      <Input style={{ width: 120, marginRight: "8px" }} />
                      <Button size="small">+ 삭제</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>실행 주기</th>
                  <td>
                    <p style={{ margin: "0 0 10px" }}>
                      알림 설정이 실행될 빈도와 시간대를 설정합니다.
                    </p>{" "}
                    <Space wrap>
                      <Form.Item
                        name={["execution-cycle", "cycle"]}
                        initialValue="day"
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          size="small"
                          style={{ width: 120 }}
                          options={[
                            { value: "day", label: "매일" },
                            { value: "week", label: "매주" },
                            { value: "month", label: "매월" },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        name={["execution-cycle", "time"]}
                        initialValue={9}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          size="small"
                          style={{ width: 120 }}
                          options={hourCycle}
                        />
                      </Form.Item>
                      <Form.Item
                        name={["execution-cycle", "excluding-weekends"]}
                        valuePropName="checked"
                        initialValue="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>주말 제외</Checkbox>
                      </Form.Item>
                    </Space>
                  </td>
                </tr>
                <tr>
                  <th>에티켓 시간</th>
                  <td>
                    <div style={{ display: "flex" }}>
                      <ConfigProvider
                        theme={{
                          components: {
                            Slider: {
                              railSize: 10,
                              handleSize: 8,
                              handleSizeHover: 8,
                              handleActiveColor: "#4ed8ba",
                            },
                          },
                        }}
                      >
                        <Form.Item
                          name="etiquette"
                          style={{ marginBottom: 0, width: "50%" }}
                        >
                          <Slider
                            className="etiquette"
                            marks={{
                              0: {
                                style: { fontSize: "12px", left: "1%", marginTop:20},
                                label: "22시",
                              },

                              9: {
                                style: { fontSize: "12px", marginTop:20 },
                                label: "07시",
                              },
                            }}
                            max={9}
                            min={0}
                            tooltip={{
                              formatter: valueToHour,
                            }}
                            onChange={handleSliderChange}
                            style={{ margin: "0px 5px", marginBottom: "15px" }}
                          />
                        </Form.Item>
                      </ConfigProvider>

                      <div
                        style={{
                          color: "#41b3f9",
                          marginLeft: "30px",
                          marginTop: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        {valueToHour(selectedHour) === "0NaN시"
                          ? ""
                          : valueToHour(selectedHour)}
                        까지 알림 발송
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>중요도(심각도)</th>
                  <td>
                    <Form.Item name="importance" style={{ marginBottom: 0 }}>
                      <Radio.Group
                        className="importance"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                      >
                        {importanceData.map((item) => (
                          <Tooltip key={item.value} title={item.title}>
                            <Radio.Button value={item.value}>
                              {item.icon}
                            </Radio.Button>
                          </Tooltip>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>수신자 설정</th>
                  <td>
                    <Form.Item name="recipient" style={{ marginBottom: 0 }}>
                      <Input
                        placeholder="수신자 그룹 선택 또는 입력"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                console.log()
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    )

}

export default AddAlarm