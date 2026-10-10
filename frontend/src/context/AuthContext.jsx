import { createContext, useContext, useState, useEffect } from "react";
import api, { clearAccessToken, setAccessToken } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (attempt = 0) => {
    const tokenAtStart = window.sessionStorage.getItem("sms.admin.token");
    let superseded = false;
    let retrying = false;
    try {
      const res = await api.get("/users/me");
      if (window.sessionStorage.getItem("sms.admin.token") !== tokenAtStart) {
        superseded = true;
        return;
      }
      if (
        res.data.status === "success" &&
        res.data.data.user?.role === "admin"
      ) {
        setUser(res.data.data.user);
      } else {
        clearAccessToken();
        setUser(null);
      }
    } catch (error) {
      if (window.sessionStorage.getItem("sms.admin.token") !== tokenAtStart) {
        superseded = true;
        return;
      }
      const status = error.response?.status;
      if ((!status || status >= 500) && attempt < 2) {
        retrying = true;
        await new Promise((r) => setTimeout(r, 1000));
        return fetchUser(attempt + 1);
      }
      if (tokenAtStart) clearAccessToken();
      setUser(null);
    } finally {
      if (!superseded && !retrying) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const onExpired = () => {
      setUser(null);
      setIsLoading(false);
    };
    window.addEventListener("sms:auth-expired", onExpired);
    return () => window.removeEventListener("sms:auth-expired", onExpired);
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/users/login", credentials);
    const token = res.data?.token;
    const authenticatedUser = res.data?.data?.user;

    if (!token || authenticatedUser?.role !== "admin") {
      throw new Error(
        "The server did not return a valid administrator session.",
      );
    }

    setAccessToken(token);
    setUser(authenticatedUser);
    setIsLoading(false);
    return authenticatedUser;
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to log out",
      };
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isLoading, fetchUser, api }}
    >
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
