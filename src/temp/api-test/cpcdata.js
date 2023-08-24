// DataFetchComponent.js

import axios from 'axios';

const cpcdata = async () => {
    const body =JSON.stringify({
        //데이터 저장소
        rptNo: '1000000',
        //필수 요소
        lookupTp: 'agg',
        //필터
        dimCd: 
          'ad_provider',           //날짜
        //데이터
        metCd: 
          "m_cpc",              //클릭당 광고비용     m_click/m_cost
        where: [
          {
            field: 'stat_date',
            operation: 'between',
            value: ['2023-01-10', '2023-07-31'],
          },
        ],
        sort: [{ field: 'land', order: 'asc' }],
        //필수요소
        agencySeq: '1',
        clientSeq: '106659',
        size: 500,
     })
    
    
    const header = {
      headers: {
         'Content-Type': 'application/json',
          'X-Authorization-User': 'blues'
        }
    }
      try {
        const response = await axios.post(
          'http://122.99.192.144:9080/report/data',
          body,
          header
        );
        return response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
export default cpcdata;




