import React from 'react';
import { Layout} from 'antd';
const {Footer,} = Layout;

const Bottom = ({collapse})=>{
  console.log('collapse',collapse)
    return (
        <Footer
        collapsed={collapse}
        style={{
          textAlign: 'center',
          zIndex:1,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          marginTop : '50px',
          marginLeft: collapse===true ? 0 : 240,
          width: collapse===true  ? '100%' : '87.4%',
        }}
      >
        Copyright © BizSpring Inc.
      </Footer>
    )
}
export default Bottom;