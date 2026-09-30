import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { ModalProvider } from "./context/ModelContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import LogIn from "./components/Login.jsx";
import AdminProtect from "../Protect/AdminProtect.jsx";
import Dashboard from "./components/Dashboard/page.jsx";

// ── Admin panel (/admin/*) — guarded subtree with its own layout ────────
import AdminGuard from "./admin/AdminGuard";
import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/pages/Overview";
import AdminMessages from "./admin/pages/Messages";
import AdminProjects from "./admin/pages/Projects";
import AdminTeam from "./admin/pages/Team";
import AdminClients from "./admin/pages/Clients";
import AdminNews from "./admin/pages/News";
import AdminJobs from "./admin/pages/Jobs";
import AdminServices from "./admin/pages/Services";
import AdminEquipment from "./admin/pages/Equipment";
import AdminHomepage from "./admin/pages/Homepage";
import AdminMedia from "./admin/pages/Media";
import AdminSettings from "./admin/pages/Settings";
import AdminNotFound from "./admin/AdminNotFound";

// Public pages
import About          from "./pages/About.jsx";
import Services       from "./pages/Services.jsx";
import ServiceDetail  from "./pages/ServiceDetail.jsx";
import Projects       from "./pages/Projects.jsx";
import Equipment      from "./pages/Equipment.jsx";
import EquipmentCategory from "./pages/EquipmentCategory.jsx";
import Team           from "./pages/Team.jsx";
import Clients        from "./pages/Clients.jsx";
import SafetyQuality  from "./pages/SafetyQuality.jsx";
import Sustainability from "./pages/Sustainability.jsx";
import Methodology    from "./pages/Methodology.jsx";
import Organization   from "./pages/Organization.jsx";
import StrategicPlans from "./pages/StrategicPlans.jsx";
import ExpansionGoals from "./pages/ExpansionGoals.jsx";
import UpcomingProjects from "./pages/UpcomingProjects.jsx";
import News           from "./pages/News.jsx";
import Contact        from "./pages/Contact.jsx";

// Show the public Navbar + Footer ONLY on public routes. Admin and
// Login get a clean full-screen experience via their own layouts.
function PublicChrome({ children }) {
  const { pathname } = useLocation();
  const isFullScreen = pathname.startsWith("/admin") || pathname === "/login";
  if (isFullScreen) return <>{children}</>;
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <Router>
            <ScrollToTop />
            <PublicChrome>
            <Routes>
              <Route path="/" element={<Slider />} />

              <Route path="/about"              element={<About />} />
              <Route path="/services"           element={<Services />} />
              <Route path="/services/:slug"     element={<ServiceDetail />} />
              <Route path="/projects"           element={<Projects />} />
              <Route path="/equipment"          element={<Equipment />} />
              {/* Dedicated equipment category pages — one component, six routes.
                  The :slug parameter resolves to the matching category in
                  data/operations.js via getEquipmentCategoryBySlug(). */}
              <Route path="/equipment/earthmoving"          element={<EquipmentCategory />} />
              <Route path="/equipment/concrete-road"        element={<EquipmentCategory />} />
              <Route path="/equipment/material-handling"    element={<EquipmentCategory />} />
              <Route path="/equipment/drilling-foundation"  element={<EquipmentCategory />} />
              <Route path="/equipment/demolition-finishing" element={<EquipmentCategory />} />
              <Route path="/equipment/other-equipment"      element={<EquipmentCategory />} />
              <Route path="/team"               element={<Team />} />
              <Route path="/clients"            element={<Clients />} />
              <Route path="/safety-quality"     element={<SafetyQuality />} />
              <Route path="/sustainability"     element={<Sustainability />} />
              <Route path="/methodology"        element={<Methodology />} />
              <Route path="/organization"       element={<Organization />} />
              <Route path="/strategic-plans"    element={<StrategicPlans />} />
              <Route path="/expansion-goals"    element={<ExpansionGoals />} />
              <Route path="/upcoming-projects"  element={<UpcomingProjects />} />
              <Route path="/news"               element={<News />} />
              <Route path="/contact"            element={<Contact />} />

              {/* Auth + Admin (existing) */}
              <Route path="/login" element={<LogIn />} />
              <Route path="/dashboard" element={
                <AdminProtect>
                  <Dashboard />
                </AdminProtect>
              } />

              {/* ── Admin panel at /admin (guarded, own layout) ──────── */}
              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index                            element={<AdminOverview />} />
                <Route path="messages"                 element={<AdminMessages />} />
                <Route path="projects"                 element={<AdminProjects />} />
                <Route path="team"                     element={<AdminTeam />} />
                <Route path="clients"                  element={<AdminClients />} />
                <Route path="news"                     element={<AdminNews />} />
                <Route path="jobs"                     element={<AdminJobs />} />
                <Route path="services"                 element={<AdminServices />} />
                <Route path="equipment"                element={<AdminEquipment />} />
                <Route path="homepage"                 element={<AdminHomepage />} />
                <Route path="media"                    element={<AdminMedia />} />
                <Route path="settings"                 element={<AdminSettings />} />
                <Route path="*"                        element={<AdminNotFound />} />
              </Route>
            </Routes>
            </PublicChrome>
          </Router>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
