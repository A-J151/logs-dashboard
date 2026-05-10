import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!isEmailValid(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      // setMessage("If this email exists, a reset link has been sent");
      toast.success(
        "Reset link: http://localhost:5173/reset-password?token=test123",
      );
      setError("");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Reset Password</h2>
        <p className="login-subtitle">Enter Your email to receive reset link</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />{" "}
          {error && <div className="login-error">{error}</div>}
          {message && <div className="login-success">{message}</div>}
          <button className="login-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>{" "}
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#4f46e5" }}
          >
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
