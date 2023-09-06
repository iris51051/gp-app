import React, { useEffect, useState } from 'react';
import { Radio,Select,Divider,Input,Button,Modal } from 'antd';



import {
    CaretDownOutlined,
    CaretUpOutlined
  } from "@ant-design/icons";


const Demo = () => {
    const [alarmType, setAlarmType] = useState(1);
    const [visible, setVisible] = useState(false)
    const [selectedValues, setSelectedValues] = useState(
        {}
        );
    const [modalOpen, setModalOpen] = useState(false);
    const [dataOption, setDataOption] = useState([])
    const onChange = (e) => {
        setAlarmType(e.target.value);
    };
    useEffect(() => {
          console.log('dataOption',dataOption)
        
    }, [dataOption])
    

    const SelectRender=(alarmType)=>{
        console.log('alarmType',alarmType)

        const selectorData =[
            {
                key:1,
                children:[
                    {
                        key:1,
                        title:'[사이트명] 도메인 선택',
                        value:'pfno',
                        children:[
                            {
                                key:1,
                                value:'로거',
                                label:'로거',
                            },                {
                                key:2,
                                value:'비즈',
                                label:'비즈',
                            },                {
                                key:3,
                                value:'미샤',
                                label:'미샤',
                            },                {
                                key:4,
                                value:'카페',
                                label:'카페',
                            }
                        ]
                    },{
                        key:2,
                        title:'광고 매체사 선택',
                        value:'provider',
                        children:[
                            {
                                key:1,
                                value:'네이버',
                                label:'네이버'
                            },{
                                key:2,
                                value:'구글',
                                label:'구글'
                            },{
                                key:3,
                                value:'카카오',
                                label:'카카오'
                            },{
                                key:4,
                                value:'페이스북',
                                label:'페이스북'
                            }
                        ]
                    },{
                        key:3,
                        title:'알림 대상 선택',
                        value:'target',
                        children:[
                            {
                                key:1,
                                value:'캠페인',
                                label:'캠페인',
                            },                        {
                                key:2,
                                value:'그룹',
                                label:'그룹',
                            },                        {
                                key:3,
                                value:'키워드',
                                label:'키워드',
                            },
                        ],
                        
                    }
                ]
            },{
                key:2,
                children:[
                    {
                        key:1,
                        title:'[사이트명] 도메인 선택2',
                        value:'pfno',
                        children:[
                            {
                                key:1,
                                value:'로거2',
                                label:'로거2',
                            },                {
                                key:2,
                                value:'비즈2',
                                label:'비즈2',
                            },                {
                                key:3,
                                value:'미샤2',
                                label:'미샤2',
                            },                {
                                key:4,
                                value:'카페2',
                                label:'카페2',
                            }
                        ]
                    },{
                        key:2,
                        title:'광고 매체사 선택2',
                        value:'provider',
                        children:[
                            {
                                key:1,
                                value:'네이버2',
                                label:'네이버2'
                            },{
                                key:2,
                                value:'구글2',
                                label:'구글2'
                            },{
                                key:3,
                                value:'카카오2',
                                label:'카카오2'
                            },{
                                key:4,
                                value:'페이스북2',
                                label:'페이스북2'
                            }
                        ]
                    },{
                        key:3,
                        title:'알림 대상 선택2',
                        value:'target',
                        children:[
                            {
                                key:1,
                                value:'캠페인2',
                                label:'캠페인2',
                            },                        {
                                key:2,
                                value:'그룹2',
                                label:'그룹2',
                            },                        {
                                key:3,
                                value:'키워드2',
                                label:'키워드2',
                            },
                        ],
                        
                    }
                ]
            },{
                key:3,
                children:[
                    {
                        key:1,
                        title:'[사이트명] 도메인 선택3',
                        value:'pfno',
                        children:[
                            {
                                key:1,
                                value:'로거3',
                                label:'로거3',
                            },                {
                                key:2,
                                value:'비즈3',
                                label:'비즈3',
                            },                {
                                key:3,
                                value:'미샤3',
                                label:'미샤3',
                            },                {
                                key:4,
                                value:'카페3',
                                label:'카페3',
                            }
                        ]
                    },{
                        key:2,
                        title:'광고 매체사 선택3',
                        value:'provider',
                        children:[
                            {
                                key:1,
                                value:'네이버3',
                                label:'네이버3'
                            },{
                                key:2,
                                value:'구글3',
                                label:'구글3'
                            },{
                                key:3,
                                value:'카카오3',
                                label:'카카오3'
                            },{
                                key:4,
                                value:'페이스북3',
                                label:'페이스북3'
                            }
                        ]
                    },{
                        key:3,
                        title:'알림 대상 선택3',
                        value:'target',
                        children:[
                            {
                                key:1,
                                value:'캠페인3',
                                label:'캠페인3',
                            },                        {
                                key:2,
                                value:'그룹3',
                                label:'그룹3',
                            },                        {
                                key:3,
                                value:'키워드3',
                                label:'키워드3',
                            },
                        ],
                        
                    }
                ]
            }
        ]
        const DataChoose=(alarmType)=>{
            const data = selectorData.filter((item)=>(item.key===alarmType)).map(item=>item.children)[0]
            setDataOption(data)
            let defaultData =[]
            for(const item of data){
                for(const child of item.children){
                defaultData[item.value]=child.value
                break;
                }
            }
            setSelectedValues(defaultData)
        }
        useEffect(() => {
            DataChoose(alarmType)
        }, [alarmType])

        const handleSelectChange = (selectKey, selectedValue) => {
            console.log('selectKey',selectKey)
            console.log('selectedValue',selectedValue)
            setSelectedValues((prevSelectedValues) => ({
              ...prevSelectedValues,
              [selectKey]: selectedValue,
            }));
          };


        return(
            <>
            <div style={{display:'flex'}}>
            {dataOption.map((item)=>(
                <>
                <div key={item.key} style={{display:'grid', justifyItems:'center'}}>
                    <p>{item.title}</p>
                    <Select
                    
                    style={{width:100}}
                    value={selectedValues[item.value]}
                    options={item.children}
                    onChange={(selectedValue) => handleSelectChange(item.value, selectedValue)}
                    >
                    </Select>
                    <p>{((item.children).filter((item)=>item.key===1)).value}</p>
                </div>
                {/* <Divider type='vertical' style={{marginTop:5,height:50,width:20, display:'block',justifyItems:'center' }}></Divider> */}
                {item.key!==dataOption.length ?
                <Divider type='vertical' style={{marginTop:10,height:50,marginLeft:20,marginRight:20}}></Divider>
                : ""
                }
                </>
            ))}
            </div>
            </>
        )
    }
    const tagClick=()=>{
        setModalOpen(true)
    }

    const CustomModal =()=>{
        console.log('modal',selectedValues)
        return (
          <>
             <Modal
                title="Vertically centered modal dialog"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
            
   

            </Modal>
          </>
        );
      };
console.log('selectValues',selectedValues)
  return (
    <>
        <div>
        <Radio.Group onChange={onChange} value={alarmType}>
            <Radio value={1}>광고 운영</Radio>
            <Radio value={2}>유입/탐색</Radio>
            <Radio value={3}>전환 데이터</Radio>
        </Radio.Group>
         {SelectRender(alarmType)}
         <table>
            <tr style={{height:100}}>
                <td style={{background:'#f3f3f3'}}>대상</td>
                <td>
                    <Input className='TargetTags'readOnly style={{width:500}} onClick={tagClick}/>
                </td>
            </tr>
         </table>
        </div>
        <CustomModal/>
    </>
  )
}

export default Demo