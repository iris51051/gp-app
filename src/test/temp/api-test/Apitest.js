// App.js

import React, { useEffect,useState } from 'react';
import fetchData from './DataFetchComponent'; // Replace with the correct path to DataFetchComponent.js

const Apitest = () => {
  useEffect(() => {
    const getDataAndLog = async () => {
      const data = await fetchData();
      if (data) {
      }
    };

    getDataAndLog();
  }, []);

  return (
    <div>
      <h1>api 테스트 페이지</h1>
    </div>
  );
};

export default Apitest;
