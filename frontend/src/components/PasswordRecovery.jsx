import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PasswordRecovery() {
  const { api } = useAuth();
  const location = useLocation();
  const resetting = location.pathname === "/reset-password";
  const token = new URLSearchParams(location.search).get("token") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (resetting && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (resetting && password.length < 12) {
      setError("Use a password with at least 12 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const response = resetting
        ? await api.post("/users/reset-password", {
            token,
            newPassword: password,
          })
        : await api.post("/users/forgot-password", { email });
      setMessage(response.data.message);
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to complete this request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-charcoal-50 flex flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-smsorange-500 text-white">
          <Shield className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-center font-display text-3xl font-bold text-charcoal-900">
          {resetting ? "Reset password" : "Forgot password"}
        </h1>
        <p className="mt-2 text-center text-sm text-charcoal-600">
          {resetting
            ? "Choose a new password for your administrator account."
            : "Enter your administrator email to receive a secure reset link."}
        </p>
        <form
          onSubmit={submit}
          className="mt-8 space-y-5 rounded-lg border border-charcoal-100 bg-white p-6 shadow-sms-soft"
        >
          {resetting ? (
            <>
              <label className="block text-sm font-medium text-charcoal-800">
                New password
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1 block w-full rounded-md border border-charcoal-200 px-3 py-2"
                />
              </label>
              <label className="block text-sm font-medium text-charcoal-800">
                Confirm new password
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="mt-1 block w-full rounded-md border border-charcoal-200 px-3 py-2"
                />
              </label>
            </>
          ) : (
            <label className="block text-sm font-medium text-charcoal-800">
              Email address
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 block w-full rounded-md border border-charcoal-200 px-3 py-2"
              />
            </label>
          )}
          {error && (
            <p
              role="alert"
              className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          {message && (
            <p
              role="status"
              className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800"
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || (resetting && !token)}
            className="w-full rounded-md bg-smsorange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-smsorange-600 disabled:opacity-50"
          >
            {submitting
              ? "Please wait…"
              : resetting
                ? "Reset password"
                : "Send reset link"}
          </button>
          {resetting && !token && (
            <p className="text-sm text-red-700">
              This reset link is missing its token.
            </p>
          )}
          <Link
            to="/login"
            className="block text-center text-sm font-medium text-smsorange-700 hover:underline"
          >
            Back to sign in
          </Link>
        </form>
      </div>
    </main>
  );
}
