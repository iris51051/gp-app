import React from 'react';
import { Table, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MinusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const Type2 = () => {
  //컬럼 명

  const tablerender = (record, mode) => {
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
        {cur
          ? `${Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            }).format(cur)}`
          : '-'}
        {pre === undefined || res === 0 ? '(-%)' : `(${res}%)`}
        {diff}
      </>
    );
  };

  const columns = [
    {
      title: '광고주',
      dataIndex: 'id',
      sorter: true,
      align: 'start',
      ellipsis: true,
    },
    {
      title: '통계',
      align: 'center',
      dataIndex: 'statistics',
      sorter: true,
      ellipsis: true,
      //유형별 icon에 다른 클래스명 부여
      render: (text) => {
        return (
          <a href="">
            <button className="btn typeBtn">상세보기</button>
          </a>
        );
      },
    },
    {
      title: '총 광고비',
      dataIndex: 'totad',
      sorter: true,
      align: 'end',
      ellipsis: true,
      render: (text, record) => {
        const mode = ['totad', 'pretotad'];
        return tablerender(record, mode);
      },
    },
    {
      title: '총 광고비(이전기간)',
      dataIndex: 'pretotad',
      align: 'end',
      sorter: true,
      ellipsis: true,
      render: (text) => {
        if (text) {
          return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(text);
        } else {
          return '-';
        }
      },
    },
    {
      title: '총 매출액',
      dataIndex: 'totsale',
      sorter: true,
      ellipsis: true,
      align: 'end',
      render: (text, record) => {
        const mode = ['totsale', 'pretotsale'];
        return tablerender(record, mode);
      },
    },
    {
      title: '총 매출액(이전기간)',
      dataIndex: 'pretotsale',
      sorter: true,
      ellipsis: true,
      align: 'end',
      render: (text) => {
        if (text) {
          return Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
          }).format(text);
        } else {
          return '-';
        }
      },
    },
    {
      title: 'ROAS(%)',
      dataIndex: 'roas',
      sorter: true,
      ellipsis: true,
      align: 'end',
      render: (text, record) => {
        const mode = ['roas', 'preroas'];
        return tablerender(record, mode);
      },
    },
    {
      title: 'ROAS(%)(이전기간)',
      dataIndex: 'preroas',
      sorter: true,
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

  const defaultdata = [
    {
      key: 1,
      id: '101',
      statistics: 'Discovery',
      totad: 6546831,
      pretotad: 12346831,
      totsale: 43215648,
      pretotsale: 23215648,
      get roas() {
        return ((this.totad / this.totsale) * 100).toFixed(0);
      },
      get preroas() {
        return ((this.pretotad / this.pretotsale) * 100).toFixed(0);
      },
    },
    {
      key: 2,
      id: '102',
      audienceType: 'Behavioral',
      audienceName: '네이버로 인입하여 구매한 유저 그룹',
      potentialNum: '61,100',
      method: '수동',
      status: '오류',
      manage: '삭제',
    },
    {
      key: 3,
      id: '103',
      audienceType: 'Union',
      audienceName: '네이버로 인입하여 구매한 유저 그룹',
      potentialNum: '60,000',
      method: '자동',
      status: '완료',
      manage: '삭제',
    },
    {
      key: 4,
      id: '104',
      audienceType: 'Behavioral',
      audienceName: '네이버로 인입하여 구매한 유저 그룹',
      potentialNum: '62,000',
      method: '수동',
      status: '완료',
      manage: '삭제',
    },
    {
      key: 5,
      id: '105',
      audienceType: 'Discovery',
      audienceName: '네이버로 인입하여 구매한 유저 그룹',
      potentialNum: '60,500',
      method: '자동',
      status: '생성중',
      manage: '삭제',
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); //로딩 상태 : false(초기값)
  //테이블 상태(현재 페이지:1, 페이지당 항목 수: 3)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    //정렬
    sorter: {
      field: '', //필드 (정렬할 항목)
      order: '', //순서
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sorter,
    });
  };
  const reRender = () => {

    setTableParams((prevParams) => ({
      ...prevParams,
      sorter: {
        field: '',
        order: '',
      },
    }));
  };
  useEffect(() => {
    setLoading(true); //로딩상태 : true
    console.log("reset")
    const sortedData = [...defaultdata]; //초기값 복사
    const { field, order } = tableParams.sorter;

    //정렬
    if (field && order) {
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'ascend'
            ? aValue.localeCompare(bValue, undefined, { numeric: true })
            : bValue.localeCompare(aValue, undefined, { numeric: true });
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'ascend' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    setData(sortedData);
    setLoading(false);
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        total: sortedData.length, //정렬된 데이터 길이
      },
    }));
  }, [tableParams.sorter]); //정렬옵션 변경할 때마다 실행

  //홀수열과 짝수열에 클래스 이름 지정 (배경색 다르게 하기 위해서)
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };

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

  const { Search } = Input;
  const [searchText, setSearchText] = useState('');

  //검색기능
  const onSearch = (value) => {
    setSearchText(value);
    const filteredData = defaultdata.filter((item) => {
      const itemValues = Object.values(item); //item개체에 있는 모든 값의 배열
      return itemValues.some((itemValue) =>
        itemValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current: 1,
        total: filteredData.length,
      },
    }));

    setData(filteredData);
  };

  return (
    <div className="type2Div">
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      >
        <div style={{ marginRight: 'auto' }}>
          <Button onClick={reRender}>
            <ReloadOutlined />
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <Search
            placeholder="검색"
            onSearch={onSearch}
            className="searchBtn"
          />
          <Button className="btn excelBtn" onClick={handleDownload}>
            Excel
          </Button>
        </div>
      </div>
      <Table
        id="table"
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        rowClassName={rowClassName}
      />
    </div>
  );
};
export default Type2;
