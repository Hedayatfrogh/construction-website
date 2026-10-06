"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, saveToken } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser, fetchUser, api } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = t("login.errEmailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("login.errEmailInvalid");
    }
    if (!password) {
      newErrors.password = t("login.errPasswordRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 // Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm() || isLoading) {
    return;
  }
  setIsLoading(true);
  try {
    const res = await api.post("/users/login", { email, password });
   

    const { data: { user } } = res.data;
    if (!user) {
      throw new Error("No user data returned");
    }
    if (!user.role) {
      throw new Error("User role not provided by server");
    }

    saveToken(res.data.token);
    setUser(user);
    await fetchUser();
    setIsLoading(false);
    if (user.role === "admin") {
      navigate(location.state?.from?.pathname || "/dashboard");
    } else {
      navigate("/");
    }
  } catch (error) {
    setIsLoading(false);
    const errorMessage =
      error.response?.data?.message ||
      t("login.errGeneric");
    console.error("Login error:", error.response?.data || error.message);
    setErrors({ ...errors, general: errorMessage });
  }
};

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
    if (errors.email || errors.general) {
      setErrors((prev) => ({ ...prev, email: "", general: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    if (errors.password || errors.general) {
      setErrors((prev) => ({ ...prev, password: "", general: "" }));
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-smsorange-500 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 text-center text-3xl font-bold text-gray-900"
        >
          {t("login.title")}
        </motion.h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t("login.subtitle")}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("login.emailLabel")}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-smsorange-400 focus:border-smsorange-400 sm:text-sm`}
                  placeholder={t("login.emailPlaceholder")}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t("login.passwordLabel")}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-smsorange-400 focus:border-smsorange-400 sm:text-sm`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            {errors.general && (
              <p className="text-sm text-white bg-red-600 text-center py-2 rounded">{errors.general}</p>
            )}

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-smsorange-500 hover:bg-smsorange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smsorange-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  t("login.submitButton")
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {t("login.footerNotice")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}