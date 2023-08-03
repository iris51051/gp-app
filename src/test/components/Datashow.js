import React,{useState,useEffect} from "react";
import { Select } from "antd";
import { VscTriangleDown } from "react-icons/vsc";


export const Datashow = ({onValueChange}) => {
  const options = [
    {
      key: "1",
      value: 'script',
      label: "스크립트 전환 데이터",
    },
    {
      key: "2",
      value: 'media',
      label: "매체 전환 데이터 ",
    },
  ]
  const [DataType, setDataType] =useState(options[0].value)
  const handleChange = (value)=>{
    setDataType(value);
  }
  useEffect(() => {
    onValueChange(DataType);
  }, [DataType, onValueChange]);
  return(
  <div>
    <Select
      style={{ width: "210px" }}
      suffixIcon={<VscTriangleDown style={{ color: "black" }} />}
      size="small"
      defaultValue={options[0].value}
      onChange={handleChange}
      options={options}
    />
  </div>
  )
    }
