// App.js

import React, { useEffect,useState } from 'react';
import fetchData from './DataFetchComponent'; // Replace with the correct path to DataFetchComponent.js
import authData from './urltest'; // Replace with the correct path to DataFetchComponent.js
import cpcdata from './cpcdata'; // Replace with the correct path to DataFetchComponent.js

const Apitest = () => {
  const [testData, setTestData] = useState(null)
  const [testToken, setTestToken] = useState(null)
  const [getCpcDAta, setGetCpcDAta] = useState()
  useEffect(() => {
    const getDataAndLog = async () => {
      const data = await fetchData();
      if (data && data.length >0) {
       setTestData(data[0]);
      }
    };
    getDataAndLog();
  }, []);
  useEffect(() => {
    const getAythToken = async () => {
      const data = await authData();
      if (data && data.length >0) {
        setTestToken(data[0]);
      }
    };
    getAythToken();
  }, []);
  useEffect(() => {
    const getCpcDAta = async () => {
      const data = await cpcdata();
      if (data && data.length >0) {
        console.log('data',data)
        // setGetCpcDAta(data[0]);
      }
    };
    getCpcDAta();
  }, []);
  console.log('getCpcDAta',getCpcDAta)

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
