import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api.jsx";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!token;
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode(storedToken);
      setUser(decoded);
    }
  }, []);
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      const receivedToken = res.data.token;
      sessionStorage.setItem("token", receivedToken);
      setToken(receivedToken);

      // decode token
      const decoded = jwtDecode(receivedToken);
      setUser(decoded);
    } catch (err) {
      alert(err.response?.data.message || "Login Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        user,
        loading,
        isAuthenticated,
        setToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
