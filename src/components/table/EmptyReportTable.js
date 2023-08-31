import React from 'react';



export const EmptyReportTable =React.memo(()=> {

  const columns = [
    {
      title: '광고매체사',
      dataIndex: 'ad_provider',
      key: 'ad_provider',
      width: '10%',
    },
    {
      title: '광고플랫폼',
      dataIndex: 'ad_platform',
      key: 'ad_platform',
      width: '10%',
    },
    {
      title: '광고상품',
      dataIndex: 'ad_program',
      key: 'ad_program',
      width: '10%',
    },
    {
      title: '노출수',
      dataIndex: 'm_impr',
      key: 'm_impr',
      width: '8%',
    },
    {
      title: '클릭수',
      dataIndex: 'm_click',
      key: 'm_click',
      width: '8%',
    },
    {
      title: 'CTR',
      dataIndex: 'm_ctr',
      key: 'm_ctr',
      width: '8%',
    },
    {
      title: 'CPC',
      dataIndex: 'm_cpc',
      key: 'm_cpc',
      width: '8%',
    },
    {
      title: '광고비',
      dataIndex: 'm_cost',
      key: 'm_cost',
      width: '9%',
    },
    {
      title: '전환수',
      dataIndex: 'm_conv',
      key: 'm_conv',
      width: '7%',
    },
    {
      title: '전환율',
      dataIndex: 'm_crt',
      key: 'm_crt',
      width: '7%',
    },
    {
      title: '매출액',
      dataIndex: 'm_rvn',
      key: 'm_rvn',
      width: '9%',
    },
    {
      title: 'ROAS',
      dataIndex: 'm_roas',
      key: 'm_roas',
      width: '7%',
    },
  ];

  return (
    <>
    <div>
        <p>조회된 항목 수: 0</p>
    </div>
      <table className="ProdTable" style={{ border: '1px solid black',fontSize: '12px',  }}>
        <thead>
          <tr>
          {columns.map((item) => (
            <th
                style={{
                width: `${item.width}`, 
                textAlign: 'center' ,
                padding: '10px 8px',
                cursor: !['ad_provider', 'ad_platform', 'ad_program'].includes(item.key) ? 'pointer' : 'default',
                }}
                key={item.key}
            >
              <span style={{ verticalAlign: 'middle' }}>{item.title}</span>
            </th>
            ))}

          </tr>
          <tr style={{borderBottom:'0.5px solid  #e4e7ea',borderLeft:'0.5px solid  #e4e7ea',borderRight:'0.5px solid  #e4e7ea'}}>
          <td style={{textAlign:'center', padding:'10px'}}colSpan={columns.length}>
              <span>데이터가 없습니다.</span>
          </td>
            </tr>
        </thead>
        <tbody>
        </tbody>
      
      </table>
    </>
  )
});
export default EmptyReportTable;