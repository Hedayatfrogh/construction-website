// Workforce, equipment categories, organization chart, upcoming project categories,
// expansion goals, strategic plans, and site navigation.

export const workforce = {
  engineering: [
    "Civil Engineers","Architects","Structural Engineers","Electrical Engineers",
    "Mechanical Engineers","Hydrologists","Irrigation Engineers","Surveyors",
    "Community Liaison Officers","Admin Officers","Health & Safety Officers",
    "Environmental Specialists","Geotechnical Specialists","Material Testing Specialists",
    "Project Managers","Site Supervisors","Logistics & Procurement Team",
  ],
  skilledLabor: [
    "Masons","Carpenters","Steel Fixers","Plumbers","Electricians","Painters & Finishers",
    "Welders","Heavy Equipment Operators","Concrete Workers","Irrigation Technicians",
    "Survey Assistants","Tile Setters","Road Workers",
  ],
};

// Each equipment category carries:
//   - title:   the English source string (also the dictionary key prefix)
//   - slug:    URL-safe id used by the dedicated detail page route
//              (e.g. /equipment/earthmoving)
//   - icon:    icon name resolved by <IconByName />
//   - items:   ordered list of equipment items, matching the existing
//              `equipmentCategories.<title>.items.<idx>` translation keys
export const equipmentCategories = [
  { slug: "earthmoving",           title: "Earthmoving Equipment",     icon: "Truck",        items: ["Excavators","Bulldozers","Backhoe Loaders","Skid-Steer Loaders","Graders","Scrapers"] },
  { slug: "concrete-road",         title: "Concrete & Road Equipment", icon: "Construction", items: ["Mobile Concrete Mixers","Stationary Concrete Mixers","Concrete Pumps","Pavers","Rollers","Vibratory Rollers","Static Rollers"] },
  { slug: "material-handling",     title: "Material Handling",         icon: "PackageOpen",  items: ["Cranes","Telehandlers","Forklifts","Dumper Trucks","Hand Carts / Wheelbarrows"] },
  { slug: "drilling-foundation",   title: "Drilling & Foundation",     icon: "Drill",        items: ["Compressors","Rotary Drilling Rigs","Pile Drivers","Trenchers"] },
  { slug: "demolition-finishing",  title: "Demolition & Finishing",    icon: "Hammer",       items: ["Breakers","Jackhammers","Vibrators","Trowels","Scaffolding"] },
  { slug: "other-equipment",       title: "Other Equipment",           icon: "PlugZap",      items: ["Generators","Lighting Towers","Water Tankers","Welding Machines"] },
];

// Lookup helper used by the EquipmentCategoryPage: resolve a URL slug to
// the matching category object. Falls back to `null` for unknown slugs so
// the page can render a friendly 404 state.
export const getEquipmentCategoryBySlug = (slug) =>
  equipmentCategories.find((c) => c.slug === slug) || null;

export const organizationChart = [
  { role: "Chief Executive Officer", department: "Executive" },
  { role: "Operations Manager", department: "Operations" },
  { role: "Project Management", department: "Projects", children: [
    { role: "Project Managers" }, { role: "Estimators" }, { role: "Planners" }, { role: "Site Supervisors" },
  ]},
  { role: "Construction Managers", department: "Technical" },
  { role: "Civil Engineers", department: "Technical" },
  { role: "Mechanical Engineers", department: "Technical" },
  { role: "Electrical Engineers", department: "Technical" },
  { role: "Architect", department: "Technical" },
  { role: "QA/QC Manager", department: "Quality" },
  { role: "Site Engineers", department: "Technical" },
  { role: "Hydrologists", department: "Technical" },
  { role: "Urban Planner", department: "Technical" },
  { role: "Financial Officer", department: "Finance" },
  { role: "HSE Manager", department: "HSE" },
  { role: "Environmental Managers", department: "HSE" },
  { role: "Health & Safety Officers", department: "HSE" },
  { role: "Environmental Safeguard Specialist", department: "HSE" },
  { role: "Waste Management Specialists", department: "HSE" },
  { role: "Procurement & Logistics", department: "Supply Chain", children: [
    { role: "Procurement Manager" }, { role: "Supply Chain Coordinators" },
  ]},
  { role: "HR Managers", department: "Human Resources", children: [
    { role: "Recruitment Specialists" }, { role: "Training Specialists" }, { role: "HR Information System Specialists" },
  ]},
];

// Each upcoming-project category carries a stable translation `key`
// and an English `label` that doubles as the fallback used by the i18n
// `translate()` function. The `key` is what the consumer component
// passes to `t(...)` so the pill text follows the current language
// (Dari ↔ English) without re-rendering or losing visual order.
//
// Keys are namespaced under `home.*` because the same pills appear on
// both the home page section and the `/upcoming-projects` page; keeping
// them under the existing `home` block in `i18n/translations.js` avoids
// duplicating the dictionary.
export const upcomingProjectCategories = [
  { key: "home.categoryRoadsBridges",            label: "Roads & Bridges" },
  { key: "home.categoryDrainageSewerage",        label: "Drainage & Sewerage" },
  { key: "home.categoryHydropower",              label: "Hydropower" },
  { key: "home.categoryRenewableEnergy",         label: "Renewable Energy" },
  { key: "home.categorySchools",                 label: "Schools" },
  { key: "home.categoryHospitals",               label: "Hospitals" },
  { key: "home.categoryIrrigation",              label: "Irrigation" },
  { key: "home.categoryAgriculturalInfrastructure", label: "Agricultural Infrastructure" },
  { key: "home.categoryWaterSupply",             label: "Water Supply" },
  { key: "home.categorySanitation",              label: "Sanitation" },
  { key: "home.categorySolarEnergy",             label: "Solar Energy" },
  { key: "home.categoryTransportation",          label: "Transportation" },
  { key: "home.categoryAirportInfrastructure",   label: "Airport Infrastructure" },
  { key: "home.categoryHousing",                 label: "Housing" },
  { key: "home.categoryIndustrialDevelopment",   label: "Industrial Development" },
  { key: "home.categoryCommercialDevelopment",   label: "Commercial Development" },
  { key: "home.categorySmartBuildings",          label: "Smart Buildings" },
];

export const expansionGoals = [
  { title: "Geographical Growth",      icon: "Map",         description: "Expanding our presence across Afghanistan and into regional markets to support national development." },
  { title: "Diversification",          icon: "LayoutGrid",  description: "Broadening our service portfolio into new sectors and adjacent industries to better serve clients." },
  { title: "Capacity Enhancement",     icon: "TrendingUp",  description: "Investing in workforce training, equipment, and modern construction methods to scale delivery capacity." },
  { title: "Public-Private Partnerships", icon: "Handshake",description: "Building long-term partnerships with government, donors, and private investors to deliver shared infrastructure." },
];

export const strategicPlans = [
  { title: "Technology Integration", icon: "Cpu", points: ["Building Information Modeling (BIM)","Precast construction","Modular construction","AI-based construction management"] },
  { title: "Sustainability",         icon: "Leaf", points: ["Solar energy deployment","Rainwater harvesting systems","Energy-efficient building design","Construction waste management","Eco-friendly material sourcing"] },
  { title: "Training & Workforce Development", icon: "GraduationCap", points: ["Technical training center","University internship programs","Health & safety workshops"] },
  { title: "International Collaboration & Investment", icon: "Globe2", points: ["Global construction partnerships","Material supplier alliances","Investor engagement","Foreign Direct Investment (FDI)","International tenders"] },
];

export const navLinks = [
  { label: "Home",            to: "/" },
  { label: "About",           to: "/about" },
  { label: "Services",        to: "/services" },
  { label: "Projects",        to: "/projects" },
  { label: "Equipment",       to: "/equipment" },
  { label: "Team",            to: "/team" },
  { label: "Safety & Quality",to: "/safety-quality" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Methodology",     to: "/methodology" },
  { label: "Clients",         to: "/clients" },
  { label: "News",            to: "/news" },
  { label: "Contact",         to: "/contact" },
];
