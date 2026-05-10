function SkeletonRow({ columns }) {
  const SkeletonRow = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: visibleColumns
          .map((col) => (col === "message" ? "2fr" : "1fr"))
          .join(" "),
        padding: "12px 16px",
        borderTop: "1px solid #eee",
      }}
    >
      {visibleColumns.map((_, i) => (
        <div
          key={i}
          style={{
            height: "14px",
            borderRadius: "6px",
            background: "#e5e7eb",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {" "}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6),transparent)",
              animation: "shimmer 1.2s infinite",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="skeleton-row">
      {columns.map((col, i) => (
        <div
          key={i}
          className="skeleton-cell"
          style={{
            width: col === "message" ? "80%" : "60%",
          }}
        >
          {" "}
        </div>
      ))}
    </div>
  );
}
export default SkeletonRow;
