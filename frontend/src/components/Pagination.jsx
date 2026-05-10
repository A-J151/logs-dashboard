function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
      {page > 1 && (
        <button
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "none",
            background: page === 1 ? "#e5e7eb" : "#4f46e5",
            color: page === 1 ? "#9ca3af" : "#fff",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
          onClick={() => onPageChange(page - 1)}
        >
          {"<"}
        </button>
      )}
      <span style={{ fontSize: "14px", color: "#374151" }}>
        Page {page} of {totalPages}
      </span>
      <button
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "none",
          background: page === totalPages ? "#e5e7eb" : "#4f46e5",
          color: page === totalPages ? "#9ca3af" : "#fff",
          cursor: page === totalPages ? "not-allowed" : "pointer",
        }}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
export default Pagination;
