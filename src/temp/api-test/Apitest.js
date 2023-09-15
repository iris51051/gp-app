// App.js

import React, { useEffect,useState } from 'react';
import fetchData from './DataFetchComponent';
import authData from './AuthToken'; 
import viewList from './viewdata'; 
import ClientList from './clientList'; 
import getData from './getData'; 

const Apitest = () => {
  const [testData, setTestData] = useState(null)
  const [testToken, setTestToken] = useState(null)
  const [tokenType , setTokenType ] = useState(null)
  const [getClientList, setClientList] = useState()
  useEffect(() => {
    if(testToken!==null){
    const getDataAndLog = async () => {
      const data = await getData(tokenType,testToken);
      if (data && data.length >0) {
       setTestData(data[0]);
      }
    };
    getDataAndLog();
  }
  }, [testToken]);
  useEffect(() => {
    const getAuthToken = async () => {
      const data = await authData();
      if (data) {
        console.log('token',data)
        setTokenType(data.tokenType)
        setTestToken(data.token);
      }
    };
    getAuthToken();
  }, []);
  useEffect(() => {
    if(testToken!==null){
    const getviewList = async () => {
      const data = await viewList(tokenType,testToken);
      if (data && data.length >0) {
        console.log('GetviewList',data)
      }
    };
      getviewList();
    }
  }, [testToken]);
  useEffect(() => {
    if(testToken!==null){
    const getClientList = async () => {
      const data = await ClientList(tokenType,testToken);
      if (data && data.length >0) {
        console.log('getClientList',data)
      }
    };
      getClientList();
    }
  }, [testToken]);


  return (
    <div>
      <h1>api 테스트 페이지</h1>
      {testData && <p>테스트 데이터 : {testData.ad_program}</p>}
      {testToken && <p>테스트 토큰 : {testToken}</p>}
      {/* {getCpcDAta && <p>cpc데이터 조회 : {getCpcDAta}</p>} */}
      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
};

export default Apitest;
