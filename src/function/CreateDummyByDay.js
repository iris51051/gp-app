const generateDummyDataTable = (stat_date) => ({
  stat_date: stat_date,
  m_rvn: 0,
  m_impr: 0,
  m_cost: 0,
  m_odr: 0,
  m_rgr: 0,
  land: 0,
  rvn: 0,
  m_cart: 0,
  odr: 0,
  rgr: 0,
  m_conv: 0,
  m_click: 0,
  m_cpc: 0,
  m_ctr: 0,
  m_crt: 0,
  m_roas: 0,
  rvn_per_odr: 0,
  rgr_per_m_click: 0,
  odr_per_m_cost: 0,
  roas: 0,
});

const generateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange = [];
  while (start <= end) {
    dateRange.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return dateRange.map((date) => date.toISOString().substring(0, 10));
};

export const generateDummyDataByDay = (data, date) => {
  const newData = [...data];
  const selectedDateRange = generateDateRange(date[0], date[1]);
  const existingDates = new Set(newData.map((item) => item.stat_date));
  const updatedData = [];

  for (const currentDate of selectedDateRange) {
    if (!existingDates.has(currentDate)) {
      const defaultData = generateDummyDataTable(currentDate);
      updatedData.push(defaultData);
      existingDates.add(currentDate);
    }
  }

  let dataIndex = 0;
  for (const newItem of updatedData) {
    while (
      dataIndex < newData.length &&
      newData[dataIndex].stat_date < newItem.stat_date
    ) {
      dataIndex++;
    }
    newData.splice(dataIndex, 0, newItem);
    dataIndex++;
  }

  return newData;
};
