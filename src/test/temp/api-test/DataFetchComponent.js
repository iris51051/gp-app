// DataFetchComponent.js

import axios from 'axios';

const fetchData = async () => {
  const data = JSON.stringify({
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