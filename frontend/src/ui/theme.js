export const ui={
    colors:{
        bg:"#f9fafb",
        card:"#ffffff",
        border:"#e5e7eb",
        text:"#111827",
        muted:'#6b7280',
        primary:"#4f46e5",
        danger:"#ef4444"
    },
    radius:{
        sm:"6px",
        md:"10px",
        lg:"14px"
    },
    shadow:{
        sm:"0 1px 2px rgba(0,0,0,0.05)",
        md:"0 6px 18px rgba(0,0,0,0.08)"
    }
    ,spacing:{
        xs:"6px",
        sm:"10px",
        md:"14px",
        lg:"20px",
        xl:"28px"
    },
    font:{
        xs:"12px",
        sm:"13px",
        md:"14px",
        lg:"16px",
        xl:"20px",
        xxl:"28px"
    }
};
export const cardStyle={
    background: ui.colors.card,
  border: `1px solid ${ui.colors.border}`,
  borderRadius: ui.radius.md,
  boxShadow: ui.shadow.sm,
  padding: ui.spacing.lg,
};
export const primaryButton = {
  padding: "10px 14px",
  background: ui.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: ui.radius.md,
  cursor: "pointer",
  fontWeight: 600,
  transition: "all 0.2s ease",
};
export const inputStyle = {
 padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    background: "#fff",
};