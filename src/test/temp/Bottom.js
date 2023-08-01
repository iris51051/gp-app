import React from 'react';
import { Layout} from 'antd';
const {Footer,} = Layout;

const Bottom = ()=>{

    return (
        <Footer
        style={{
          textAlign: 'center',
          zIndex:1,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          marginTop : '50px'
        }}
      >
        Copyright © BizSpring Inc.
      </Footer>
    )
}
export default Bottom;