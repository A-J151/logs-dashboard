import { useState } from "react";
import { inputStyle, cardStyle, primaryButton, ui } from "../ui/theme.js";
function FilterBar({
  filters,
  onFilterChange,
  onSearch,
  onClear,
  setQuickRange,
  setDateRange,
}) {
  const [focused, setFocused] = useState(null);
  const [rangeType, setRangeType] = useState("1D");
  const [useCustomDate, setUseCustomDate] = useState(false);
  // const inputStyle = {
  //   padding: "10px 12px",
  //   borderRadius: "8px",
  //   border: "1px solid #d1d5db",
  //   outline: "none",
  //   fontSize: "14px",
  //   transition: "all 0.2s ease",
  //   background: "#fff",
  // };

  const focusStyle = {
    border: `1px solid ${ui.colors.primary}`,
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
  };

  // const buttonStyle = {
  //   padding: "8px 14px",
  //   borderRadius: "8px",
  //   border: "none",
  //   cursor: "pointer",
  //   fontWeight: "500",
  //   transition: "all 0.2s ease",
  // };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          {useCustomDate ? "Using Custom Date" : "Using Quick Range"}
        </span>

        <button
          onClick={() => setUseCustomDate((prev) => !prev)}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Switch
        </button>
      </div>
      {!useCustomDate ? (
        // ✅ QUICK RANGE (your original buttons)
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["NOW", "1D", "1W", "1M"].map((type) => (
            <button
              key={type}
              onClick={() => setQuickRange(type)}
              style={{
                ...primaryButton,
                background: "#eef2ff",
                color: "#4338ca",
              }}
            >
              {type === "NOW"
                ? "Today"
                : type === "1D"
                  ? "1 Day"
                  : type === "1W"
                    ? "1 Week"
                    : "1 Month"}
            </button>
          ))}
        </div>
      ) : (
        // ✅ CUSTOM DATE (your existing inputs)
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          <input
            type="date"
            style={inputStyle}
            onChange={(e) => {
              const date = new Date(e.target.value);
              date.setHours(0, 0, 0, 0);

              setDateRange((prev) => ({
                ...prev,
                startDate: date.toISOString(),
              }));
            }}
          />

          <input
            type="date"
            style={inputStyle}
            onChange={(e) => {
              const date = new Date(e.target.value);
              date.setHours(23, 59, 59, 999);

              setDateRange((prev) => ({
                ...prev,
                endDate: date.toISOString(),
              }));
            }}
          />
        </div>
      )}
      {/* FILTER GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Search by message, error, keyword..."
          value={filters.keyword}
          onChange={(e) => onFilterChange("keyword", e.target.value)}
          style={{
            ...inputStyle,
            ...(focused === "keyword" ? focusStyle : {}),
          }}
          onFocus={() => setFocused("keyword")}
          onBlur={() => setFocused(null)}
        />

        <select
          value={filters.level}
          onChange={(e) => onFilterChange("level", e.target.value)}
          style={inputStyle}
        >
          <option value="">All Levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
          <option value="DEBUG">DEBUG</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        <select
          value={filters.source}
          onChange={(e) => onFilterChange("source", e.target.value)}
          style={inputStyle}
        >
          <option value="">All Source</option>
          <option value="store-application">store-application</option>
          <option value="dataservice">dataservice</option>
          <option value="app-integration">app-integration</option>
        </select>

        <input
          type="text"
          placeholder="StoreId"
          value={filters.storeId}
          onChange={(e) => onFilterChange("storeId", e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="TransactionId"
          value={filters.txnId}
          onChange={(e) => onFilterChange("txnId", e.target.value)}
          style={inputStyle}
        />

        <select
          value={filters.transactionType}
          onChange={(e) => onFilterChange("transactionType", e.target.value)}
          style={inputStyle}
        >
          <option value="">All Transaction Types</option>
          <option value="SALE">SALE</option>
          <option value="REFUND">REFUND</option>
          <option value="VOID">VOID</option>
          <option value="CARD_LOAD">CARD_LOAD</option>
          <option value="CARD_LOOKUP">CARD_LOOKUP</option>
        </select>
      </div>

      {/* BUTTON ROW (separate!) */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          type="button"
          onClick={onSearch}
          style={{
            ...primaryButton,
            background: "#4f46e5",
            color: "#fff",
          }}
        >
          Search
        </button>

        <button
          type="button"
          onClick={onClear}
          style={{
            ...primaryButton,
            background: "#e5e7eb",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
export default FilterBar;
