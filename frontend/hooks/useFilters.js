import { useState } from "react";

const getDefaultLastHourRange = () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);

  const start = new Date(now);
  start.setHours(start.getHours() - 1);

  return {
    startDate: start.toISOString(),
    endDate: now.toISOString(),
  };
};
const useFilters = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    level: "",
    source: "",
    storeId: "",
    txnId: "",
    transactionType: "",
  });
  const [dateRange, setDateRange] = useState(() => getDefaultLastHourRange());

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const clearFilters = () => {
    setFilters({
      keyword: "",
      level: "",
      source: "",
      storeId: "",
      txnId: "",
      transactionType: "",
    });
    setDateRange(getDefaultLastHourRange());
  };
  const setQuickRange = (type) => {
    const now = new Date();
    let start = new Date();

    switch (type) {
      case "NOW": {
        const start = new Date(now);
        start.setHours(0, 0, 0, 0);

        const end = new Date(now);
        end.setHours(23, 59, 59, 999);

        setDateRange({
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        });
        return;
      }

      case "1D":
        start.setDate(now.getDate() - 1);
        break;

      case "1W": {
        const end = new Date(now);
        end.setHours(23, 59, 59, 999);

        const start = new Date(now);
        start.setDate(now.getDate() - 6);
        start.setHours(0, 0, 0, 0);

        setDateRange({
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        });
        return;
      }

      case "1M":
        start.setMonth(now.getMonth() - 1);
        break;

      default:
        return;
    }

    setDateRange({
      startDate: start.toISOString(),
      endDate: now.toISOString(),
    });
  };

  return {
    filters,
    dateRange,
    setDateRange,
    updateFilter,
    clearFilters,
    setQuickRange,
  };
};

export default useFilters;
