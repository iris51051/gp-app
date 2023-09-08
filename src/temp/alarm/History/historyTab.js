import React from 'react'
import { Radio } from "antd";

const historyTab = () => {
    console.log()
  return (
    <>



    <Radio.Group  defaultValue="default" buttonStyle="solid">
      <Radio.Button value="default">기본</Radio.Button>
      <Radio.Button value="custom">맞춤</Radio.Button>
    </Radio.Group>
    
    <table style={{padding:10}}>
        <thead/>
        <tbody>
            <tr style={{backgroundColor:'#f3f3f3'}}>
                <td><div style={{backgroundColor:'green', width:5, height: 18}}></div></td>
                <td>Low</td>
                <td><div style={{backgroundColor:'yellow', width:5, height: 18}}></div></td>
                <td>Medium</td>
                <td><div style={{backgroundColor:'orange', width:5, height: 18}}></div></td>
                <td>High</td>
                <td><div style={{backgroundColor:'red', width:5, height: 18}}></div></td>
                <td>Critical</td>
            </tr>
        </tbody>
    </table>



    </>
  )
}

export default historyTab