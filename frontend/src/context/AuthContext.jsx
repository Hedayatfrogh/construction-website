// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Use a relative `/api/v1` URL so requests go through Vite's dev proxy
// (configured in vite.config.js -> `server.proxy['/api']`). This means the
// same frontend bundle works from `localhost`, `127.0.0.1`, or any LAN IP
// (`http://192.168.x.x:5173`) without needing to rebuild for each host.
//
// To override at build time (e.g. for a deployed build pointing at a
// different API), set `VITE_API_BASE_URL` before running `npm run build`.
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me");
      if (res.data.status === "success") {
        setUser(res.data.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser(); // Only fetch if no user is set
    } else {
      setIsLoading(false); // Skip loading if user is already set
    }
  }, [user]); // Depend on user state

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to log out",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading, fetchUser, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};