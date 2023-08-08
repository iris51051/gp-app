// ApiReq.js

import axios from 'axios';

const ApiReq = async () => {
  const data = JSON.stringify({
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
export const FullData =()=>{
    const getData = async ()=>{
        const data = await ApiReq();
        if(data){
            console.log(data);
            return data;
        }
    }
    return getData();
}
export default ApiReq;