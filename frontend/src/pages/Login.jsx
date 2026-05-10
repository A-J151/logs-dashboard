import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Login.css";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  //4-28
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };
  async function handleSubmit(e) {
    setFieldErrors({});
    e.preventDefault();

    const errors = {};
    const emailValue = email.trim().toLowerCase();
    const passwordValue = password.trim();
    if (!emailValue) {
      errors.email = "email is required";
    } else if (!isEmailValid(emailValue)) {
      errors.email = "Invalid email format";
    }
    if (!passwordValue) {
      errors.password = "Password is required";
    } else if (passwordValue.length < 6) {
      errors.password = "Minimum 6 characters required";
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }
    try {
      await login(email, password);
      setSuccess(true);
      const username = email.split("@")[0];
      toast.success(`${username} logged in successfully`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      console.log("Login error:", err);
      if (err.response) {
        const message = err.response.data?.message;
        if (message) {
          toast.error(message);
        } else {
          toast.error("Something went wrong");
        }
      } else if (err.request) {
        toast.error("Server not responding");
      } else {
        toast.error("Unexpected error occured");
      }
    }
  }
  const isFormValid = isEmailValid(email) && isPasswordValid(password);
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to your dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="login-input"
            onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
          />
          {fieldErrors.email && (
            <div className="login-error">{fieldErrors.email}</div>
          )}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`login-input ${fieldErrors.password}? "input-error":""`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="password-toggle"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {fieldErrors.password && (
            <div className="login-error">{fieldErrors.password}</div>
          )}
          <div className="login-row">
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember Me
            </label>
            <span
              onClick={() => navigate("/forgot-password")}
              className="forgot-link"
            >
              Forgot Password
            </span>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`login-button ${success ? "success" : ""}`}
            onMouseEnter={(e) => (e.target.style.background = "#4338ca")}
            onMouseLeave={(e) => (e.target.style.background = "#4f46e5")}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : success ? (
              "Success ✓"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
