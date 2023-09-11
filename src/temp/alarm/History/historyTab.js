import React,{useState} from 'react'
import { Radio,Button,Timeline,Input,Form } from "antd";
import {FrownOutlined,MehOutlined,SmileOutlined} from '@ant-design/icons'
import {FaRegFrownOpen} from "react-icons/fa";
import {AiOutlineMessage} from "react-icons/ai";

const HistoryTab = () => {
  const [form] = Form.useForm();
  const [statList, setStatList] = useState([])
  const [collapse, setCollapse] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date());
  const histData=[
    {
      label: '10:52',
      dot:<FrownOutlined className='criticFace'/>,
      children: 'Network problems being solved',
    },
    {
      label: '11:22',
      dot:<FaRegFrownOpen className='highFace'/>,
      children: 'Network problems being solved',
    },
    {
      label: '12:55',
      dot:<SmileOutlined className='lowFace'/>,
      children: 'Technical testing',
    },
    {
      label: '13:10',
      dot:<MehOutlined className='mediumFace'/>,
      children: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
      label: '16:00',
      dot:<FrownOutlined className='criticFace'/>,
      children: (
        <div>
        <span className="timeLineConetent">aaaaaaaaaaaaaaaaaaaaaaaaa</span>
        </div>
      )
    }
  ]
  const [historyData, setHistoryData] = useState(histData)
    const statData=[
      {
        key:'1',
        value : 'low',
        bg : 'green',
        title: 'Low',

      },{
        key:'2',
        value : 'medium',
        bg : 'yellow',
        title: 'Medium',

      },      {
        key:'3',
        value : 'high',
        bg : 'orange',
        title: 'High',

      },      {
        key:'4',
        value : 'critical',
        bg : 'red',
        title: 'Critical',

      }
    ]

    const selectStat =(value)=>{
      if(statList.includes((value))){
        const newValue = statList.filter((item)=>item!==value)
        setStatList([...newValue])
      }else{
        const newValue = [...statList,value]
        setStatList([...newValue])
      }
    }
    console.log(statList)

    const showComment=()=>{
      const value = collapse;
      setCollapse(!value)
    }
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const onFinish = (values) => {
      const now = new Date().toLocaleTimeString(undefined,timeOptions)
      console.log(now)
      console.log(values);
      const newComment ={
        label:now,
        dot: <AiOutlineMessage></AiOutlineMessage>,
        children : values.comment
      }
      setHistoryData((item)=>[...item,newComment])
      form.resetFields();
      showComment();
    };
    console.log('historyData',historyData)
  return (
    <>
    <div style={{display:'flex'}}>
    <Radio.Group  defaultValue="default" buttonStyle="solid">
      <Radio.Button value="default">기본</Radio.Button>
      <Radio.Button value="custom">맞춤</Radio.Button>
    </Radio.Group>

    
    <table style={{padding:10, marginLeft:20}}>
        <thead/>
        <tbody>
            <tr style={{display:'flex'}}>
              <td>
              {statData.map((item) => (
                <Radio.Button
                  className="statButton"
                  key={item.key}
                  value={item.key}
                  checked={statList.includes(item.key)}
                  onClick={(e) => selectStat(e.target.value)}
                >
                    <div style={{ width: 5, height: 10, backgroundColor: item.bg, display: 'inline-block', marginRight: '5px' }} />
                    <span style={{ marginLeft: 5, display: 'inline' }}>{item.title}</span>
                </Radio.Button>
              ))}
              </td>
            </tr>
        </tbody>
    </table>
    <Button style={{marginLeft:'auto'}}> 다운로드</Button>
    </div>
    <div style={{marginTop:20,marginBottom:30,display:'flex', width:'auto',backgroundColor:'#f5f6f7'}}>
                aaaaaaaaaaaaaaaaaaa
    </div>
    <div className='HistoryTime'
    style={{marginTop:20,display:'grid',justifyContent:'start'}}>
      <Timeline
      reverse='true'
        style={{display:'inline-block',marginRight:'auto',width:'auto'}}
        mode='left'
        items={historyData}
      />
      <span style={{width:100}}onClick={showComment}>Add a comment</span>
      {collapse ===true ? 
        (
          <>
          <Form
          form={form}
            name="basic"
            onFinish={onFinish}
          >
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                },
              ]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              확인
            </Button>
          </Form.Item>
        </Form>
        </>
        )
       : ""}
      </div>

    </>
  )
}

export default HistoryTab