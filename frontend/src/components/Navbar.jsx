// Site header -- single, always-visible navigation.
//
// LAYOUT CONTRACT
//   - ONE <header>, ONE sticky element, ONE z-index.
//   - Always renders on a SOLID white background. The previous version
//     switched to bg-transparent at scroll=0, which made the white link
//     text invisible whenever the hero image / overlay had not loaded,
//     producing the 'header disappears after scrolling back to top' bug.
//   - Desktop (xl+): ONE clean horizontal row -- Logo+name, all 12 nav
//     links, phone (3xl+), 'Request a Consultation' (2xl+), Dashboard. Uses
//     flexbox + gap spacing. No absolute positioning. No negative
//     margins. whitespace-nowrap on every text node so links never wrap.
//   - Tablet + Mobile (< xl): hamburger button. Full link list lives in
//     a clean drawer below the bar.
//
// STABILITY CONTRACT
//   - sticky top-0 keeps the header in place. No scroll-driven hide,
//     no transform: translateY, no opacity: 0, no display: none.
//   - The header is rendered exactly once (App.jsx). No second header.
//   - z-index: 50 + solid background guarantee it sits above sections.
//   - Body and #root must NOT have height: 100% or overflow: clip/hidden,
//     because those properties turn them into scroll containers and
//     break position: sticky on the navbar. The clip is applied to <html>
//     only -- see index.css.
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavLinkSmart from './NavLinkSmart';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { navLinks } from '../data/operations';
import { company } from '../data/company';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

function Logo() {
  const { t } = useLanguage();
  return (
    <NavLinkSmart
      to='/'
      className='flex items-center gap-3 shrink-0 group'
      aria-label={company.shortName + ' Home'}
    >
      <span className='relative inline-flex h-10 w-10 items-center justify-center rounded-md bg-smsorange-500 font-display font-extrabold text-white shadow-sms-soft'>
        {t('brandShort')}
        <span className='absolute -bottom-1 -right-1 h-3 w-3 rounded-sm bg-smsgold-400 ring-2 ring-white' />
      </span>
      <span className='hidden sm:flex flex-col leading-tight min-w-0'>
        <span className='font-display font-bold text-base md:text-lg text-charcoal-900 whitespace-nowrap'>
          {t('brandName')}
        </span>
        <span className='text-[10px] md:text-xs uppercase tracking-[0.18em] text-charcoal-500 whitespace-nowrap'>
          {t('brandLine')}
        </span>
      </span>
    </NavLinkSmart>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = ({ isActive }) =>
    [
      "relative inline-flex items-center",
      "px-1 py-2 text-[13px] font-medium whitespace-nowrap",
      "transition-colors duration-150",
      isActive
        ? "text-smsorange-500"
        : "text-charcoal-700 hover:text-smsorange-500",
    ].join(" ");

  // Maps a navLink `to` path to its translation dictionary key.
  // Kept inside the component so future path additions stay co-located.
  // Falls back to a sanitised slug if a new path hasn't been added yet,
  // which guarantees the navbar never renders `undefined`.
  const navKeyFor = (to) => {
    const map = {
      "/":                "home",
      "/about":           "about",
      "/services":        "services",
      "/projects":        "projects",
      "/equipment":       "equipment",
      "/team":            "team",
      "/safety-quality":  "safetyQuality",
      "/sustainability":  "sustainability",
      "/methodology":     "methodology",
      "/clients":         "clients",
      "/news":            "news",
      "/contact":         "contact",
    };
    if (map[to]) return map[to];
    // Safe fallback: strip leading slash, take the first segment.
    return String(to).replace(/^\/+/, "").replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
  };

  return (
    <header
      className={[
        "sticky top-0 inset-x-0 z-50",
        "bg-white border-b border-charcoal-100",
        "shadow-sms-soft",
      ].join(" ")}
    >
      <div
        className={[
          "w-full px-4 sm:px-6 lg:px-10",
          "flex flex-nowrap items-center justify-between",
          "h-20 gap-4 xl:gap-5 2xl:gap-6",
          "min-w-0",
        ].join(" ")}
      >
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden xl:flex items-center justify-center min-w-0 flex-1 gap-5 2xl:gap-6"
        >
          {navLinks.map((l) => (
            <NavLinkSmart
              key={l.to}
              to={l.to}
              className={linkClass}
              end={l.to === "/"}
            >
              {t('nav.' + navKeyFor(l.to))}
            </NavLinkSmart>
          ))}
        </nav>

        {/* Compact right-side controls (xl only, 1280-1535px). Only Log In
            so the row fits at common laptop widths. */}
        <div className="hidden xl:flex 2xl:hidden items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
          <NavLinkSmart
            to={user?.role === "admin" ? "/dashboard" : "/login"}
            className="text-sm font-semibold text-charcoal-700 hover:text-smsorange-500 whitespace-nowrap"
          >
            {user?.role === "admin" ? t('header.dashboard') : t('logIn')}
          </NavLinkSmart>
        </div>

        {/* Full right-side controls (2xl+). Phone, primary CTA, Log In. */}
        <div className="hidden 2xl:flex items-center gap-3 shrink-0">
          <a
            href={"tel:" + company.phone.replace(/\\s+/g, "")}
            className="hidden 3xl:inline-flex items-center gap-2 text-sm font-semibold text-charcoal-700 hover:text-smsorange-500 whitespace-nowrap"
          >
            <Phone className="h-4 w-4" />
            <span>{company.phone}</span>
          </a>
          <NavLinkSmart
            to="/contact"
            className="sms-btn-primary !py-2.5 !px-4 whitespace-nowrap"
          >
            {t('requestConsultation')}
          </NavLinkSmart>
          <NavLinkSmart
            to={user?.role === "admin" ? "/dashboard" : "/login"}
            className="text-sm font-semibold text-charcoal-700 hover:text-smsorange-500 whitespace-nowrap"
          >
            {user?.role === "admin" ? t('header.dashboard') : t('logIn')}
          </NavLinkSmart>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-mobile-nav"
          className={[
            "xl:hidden inline-flex items-center justify-center",
            "h-11 w-11 rounded-md shrink-0",
            "text-charcoal-900 hover:bg-charcoal-100",
            "focus:outline-none focus:ring-2 focus:ring-smsorange-400",
          ].join(" ")}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="primary-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden overflow-hidden bg-white border-t border-charcoal-100"
          >
            <div className="px-4 sm:px-6 lg:px-10 py-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal-500">
                  {t('mobileLanguageHeading')}
                </span>
                <LanguageSwitcher />
              </div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal-500">
                  {t('mobileThemeHeading')}
                </span>
                <ThemeToggle />
              </div>
              <ul className="grid gap-1">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <NavLinkSmart
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        [
                          "flex items-center justify-between",
                          "py-3 px-3 rounded-md text-sm font-semibold whitespace-nowrap",
                          isActive
                            ? "bg-smsorange-50 text-smsorange-600"
                            : "text-charcoal-800 hover:bg-charcoal-50",
                        ].join(" ")
                      }
                    >
                      <span>{t('nav.' + navKeyFor(l.to))}</span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </NavLinkSmart>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-2">
                <NavLinkSmart to="/contact" className="sms-btn-primary justify-center">
                  {t('requestConsultation')}
                </NavLinkSmart>
                <NavLinkSmart
                  to={user?.role === "admin" ? "/dashboard" : "/login"}
                  className="sms-btn-ghost justify-center"
                >
                  {user?.role === "admin" ? t('header.dashboard') : t('logIn')}
                </NavLinkSmart>
                <a
                  href={"tel:" + company.phone.replace(/\\s+/g, "")}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-charcoal-700 py-2"
                >
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
