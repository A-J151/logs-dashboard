import { getLogs, getStats } from "./api";
export const fetchLogs = (filters, dateRange) => {
  return getLogs(filters, dateRange);
};

export const fetchStats = (dateRange) => {
  return getStats(dateRange);
};