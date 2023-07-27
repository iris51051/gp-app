// DataFetchComponent.js

import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.post(
      'http://122.99.192.199:8120/report/data',
      {
        rptNo: '1000000',
        lookupTp: 'agg',
        dimCd: ['by_day', 'keyword', 'campaign'],
        metCd: ['land', 'm_impr', 'm_click'],
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: ['2023-07-10', '2023-07-31'],
          },
        ],
        sort: [{ field: 'land', order: 'asc' }],
        agencySeq: '1',
        clientSeq: '106702',
        pfno: ['300004'],
        size: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-authorization-user': 'blues',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;
