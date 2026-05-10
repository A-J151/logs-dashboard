import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

function StatsBar({ stats = [], loading, onBarClick, selectedBucket }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const totalLogs = stats.reduce((acc, curr) => acc + curr.count, 0);

  if (loading) return <p>Loading chart...</p>;

  // ✅ Show date only when day changes
  const formatLabel = (value, index) => {
    if (!value) return "";

    const date = new Date(value);

    if (index === 0) {
      return date.toISOString().split("T")[0];
    }

    const prev = new Date(stats[index - 1]?._id);

    const isNewDay =
      date.getDate() !== prev.getDate() || date.getMonth() !== prev.getMonth();

    return isNewDay ? date.toISOString().split("T")[0] : "";
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "14px",
          opacity: 0.7,
        }}
      >
        Showing logs grouped by time
      </div>

      <h2 style={{ textAlign: "center" }}>Total Logs: {totalLogs}</h2>
      {loading && stats.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", opacity: 0.6 }}>
          No logs found
        </div>
      )}
      {stats.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="_id"
              angle={-45}
              interval="preserveStartEnd"
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              tickFormatter={(value, index) => {
                const total = stats.length;
                const step = Math.ceil(total / 35); // max ~10 labels
                if (index % step !== 0) return "";
                const date = new Date(value);
                return date.toISOString().split("T")[0];
              }}
            />

            <YAxis />

            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "#63a0f5",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
              }}
              formatter={(value) => [`${value} logs`, "Count"]}
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />

            <Bar
              dataKey="count"
              maxBarSize={20}
              radius={[6, 6, 0, 0]}
              onClick={(data) => {
                const bucket = data?.payload?._id;
                if (bucket) {
                  onBarClick?.(bucket);
                }
              }}
            >
              {stats.map((entry, index) => {
                const isSelected =
                  selectedBucket &&
                  new Date(entry._id).getTime() ===
                    new Date(selectedBucket).getTime();

                return (
                  <Cell
                    key={`Cell-${index}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      filter:
                        index === hoveredIndex
                          ? "drop-shadow(0px 0px 6px rgba(99,102,241,0.8))"
                          : "none",
                      transition: "all 0.2s ease",
                    }}
                    fill={
                      isSelected
                        ? "#ef4444"
                        : index === hoveredIndex
                          ? "#0509f9"
                          : "#556af0e5"
                    }
                    cursor="pointer"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default StatsBar;
