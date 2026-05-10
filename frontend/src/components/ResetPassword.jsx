import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [seachParams] = useSearchParams();
  const token = seachParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset link");
    }
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Minimum 6 characters required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // simulate API
      await new Promise((res) => setTimeout(res, 1000));

      setSuccess("Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Reset Password</h2>
        <p className="login-subtitle">Enter your new password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
          />

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <button className="login-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
