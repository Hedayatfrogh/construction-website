// ThemeContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Global light/dark theme provider.
//
// How it works
//   1. The `<html>` element gets `data-theme="light"` or `data-theme="dark"`.
//   2. `index.css` defines all the surface/text/border colors as CSS
//      variables and overrides the relevant Tailwind utilities inside
//      `[data-theme="dark"]`. That means components don't need per-class
//      `dark:` variants — switching `data-theme` re-skins the whole app.
//   3. The orange / navy / gold brand colors are NOT overridden, so the
//      project's accent identity stays identical in both modes.
//
// Persistence
//   - On first load, `localStorage.theme` is read. If it's missing, we
//     follow the OS preference (`prefers-color-scheme: dark`).
//   - Every toggle writes to `localStorage.theme` so the choice survives
//     reloads and route changes.
//
// No-flash on first paint
//   - The blocking script in `index.html` sets `data-theme` on `<html>`
//     BEFORE React mounts, so dark-mode users never see a light flash.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "theme";

function readInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (_) {
    // localStorage can throw in private modes / sandboxed iframes — fall through.
  }
  if (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Lazy initialiser: read once on mount, avoids a render where the
  // value disagrees with the value we just wrote to <html>.
  const [theme, setThemeState] = useState(readInitialTheme);

  // Keep <html data-theme> in sync, and persist. We do this in an
  // effect so initial paint (handled by the inline script in index.html)
  // and subsequent React state stay aligned.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      /* ignore quota / private-mode errors */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const setTheme = useCallback((next) => {
    if (next === "light" || next === "dark") setThemeState(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}