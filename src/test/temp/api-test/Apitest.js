// App.js

import React, { useEffect,useState } from 'react';
import fetchData from './DataFetchComponent'; // Replace with the correct path to DataFetchComponent.js

const Apitest = () => {
  const [testData, setTestData] = useState(null)
  useEffect(() => {
    const getDataAndLog = async () => {
      const data = await fetchData();
      if (data && data.length >0) {
       setTestData(data[0]);
      }
    };
    getDataAndLog();
  }, []);

  return (
    <div>
      <h1>api 테스트 페이지</h1>
      {testData && <p>테스트 데이터 : {testData.ad_program}</p>}
      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
};

export default Apitest;
