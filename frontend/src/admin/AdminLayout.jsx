// AdminLayout.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Two-pane admin chrome used by every /admin/* page:
//
//   ┌──────────────────────────────────────────────────────────────┐
//   │  Top bar:  SMS · Admin Panel         [user] · [logout]       │
//   ├────────────┬─────────────────────────────────────────────────┤
//   │            │                                                 │
//   │  Sidebar   │   <Outlet />  (admin section content)           │
//   │            │                                                 │
//   └────────────┴─────────────────────────────────────────────────┘
//
// The layout hides the public site's Navbar + Footer entirely by being
// its own route subtree — AdminGuard + AdminLayout take over rendering
// before any public chrome can show.
// ─────────────────────────────────────────────────────────────────────────────

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  Users,
  Briefcase,
  Wrench,
  Building2,
  ImageIcon,
  Settings,
  LogOut,
  Globe,
  ChevronDown,
  Menu,
  X,
  Leaf,
  ClipboardList,
  CalendarDays,
  Contact,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { hasOverrides, resetAllOverrides, useContentStatus } from "../data/contentStore";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";

const ADMIN_STRINGS = {
  en: {
    brand: "SMS · Admin Panel",
    nav: {
      dashboard: "Dashboard",
      messages: "Contact Messages",
      company: "Company",
      about: "About",
      projects: "Projects",
      team: "Our Workforce",
      clients: "Clients",
      jobs: "Careers",
      news: "News & Insights",
      services: "Services",
      equipment: "Equipment & Machinery",
      sustainability: "Sustainability",
      methodology: "Our Methodology",
      upcoming: "Upcoming & Planned",
      contact: "Contact",
      media: "Media Library",
      settings: "Website Settings",
      users: "Admin Users",
      siteContent: "Website content",
      homepage: "Homepage",
    },
    user: "Administrator",
    logout: "Logout",
    resetAll: "Reset all CMS overrides",
    confirmReset:
      "This will wipe every admin override and restore the static defaults. Continue?",
    overridesActive: "CMS overrides active",
    overridesNone: "All content is static (no admin overrides)",
    backToSite: "← Back to site",
  },
  fa: {
    brand: "SMS · پنل مدیر",
    nav: {
      dashboard: "داشبورد",
      messages: "پیام‌های تماس",
      company: "شرکت",
      about: "درباره ما",
      projects: "پروژه‌ها",
      team: "نیروی کار ما",
      clients: "مشتریان",
      jobs: "فرصت‌های شغلی",
      news: "اخبار و بینش‌ها",
      services: "خدمات",
      equipment: "تجهیزات و ماشین‌آلات",
      sustainability: "پایداری",
      methodology: "روش‌شناسی ما",
      upcoming: "آینده و برنامه‌ریزی‌شده",
      contact: "تماس",
      media: "کتابخانه رسانه",
      settings: "تنظیمات وب‌سایت",
      users: "مدیران",
      siteContent: "محتوای وب‌سایت",
      homepage: "صفحه اصلی",
    },
    user: "مدیر",
    logout: "خروج",
    resetAll: "بازنشانی همه تغییرات مدیر",
    confirmReset:
      "این عمل همه تغییرات مدیر را پاک کرده و محتوای پیش‌فرض را بازمی‌گرداند. ادامه دهید؟",
    overridesActive: "تغییرات مدیر فعال است",
    overridesNone: "همه محتوا ایستا است (بدون تغییرات مدیر)",
    backToSite: "→ بازگشت به سایت",
  },
};

const useAdminT = () => {
  const { lang } = useLanguage();
  return (key) => {
    const parts = key.split(".");
    let cur = ADMIN_STRINGS[lang] || ADMIN_STRINGS.en;
    for (const p of parts) cur = cur && cur[p];
    return cur || key;
  };
};

// ── Sidebar nav definition ────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    key: "main",
    items: [
      { to: "/admin/dashboard", icon: LayoutDashboard, key: "dashboard" },
      { to: "/admin/messages", icon: MessageSquare, key: "messages" },
    ],
  },
  {
    key: "siteContent",
    keyLabel: "siteContent",
    items: [
      { to: "/admin/homepage", icon: Building2, key: "company" },
      { to: "/admin/about", icon: Globe, key: "about" },
      { to: "/admin/services", icon: Briefcase, key: "services" },
      { to: "/admin/projects", icon: FolderKanban, key: "projects" },
      { to: "/admin/equipment", icon: Wrench, key: "equipment" },
      { to: "/admin/sustainability", icon: Leaf, key: "sustainability" },
      { to: "/admin/methodology", icon: ClipboardList, key: "methodology" },
      { to: "/admin/team", icon: Users, key: "team" },
      { to: "/admin/upcoming", icon: CalendarDays, key: "upcoming" },
      { to: "/admin/clients", icon: Building2, key: "clients" },
      { to: "/admin/jobs", icon: Briefcase, key: "jobs" },
      { to: "/admin/contact", icon: Contact, key: "contact" },
    ],
  },
  {
    key: "system",
    items: [
      { to: "/admin/media", icon: ImageIcon, key: "media" },
      { to: "/admin/settings", icon: Settings, key: "settings" },
      { to: "/admin/users", icon: Users, key: "users" },
    ],
  },
];

function NavItem({ to, icon: Icon, t, keyName, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition",
          isActive
            ? "bg-smsorange-500 text-white shadow-sms-soft"
            : "text-charcoal-200 hover:bg-white/10 hover:text-white",
        ].join(" ")
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{t(`nav.${keyName}`)}</span>
    </NavLink>
  );
}

function NavGroup({ group, t, canManageUsers }) {
  const visibleItems = group.items.filter(
    (item) => item.key !== "users" || canManageUsers,
  );
  return (
    <div className="space-y-1">
      {group.keyLabel && (
        <div className="px-3 mt-4 mb-1 text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">
          {t(`nav.${group.keyLabel}`)}
        </div>
      )}
      {visibleItems.map((it) => (
        <NavItem key={it.to} {...it} keyName={it.key} t={t} />
      ))}
    </div>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const t = useAdminT();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [overridesLive, setOverridesLive] = useState(hasOverrides());
  const contentStatus = useContentStatus();

  useEffect(() => {
    const updateStatus = () => setOverridesLive(hasOverrides());
    window.addEventListener("sms:content-changed", updateStatus);
    return () =>
      window.removeEventListener("sms:content-changed", updateStatus);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const handleReset = async () => {
    if (window.confirm(t("confirmReset"))) {
      try {
        await resetAllOverrides();
        setOverridesLive(false);
      } catch (error) {
        window.alert(
          error.response?.data?.message || "Could not reset website content.",
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-50 text-charcoal-900">
      {/* ── Sidebar (desktop) ──────────────────────────────────────────── */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-navy-800 md:text-white">
        <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
          <div className="h-9 w-9 rounded-md bg-smsorange-500 grid place-items-center font-display font-extrabold text-white">
            S
          </div>
          <div className="leading-tight">
            <div className="font-bold">SMS</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-smsgold-400">
              Admin Panel
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {NAV_GROUPS.map((g) => (
            <NavGroup
              key={g.key}
              group={g}
              t={t}
              canManageUsers={Number(user?.is_super_admin) === 1}
            />
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mx-3 mb-3 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </button>
        <div className="px-3 py-3 border-t border-white/10 text-[11px] text-white/60">
          <div className={overridesLive ? "text-smsgold-300" : "text-white/40"}>
            {overridesLive ? t("overridesActive") : t("overridesNone")}
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar (with hamburger) ────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-navy-800 text-white px-4 py-3 shadow-sms-soft">
        <button
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-md hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-bold">{t("brand")}</div>
        <LanguageSwitcher />
      </header>

      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-navy-900/60"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-navy-800 text-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold">{t("brand")}</div>
              <button
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-2">
              {NAV_GROUPS.map((g) => (
                <NavGroup
                  key={g.key}
                  group={g}
                  t={t}
                  canManageUsers={Number(user?.is_super_admin) === 1}
                />
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              {t("logout")}
            </button>
          </aside>
        </div>
      )}

      {/* ── Top bar (desktop) ─────────────────────────────────────────── */}
      <header className="hidden md:flex sticky top-0 z-30 bg-white border-b border-charcoal-100 h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm text-charcoal-500 hover:text-charcoal-900"
          >
            {t("backToSite")}
          </a>
          <span className="text-charcoal-300">·</span>
          <h1 className="text-sm font-semibold text-charcoal-800">
            {t("brand")}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            title={t("resetAll")}
            className="text-xs font-semibold text-charcoal-500 hover:text-smsorange-600 px-3 py-1.5 rounded-md border border-charcoal-200 hover:border-smsorange-300 transition"
          >
            {t("resetAll")}
          </button>
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md border border-charcoal-200 hover:border-smsorange-300 hover:bg-smsorange-50/40 transition"
            >
              <div className="h-7 w-7 rounded-full bg-smsorange-500 text-white grid place-items-center font-bold text-xs">
                {(user?.name || user?.email || "A").slice(0, 1).toUpperCase()}
              </div>
              <div className="hidden lg:block leading-tight text-left">
                <div className="text-xs font-semibold text-charcoal-900">
                  {user?.name || t("user")}
                </div>
                <div className="text-[10px] text-charcoal-500">
                  {user?.email}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-charcoal-400" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border border-charcoal-100 bg-white shadow-sms-strong py-1 z-40">
                <div className="px-3 py-2 border-b border-charcoal-100 lg:hidden">
                  <div className="text-xs font-semibold">
                    {user?.name || t("user")}
                  </div>
                  <div className="text-[11px] text-charcoal-500 truncate">
                    {user?.email}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate("/admin/settings");
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-charcoal-50 inline-flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" /> {t("nav.settings")}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-charcoal-50 inline-flex items-center gap-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" /> {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="md:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {contentStatus.loaded ? (
            <Outlet />
          ) : contentStatus.error ? (
            <div className="text-center py-12 text-sm text-charcoal-600">
              <p className="text-red-600 mb-3">{contentStatus.error}</p>
              <button onClick={contentStatus.retry} className="px-3 py-1.5 rounded-md bg-smsorange-500 hover:bg-smsorange-600 text-white text-sm font-semibold">Retry</button>
            </div>
          ) : (
            <div className="text-center py-12 text-charcoal-500 text-sm">Loading…</div>
          )}
        </div>
      </main>
    </div>
  );
}
