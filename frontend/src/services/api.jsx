import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// logs
export const getLogs = (filters = {}, dateRange = {}) => {
  const params = {};

  Object.keys(filters).forEach((key) => {
    if (filters[key] && filters[key] !== "ALL") {
      params[key] = filters[key];
    }
  });

  if (dateRange.startDate) params.startDate = dateRange.startDate;
  if (dateRange.endDate) params.endDate = dateRange.endDate;

  return api.get("/api/logs", { params });
};

// stats
export const getStats = (dateRange = {}) => {
  const diff = new Date(dateRange.endDate) - new Date(dateRange.startDate);

  const days = diff / (1000 * 60 * 60 * 24);

  // const groupBy = days <= 1 ? "hour" : days <= 7 ? "day" : "week";
  const groupBy = "hour";
  return api.get("/api/logs/stats", {
    params: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      groupBy,
    },
  });
};

export const createLog = (log) => {
  return api.post("/api/logs", log);
};

export const getLogsByTxnId = (txnId) => {
  return api.get(`/api/logs/${txnId}`);
};

export default api;
