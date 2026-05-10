import { useState } from "react";
import {fetchLogs, fetchStats} from '../src/services/logsApi.js';
import toast from "react-hot-toast";

const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (filters, dateRange) => {
    setLoading(true);
    //setError("");
    try {
      const [logsRes, statsRes] = await Promise.all([
        fetchLogs( filters, dateRange ),
        fetchStats(dateRange),
      ]);

      setLogs(logsRes.data);
      setStats(statsRes.data);
} catch (err) {
  console.error(err);

  if (err.response) {
    toast.error(err.response.data.message || "Server error");
  } else if (err.request) {
    toast.error("Network error");
  } else {
    toast.error(err.message || "Unexpected error");
  }
}
    finally {
      setLoading(false);
    }
  };

  return { logs, stats, loading, fetchData };
};

export default useLogs;