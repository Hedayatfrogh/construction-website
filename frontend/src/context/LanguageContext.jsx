// LanguageContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Global language provider (English ↔ Dari).
//
// How it works
//   1. The `<html>` element gets `lang="en"|"fa"` and `dir="ltr"|"rtl"`.
//      Setting `dir` on <html> is what makes the entire page flip to RTL
//      — Tailwind's `rtl:` variants and our own `[dir="rtl"]` CSS rules
//      then take care of every component without touching a single JSX file.
//   2. The LanguageSwitcher button calls `setLang('en')` or `setLang('fa')`.
//   3. Components that want translated strings call `useLanguage()` and use
//      the `t(key)` helper. Anything not in the dictionary falls back to the
//      English source string, so partial coverage is safe.
//
// Persistence
//   - On first load, `localStorage.lang` is read. Default is `'en'`.
//   - Every change writes to `localStorage.lang` so the choice survives
//     reloads and route changes.
//
// No-flash on first paint
//   - The blocking script in `index.html` sets `<html dir>` and `<html lang>`
//     BEFORE React mounts, so users never see an LTR-flash on a Dari reload.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { translate, isRtl } from "../i18n/translations";

const STORAGE_KEY = "lang";
const DEFAULT_LANG = "en";

function readInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fa") return saved;
  } catch (_) {
    // localStorage can throw in private modes / sandboxed iframes — fall through.
  }
  return DEFAULT_LANG;
}

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  dir: "ltr",
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  // Lazy initialiser: read once on mount, avoids a render where the
  // value disagrees with the value we just wrote to <html>.
  const [lang, setLangState] = useState(readInitialLang);

  // Keep <html lang> / <html dir> in sync, and persist. We do this in an
  // effect so initial paint (handled by the inline script in index.html)
  // and subsequent React state stay aligned.
  useEffect(() => {
    const root = document.documentElement;
    const dir = isRtl(lang) ? "rtl" : "ltr";
    root.setAttribute("lang", lang);
    root.setAttribute("dir", dir);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore quota / private-mode errors */
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next === "en" || next === "fa") setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((cur) => (cur === "fa" ? "en" : "fa"));
  }, []);

  // `t` is memoised so consumers can put it in dependency arrays safely.
  // It forwards extra arguments so that dictionary entries that are
  // functions (e.g. `serviceDetail.ctaTitle: (n) => \`Plan your ${n} project\``)
  // can receive interpolation values such as the current service title.
  const value = useMemo(() => {
    const dir = isRtl(lang) ? "rtl" : "ltr";
    const t = (key, ...args) => translate(lang, key, ...args);
    return { lang, dir, setLang, toggleLang, t };
  }, [lang, setLang, toggleLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}
