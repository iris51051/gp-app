import React, { useState } from 'react';
import { Table, Typography } from 'antd';
const { Text } = Typography;
const dataSource  = [
    {
      key: '1',
      adMedia: 'ADN PC',
      adPro: 10,
      expoCount: 13915206,
      clckCount: 691863,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 16066017,
    },
    {
      key: '2',
      adMedia: '구글',
      adPro: 10,
      expoCount: 24405226,
      clckCount: 110885,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 164044510,
    },
    {
      key: '3',
      adMedia: '네이버',
      adPro: 10,
      expoCount: 8265052,
      clckCount: 22902,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: '71471411',
    },
    {
      key: '4',
      adMedia: '페이스북',
      adPro: 10,
      expoCount: 19340,
      clckCount: '135',
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 114595,
    },
    {
      key: '5',
      adMedia: '카카오',
      adPro: 10,
      expoCount: 74516,
      clckCount: 158,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 120703,
    },
    {
      key: '6',
      adMedia: 'DABLE',
      adPro: 10,
      expoCount: 607017015,
      clckCount: 278697,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd:  92895707,
    },
    {
      key: '7',
      adMedia: '모비온',
      adPro: 10,
      expoCount: 255496,
      clckCount: 7157,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd:  830078,
    },
  ];

const MdResult = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (sorter) => {
    setSortedInfo(sorter);
    console.log('sorter', sorter);
};
  
  const titleRender =(value)=>{
    return(
      <div classNmae="titleRender" style={{textAlign: 'center'}}> 
        {value}
      </div>
    )
    
  }
  const columns = [
    {
        title: titleRender('광고매체사'),
      dataIndex: 'adMedia',
      align : 'start',
      key:'adMedia',
      sorter: (a, b) => a.adMedia - b.adMedia,
      sortOrder: sortedInfo.columnKey === 'adMedia' ? sortedInfo.order : null,
    },
    {
      title: titleRender('광고상품'),
      dataIndex: 'adPro',
      align : 'start',
      sorter: (a, b) => a.adPro - b.adPro,
      sortOrder: sortedInfo.columnKey === 'adPro' ? sortedInfo.order : null,
      render: (text) => {
        if (text) {
          return Intl.NumberFormat('ko-KR', {
            currency: 'KRW',
          }).format(text);
        } else {
          return '-';
        }
      },
    },
    {
      title: titleRender('노출수'),
      dataIndex: 'expoCount',
      align : 'end',
      key : 'expoCount',
      sorter: (a, b) => a.expoCount - b.expoCount,

      render: (text) => {
        if (text) {
          return Intl.NumberFormat().format(text);
        } else {
          return '-';
        }
      },
    },
    {
      title: titleRender('클릭수'),
      dataIndex: 'clckCount',
      align : 'end',
      sorter: (a, b) => a.clckCount - b.clckCount,
      sortOrder: sortedInfo.columnKey === 'clckCount' ? sortedInfo.order : null,
      render: (text) => {
        if (text) {
          return Intl.NumberFormat().format(text);
        } else {
          return '-';
        }
      },
    },
    {
      title: titleRender('CTR'),
      dataIndex: 'CTR',
      align: 'end',
      sorter: (a, b) => a.CTR - b.CTR,
      sortOrder: sortedInfo.columnKey === 'CTR' ? sortedInfo.order : null,
      render: (text) => {
        if (text) {
          const ctrValue = parseFloat(text).toFixed(2);
          const formattedValue = Number(ctrValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          return formattedValue + '%';
        } else {
          return '-';
        }
      },
    },
    {
      title: titleRender('CPC'),
      dataIndex: 'CPC',
      align : 'end',
      sorter: (a, b) => parseFloat(a.CPC) - parseFloat(b.CPC),
      sortOrder: sortedInfo.columnKey === 'CPC' ? sortedInfo.order : null,
      render: (text) => {
        if (text) {
          const value = Intl.NumberFormat().format(text);
          return ('₩ '+value)
        } else {
          return '-';
        }
      },
    },
    {
      title: titleRender('총광고비'),
      dataIndex: 'totAd',
      align : 'end',
      sorter: (a, b) => a.totAd - b.totAd,
      sortOrder: sortedInfo.columnKey === 'totAd' ? sortedInfo.order : null,
      render: (text) => {
        if (text) {
          return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          })
            .format(text)
            .replace('₩', '₩\u00A0');
        } else {
          return '-';
        }
      },
    },
  ];
 
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource }
        pagination={false}
        onChange={(sorter) => handleChange(sorter)}
        bordered
        summary={(pageData) => {
          let totalexpoCount = 0;
          let totalclckCount = 0;
          let totaltotAd = 0;
          pageData.forEach(({ expoCount, clckCount,totAd }) => {
            totalexpoCount += Number(expoCount);
            totalclckCount += Number(clckCount);
            totaltotAd += Number(totAd);
          });
          return (
            <>
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Text >{ Intl.NumberFormat().format(totalexpoCount)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <Text>{Intl.NumberFormat().format(totalclckCount)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <Text>{Intl.NumberFormat().format(totalclckCount)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <Text>{Intl.NumberFormat().format(totalclckCount)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <Text>{Intl.NumberFormat().format(totaltotAd)}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                </Table.Summary>
            </>
          );
        }}
      />
    </>
  );
};
export default MdResult;
