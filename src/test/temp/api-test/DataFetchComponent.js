// DataFetchComponent.js

import axios from 'axios';

const fetchData = async () => {
  const data = JSON.stringify({
    rptNo: '1000000',
    lookupTp: 'agg',
    dimCd: [
      //날짜
      'by_day',
      //캠페인
      'campaign',
      //광고플랫폼
      "ad_platform",
      //광고상품
      "ad_program",
      //광고사이트
      "pfno",
    ],
    metCd: ["m_rvn",
    "m_impr",
    "m_cost",
    "m_odr",
    "m_rgr",
    "land",
    "rvn",
    "m_cart",
    "odr",
    "rgr",
    "m_conv",
    "m_click",
    "m_cpc",
    "m_ctr",
    "m_crt",
    "m_roas",
    "rvn_per_odr",
    "rgr_per_m_click",
    "odr_per_m_cost",
    "roas"
  ],
    where: [
      {
        field: 'stat_date',
        operation: 'between',
        value: ['2023-01-10', '2023-07-31'],
      },
    ],
    sort: [{ field: 'land', order: 'asc' }],
    agencySeq: '1',
    //광고주 번호
    clientSeq: '106659',
    //해당 광고주의 사이트
    //pfno 설정하지 않고 dimCd에 요청시 해당하는 광고주의 모든 pfno데이터 불러옴.
    // pfno: ['300021','23884'],
    //불러올 데이터 양.
    size: 500,
})
const header = {
  headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
}
  try {
    const response = await axios.post(
      'http://122.99.192.144:9080/report/data',
      data,
      header
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;

// const fetchData = async () => {
//   try {
//     const response = await fetch('http://122.99.192.144:9080/report/data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-authorization-user': 'blues',
//       },
//       body: JSON.stringify({
//         rptNo: '1000000',
//         lookupTp: 'agg',
//         dimCd: ['by_day', 'keyword', 'campaign'],
//         metCd: ['land', 'm_impr', 'm_click'],
//         where: [
//           {
//             field: 'stat_date',
//             operation: 'between',
//             value: ['2023-07-10', '2023-07-31'],
//           },
//         ],
//         sort: [{ field: 'land', order: 'asc' }],
//         agencySeq: '1',
//         clientSeq: '106702',
//         pfno: ['300004'],
//         size: 30,
//       }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };

// export default fetchData;


// fetch

// const fetchData = async () =>{
//   const url = 'http://122.99.192.199:8120/report/data';

//   const headers = {
//     'Content-Type': 'application/json',
//     'x-authorization-user': 'blues',
//   };

//   const data = {
//     rptNo: '1000000',
//     lookupTp: 'agg',
//     agencySeq: '1',
//     clientSeq: '106702',
//     pfno: ['300004'],
//   };

//   const requestOptions = {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(data),
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     const jsonData = await response.json();
//     console.log(jsonData);
//     return response.data;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// export default fetchData


// const YourComponent = () => {
//   // You can trigger the fetch function using a button click or other events
//   const handleFetchData = () => {
//     fetchData();
//   };

//   return (
//     <div>
//       <button onClick={handleFetchData}>Fetch Data</button>
//     </div>
//   );
// };

// export default YourComponent;