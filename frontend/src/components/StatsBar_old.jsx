import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
function StatsBar({ stats = [], loading }) {
  const totalLogs = (stats || []).reduce((acc, curr) => acc + curr.count, 0);
  if (loading) return <p>Loading chart...</p>;

  const formatLabel = (value) => {
    if (value.includes("-") && value.length === 7 && !value.includes(":"))
      return `Week ${value.split("-")[1]}`;
    if (value.includes(":")) {
      return new Date(value).toLocaleDateString();
    }
    return new Date(value).toLocaleDateString();
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
      {!loading && stats.length === 0 && <p>No logs found</p>}
      {stats.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              // interval={4}
              angle={-20}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              // tickFormatter={(value) => {
              //   if (value.includes(":")) return value;
              //   return new Date(value).toLocaleDateString();
              // }}
              tickFormatter={formatLabel}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} logs`, "Count"]}
              labelFormatter={formatLabel}
            />
            <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
export default StatsBar;
