import React, { useState } from 'react';
import {
PlusOutlined, 
MinusOutlined,
CaretUpOutlined,
CaretDownOutlined,

 } from '@ant-design/icons';


export const ReportTable =()=> {
  const [showingPlatform, setShowingPlatform] = useState([]);
  const [showingProduct, setShowingProduct] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    key: 'm_impr',
    direction: 'desc', // 'asc' or 'desc'
  });
  const columns = [
    {
      title: '광고매체사',
      dataIndex: 'advertiser',
      key: 'advertiser',
      width: '10%',
    },
    {
      title: '광고플랫폼',
      dataIndex: 'adPlatform',
      key: 'adPlatform',
      width: '10%',
    },
    {
      title: '광고상품',
      dataIndex: 'adProduct',
      key: 'adProduct',
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
  const clientData = [
    {
      key: '1',
      advertiser: '네이버',
      adPlatform: '네이버 검색',
      adProduct: '브랜드검색',
      m_impr: 1000,
      m_click: 200,
      m_ctr: 20,
      m_cpc: 5,
      m_cost: 1000,
      m_conv: 50,
      m_crt: 10,
      m_rvn: 2000,
      m_roas: 2,
    },
    {
      key: '2',
      advertiser: '카카오',
      adPlatform: '카카오 검색',
      adProduct: '키워드검색',
      m_impr: 2316854,
      m_click: 10,
      m_ctr: 20,
      m_cpc: 5,
      m_cost: 65489,
      m_conv: 50,
      m_crt: 10,
      m_rvn: 126154,
      m_roas: 2,
    },
  ];
  const sum = clientData.reduce(
    (total, current) => {
      total.m_impr += current.m_impr;
      total.m_click += current.m_click;
      total.m_cost += current.m_cost;
      total.m_rvn += current.m_rvn;
      return total;
    },
    { m_impr: 0, m_click: 0, m_cost: 0, m_rvn: 0 }
  );

  const calculate = (key) => {
    if (key === 'advertiser') {
      return '총합계';
    } else if (sum.hasOwnProperty(key)) {
      if (key === 'm_cost' || key === 'm_rvn') {
        return Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        })
          .format(sum[key])
          .replace('₩', '₩\u00A0');
      }
      return Intl.NumberFormat('ko-KR').format(sum[key]);
    } else if (key === 'm_ctr') {
      return ((sum.m_click / sum.m_impr) * 100).toFixed(2) + '%';
    } else if (key === 'm_cpc') {
      const res = sum.m_cost / sum.m_click;
      return Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      })
        .format(res)
        .replace('₩', '₩\u00A0');
    } else {
      return '';
    }
  };

  const showPlatform = (key) => {
    setShowingPlatform((prevShowingPlatform) => {
      if (!prevShowingPlatform.includes(key)) {
        return [...prevShowingPlatform, key];
      } else {
        setShowingProduct((prevShowingProduct) => {
          return prevShowingProduct.filter((item) => item !== key);
        });
        return prevShowingPlatform.filter((item) => item !== key);
      }
    });
  };
  const showProduct = (key) => {
    console.log(key);
    setShowingProduct((prevShowingProduct) => {
      if (!prevShowingProduct.includes(key)) {
        return [...prevShowingProduct, key];
      } else {
        return prevShowingProduct.filter((item) => item !== key);
      }
    });
  };
  const borderStyle = (key, index) => {
    if (!showingProduct.includes(key) && index === 'advertiser') {
      return '1px solid #e4e7ea';
    } else if (showingProduct.includes(key) && index === 'adPlatform') {
      return '1px solid white';
    }
  };
  const sortedClientData = [...clientData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    console.log(key);
    setSortConfig({ key, direction });
  };
  const dataRender =(value,index)=>{
    if(index === 'm_ctr' ||  index==='m_roas'|| index==='m_crt'){
        return (value).toFixed(2)+'%'
    }else if(index ==='m_cost' || index === 'mrvn'){
        return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          })
            .format(value)
            .replace('₩', '₩\u00A0');
    }else if(index === 'm_cpc'){
        return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(value)
            .replace('₩', '₩\u00A0');
    }else if (typeof value === 'string') {
        return value
    }else{
        return Intl.NumberFormat('ko-KR').format(value)
    }

  }

  return (
    <>
    <div>
        <p>조회된 항목 수: {clientData.map((item)=>item.key).length}</p>
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
                cursor: !['advertiser', 'adPlatform', 'adProduct'].includes(item.key) ? 'pointer' : 'default',
                }}
                key={item.key}
                onClick={() => {
                if (!['advertiser', 'adPlatform', 'adProduct'].includes(item.key)) {
                    requestSort(item.dataIndex);
                }
                }}
            >
                <span style={{ verticalAlign: 'middle' }}>{item.title}</span>
                {['advertiser', 'adPlatform', 'adProduct'].includes(item.key) ? (
                sortConfig.key === item.dataIndex && (
                    sortConfig.direction === 'asc' ? (
                    <CaretUpOutlined style={{ fontSize: '10px' }} />
                    ) : (
                    <CaretDownOutlined style={{ fontSize: '10px' }} />
                    )
                )
                ) : (
                <div className="arrows-container">
                    {sortConfig.key === item.dataIndex && sortConfig.direction === 'asc' ? (
                    <CaretUpOutlined className='arrow-up' style={{ fontSize: '8px', marginBottom: '-2px', color:'blue'}} />
                    ) : (
                    <CaretUpOutlined className='arrow-up' style={{ fontSize: '8px', marginBottom: '-2px', opacity: 0.3 }} />
                    )}
                    {sortConfig.key === item.dataIndex && sortConfig.direction === 'desc' ? (
                    <CaretDownOutlined className='arrow-down' style={{ fontSize: '8px', color:'blue'}} />
                    ) : (
                    <CaretDownOutlined className='arrow-down' style={{ fontSize: '8px', opacity: 0.3 }} />
                    )}
                </div>
                )}
            </th>
            ))}

          </tr>
        </thead>
        <tbody>
        {/* 광고 매체사 데이터 */}
          {sortedClientData.map((item) => (
            <React.Fragment key={item.key}>
              <tr>
                {columns.map((column) => (
                  <td
                    style={{
                      width: `${column.width}`,
                    }}
                    key={column.key}
                    className={column.dataIndex === 'advertiser' ? 'AdTd' : ''}
                  >
                    {column.dataIndex === 'adPlatform' ? (
                      !showingPlatform.includes(item.key) ? (
                        <PlusOutlined
                          onClick={() => showPlatform(item.key)}
                        />
                      ) : (
                        <MinusOutlined
                          onClick={() => showPlatform(item.key)}
                        />
                      )
                    ) : column.dataIndex === 'adProduct' ? (
                      ''
                    ) : 
                        (item[column.dataIndex] === 0 ? '-' : dataRender(item[column.dataIndex],column.dataIndex))
                    }
                  </td>
                ))}
              </tr>
              {/* 광고 플랫폼 데이터 */}
              {showingPlatform.includes(item.key) && (
                <tr style={{backgroundColor:"#f7fafc"}}>
                  {columns.map((column) => (
                    <td
                      style={{
                        width: `${column.width}`,
                        borderBottom: borderStyle(item.key, column.dataIndex),
                      }}
                      className={
                        column.dataIndex === 'advertiser' ? 'BlankTd' : ''
                      }
                      key={column.key}
                    >
                      {column.dataIndex === 'advertiser' ? (
                        ''
                      ) : column.dataIndex === 'adProduct' ? (
                        <span>
                          {showingProduct.includes(item.key) ? (
                            <MinusOutlined
                              onClick={() => showProduct(item.key)}
                            />
                          ) : (
                            <PlusOutlined
                              onClick={() => showProduct(item.key)}
                            />
                          )}
                        </span>
                      ) : (
                        item[column.dataIndex] === 0 ? '-' : dataRender(item[column.dataIndex],column.dataIndex)
                      )}
                    </td>
                  ))}
                </tr>
              )}
              {/* 광고상품 데이터 */}
              {showingProduct.includes(item.key) && (
                <tr style={{backgroundColor:'#f7f7f7'}}>
                  {columns.map((column) => (
                    <td
                      style={{
                        width: `${column.width}`,
                      }}
                      key={column.key}
                      className={
                        column.dataIndex === 'advertiser'
                          ? 'BlankProdTd'
                          : column.dataIndex === 'adPlatform'
                          ? 'BlankProdTd'
                          : ''
                      }
                    >
                      {column.dataIndex === 'advertiser'
                        ? ''
                        : column.dataIndex === 'adPlatform'
                        ? ''
                        : item[column.dataIndex] === 0 ? '-' : item[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
          <tr className="total">
            {columns.map((column) => (
              <td
                className="BottomTd"
                style={{
                  width: `${column.width}`,
                }}
                key={column.key}
              >
                {calculate(column.key)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}
export default ReportTable;