import { useState, useEffect, useRef } from "react";
import FilterBar from "../components/FilterBar.jsx";
import StatsBar from "../components/StatsBar.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useLogs from "../../hooks/useLogs.js";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination.jsx";
import SkeletonRow from "../components/SkeletonRow.jsx";
import useTableState from "../../hooks/useTableState.js";
import useFilters from "../../hooks/useFilters.js";
import { getBucketRange } from "../../src/utils/dateUtils.js";
import { getLevelColor } from "../utils/logUtils.js";
import { LogsTable } from "../components/LogsTable.jsx";
function Dashboard() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [overflowMap, setOverflowMap] = useState({});
  const textRefs = useRef({});
  const [limit] = useState(10);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedBucket, setSelectedBucket] = useState(null);
  // const [error, setError] = useState();
  const { fetchData, logs, stats, loading } = useLogs();
  const {
    filters,
    updateFilter,
    clearFilters,
    dateRange,
    setDateRange,
    setQuickRange,
  } = useFilters();
  const {
    page,
    setPage,
    sortField,
    sortOrder,
    handleSort,
    paginatedData,
    totalPages,
  } = useTableState(logs, limit);

  //render dynamic columns
  const baseColumns = ["timestamp", "level", "message"];
  const allOptionalColumns = ["source", "storeId", "txnId", "transactionType"];

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const delay = setTimeout(() => {
      fetchData(filters, dateRange);
    }, 500);

    return () => clearTimeout(delay);
  }, [filters, dateRange]);

  const handleColumnToggle = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column],
    );
  };

  const visibleColumns = [...baseColumns, ...selectedColumns];
  const [expandRow, setExpandRow] = useState(null);
  const toggleRow = (id) => {
    setExpandRow((prev) => (prev === id ? null : id));
  };

  const handleSearch = () => {
    fetchData(filters, dateRange);
  };
  function handleLogout(e) {
    try {
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  }
  const handleBarClick = (bucket) => {
    const range = getBucketRange(bucket);
    if (!range) return;
    setSelectedBucket(bucket);
    setDateRange(range);
  };

  const isOverflowing = (id) => {
    const el = textRefs.current[id];
    if (!el) return false;
    return el.scrollWidth > el.clientWidth;
  };
  const hasFilters =
    Object.values(filters).some(Boolean) ||
    (dateRange.startDate && dateRange.endDate);

  return (
    <div className="card">
      <div className="subcard">
        <div className="dashboard-container">
          <div className="container"> 📊</div>
          <h2 className="dashboard-header">Dashboard</h2>
        </div>
        <button
          disabled={loading}
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
      <div className="filterBar">
        <FilterBar
          filters={filters}
          onFilterChange={updateFilter}
          onSearch={handleSearch}
          onClear={clearFilters}
          setQuickRange={setQuickRange}
          setDateRange={setDateRange}
        />
      </div>
      {dateRange.startDate && dateRange.endDate && (
        <div className="dateRange">
          {new Date(dateRange.startDate).toLocaleString()}
          {" → "}
          {new Date(dateRange.endDate).toLocaleString()}
        </div>
      )}
      <StatsBar
        stats={stats}
        loading={loading}
        onBarClick={handleBarClick}
        selectedBucket={selectedBucket}
      />

      <div className="columns-panel">
        {logs.length > 0 && (
          <div className="columns">
            <h4 className="columns-header">Add more fields</h4>
            <div style={{ textAlign: "justify" }}>
              {" "}
              {allOptionalColumns.map((col) => (
                <label key={col} className="input-label">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col)}
                    onChange={() => handleColumnToggle(col)}
                    style={{ marginRight: "6px" }}
                  />
                  {col}
                </label>
              ))}
            </div>
          </div>
        )}
        <div style={{ flex: 1 }}>
          {loading && (
            <>
              {Array.from({ length: limit }).map((_, i) => (
                <SkeletonRow key={i} columns={visibleColumns} />
              ))}
            </>
          )}
          {/* {error && <p>{error}</p>} */}

          <LogsTable
            logs={logs}
            loading={loading}
            paginatedData={paginatedData}
            visibleColumns={visibleColumns}
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            hasFilters={hasFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
