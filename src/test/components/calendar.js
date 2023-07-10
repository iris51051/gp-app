import React, { useState, useEffect } from "react";
import "rsuite/dist/rsuite.min.css";
import { DateRangePicker, CustomProvider } from "rsuite";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import koKR from "rsuite/locales/ko_KR";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState([]);
  const [PickedRange, setPickedRange] = useState([new Date(), new Date()]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const renderValue = (value, formatStr) => {
    if (value[0] && value[1]) {
      setStartDate(value[0]);
      setEndDate(value[1]);
      return `${format(value[0], formatStr)} - ${format(value[1], formatStr)}`;
    }
  };
  useEffect(() => {
    if (startDate && endDate) {
      setPickedRange([startDate, endDate]);
    }
  }, [startDate, endDate]);
  const ranges = [
    {
      label: "오늘",
      value: [new Date(), new Date()],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "어제",
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "최근 7일",
      value: [subDays(new Date(), 6), new Date()],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "최근 30일",
      value: [subDays(new Date(), 29), new Date()],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "최근 90일",
      value: [subDays(new Date(), 89), new Date()],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "이번 달",
      value: [startOfMonth(new Date()), new Date()],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "지난 달",
      value: [
        startOfMonth(addMonths(new Date(), -1)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "이번 년도",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: "지난 년도",
      value: [
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(new Date().getFullYear(), 0, 0),
      ],
      placement: "left",
      closeOverlay: false,
    },
    {
      label: `${format(PickedRange[0], "yyyy-MM-dd")} - ${format(
        PickedRange[1],
        "yyyy-MM-dd"
      )}`,
      value: PickedRange,
      readOnly: true,
      closeOverlay: false,
      justifyContent: "flex-end",
    },
  ];

  const customLocale = {
    ok: "확인", // DateRangePicker의 버튼 이름 변경
  };

  //DateRangePicker 기간 삭제시 PickedRange 초기화
  const resetRange = () => {
    setPickedRange([new Date(), new Date()]);
    setSelectedDate([]);
  };

  //달력 선택 안하고 닫을 시의 PickedRange 값 설정
  const CloseCal = () => {
    if (selectedDate.length > 1) {
      setPickedRange(selectedDate);
    } else {
      setPickedRange([new Date(), new Date()]);
    }
  };
  console.log("selectedDate: " + selectedDate);
  console.log("pickedRange: " + PickedRange);
  return (
    <CustomProvider locale={koKR}>
      <DateRangePicker
        size="sm"
        format="yyyy-MM-dd"
        renderValue={renderValue}
        value={selectedDate}
        onChange={handleDateChange}
        ranges={ranges}
        locale={customLocale}
        placeholder="조회 기간 선택"
        onClean={resetRange}
        editable={false}
        onClose={CloseCal}
        placement="bottomEnd"
      />
    </CustomProvider>
  );
};
export default Calendar;
