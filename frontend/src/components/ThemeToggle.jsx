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
import { useLanguage } from "../context/LanguageContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const label = isDark ? t("themeSwitcher.switchToLight") : t("themeSwitcher.switchToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
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