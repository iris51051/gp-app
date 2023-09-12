import React, { useState } from 'react'
import { Breadcrumb,Button, Form,Input } from "antd";
import {FileSearchOutlined,VideoCameraOutlined,ColumnWidthOutlined} from '@ant-design/icons'


import {
    CaretDownOutlined,
    CaretUpOutlined
  } from "@ant-design/icons";


export const AddAlarm=()=>{
    const [collapse, setCollapse] = useState(false)
    const [selectedPreset, setSelectedPreset] = useState(null)
    const [form] = Form.useForm();
    const items = [
        { title: " 모니터링알림", href: "/" },
        { title: "알림 설정",href: "/" },
        { title: "새 알림 등록" },
    ];
    const HanbleChangeCollapse =()=>{
        setCollapse((preValue)=>!preValue)
    }
    const collapseStyle={
        margin: '-1px 0 0',
        backgroundColor:'white',
        border:'1px solid black',
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
            border:'1px solid black',
            width:'30%',
            dataIndex:'use'
        },{

            title:'설정 가능한 대상',
            border:'1px solid black',
            width:'25%',
            dataIndex:'target'
        },{

            title:'자주 사용하는 알람 설정 활용 예시',
            border:'1px solid black',
            width:'40%',
            dataIndex:'example'
        },{

            title:'생성',
            border:'1px solid black',
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
        border:'1px solid black',
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
    const onFinish = (values) => {
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
                border: '1px solid black',
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
                        <div className={`presetTab ${selectedPreset === item.key ? 'select' : ''}`} key={item.key} data-key={item.key} style={{width:200, height:100, border : '1px solid black', marginRight:20,display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',fontSize: 20}} onClick={selectPreset}>
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
            <Form
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
            </Form>
        </div>
      </>
    )

}

export default AddAlarm