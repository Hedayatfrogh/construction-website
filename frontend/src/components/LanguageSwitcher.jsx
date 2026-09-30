// LanguageSwitcher.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Pill-shaped EN ⇄ دری toggle that lives next to the existing ThemeToggle
// in the navbar (desktop + mobile drawer).
//
// Design notes
//   - Mirrors the size and visual weight of `.theme-toggle` so the two
//     controls feel like a matched pair on the right edge of the navbar.
//   - Uses an inline two-segment pill (rather than a dropdown) because
//     there are only two languages — a single click switches.
//   - Active segment gets the brand-orange fill; inactive is muted text.
//   - Renders the Dari label "دری" in BOTH directions, so the pill is
//     readable in either language mode.
//   - `aria-pressed` and `aria-label` for screen readers.
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SUPPORTED_LANGS } from "../i18n/translations";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, t } = useLanguage();

  // Two-segment pill. Click on either segment jumps directly to that
  // language — no dropdown, no hover-only menu (mobile can't hover).
  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`lang-switcher ${className}`}
    >
      <Languages className="lang-switcher__icon" aria-hidden="true" />

      <div className="lang-switcher__pill">
        {SUPPORTED_LANGS.map((l) => {
          const isActive = lang === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={isActive}
              aria-label={
                l.code === "fa" ? t("switchToDari") : t("switchToEnglish")
              }
              title={l.code === "fa" ? t("switchToDari") : t("switchToEnglish")}
              className={[
                "lang-switcher__seg",
                isActive ? "lang-switcher__seg--active" : "",
                // Right-align the Dari segment in an LTR page, and vice-versa,
                // so the pill always reads naturally in the current language.
                l.code === "fa" ? "lang-switcher__seg--rtl" : "lang-switcher__seg--ltr",
              ].join(" ")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isActive ? "on" : "off"}
                  initial={{ y: -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 4, opacity: 0 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  style={{ display: "inline-block" }}
                >
                  {l.label}
                </motion.span>
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
