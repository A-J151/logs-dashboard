import { useRef, useState, useEffect } from "react";
import Pagination from "./Pagination.jsx";
import { getLevelColor } from "../utils/logUtils.js";
import "../Dashboard.css";

export function LogsTable({
  logs,
  loading,
  paginatedData,
  visibleColumns,
  sortField,
  sortOrder,
  handleSort,
  page,
  totalPages,
  setPage,
  hasFilters,
}) {
  const [expandRow, setExpandRow] = useState(null);
  const [overflowMap, setOverflowMap] = useState({});
  const textRefs = useRef({});

  const toggleRow = (id) => {
    setExpandRow((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const newMap = {};

    Object.keys(textRefs.current).forEach((id) => {
      const el = textRefs.current[id];

      if (el) {
        newMap[id] = el.scrollWidth > el.clientWidth;
      }
    });

    setOverflowMap(newMap);
  }, [paginatedData]);

  return (
    <div>
      {!loading && logs.length > 0 && (
        <div className="logs-section">
          <div
            className="logs-header"
            style={{
              gridTemplateColumns: visibleColumns
                .map((col) => (col === "message" ? "2fr" : "1fr"))
                .join(" "),
            }}
          >
            {visibleColumns.map((col) => (
              <div
                key={col}
                className="logs-header-item"
                onClick={() => handleSort(col)}
              >
                {col}

                {sortField === col && (
                  <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                )}
              </div>
            ))}
          </div>

          <div className="logs-body">
            {paginatedData.map((log) => (
              <div
                key={log._id}
                className="logs-row"
                style={{
                  gridTemplateColumns: visibleColumns
                    .map((col) => (col === "message" ? "2fr" : "1fr"))
                    .join(" "),
                }}
                onClick={() => toggleRow(log._id)}
              >
                {visibleColumns.map((col) => {
                  let value = log[col];

                  if (col === "timestamp") {
                    value = new Date(value).toLocaleString();
                  }

                  if (col === "level") {
                    return (
                      <div key={col}>
                        <span
                          className="log-level"
                          style={{
                            background: getLevelColor(log.level),
                          }}
                        >
                          {log.level}
                        </span>
                      </div>
                    );
                  }

                  if (col === "message") {
                    const isExpanded = expandRow === log._id;
                    const overflowing = overflowMap[log._id];

                    return (
                      <div
                        key={col}
                        className="logs-message"
                        ref={(el) => (textRefs.current[log._id] = el)}
                        style={{
                          whiteSpace: isExpanded ? "normal" : "nowrap",
                          textOverflow: isExpanded ? "clip" : "ellipsis",
                        }}
                      >
                        {value || "-"}

                        {overflowing && (
                          <span
                            className="more-less"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRow(log._id);
                            }}
                          >
                            {isExpanded ? " less" : " more"}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={col} className="logs-cell" title={value}>
                      {value || "-"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && logs.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {!loading && logs.length === 0 && (
        <div className="no-data">
          <div>
            {!hasFilters
              ? "Start by selecting filters"
              : "No logs match your filters"}
          </div>
        </div>
      )}
    </div>
  );
}
