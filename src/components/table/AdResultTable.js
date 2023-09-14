import React, { useEffect, useState } from 'react';
import { Button, Table, Input } from 'antd';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MinusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const defaultdata = [
  {
    key: 1,
    id: '101',
    totad: 6546831,
    pretotad: 12346831,
    totsale: 43215648,
    pretotsale: 23215648,
    get roas() {
      if (this.totad > 0 && this.totsale > 0) {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
    get preroas() {
      if (this.pretotad > 0 && this.pretotsale > 0) {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
  },
  {
    key: 2,
    id: '103',
    totad: 1548642,
    pretotad: 0,
    totsale: 45684321,
    pretotsale: 55684321,
    get roas() {
      if (this.totad > 0 && this.totsale > 0) {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
    get preroas() {
      if (this.pretotad > 0 && this.pretotsale > 0) {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
  },
  {
    key: 3,
    id: '102',
    totad: 1548642,
    pretotad: 1048642,
    totsale: 45684321,
    pretotsale: 55684321,
    get roas() {
      if (this.totad > 0 && this.totsale > 0) {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
    get preroas() {
      if (this.pretotad > 0 && this.pretotsale > 0) {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
  },
  {
    key: 4,
    id: '104',
    totad: 1548642,
    pretotad: 1048642,
    totsale: 0,
    pretotsale: 55684321,
    get roas() {
      if (this.totad > 0 && this.totsale > 0) {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
    get preroas() {
      if (this.pretotad > 0 && this.pretotsale > 0) {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
  },
  {
    key: 5,
    id: '105',
    totad: 1548642,
    pretotad: 1048642,
    totsale: 45684321,
    pretotsale: 0,
    get roas() {
      if (this.totad > 0 && this.totsale > 0) {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
    get preroas() {
      if (this.pretotad > 0 && this.pretotsale > 0) {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
  },
];
for(let i=6; i<100; i++){
  const data =  {
    key: i,
    id: `${i}`,
    totad: 6546831+i,
    pretotad: 12346831+i,
    totsale: 43215648+i,
    pretotsale: 23215648+i,
    get roas() {
      if (this.totad > 0 && this.totsale > 0) {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
    get preroas() {
      if (this.pretotad > 0 && this.pretotsale > 0) {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      } else {
        return 0;
      }
    },
  }
  defaultdata.push(data)
}
const App = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(defaultdata);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setData(defaultdata);
    setSortedInfo({});
  };

  const tablerender = (record, mode) => {
    if (mode[0] !== 'roas') {
      const cur = record[mode[0]];
      const pre = record[mode[1]];
      const res = ((cur - pre) / (pre / 100)).toFixed(0);
      const diff =
        pre === undefined || res === 0 || pre === 0 ? (
          <MinusOutlined />
        ) : res > 0 ? (
          <CaretUpOutlined className="ArrowUp" />
        ) : (
          <CaretDownOutlined className="ArrowDown" />
        );

      return (
        <>
          {cur ?
                Intl.NumberFormat('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                }).format(cur).replace('₩', '₩\u00A0')

            : '-'}
          {pre === undefined || pre === 0
            ? '(-%'
            : res === 0
            ? '(-%'
            : `(${res}%`}
          {diff})
        </>
      );
    } else {
      const cur = record[mode[0]];
      const pre = record[mode[1]];
      const res = ((cur - pre) / (pre / 100)).toFixed(0);
      const diff =
        pre === undefined || res === 0 ? (
          <MinusOutlined />
        ) : res > 0 ? (
          <CaretUpOutlined className="ArrowUp" />
        ) : (
          <CaretDownOutlined className="ArrowDown" />
        );

      return (
        <>
          {cur ? cur + '%' : '-'}
          {pre === undefined || pre === 0
            ? `(${cur}%`
            : res === 0
            ? '(-%)'
            : `(${res}%)`}
          {diff})
        </>
      );
    }
  };

  const columns = [
    {
      title: (
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
        광고주
      </div>
      ),
      dataIndex: 'id',
      align: 'start',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      width : '10%',
    },
    {
      title: '통계',
      align: 'center',
      dataIndex: 'statistics',
      key: 'statistics',
      width : '10%',
      ellipsis: true,
      render: (text, record) => {
      return (
        <>
        <a href="">
      <Button key={text}>상세보기</Button>
      </a>
      </>
      )
      }
    },
    {
      title: (
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
        총 광고비
      </div>
      ),
      dataIndex: 'totad',
      key: 'totad',
      align: 'end',
      ellipsis: true,
      width : '15%',
      sorter: (a, b) => a.totad - b.totad,
      sortOrder: sortedInfo.columnKey === 'totad' ? sortedInfo.order : null,

      render: (text, record) => {
        const mode = ['totad', 'pretotad'];
        return tablerender(record, mode);
      },
    },
    {
      title: (
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
        총 광고비(이전기간)
      </div>
      ),
      dataIndex: 'pretotad',
      align: 'end',
      key: 'pretotad',
      ellipsis: true,
      width : '15%',
      sorter: (a, b) => a.pretotad - b.pretotad,
      sortOrder: sortedInfo.columnKey === 'pretotad' ? sortedInfo.order : null,

      render: (text) => {
        if (text) {
          return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(text).replace('₩', '₩\u00A0');
        } else {
          return '-';
        }
      },
    },
    {
      title: (
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
       총 매출액
      </div>
      ),
      dataIndex: 'totsale',
      ellipsis: true,
      align: 'end',
      key: 'totsale',
      width : '15%',
      sorter: (a, b) => a.totsale - b.totsale,
      sortOrder: sortedInfo.columnKey === 'totsale' ? sortedInfo.order : null,
      render: (text, record) => {
        const mode = ['totsale', 'pretotsale'];
        return tablerender(record, mode);
      },
    },
    {
      title:(
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
       총 매출액(이전기간)
      </div>
      ),
      dataIndex: 'pretotsale',
      key: 'pretotsale',
      width : '15%',
      sorter: (a, b) => a.pretotsale - b.pretotsale,
      sortOrder:
        sortedInfo.columnKey === 'pretotsale' ? sortedInfo.order : null,
      ellipsis: true,
      align: 'end',
      render: (text) => {
        if (text) {
          return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(text).replace('₩', '₩\u00A0'); 
        } else {
          return '-';
        }
      },
    },
    {
      title: (
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
       ROAS(%)
      </div>
      ),
      dataIndex: 'roas',
      key: 'roas',
      width : '10%',
      sorter: (a, b) => a.roas - b.roas,
      sortOrder: sortedInfo.columnKey === 'roas' ? sortedInfo.order : null,
      ellipsis: true,
      align: 'end',
      render: (text, record) => {
        const mode = ['roas', 'preroas'];
        return tablerender(record, mode);
      },
    },
    {
      title:(
        <div className="ADResHeader"style={{ textAlign: 'center' }}>
       ROAS(%)(이전기간)
      </div>
      ),
      dataIndex: 'preroas',
      key: 'preroas',
      width : '10%',
      sorter: (a, b) => a.preroas - b.preroas,
      sortOrder: sortedInfo.columnKey === 'preroas' ? sortedInfo.order : null,
      align: 'end',
      ellipsis: true,
      render: (text) => {
        if (text) {
          return `${text}%`;
        } else {
          return '-';
        }
      },
    },
  ];
  const { Search } = Input;
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };
  // const onSearch = (value) => {
  //   setSearchText(value);
  //   const filteredData = data.filter((item) => {
  //     const itemValues = Object.values(item);
  //     return itemValues.some((itemValue) =>
  //       itemValue.toString().toLowerCase().includes(value.toLowerCase())
  //     );
  //   });
  //   setFilteredInfo({});
  //   setSortedInfo({});
  //   setData(filteredData);
  // };
  // const onSearch = (value) => {
  //   setSearchText(value);
  //   if (value === "") {
  //     // If the search value is empty, reset the data to defaultdata
  //     setData(defaultdata);
  //   } else {
  //     // If there is a search value, filter the defaultdata
  //     const filteredData = defaultdata.filter((item) => {
  //       const itemValues = Object.values(item);
  //       return itemValues.some((itemValue) =>
  //         itemValue.toString().toLowerCase().includes(value.toLowerCase())
  //       );
  //     });
  //     setData(filteredData);
  //   }
  // };
  
useEffect(() => {
  if (searchText === "") {
    setData(defaultdata);
  } else {
    const filteredData = defaultdata.filter((item) => {
      const itemValues = Object.values(item);
      return itemValues.some((itemValue) =>
        itemValue.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setData(filteredData);
  }
}, [searchText])

  //Excel 파일로 다운로드
  const handleDownload = () => {
    //새로운 workbook 생성
    const workbook = XLSXUtils.book_new();
    //테이블가져와서 시트로 반환
    const worksheet = XLSXUtils.table_to_sheet(
      document.getElementById('table')
    );
    //시트를 워크북에 첨부
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //워크북을 파일로 저장하여 지정된이름으로 다운로드
    writeFile(workbook, 'type2_table.xlsx');
  };
  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 16,
          }}
        >
          <div style={{ marginRight: 'auto' }}>
            <Button onClick={clearAll}>
              <ReloadOutlined />
            </Button>
          </div>

          <div style={{ display: 'flex' }}>
            <Search
              placeholder="검색"
              // onSearch={onSearch}
              onChange={(event) => setSearchText(event.target.value)}
              className="searchBtn"
            />
            <Button className="btn excelBtn" onClick={handleDownload}>
              Excel
            </Button>
          </div>
        </div>
        <Table
          className='ADResultTable'
          id="table"
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          rowClassName={rowClassName}
          showSorterTooltip={false}
          size='small'
        />
      </div>
    </>
  );
};
export default App;
