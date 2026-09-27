// ThemeToggle.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Sun / moon toggle that flips between light and dark mode.
// - Renders inside the Navbar (desktop + mobile drawer).
// - Uses the .theme-toggle class from index.css for consistent styling.
// - `aria-pressed` and `aria-label` for screen readers.
// - Icon animates in on mount via Framer Motion (subtle, doesn't lag).
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`theme-toggle ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ display: "inline-flex" }}
        >
          {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}