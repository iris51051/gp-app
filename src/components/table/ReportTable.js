import React, { useState,useMemo } from 'react';
import {
PlusOutlined, 
MinusOutlined,
CaretUpOutlined,
CaretDownOutlined,

 } from '@ant-design/icons';


export const ReportTable =React.memo(({Incomedata})=> {
  const [showingPlatform, setShowingPlatform] = useState([]);
  const [showingTablePlatform, setShowingTablePlatform] = useState([]);
  const [showingProgram, setShowingProgram] = useState([]);
  const [showingTableProgram, setShowingTableProgram] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    key: 'm_impr',
    direction: 'desc', // 'asc' or 'desc'
  });
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
  const TableData = [];

  for (const item of Incomedata) {
      const ad_provider = item.ad_provider;
      const ad_platform = item.ad_platform;
      const ad_program = item.ad_program;
      const ad_data = { ...item }; // Copy all properties from the current item
      delete ad_data.ad_provider; // Remove ad_provider property
      delete ad_data.ad_platform;  // Remove ad_platform property
      delete ad_data.ad_program;   // Remove ad_program property
  console.log('ad_data',ad_data)
      let providerEntry = TableData.find(entry => entry.ad_provider === ad_provider);

      if (!providerEntry) {
          providerEntry = {
              key: TableData.length + 1 || 1,
              ad_provider: ad_provider,
              children: []
          };
          TableData.push(providerEntry);
      }

      let platformEntry = providerEntry.children.find(entry => entry.ad_platform === ad_platform);

      if (!platformEntry) {
          const platformKey = `${providerEntry.key}-${providerEntry.children.length + 1}`;
          platformEntry = {
              key: platformKey,
              ad_platform: ad_platform,
              children: []
          };
          providerEntry.children.push(platformEntry);
      }

      const programEntry = {

          key: `${platformEntry.key}-${platformEntry.children.length + 1}`,
          ad_program:ad_program,
          ...ad_data,
      };

      platformEntry.children.push(programEntry);
  }

// Calculate sum totals
  TableData.forEach(providerEntry => {
    providerEntry.children.forEach(platformEntry => {
        let platformSum = {};

        platformEntry.children.forEach(programEntry => {
            for (const prop in programEntry) {
                if (
                    prop !== 'key' &&
                    prop !== 'm_ctr' &&
                    prop !== 'm_cpc' &&
                    prop !== 'm_crt' &&
                    prop !== 'm_roas' &&
                    prop !== 'rvn_per_odr' &&
                    prop !== 'rgr_per_m_click' &&
                    prop !== 'odr_per_m_cost' &&
                    prop !== 'roas'&&
                    prop !== 'ad_program'
                ) {
                  platformSum[prop] = (platformSum[prop] || 0) + programEntry[prop];
                }
            }
            platformSum['m_ctr'] = platformSum['m_impr'] != 0 ? platformSum['m_click'] / platformSum['m_impr']  : 0;
            platformSum['m_cpc'] = platformSum['m_click'] != 0 ? platformSum['m_cost'] / platformSum['m_click']  : 0;
            platformSum['m_crt'] = platformSum['m_click'] != 0 ? platformSum['m_conv'] / platformSum['m_click']  : 0;
            platformSum['m_roas'] = platformSum['m_cost'] != 0 ? platformSum['m_rvn'] / platformSum['m_cost']  : 0;
            platformSum['rvn_per_odr'] = platformSum['odr'] != 0 ? platformSum['rvn'] / platformSum['odr']  : 0;
            platformSum['rgr_per_m_click'] = platformSum['m_click'] != 0 ? platformSum['rgr'] / platformSum['m_click']  : 0;
            platformSum['odr_per_m_cost'] = platformSum['m_cost'] != 0 ? platformSum['odr'] / platformSum['m_cost']  : 0;
            platformSum['roas'] = platformSum['m_cost'] != 0 ? platformSum['rvn'] / platformSum['m_cost']  : 0;

            // Add the individual property sums to the programEntry
            for (const prop in platformSum) {
                platformEntry[prop] = platformSum[prop];
            }

            // ... (accumulate values for each property) ...
        });

    });



      providerEntry.children.forEach(platformEntry => {
        let providerSum = {};
        platformEntry.children.forEach(programEntry => {
            for (const prop in programEntry) {
                if (
                    prop !== 'key' &&
                    prop !== 'm_ctr' &&
                    prop !== 'm_cpc' &&
                    prop !== 'm_crt' &&
                    prop !== 'm_roas' &&
                    prop !== 'rvn_per_odr' &&
                    prop !== 'rgr_per_m_click' &&
                    prop !== 'odr_per_m_cost' &&
                    prop !== 'roas'&&
                    prop !== 'ad_program'
                ) {
                  providerSum[prop] = (providerSum[prop] || 0) + programEntry[prop];
                }
            }
            providerSum['m_ctr'] = providerSum['m_impr'] != 0 ? providerSum['m_click'] / providerSum['m_impr']  : 0;
            providerSum['m_cpc'] = providerSum['m_click'] != 0 ? providerSum['m_cost'] / providerSum['m_click']  : 0;
            providerSum['m_crt'] = providerSum['m_click'] != 0 ? providerSum['m_conv'] / providerSum['m_click']  : 0;
            providerSum['m_roas'] = providerSum['m_cost'] != 0 ? providerSum['m_rvn'] / providerSum['m_cost']  : 0;
            providerSum['rvn_per_odr'] = providerSum['odr'] != 0 ? providerSum['rvn'] / providerSum['odr']  : 0;
            providerSum['rgr_per_m_click'] = providerSum['m_click'] != 0 ? providerSum['rgr'] / providerSum['m_click']  : 0;
            providerSum['odr_per_m_cost'] = providerSum['m_cost'] != 0 ? providerSum['odr'] / providerSum['m_cost']  : 0;
            providerSum['roas'] = providerSum['m_cost'] != 0 ? providerSum['rvn'] / providerSum['m_cost']  : 0;

            for (const prop in providerSum) {
              providerEntry[prop] = providerSum[prop];
            }
        });
      })
  });
console.log(TableData);
  

  const clientData = [
    {
      key: '1',
      ad_provider: '네이버',
      ad_platform: '네이버 검색',
      ad_program: '브랜드검색',
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
      ad_provider: '카카오',
      ad_platform: '카카오 검색',
      ad_program: '키워드검색',
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
    if (key === 'ad_provider') {
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
        setShowingProgram((prevShowingProgram) => {
          return prevShowingProgram.filter((item) => item !== key);
        });
        return prevShowingPlatform.filter((item) => item !== key);
      }
    });
  };
  const showTablePlatform = (key) => {
    setShowingTablePlatform((prevShowingPlatform) => {
      if (!prevShowingPlatform.includes(key)) {
        return [...prevShowingPlatform, key];
      } else {
        setShowingTableProgram((prevShowingProgram) => {
          return prevShowingProgram.filter((item) => item !== key);
        });
        return prevShowingPlatform.filter((item) => item !== key);
      }
    });
  };
  const showProgram = (key) => {
    setShowingProgram((prevShowingProgram) => {
      if (!prevShowingProgram.includes(key)) {
        return [...prevShowingProgram, key];
      } else {
        return prevShowingProgram.filter((item) => item !== key);
      }
    });
  };
  const showTableProgram = (key) => {
    setShowingTableProgram((prevShowingProgram) => {
      if (!prevShowingProgram.includes(key)) {
        return [...prevShowingProgram, key];
      } else {
        return prevShowingProgram.filter((item) => item !== key);
      }
    });
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
  const sortedTableData = [...TableData].sort((a, b) => {
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
  const borderStyle = (key, index) => {
    if (!showingProgram.includes(key) && index === 'ad_provider') {
      return '1px solid #e4e7ea';
    } else if (showingProgram.includes(key) && index === 'ad_platform') {
      return '1px solid #f7fafc';
    }
  };

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
                cursor: !['ad_provider', 'ad_platform', 'ad_program'].includes(item.key) ? 'pointer' : 'default',
                }}
                key={item.key}
                onClick={() => {
                if (!['ad_provider', 'ad_platform', 'ad_program'].includes(item.key)) {
                    requestSort(item.dataIndex);
                }
                }}
            >
                <span style={{ verticalAlign: 'middle' }}>{item.title}</span>
                {['ad_provider', 'ad_platform', 'ad_program'].includes(item.key) ? (
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
                    className={column.dataIndex === 'ad_provider' ? 'AdTd' : ''}
                  >
                    {column.dataIndex === 'ad_platform' ? (
                      !showingPlatform.includes(item.key) ? (
                        <PlusOutlined
                          onClick={() => showPlatform(item.key)}
                        />
                      ) : (
                        <MinusOutlined
                          onClick={() => showPlatform(item.key)}
                        />
                      )
                    ) : column.dataIndex === 'ad_program' ? (
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
                        column.dataIndex === 'ad_provider' ? 'BlankTd' : ''
                      }
                      key={column.key}
                    >
                      {column.dataIndex === 'ad_provider' ? (
                        ''
                      ) : column.dataIndex === 'ad_program' ? (
                        <span>
                          {showingProgram.includes(item.key) ? (
                            <MinusOutlined
                              onClick={() => showProgram(item.key)}
                            />
                          ) : (
                            <PlusOutlined
                              onClick={() => showProgram(item.key)}
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
              {showingProgram.includes(item.key) && (
                <tr style={{backgroundColor:'#f7f7f7'}}>
                  {columns.map((column) => (
                    <td
                      style={{
                        width: `${column.width}`,
                      }}
                      key={column.key}
                      className={
                        column.dataIndex === 'ad_provider'
                          ? 'BlankProdTd'
                          : column.dataIndex === 'ad_platform'
                          ? 'BlankProdTd'
                          : ''
                      }
                    >
                      {column.dataIndex === 'ad_provider'
                        ? ''
                        : column.dataIndex === 'ad_platform'
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
      <br/>
      <br/>


      {/*
      *******************************************************************************************************************
      *****************************************API데이터 연결*************************************************************
      *******************************************************************************************************************
      */}

    <div>
        <p>조회된 항목 수: {TableData.map((item)=>item.key).length}</p>
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
                onClick={() => {
                if (!['ad_provider', 'ad_platform', 'ad_program'].includes(item.key)) {
                    requestSort(item.dataIndex);
                }
                }}
            >
                <span style={{ verticalAlign: 'middle' }}>{item.title}</span>
                {['ad_provider', 'ad_platform', 'ad_program'].includes(item.key) ? (
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
          {sortedTableData.map((item) => (
            <React.Fragment key={item.key}>
              <tr>
                {columns.map((column) => (
                  <td
                    style={{
                      width: `${column.width}`,
                    }}
                    key={column.key}
                    className={column.dataIndex === 'ad_provider' ? 'AdTd' : ''}
                  >
                    {column.dataIndex === 'ad_platform' ? (
                      !showingPlatform.includes(item.key) ? (
                        <PlusOutlined
                          onClick={() => showTablePlatform(item.key)}
                        />
                      ) : (
                        <MinusOutlined
                          onClick={() => showTablePlatform(item.key)}
                        />
                      )
                    ) : column.dataIndex === 'ad_program' ? (
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
                        column.dataIndex === 'ad_provider' ? 'BlankTd' : ''
                      }
                      key={column.key}
                    >
                      {column.dataIndex === 'ad_provider' ? (
                        ''
                      ) : column.dataIndex === 'ad_program' ? (
                        <span>
                          {showingProgram.includes(item.key) ? (
                            <MinusOutlined
                              onClick={() => showTableProgram(item.key)}
                            />
                          ) : (
                            <PlusOutlined
                              onClick={() => showTableProgram(item.key)}
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
              {showingProgram.includes(item.key) && (
                <tr style={{backgroundColor:'#f7f7f7'}}>
                  {columns.map((column) => (
                    <td
                      style={{
                        width: `${column.width}`,
                      }}
                      key={column.key}
                      className={
                        column.dataIndex === 'ad_provider'
                          ? 'BlankProdTd'
                          : column.dataIndex === 'ad_platform'
                          ? 'BlankProdTd'
                          : ''
                      }
                    >
                      {column.dataIndex === 'ad_provider'
                        ? ''
                        : column.dataIndex === 'ad_platform'
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
});
export default ReportTable;