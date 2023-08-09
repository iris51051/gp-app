// DataFetchComponent.js

import axios from 'axios';

const fetchData = async () => {

  //body 예시
  /*
    const data = JSON.stringify(
    body
    {
      //데이터 저장소?
      rptNo: '1000000',
      //필수 요소
      lookupTp: 'agg',
      //필터
      dimCd: [
        'by_day',           //날짜
        'campaign',         //캠페인
        "ad_platform",      //광고플랫폼
        "ad_program",       //광고상품
        "pfno",             //광고사이트
        "device",           //디바이스 PC,Mobile
        "ad_provider",      //광고매체사
      ],
      //데이터
      metCd: [
      "m_rvn",              //매출액
      "m_impr",             //노출
      "m_cost",             //광고비
      "m_odr",              //주문
      "m_rgr",              //회원가입 수
      "land",                //?
      "rvn",                //스크립트 매출액
      "m_cart",             //?
      "odr",                //스크립트 주문수
      "rgr",                //스크립트 회원가입 수
      "m_conv",             //전환수
      "m_click",            //클릭수
      "m_cpc",              //클릭당 광고비요     m_click/m_cost
      "m_ctr",              //노출당 클릭수       m_click/m_impr
      "m_crt",              //클릭당 전황 수      m_conv/m_click
      "m_roas",             //광고대비 매출       m_rvn/m_cost
      "rvn_per_odr",        //구매단가
      "rgr_per_m_click",    //회원 가입률
      "odr_per_m_cost",     //주문율
      "roas"                //광고비용대비 스크립트 매출 rvn/m_cost
      ],
      //기간 선택
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
      //광고주 번호
      clientSeq: '106659',
      //해당 광고주의 사이트
      //pfno 설정하지 않고 dimCd에 요청시 해당하는 광고주의 모든 pfno데이터 불러옴.
      // pfno: ['300021','23884'],
      //불러올 데이터 양.
      size: 500,
}
)
  
  */

  const body ={
    //데이터 저장소
    rptNo: '1000000',
    //필수 요소
    lookupTp: 'agg',
    //필터
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
      //디바이스 PC,Mobile
      "device",
      //광고매체사
      "ad_provider",
    ],
    //데이터
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
    //필수요소
    agencySeq: '1',
    //광고주 번호
    //단일 데이터
      //clientSeq: '106659',

    //여러 데이터 배열
      clientSeq: '106659',
    //해당 광고주의 사이트
    //pfno 설정하지 않고 dimCd에 요청시 해당하는 광고주의 모든 pfno데이터 불러옴.
    pfno: ['300021','23884','106788','106839'],
    //불러올 데이터 양.
    size: 500,
 }

  const data = JSON.stringify(
    body
//     {
//       //데이터 저장소
//       rptNo: '1000000',
//       //필수 요소
//       lookupTp: 'agg',
//       //필터
//       dimCd: [
//         //날짜
//         'by_day',
//         //캠페인
//         'campaign',
//         //광고플랫폼
//         "ad_platform",
//         //광고상품
//         "ad_program",
//         //광고사이트
//         "pfno",
//         //디바이스 PC,Mobile
//         "device",
//         //광고매체사
//         "ad_provider",
//       ],
//       //데이터
//       metCd: ["m_rvn",
//       "m_impr",
//       "m_cost",
//       "m_odr",
//       "m_rgr",
//       "land",
//       "rvn",
//       "m_cart",
//       "odr",
//       "rgr",
//       "m_conv",
//       "m_click",
//       "m_cpc",
//       "m_ctr",
//       "m_crt",
//       "m_roas",
//       "rvn_per_odr",
//       "rgr_per_m_click",
//       "odr_per_m_cost",
//       "roas"
//       ],
//       where: [
//         {
//           field: 'stat_date',
//           operation: 'between',
//           value: ['2023-01-10', '2023-07-31'],
//         },
//       ],
//       sort: [{ field: 'land', order: 'asc' }],
//       //필수요소
//       agencySeq: '1',
//       //광고주 번호
//       clientSeq: '106659',
//       //해당 광고주의 사이트
//       //pfno 설정하지 않고 dimCd에 요청시 해당하는 광고주의 모든 pfno데이터 불러옴.
//       // pfno: ['300021','23884'],
//       //불러올 데이터 양.
//       size: 500,
// }
)
const header = {
  headers: { 'Content-Type': 'application/json', 'X-Authorization-User': 'blues'}
}
  try {
    const response = await axios.post(
      'http://122.99.192.144:9080/report/data',
      data,
      header
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;