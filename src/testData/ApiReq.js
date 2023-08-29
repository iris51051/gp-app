// ApiReq.js
import {useState} from 'react'
import axios from 'axios';

const ApiReq = async ({currentAd}) => {
  const filter ={
     //데이터 저장소,필수
     rptNo: '1000000',
     //필수 요소
     lookupTp: 'agg',
     //필터
     dimCd: [

       'by_day',       //날짜
       'campaign',     //캠페인
       "ad_platform",  //광고플랫폼
       "ad_program",   //광고상품
       "pfno",         //광고사이트
       "device",       //디바이스 PC,Mobile
       "ad_provider",  //광고매체사

     ],
     //데이터
     metCd: [
     "m_rvn",         //매출액
     "m_impr",        //노출수
     "m_cost",        //광고비용
     "m_odr",         //주문수
     "m_rgr",         //회원가입수
     "land",          //?
     "rvn",           //매출액(스크립트)
     "m_cart",        //?
     "odr",           //주문수(스크립트)
     "rgr",           //회원가입수(스크립트)
     "m_conv",        //전환수
     "m_click",       //클릭수
     "m_cpc",         //클릭당 광고비용
     "m_ctr",         //클릭율 클릭(click)/노출(implr)
     "m_crt",         //전환율 전환수(rgr)/클릭(click)
     "m_roas",        //매출액/광고비
     "rvn_per_odr",       //구매단가  매출액(rvn)/주문(odr)
     "rgr_per_m_click",   //회원가입률 회원가입수(rgr)/클릭(click)
     "odr_per_m_cost",    //주문율    주문(odr)/광고비용(cost)
     "roas"               //매출액/광고비(스크립트)
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
     clientSeq: currentAd,
    //  clientSeq: [29367,105580,106658,106659],
     //해당 광고주의 사이트
     //pfno 설정하지 않고 dimCd에 요청시 해당하는 광고주의 모든 pfno데이터 불러옴.
     // pfno: ['300021','23884'],
     //불러올 데이터 양.
     size: 100,
  }
  const body = JSON.stringify(
        filter
//     {
//       //데이터 저장소//필수
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
//       //광고주 번호//필수
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
      // 로그인 필요
      // 'http://223.130.136.182:9080/report/data', 
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

export const DefaultData =async({currentAd})=>{
    if(currentAd>0){
      const data = await ApiReq({currentAd});
      if(data && data.length>0){
        return data;
      }else{
        return null;
      }
    }
}
