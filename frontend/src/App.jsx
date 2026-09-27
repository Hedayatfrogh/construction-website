import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { ModalProvider } from "./context/ModelContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import LogIn from "./components/Login.jsx";
import AdminProtect from "../Protect/AdminProtect.jsx";
import Dashboard from "./components/Dashboard/page.jsx";

// Public pages
import About          from "./pages/About.jsx";
import Services       from "./pages/Services.jsx";
import ServiceDetail  from "./pages/ServiceDetail.jsx";
import Projects       from "./pages/Projects.jsx";
import Equipment      from "./pages/Equipment.jsx";
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Slider />} />

              <Route path="/about"              element={<About />} />
              <Route path="/services"           element={<Services />} />
              <Route path="/services/:slug"     element={<ServiceDetail />} />
              <Route path="/projects"           element={<Projects />} />
              <Route path="/equipment"          element={<Equipment />} />
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
            </Routes>
            <Footer />
          </Router>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
