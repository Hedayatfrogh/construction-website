"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    general: "Network error. Please check your connection.",
  });

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await login({ email: email.trim(), password });
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      const status = error.response?.status;
      let message = t("login.errGeneric");
      if (status === 401) message = t("login.errInvalidCredentials");
      else if (
        status === 503 ||
        status === 404 ||
        error.code === "ECONNABORTED"
      ) {
        message = t("login.errUnableConnect");
      } else if (!error.response) message = t("login.errNetwork");
      else if (status >= 500 && !error.response.data?.message)
        message = t("login.errUnableConnect");
      else if (status >= 500) message = t("login.errServer");
      else if (error.response.data?.message)
        message = error.response.data.message;
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
    if (errors.email || errors.general) {
      setErrors((prev) => ({ ...prev, email: "", general: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password || errors.general) {
      setErrors((prev) => ({ ...prev, password: "", general: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[480px]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f28b24] shadow-[0_4px_10px_rgba(242,139,36,0.25)]">
            <Shield className="h-9 w-9 text-white" strokeWidth={2.3} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-7 text-center text-[54px] font-light leading-none tracking-[-0.03em] text-[#2f3742]"
        >
          Admin Access
        </motion.h2>
        <p className="mt-3 text-center text-[18px] font-normal text-[#5d6670]">
          Secure login for authorized personnel only
        </p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-7 rounded-xl border border-[#e1e5e7] bg-[#f8f9fa] p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[16px] font-medium text-[#4a4f57]"
              >
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Mail className="h-5 w-5 text-[#7c8792]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`block w-full rounded-md border bg-white py-3 pl-11 pr-3 text-[16px] text-[#2f3742] placeholder:text-[#9aa3aa] focus:outline-none focus:ring-2 focus:ring-[#f5a14d] focus:border-[#f5a14d] ${
                    errors.email ? "border-red-300" : "border-[#d8dde2]"
                  }`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[16px] font-medium text-[#4a4f57]"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-5 w-5 text-[#7c8792]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`block w-full rounded-md border bg-white py-3 pl-11 pr-11 text-[16px] text-[#2f3742] placeholder:text-[#9aa3aa] focus:outline-none focus:ring-2 focus:ring-[#f5a14d] focus:border-[#f5a14d] ${
                    errors.password ? "border-red-300" : "border-[#d8dde2]"
                  }`}
                  placeholder="Admin@123456"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#7c8792] hover:text-[#4a4f57]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="rounded-md bg-[#e65347] px-4 py-3 text-center text-[15px] font-medium text-white shadow-sm">
                {errors.general}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#f28b24] py-3 text-[18px] font-medium text-white shadow-[0_3px_0_rgba(228,117,25,0.35)] transition hover:bg-[#ea7d1a] focus:outline-none focus:ring-2 focus:ring-[#f5a14d] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </motion.button>

            <div className="pt-1 text-center">
              <Link
                to="/forgot-password"
                className="inline-block text-[18px] text-[#4a4f57] underline decoration-transparent underline-offset-4 transition hover:text-[#2f3742]"
              >
                Forgot password?
              </Link>
            </div>

            <p className="pt-3 text-center text-[15px] leading-relaxed text-[#69747d]">
              This is a secure area for authorized personnel only.
              <br />
              Unauthorized access is prohibited.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
