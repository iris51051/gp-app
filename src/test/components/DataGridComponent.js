import React from "react";
import { Table, Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { utils as XLSXUtils, writeFile } from "xlsx";

/**
 ******************************* Type1 **********************************
 *
 * */

export const Type1 = () => {
  //컬럼 명
  const columns = [
    {
      title: "광고주",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "통계",
      dataIndex: "stats",
      align: "center",
      render: (text) => <button className="btn basicBtn">{text}</button>,
    },
    {
      title: "총 광고비",
      dataIndex: "totalAd",
    },
    {
      title: "총 광고비 (이전기간)",
      dataIndex: "tatalAdPrev",
    },
    {
      title: "ROAS(%)",
      dataIndex: "roas",
    },
    {
      title: "ROAS(%) (이전기간)",
      dataIndex: "roasPrev",
    },
  ];

  //실제 데이터
  const data = [
    {
      key: "1",
      name: "쿠팡",
      stats: "상세보기",
      totalAd: "2,223,526원",
      tatalAdPrev: "2,223,526원",
      roas: "110%",
      roasPrev: "110%",
    },
    {
      key: "2",
      name: "쿠팡",
      stats: "상세보기",
      totalAd: "1,223,526원",
      tatalAdPrev: "1,223,526원",
      roas: "120%",
      roasPrev: "120%",
    },
    {
      key: "3",
      name: "쿠팡",
      stats: "상세보기",
      totalAd: "3,223,526원",
      tatalAdPrev: "3,223,526원",
      roas: "100%",
      roasPrev: "100%",
    },
  ];

  //홀수열과 짝수열에 클래스 이름 지정 (배경색 다르게 하기 위해서)
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <div className="type1Div">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        rowClassName={rowClassName}
      />
    </div>
  );
};

/**
 ******************************* Type2 **********************************
 *
 * */

export const Type2 = () => {
  //컬럼 명
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "오디언스 유형",
      align: "center",
      dataIndex: "audienceType",
      sorter: true,
      //유형별 icon에 다른 클래스명 부여
      render: (text) => {
        let iconColor = "";
        switch (text) {
          case "Behavioral":
            iconColor = "icon-behavioral";
            break;
          case "Discovery":
            iconColor = "icon-discovery";
            break;
          case "Union":
            iconColor = "icon-union";
            break;
          default:
            break;
        }
        return (
          <button className="btn typeBtn">
            <FontAwesomeIcon icon={faCircle} className={`icon ${iconColor}`} />
            {"  "}
            {text}
          </button>
        );
      },
    },
    {
      title: "오디언스명",
      dataIndex: "audienceName",
      sorter: true,
      render: (text) => <a>{text}</a>,
      align: "center",
    },
    {
      title: "잠재고객 수 (마지막일자)",
      dataIndex: "potentialNum",
      sorter: true,
    },
    {
      title: "생성방법",
      dataIndex: "method",
      sorter: true,
      align: "center",
    },

    //상태별 버튼에 다른 클래스명 부여
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      align: "center",
      render: (text) => {
        let statusColor = "";
        switch (text) {
          case "생성중":
            statusColor = "status-creating";
            break;
          case "오류":
            statusColor = "status-error";
            break;
          case "완료":
            statusColor = "status-complete";
            break;
          default:
            break;
        }
        return (
          <button className={`btn statusBtn ${statusColor}`}>{text}</button>
        );
      },
    },
    {
      title: "관리",
      dataIndex: "manage",
      render: (text) => <button className="btn deleteBtn">{text}</button>,
      align: "center",
    },
  ];

  const defaultdata = [
    {
      key: 1,
      id: "101",
      audienceType: "Discovery",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "61,000",
      method: "자동",
      status: "생성중",
      manage: "삭제",
    },
    {
      key: 2,
      id: "102",
      audienceType: "Behavioral",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "61,100",
      method: "수동",
      status: "오류",
      manage: "삭제",
    },
    {
      key: 3,
      id: "103",
      audienceType: "Union",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "60,000",
      method: "자동",
      status: "완료",
      manage: "삭제",
    },
    {
      key: 4,
      id: "104",
      audienceType: "Behavioral",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "62,000",
      method: "수동",
      status: "완료",
      manage: "삭제",
    },
    {
      key: 5,
      id: "105",
      audienceType: "Discovery",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "60,500",
      method: "자동",
      status: "생성중",
      manage: "삭제",
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); //로딩 상태 : false(초기값)
  //테이블 상태(현재 페이지:1, 페이지당 항목 수: 3)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 3,
    },
    //정렬
    sorter: {
      field: "", //필드 (정렬할 항목)
      order: "", //순서
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sorter,
    });
  };

  useEffect(() => {
    setLoading(true); //로딩상태 : true

    const sortedData = [...defaultdata]; //초기값 복사
    const { field, order } = tableParams.sorter;

    //정렬
    if (field && order) {
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "ascend"
            ? aValue.localeCompare(bValue, undefined, { numeric: true })
            : bValue.localeCompare(aValue, undefined, { numeric: true });
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "ascend" ? aValue - bValue : bValue - aValue;
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

  const handleAdd = () => {};

  //홀수열과 짝수열에 클래스 이름 지정 (배경색 다르게 하기 위해서)
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  //Excel 파일로 다운로드
  const handleDownload = () => {
    //새로운 workbook 생성
    const workbook = XLSXUtils.book_new();
    //테이블가져와서 시트로 반환
    const worksheet = XLSXUtils.table_to_sheet(
      document.getElementById("table")
    );
    //시트를 워크북에 첨부
    XLSXUtils.book_append_sheet(workbook, worksheet, "Sheet1");
    //워크북을 파일로 저장하여 지정된이름으로 다운로드
    writeFile(workbook, "type2_table.xlsx");
  };

  const { Search } = Input;
  const [searchText, setSearchText] = useState("");

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
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
          className="newBtn"
        >
          New Union Audience
        </Button>
        <div>
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

/**
 ******************************* Type3 **********************************
 *
 * */

export const Type3 = () => {
  //컬럼 명
  const columns = [
    Table.SELECTION_COLUMN, //체크박스
    {
      title: "키워드",
      dataIndex: "keyword",
      className: "column-width-fix",
      sorter: true,
      align: "left",
    },

    Table.EXPAND_COLUMN, //row펼침
    {
      title: "캠페인",
      dataIndex: "campaign",
      className: "expanded-column",
      align: "left",
    },
    {
      title: "노출수",
      dataIndex: "exposeNum",
      className: "column-width-fix",
      sorter: true,
    },
    {
      title: "전환수",
      dataIndex: "turnoverNum",
      className: "column-width-fix",
      sorter: true,
    },
    {
      title: "매출액",
      dataIndex: "sales",
      className: "column-width-fix",
      sorter: true,
    },
    {
      title: "ROAS",
      dataIndex: "roas",
      className: "column-width-fix",
      sorter: true,
    },
  ];
  //실제 데이터
  const defaultdata = [];
  for (let i = 1; i <= 21; i++) {
    defaultdata.push({
      key: i,
      keyword: `방수천-${i}`,
      exposeNum: `${i}2`,
      turnoverNum: `${i}1`,
      sales: `${i}`,
      roas: `${i}10`,
      description: "초기값",
    });
  }

  //총 합계 default
  const [grandTotal, setGrandTotal] = useState({
    key: "total",
    keyword: "총 합계",
    exposeNum: 0,
    turnoverNum: 0,
    sales: 0,
    roas: 0,
    className: "total-row",
  });

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
      field: "", //필드 (정렬할 항목)
      order: "", //순서
    },
  });

  //테이블 변경시 페이징 처리 다시 설정
  const handleTableChange = (pagination, _, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sorter,
    });
  };

  useEffect(() => {
    setLoading(true); //로딩상태 : true

    const sortedData = [...defaultdata]; //초기값 복사
    const { field, order } = tableParams.sorter;

    //정렬(문자도 숫자형으로 정렬할수있도록 설정)
    if (field && order) {
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "ascend"
            ? aValue.localeCompare(bValue, undefined, { numeric: true })
            : bValue.localeCompare(aValue, undefined, { numeric: true });
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "ascend" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        total: sortedData.length, //정렬된 데이터 길이
      },
    }));

    const pagination = tableParams.pagination;
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const slicedData = sortedData.slice(startIndex, endIndex);

    const updatedGrandTotal = {
      key: "total",
      keyword: "총 합계",
      exposeNum: slicedData.reduce(
        (total, item) => total + Number(item.exposeNum),
        0
      ),
      turnoverNum: slicedData.reduce(
        (total, item) => total + Number(item.turnoverNum),
        0
      ),
      sales: slicedData.reduce((total, item) => total + Number(item.sales), 0),
      roas: slicedData.reduce((total, item) => total + Number(item.roas), 0),
      className: "total-row",
    };

    setGrandTotal(updatedGrandTotal);
    setData(slicedData);
    setLoading(false);
  }, [tableParams.sorter, tableParams.pagination.pageSize]); //옵션 변경할 때마다 실행

  const { Search } = Input;
  const [searchText, setSearchText] = useState("");

  //총합행 클래스 이름 지정
  const rowClassName = (record) => {
    return record.key === "total" ? "total-row" : null;
  };

  //Excel 파일로 다운로드
  const handleDownload = () => {
    //새로운 workbook 생성
    const workbook = XLSXUtils.book_new();
    //테이블가져와서 시트로 반환
    const worksheet = XLSXUtils.table_to_sheet(
      document.getElementById("table")
    );
    //시트를 워크북에 첨부
    XLSXUtils.book_append_sheet(workbook, worksheet, "Sheet1");
    //워크북을 파일로 저장하여 지정된이름으로 다운로드
    writeFile(workbook, "type3_table.xlsx");
  };

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

    const pagination = tableParams.pagination;
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const slicedData = filteredData.slice(startIndex, endIndex);

    const updatedGrandTotal = {
      key: "total",
      keyword: "총 합계",
      exposeNum: slicedData.reduce(
        (total, item) => total + Number(item.exposeNum),
        0
      ),
      turnoverNum: slicedData.reduce(
        (total, item) => total + Number(item.turnoverNum),
        0
      ),
      sales: slicedData.reduce((total, item) => total + Number(item.sales), 0),
      roas: slicedData.reduce((total, item) => total + Number(item.roas), 0),
      className: "total-row",
    };
    setGrandTotal(updatedGrandTotal);
    setData(slicedData);
  };

  //pageSize 변경
  const handlePageSizeChange = (value) => {
    const totalItems = defaultdata.length;
    const pageSize = value === 40 ? totalItems : value;

    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current: 1,
        pageSize: pageSize,
      },
    }));
  };

  //조회된 항목 수
  const itemLength = () => {
    return searchText ? data.length : defaultdata.length;
  };

  return (
    <div className="type3Div">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div className="selectText">
          <Select
            defaultValue={{ value: 10, label: "10개씩 보기" }}
            className="selectBox"
            options={[
              { value: 10, label: "10개씩 보기" },
              { value: 20, label: "20개씩 보기" },
              { value: 30, label: "30개씩 보기" },
              { value: 40, label: "전체 보기" },
            ]}
            onChange={handlePageSizeChange}
          />
          조회된 항목 수 : {itemLength()}
        </div>
        <div>
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
        pagination={tableParams.pagination}
        columns={columns}
        dataSource={data}
        rowSelection={{}}
        expandable={{
          expandedRowRender: () => (
            <p style={{ margin: 0 }}>
              <SubTable />
            </p>
          ),
        }}
        loading={loading}
        onChange={handleTableChange}
        rowClassName={rowClassName}
        footer={() => (
          <tfoot>
            <tr className="total-row">
              <td className="selection-column"></td>
              <td className="column-width-fix">{grandTotal.keyword}</td>
              <td className="ant-table-row-expand-icon-cell"></td>
              <td className="expanded-column"></td>
              <td className="column-width-fix">{grandTotal.exposeNum}</td>
              <td className="column-width-fix">{grandTotal.turnoverNum}</td>
              <td className="column-width-fix">{grandTotal.sales}</td>
              <td className="column-width-fix">{grandTotal.roas}</td>
            </tr>
          </tfoot>
        )}
      />
    </div>
  );
};

//확장 테이블 컴포넌트
const SubTable = () => {
  const subTableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "하나",
      dataIndex: "one",
      align: "center",
    },
    {
      title: "둘",
      dataIndex: "two",
      align: "center",
    },
    {
      title: "셋",
      dataIndex: "three",
      align: "center",
    },
  ];
  const subTableData = [];
  for (let i = 1; i <= 2; i++) {
    subTableData.push({
      id: i,
      one: 1111111111,
      two: 2222222222,
      three: 333333333,
    });
  }

  return (
    <div>
      <Table
        columns={subTableColumns}
        dataSource={subTableData}
        pagination={false}
      />
    </div>
  );
};

//원하는 데이터그리드 컴포넌트 출력
const DataGridComponent = () => {
  return (
    <div>
      <Type1 />
      <Type2 />
      <Type3 />
    </div>
  );
};

export default DataGridComponent;
