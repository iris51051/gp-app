import React, { useEffect, useState } from 'react';
import { Radio,Select,Divider,Input,Button,Modal } from 'antd';



import {
    CaretDownOutlined,
    CaretUpOutlined
  } from "@ant-design/icons";


const Demo = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(false)
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const SelectRender=(value)=>{
        console.log('value',value)
        const [dataOption, setDataOption] = useState([])
        const selectorData =[
            {
                key:1,
                children:[
                    {
                        key:1,
                        title:'[사이트명] 도메인 선택',
                        value:'domain',
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
            },{
                key:3,
            }
        ]
        const DataChoose=(value)=>{
            // const data = (selectorData.filter((item)=>item.key===value)).map(item=>item.children)
            const data = selectorData.filter((item)=>(item.key===value)).map(item=>item.children)[0]
            console.log('data',data)
            console.log('data',typeof data)
            console.log('data.children',data[0].children.key)
            setDataOption(data)

        }
        useEffect(() => {
            DataChoose(value)
        }, [value])
        
        return(
            <>
            <div style={{display:'flex'}}>
            {dataOption.map((item)=>(
                <>
                <div key={item.key} style={{display:'grid', justifyItems:'center'}}>
                    <p>{item.title}</p>
                    <Select
                    
                    style={{width:100}}
                    defaultValue= {item.value!=='target' ? item.children[0] : ""}
                    options={item.children}
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

    }
    const CustomModal =()=>{
        const [modal1Open, setModal1Open] = useState(false);
        const [modal2Open, setModal2Open] = useState(false);
        return (
          <>
            <Modal
              title="20px to Top"
              style={{
                top: 20,
              }}
              open={modal1Open}
              onOk={() => setModal1Open(false)}
              onCancel={() => setModal1Open(false)}
            >
              <p>some contents...</p>
              <p>some contents...</p>
              <p>some contents...</p>
            </Modal>
            <br />
            <br />
            <Button type="primary" onClick={() => setModal2Open(true)}>
              Vertically centered modal dialog
            </Button>
            <Modal
              title="Vertically centered modal dialog"
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            >
              <p>some contents...</p>
              <p>some contents...</p>
              <p>some contents...</p>
            </Modal>
          </>
        );
      };

  return (
    <>
        <div>
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>광고 운영</Radio>
            <Radio value={2}>유입/탐색</Radio>
            <Radio value={3}>전환 데이터</Radio>
        </Radio.Group>
         {SelectRender(value)}
         <table>
            <tr style={{height:100}}>
                <td style={{background:'#f3f3f3'}}>대상</td>
                <td>
                    <Input className='TargetTags'readOnly style={{width:500}} onClick={tagClick}/>
                </td>
            </tr>
         </table>
        </div>
    </>
  )
}

export default Demo