import axios from "axios";

const configuredUrl =
  import.meta.env.VITE_API_URL?.trim() ||
  import.meta.env.VITE_API_BASE_URL?.trim();
const normalizedUrl = configuredUrl?.replace(/\/+$/, "");
const isAbsoluteHttpUrl = (() => {
  if (!normalizedUrl) return false;
  try {
    const url = new URL(normalizedUrl);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
})();
const productionApiUrl = "https://backend.sparktrust.tech/api/v1";
const configuredBaseURL = normalizedUrl
  ? /\/api\/v1$/i.test(normalizedUrl)
    ? normalizedUrl
    : `${normalizedUrl}/api/v1`
  : "";

let baseURL;
if (import.meta.env.PROD) {
  if (configuredBaseURL && isAbsoluteHttpUrl) {
    baseURL = configuredBaseURL;
  } else {
    if (configuredBaseURL) {
      console.error(
        "Ignoring relative VITE_API_URL in production; set it to the absolute backend URL.",
      );
    }
    baseURL = productionApiUrl;
  }
} else {
  baseURL = configuredBaseURL || "/api/v1";
}

const api = axios.create({ baseURL, withCredentials: true, timeout: 10000 });

export function setAccessToken(token) {
  window.sessionStorage.setItem("sms.admin.token", token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAccessToken() {
  window.sessionStorage.removeItem("sms.admin.token");
  delete api.defaults.headers.common.Authorization;
}

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("sms.admin.token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.smsAdminToken = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.config?.smsAdminToken &&
      window.sessionStorage.getItem("sms.admin.token") ===
        error.config.smsAdminToken
    ) {
      clearAccessToken();
      window.dispatchEvent(new CustomEvent("sms:auth-expired"));
    }
    return Promise.reject(error);
  },
);

export default api;
