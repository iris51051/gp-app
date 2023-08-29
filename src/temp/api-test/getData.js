// getData.js

import axios from 'axios';

const getData = async (tokenType, token) => {
  const body =JSON.stringify({
    rptNo: '1000000',
    lookupTp: 'agg',
    dimCd: [
      'by_day',           //날짜

    ],
    //데이터
    metCd: [
        // 'g1',
      "m_rvn",              //매출액
      "m_impr",             //노출
      "m_cost",             //광고비
      "m_odr",              //주문
    //   "m_rgr",              //회원가입 수
    //   "land",                //?
    //   "rvn",                //스크립트 매출액
    //   "m_cart",             //?
    //   "odr",                //스크립트 주문수
    //   "rgr",                //스크립트 회원가입 수
    //   "m_conv",             //전환수
    //   "m_click",            //클릭수
    //   "m_cpc",              //클릭당 광고비용     m_click/m_cost
    //   "m_ctr",              //노출당 클릭수       m_click/m_impr
    //   "m_crt",              //클릭당 전황 수      m_conv/m_click
    //   "m_roas",             //광고대비 매출       m_rvn/m_cost
    //   "rvn_per_odr",        //구매단가
    //   "rgr_per_m_click",    //회원 가입률
    //   "odr_per_m_cost",     //주문율
    //   "roas"                //광고비용대비 스크립트 매출 rvn/m_cost
      ],
    where: [
      {
        field: 'stat_date',
        operation: 'between',
        value: ['2023-01-10', '2023-08-29'],
      },
    ],
    sort: [{ field: 'land', order: 'asc' }],
    //필수요소
    agencySeq: '1',
    //광고주 번호
    //단일 데이터
      //clientSeq: '106659',

    //단일 데이터에 대해서만 조회 가능.
    clientSeq: ['106659'],
    // clientSeq: ['106659','105580'],
    //해당 광고주의 사이트
    //pfno 설정하지 않고 dimCd에 요청시 해당하는 광고주의 모든 pfno데이터 불러옴.
    // pfno: ['300021','23884','106788','106839'],
    //불러올 데이터 양.
    size: 500,
 })


const header = {
  headers: {
     'Content-Type': 'application/json',
      // 'X-Authorization-User': 'blues'
      "Authorization": `${tokenType} ${token}`,
    }
}
  try {
    const response = await axios.post(
      // 로그인필요
      'http://223.130.136.182:9080/report/data',
      // 'http://122.99.192.144:9080/report/data',
      body,
      header
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default getData;