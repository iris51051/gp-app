import React, { useState } from 'react';
import { Table, Typography } from 'antd';
const { Text } = Typography;


const MdResult = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);

};
  
  const titleRender =(value)=>{
    return(
      <div className="titleRender" style={{textAlign: 'center'}}> 
        {value}
      </div>
    )
  }
  const handleExpand = (key) => {
  
  }
  const columns = [
    {
      title: titleRender('광고매체사'),
      dataIndex: 'adMedia',
      align: 'start',
      key: 'adMedia',
      width: '15%',
      sorter: (a, b) => {
        const aMedia = a.adMedia.replace(/^[^A-Za-z0-9ㄱ-ㅎ가-힣]+/, '');
        const bMedia = b.adMedia.replace(/^[^A-Za-z0-9ㄱ-ㅎ가-힣]+/, '');
        if (sortedInfo.order === 'ascend') {
          return aMedia.localeCompare(bMedia, 'en', { sensitivity: 'base' });
        } else if (sortedInfo.order === 'descend') {
          return aMedia.localeCompare(bMedia, 'en', { sensitivity: 'base' });
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'adMedia' ? sortedInfo.order : null,
    },

    Table.EXPAND_COLUMN,
    {
      title:  
      <div className="adPro"> 
      광고상품
    </div>,
      dataIndex: 'adPro',
      align : 'start',
      key: 'adPro',
      width: '10%',
      render :  (text) =>{
      }
    },

    
    {
      title: titleRender('노출수'),
      dataIndex: 'expoCount',
      align : 'end',
      key : 'expoCount',
      sorter: (a, b) => a.expoCount - b.expoCount,
      sortOrder: sortedInfo.columnKey === 'expoCount' ? sortedInfo.order : null,
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
      key:'clckCount',
      align : 'end',
      sorter: (a, b) => parseInt(a.clckCount) - parseInt(b.clckCount),
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
      key:'CTR',
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
      key:'CPC',
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
      key: 'totAd',
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
  const data  = [
    {
      key: '1',
      adMedia: 'ADN PC',
      adPro: '좋은 상품1',
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
      adPro: '좋을 상품2',
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
      adPro: '좋은 상품3',
      expoCount: 8265052,
      clckCount: '22902',
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
      adPro: '좋은 상품4',
      expoCount: 19340,
      clckCount: 135,
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
      adMedia: '(주)카카오',
      adPro: '좋은 상품5',
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
      adMedia: '카카오',
      adPro: '좋은 상품6',
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
      key: '7',
      adMedia: 'DABLE',
      adPro: '좋은 상품7',
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
      key: '8',
      adMedia: '모비온',
      adPro: '좋은 상품8',
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
    {
      key: '9',
      adMedia: '(주)모비온',
      adPro: '좋은 상품8',
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
    {
      key: '10',
      adMedia: '(주)페이스북',
      adPro: '좋은 상품4',
      expoCount: 19340,
      clckCount: 135,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 114595,
    },
    {
      key: '11',
      adMedia: '(주)구글',
      adPro: '좋은 상품4',
      expoCount: 19340,
      clckCount: 135,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 114595,
    },
    {
      key: '12',
      adMedia: '(주)페이스북',
      adPro: '좋은 상품4',
      expoCount: 19340,
      clckCount: 135,
      get CTR() {
        return ((this.clckCount / this.expoCount) * 100).toFixed(2);
      },
      get CPC() {
        return (this.totAd / this.clckCount).toFixed(2);
      },
      totAd: 114595,
    },
  ];
 
  return (
    <>
      <Table
      className='MDresults'
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <td  className='adPro-expandable'>
            <p style={{ margin: 0 }}>
              {record.adPro}
            </p>
            </td>
          ),
        }}
        summary={(pageData) => {
          let totalexpoCount = 0;
          let totalclckCount = 0;
          let totaltotAd = 0;
          pageData.forEach(({ expoCount, clckCount,totAd }) => {
            totalexpoCount += Number(expoCount);
            totalclckCount += Number(clckCount);
            totaltotAd += Number(totAd);
          });
          const totalCTR =()=>{
            const num = ((totalclckCount/totalexpoCount)*100).toFixed(2);
            const ctrValue = parseFloat(num).toFixed(2);
            const formattedValue = Number(ctrValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return formattedValue + '%';
          }
          const totalCPC = ()=>{
            const num = (totaltotAd/totalclckCount).toFixed(2);
            const value = Intl.NumberFormat().format(num);
            return ('₩ '+value)
          }
          return (
            <>
              <Table.Summary fixed>
                <Table.Summary.Row className='totalRow'>
                  <Table.Summary.Cell index={0}>총합계</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Text >{ Intl.NumberFormat().format(totalexpoCount)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <Text>{Intl.NumberFormat().format(totalclckCount)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <Text>{totalCTR()}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <Text>{totalCPC()}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <Text>{Intl.NumberFormat(
                      'ko-KR',
                       {style: 'currency',currency: 'KRW',})
                      .format(totaltotAd)
                      .replace('₩', '₩\u00A0')}</Text>
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
