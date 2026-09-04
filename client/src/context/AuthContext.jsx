import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Refresh Session
  // ==========================================

  const refreshSession = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/session");

      setUser(response.data.user);
      setToken(storedToken);
    } catch (error) {
      console.error("SESSION ERROR:", error);

      localStorage.removeItem("token");

      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Session Check
  // ==========================================

  useEffect(() => {
    refreshSession();
  }, []);

  // ==========================================
  // Login
  // ==========================================

  const login = async (email, password, role) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        role,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);

      setToken(data.token);
      setUser(data.user);

      return data.user;
    } catch (error) {
      console.error("LOGIN API ERROR:", error);

      throw error;
    }
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// useAuth Hook
// ==========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};