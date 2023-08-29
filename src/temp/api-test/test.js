// App.js

import React, { useEffect,useState } from 'react';
import axios from 'axios';
import fetchData from './DataFetchComponent'; // Replace with the correct path to DataFetchComponent.js

const Apitest = () => {
  const [responseData, setResponseData] = useState(null);

  const handleApiCall = async () => {
    try {
      // Use the JSONPlaceholder API '/posts' endpoint for POST request
      const response = await axios.post(
        // 'http://223.130.136.182:9080/report/data', 로그인 필요
        'http://122.99.192.144:9080/report/data',
        {
        rptNo: '1000000',
        lookupTp: 'agg',
        agencySeq: '1',
        clientSeq: '106702',
        pfno: ['300004'],
      },{
        headers:{
          'x-authorization-user': 'blues'
        }
      });

      // Handle the API response data here
      setResponseData(response.data);
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error('Error making API call:', error);
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>Make API Call</button>
      {responseData && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Apitest;
