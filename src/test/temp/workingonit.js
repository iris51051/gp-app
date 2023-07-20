import React from 'react';
const notNow=()=>{
    return(
    <div style={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: 'white', 
      }}>
    <img src={process.env.PUBLIC_URL+"/under-construction-150271_1920.png"} width={'50%'}alt=''></img>
    </div>
    )
}
export default notNow;