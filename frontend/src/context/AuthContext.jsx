import { createContext, useContext, useState, useEffect } from "react";
import api, { clearAccessToken, setAccessToken } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
  const fetchUser = async (attempt = 0) => {
    // A login/logout that happens while this request is in flight changes the
    // token; the stale response must not overwrite the newer auth state.
    const token = localStorage.getItem(TOKEN_KEY);
    const isStale = () => localStorage.getItem(TOKEN_KEY) !== token;
    try {
      const res = await api.get("/users/me");
      if (isStale()) return;
      setUser(res.data.status === "success" ? res.data.data.user : null);
    } catch (error) {
      if (isStale()) return;
      const status = error.response?.status;
      if ((!status || status >= 500) && attempt < 2) {
        await new Promise((r) => setTimeout(r, 1000));
        return fetchUser(attempt + 1);
      }
      if (status === 401) saveToken(null);
      setUser(null);
=======
  const fetchUser = async () => {
    const tokenAtStart = window.sessionStorage.getItem("sms.admin.token");
    let superseded = false;
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
    } catch {
      if (window.sessionStorage.getItem("sms.admin.token") === tokenAtStart) {
        if (tokenAtStart) clearAccessToken();
        setUser(null);
      } else superseded = true;
    } finally {
      if (!superseded) setIsLoading(false);
>>>>>>> 5bd4460d2e4320943266b8a62ca576eb0e21e1d6
    }
    setIsLoading(false);
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
