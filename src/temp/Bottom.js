import React from 'react';
import { Layout} from 'antd';
const {Footer,} = Layout;

const Bottom = ({collapse})=>{
  console.log('collapse',collapse)
    return (
        <Footer
        collapsed={collapse}
        style={{
          zIndex:1,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          height : 40,
          marginLeft: collapse===true ? 0 : 240,
          width: collapse===true  ? '100%' : '87.4%',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        }}
      >
        Copyright © BizSpring Inc.
      </Footer>
    )
}
export default Bottom;