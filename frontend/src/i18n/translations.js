// translations.js — placeholder, full content populated in subsequent edits.
const en = {
  // ── Common ───────────────────────────────────────────────────────────────
  common: {
    learnMore: "Learn More", viewAll: "View All", explore: "Explore",
    seeMore: "See More", readMore: "Read More", viewDetails: "View Details",
    getStarted: "Get Started", close: "Close", cancel: "Cancel", save: "Save",
    edit: "Edit", delete: "Delete", submit: "Submit", sending: "Sending…",
    retry: "Retry", back: "Back", next: "Next", yes: "Yes", no: "No",
    loading: "Loading…", search: "Search", home: "Home", breadcrumbHome: "Home",
    more: "More", stage: "Stage", planned: "Planned / Upcoming",
    optional: "Optional", required: "Required", none: "None",
  },

  // ── Branding / hero ──────────────────────────────────────────────────────
  brand: {
    shortName: "SMS", name: "Sayed Musawer Sadat",
    fullName: "Sayed Musawer Sadat Construction and Engineering Design Company",
    line: "Construction & Engineering",
    tagline: "Building with Passion, Delivering with Pride",
    established: "Established",
  },

  // ── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    home: "Home", about: "About", services: "Services", projects: "Projects",
    equipment: "Equipment", team: "Team", safetyQuality: "Safety & Quality",
    sustainability: "Sustainability", methodology: "Methodology",
    clients: "Clients", news: "News", contact: "Contact",
  },

  // ── Header actions ──────────────────────────────────────────────────────
  header: { requestConsultation: "Request a Consultation", logIn: "Log In", dashboard: "Dashboard" },

  // ── Mobile drawer ───────────────────────────────────────────────────────
  drawer: { navigation: "Navigation", theme: "Theme", language: "Language" },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    about: "About Us", quickLinks: "Quick Links", ourServices: "Our Services",
    contactUs: "Contact Us", rights: "All rights reserved.",
    address: "Address", phone: "Phone", email: "Email", followUs: "Follow Us",
  },

  // ── Switchers ───────────────────────────────────────────────────────────
  langSwitcher:  { label: "Language", switchToEnglish: "Switch to English", switchToDari: "تغییر به دری" },
  themeSwitcher: { switchToLight: "Switch to light mode", switchToDark: "Switch to dark mode" },

  // ── Social media (screen-reader aria-labels for the Footer's social icons) ──
  social: {
    facebook:  "Facebook",
    twitter:   "Twitter",
    linkedin:  "LinkedIn",
    instagram: "Instagram",
  },

  // ── Flat-key aliases ─────────────────────────────────────────────────────
  // Several components (Navbar, Footer, LanguageSwitcher, Hero) use flat
  // top-level keys like t("brandShort") or t("requestConsultation") rather
  // than the nested form (t("brand.shortName")). To keep those calls
  // working without touching every JSX file, we expose flat aliases here.
  brandShort: "SMS",
  brandName: "Sayed Musawer Sadat",
  brandLine: "Construction & Engineering",
  heroTagline: "Building with Passion, Delivering with Pride",
  requestConsultation: "Request a Consultation",
  logIn: "Log In",
  // NOTE: there is no flat `dashboard` alias because the dictionary
  // already has a nested `dashboard` section used by the Admin Panel
  // (t("dashboard.sidebar.logout") etc). The Navbar uses
  // t("header.dashboard") instead — see Navbar.jsx.
  mobileLanguageHeading: "Language",
  mobileThemeHeading: "Theme",
  footerAbout: "About Us",
  footerOurServices: "Our Services",
  footerContactUs: "Contact Us",
  footerRights: "All rights reserved.",
  // Screen-reader label for the clickable phone link in the Footer.
  // Parametrised so the actual phone number is injected at call time.
  // EN: "Call +93 747777788"  /  FA: "تماس با +۹۳ ۷۴۷۷۷۷۷۸۸"
  footerCallPhone: (phone) => `Call ${phone}`,
  language: "Language",
  switchToEnglish: "Switch to English",
  switchToDari: "تغییر به دری",

  // ── Home page ───────────────────────────────────────────────────────────
  home: {
    heroBadge: (year) => `SMS · Established ${year}`,
    heroExploreServices: "Explore Our Services",
    heroViewProjects: "View Our Projects",
    heroContactUs: "Contact Us",
    statsFooter: "We display only verified company facts from the Company Profile. Project counts, employee totals, and client counts are intentionally not stated and can be configured by the Admin Panel.",
    servicesEyebrow: "What We Do",
    servicesTitle: "Comprehensive Construction & Engineering Services",
    servicesSubtitle: "From high-rise buildings to water networks, from solar energy to rehabilitation — SMS delivers full-scope construction and engineering design.",
    servicesExplore: "Explore",
    servicesViewAll: "View All Services",
    mediaEyebrow: "Our Work",
    mediaTitle: "Construction & Engineering in Action",
    mediaPrev: "Previous slide",
    mediaNext: "Next slide",
    whyEyebrow: "Why SMS",
    whyTitle: "Engineering excellence, built on seven pillars",
    whySubtitle: "Our values shape every drawing, every site, and every handover.",
    whyLearnMore: "Learn More About SMS",
    sqSafetyTitle: "Zero-harm culture on every site",
    sqSafetyBody: "Strict OHS compliance, UN safety standards, risk assessments, hazard identification, PPE, training, drills, on-site safety officers, and accident prevention — applied to every project we deliver.",
    sqSafetyReadMore: "Read our safety program",
    sqQualityTitle: "Three-stage quality control",
    sqQualityBody: "ISO and international quality standards, Afghan National Building Code compliance, material testing, pre/during/post-construction QA, third-party audits, and continuous improvement.",
    sqSeeQuality: "See our quality approach",
    sustainEyebrow: "Sustainability",
    sustainTitle: "Built responsibly — for communities and the planet",
    sustainSubtitle: "From low-carbon concrete to rainwater harvesting and solar energy, sustainability is engineered into every SMS project.",
    sustainReadMore: "Our Sustainability Program",
    methodEyebrow: "Our Methodology",
    methodTitle: "A six-step process for predictable delivery",
    methodSubtitle: "From feasibility to handover, every SMS project follows a clear, repeatable, and quality-driven process.",
    methodSeeFull: "See Full Methodology",
    equipEyebrow: "Equipment & Machinery",
    equipTitle: "A modern fleet, ready for any terrain",
    equipSubtitle: "From earthmoving to finishing, our equipment categories cover the full lifecycle of a construction project.",
    equipExplore: "Explore All Equipment",
    workforceEyebrow: "Our Workforce",
    workforceTitle: "Engineers, specialists, and skilled tradespeople",
    workforceSubtitle: "Our combined engineering & technical teams plus skilled labor cover every discipline needed to deliver complex projects.",
    workforceMeetTeam: "Meet The Team",
    upcomingEyebrow: "Upcoming & Planned",
    upcomingTitle: "Future projects across multiple sectors",
    upcomingSubtitle: "SMS is positioned to participate in upcoming projects across infrastructure, energy, healthcare, education, and smart urban development.",
    upcomingBody: "The categories below reflect SMS's planned and upcoming project focus. They are listed as planned, not as completed work.",
    upcomingSeeAll: "See All Categories",
    // ── Project category pills (Upcoming / UpcomingProjects page) ───────────
    // Keep these keys in sync with `data/operations.js > upcomingProjectCategories`.
    // The English source string is also used as a runtime fallback by `translate()`
    // if a key is ever missing from this dictionary.
    categorySanitation:              "Sanitation",
    categoryWaterSupply:             "Water Supply",
    categoryAgriculturalInfrastructure: "Agricultural Infrastructure",
    categoryIrrigation:              "Irrigation",
    categoryHospitals:               "Hospitals",
    categorySchools:                 "Schools",
    categoryRenewableEnergy:         "Renewable Energy",
    categoryHydropower:              "Hydropower",
    categoryDrainageSewerage:        "Drainage & Sewerage",
    categoryRoadsBridges:            "Roads & Bridges",
    categorySmartBuildings:          "Smart Buildings",
    categoryCommercialDevelopment:   "Commercial Development",
    categoryIndustrialDevelopment:   "Industrial Development",
    categoryHousing:                 "Housing",
    categoryAirportInfrastructure:   "Airport Infrastructure",
    categoryTransportation:          "Transportation",
    categorySolarEnergy:             "Solar Energy",
    // ── Footer company blurb + city labels ──────────────────────────────────
    footerCompanyDescription: "A premier Afghan construction and engineering firm delivering buildings, infrastructure, water & irrigation, energy, and rehabilitation works across the country.",
    footerCityKabul:    "Kabul:",
    footerCityNangarhar: "Nangarhar:",
    footerCompanyWebsite: "Website",
    // ── Service titles used in the Footer "Our Services" list ──────────────
    // Keep slugs in sync with `data/content.js > services[]`.
    // The English source string is also used as a runtime fallback by `translate()`
    // if a key is ever missing from this dictionary.
    buildingConstruction:        "Building Construction",
    infrastructureDevelopment:   "Infrastructure Development",
    rehabilitationRenovation:    "Rehabilitation & Renovation",
    waterSupplyIrrigation:       "Water Supply & Irrigation Systems",
    energySolutions:             "Energy Solutions",
    wasteManagementSanitation:   "Waste Management & Sanitation",
    landscapingParks:            "Landscaping & Parks",
    clientsEyebrow: "Our Clients",
    clientsTitle: "Trusted by partners across the public and private sector",
    clientsSubtitle: "SMS serves a wide range of clients. The full client portfolio is configured from the Admin Panel.",
    clientsEmptyTitle: "Client portfolio to be added",
    clientsEmptyBody: "The Company Profile includes a Major Clients section, but actual client names are not listed in the available text. Please add your clients (name, logo, website, category) through the Admin Panel so they appear here.",
    clientsGoTo: "Go to Clients Page",
    ctaTitle: "Let's plan your next construction or engineering project.",
    ctaSubtitle: "Whether a high-rise building, infrastructure corridor, irrigation scheme, or solar installation — SMS brings the engineering, equipment, and people to deliver it.",
    contactCallUs: "Call Us", contactEmail: "Email",
    contactKabulOffice: "Kabul Office", contactNangarharOffice: "Nangarhar Office",
    contactEmailPlaceholder: "Add via Admin",
  },

  // ── About page ──────────────────────────────────────────────────────────
  about: {
    heroEyebrow: "About SMS",
    heroTitle: "Building Afghanistan's future, one project at a time.",
    heroSubtitle: "SMS is an Afghan construction and engineering firm delivering buildings, infrastructure, water systems, energy, and rehabilitation works.",
    overviewEyebrow: "Company Overview", overviewTitle: "Who we are",
    overviewP1: "Sayed Musawer Sadat Construction and Engineering Design Company (SMS) is an Afghan construction and engineering firm providing full-scope design, build, and rehabilitation services for public and private clients.",
    overviewP2: "Our capabilities span building construction (villas to high-rises), infrastructure development (roads, highways, bridges, culverts), rehabilitation and renovation, water supply & irrigation systems, renewable energy, waste management & sanitation, and landscaping & parks.",
    overviewP3: "We combine an experienced engineering & technical workforce with skilled trades, modern equipment, and a strict quality, safety, and sustainability framework.",
    vision: "Vision", mission: "Mission",
    infoEyebrow: "Company Information",
    infoTitle: "The verified facts about SMS",
    infoSubtitle: "Drawn directly from the Company Profile. Empty fields are intentionally left blank for the Admin to fill in.",
    editableInAdmin: "Editable in Admin",
    valuesEyebrow: "Our Values",
    valuesTitle: "The principles that guide every project",
    valuesSubtitle: "Seven values shape our culture and our work.",
    ctaTitle: "Want to know more about SMS?",
    ctaSubtitle: "Talk to our team about your construction or engineering project.",
  },

  // ── Company facts (About infoRows) ──────────────────────────────────────
  companyFacts: {
    companyName: "Company Name", shortName: "Short Name", tagline: "Tagline",
    established: "Established", registrationNumber: "Registration Number",
    licenseNumber: "License Number", tinNumber: "TIN Number",
    ungmNumber: "UNGM Number", phone: "Phone", email: "Email",
    mainOffice: "Main Office", branchOffice: "Branch Office",
  },

  // ── Core values ─────────────────────────────────────────────────────────
  values: {
    quality:                { title: "Quality",                description: "International standards and a three-stage quality control process across every project." },
    safety:                 { title: "Safety",                 description: "Strict OHS compliance, continuous training, and a zero-harm culture on every site." },
    innovation:             { title: "Innovation",             description: "Embracing modern methods — BIM, prefabrication, modular construction, and AI-based management." },
    professionalism:        { title: "Professionalism",        description: "Disciplined project management, transparent reporting, and ethical business conduct." },
    sustainability:         { title: "Sustainability",         description: "Energy-efficient designs, low-carbon materials, waste reduction, and renewable energy." },
    clientCollaboration:    { title: "Client Collaboration",   description: "Working hand-in-hand with clients, communities, and partners from concept to handover." },
    socialResponsibility:   { title: "Social Responsibility",  description: "Hiring locally, training the next generation, and contributing to national development." },
  },

  vision: "To become Afghanistan's most trusted and innovative construction and engineering design company, recognized for delivering infrastructure that elevates communities, supports national development, and sets the benchmark for quality, safety, and sustainability.",
  mission: "To deliver high-quality, safe, and sustainable construction and engineering solutions across every project we undertake — from high-rise buildings and infrastructure to water systems, energy, and rehabilitation works — by combining experienced professionals, modern methods, and an unwavering commitment to our clients and communities.",
  heroIntro: "Sayed Musawer Sadat Construction and Engineering Design Company (SMS) is an Afghan construction and engineering firm delivering high-rise buildings, infrastructure, water & irrigation systems, renewable energy, and rehabilitation works — combining engineering excellence with an unwavering commitment to safety, quality, and sustainability.",

  // ── Verified stats (Home trust strip + Stats) ──────────────────────────
  stats: {
    foundedLabel: "Founded", foundedShort: "Founded",
    regLabel: "Registration No.", regShort: "Reg. No.",
    licenseLabel: "License No.", licenseShort: "License",
    tinLabel: "TIN", tinShort: "TIN",
  },

  // ── Services (page + home grid) ─────────────────────────────────────────
  servicesPage: {
    heroEyebrow: "Services",
    heroTitle: "Full-scope construction and engineering services",
    heroSubtitle: "From buildings to infrastructure, water systems to energy — SMS delivers across the entire construction lifecycle.",
    eyebrow: "What We Do",
    title: "Seven core service areas, one accountable partner",
    subtitle: "Every service is delivered under the same commitment to quality, safety, and sustainability.",
    learnMore: "Learn More",
    ctaTitle: "Need a service not listed above?",
    ctaSubtitle: "Our team can scope custom solutions to fit your project.",
  },
  services: {
    "building-construction": { title: "Building Construction", summary: "High-rise, mid-rise, and low-rise buildings, villas, schools, hospitals, and commercial complexes.", description: "We deliver end-to-end building construction — from foundations to finishes — for residential, commercial, educational, and healthcare facilities.", items: ["High-rise buildings","Mid-rise buildings","Low-rise buildings","Single-story structures","Villas","Educational facilities","Healthcare facilities","Commercial complexes","Other developmental works"] },
    "infrastructure-development": { title: "Infrastructure Development", summary: "Roads, highways, bridges, and culverts connecting communities and supporting national growth.", description: "We plan and construct the critical infrastructure that moves people and goods — engineered for durability, safety, and long service life.", items: ["Roads","Highways","Bridges","Culverts"] },
    "rehabilitation-renovation": { title: "Rehabilitation & Renovation", summary: "Restoration of existing structures, facility upgrades, and rehabilitation works.", description: "We restore, modernize, and extend the life of existing buildings and facilities.", items: ["Restoration of existing structures","Facility upgrades","Rehabilitation works"] },
    "water-supply-irrigation": { title: "Water Supply & Irrigation Systems", summary: "Bore well drilling, water networks, and agricultural irrigation systems.", description: "From borehole drilling to distribution networks and farm irrigation, we deliver reliable water systems that serve communities and agriculture.", items: ["Bore well drilling","Water networks","Agricultural irrigation systems","Irrigation-related services"] },
    "energy-solutions": { title: "Energy Solutions", summary: "Solar power systems and renewable energy projects for a cleaner, more resilient future.", description: "We design and install solar and renewable energy systems that reduce operating costs and environmental impact.", items: ["Solar power systems","Renewable energy projects"] },
    "waste-management-sanitation": { title: "Waste Management & Sanitation", summary: "Waste treatment facilities and sanitation systems for healthier communities.", description: "We deliver modern waste treatment and sanitation infrastructure that protects public health and the environment.", items: ["Waste treatment facilities","Sanitation systems"] },
    "landscaping-parks": { title: "Landscaping & Parks", summary: "Urban parks, recreational spaces, and green spaces that improve quality of life.", description: "We design and build green public spaces — parks, plazas, and recreational areas — that bring communities together.", items: ["Urban parks","Recreational spaces","Green spaces"] },
  },

  // ── Service detail page ─────────────────────────────────────────────────
  serviceDetail: {
    overview: "Overview", scopeOfWork: "Scope of Work",
    needThisService: "Need this service?",
    requestConsultation: "Request a consultation",
    requestBody: "Tell us about your project and our engineering team will get back to you.",
    contactUs: "Contact Us",
    orExplore: "Or explore other services:",
    ctaTitle: (n) => `Plan your ${n.toLowerCase()} project`,
    ctaSubtitle: "Engage SMS for technical assessment and a tailored proposal.",
  },

  // ── Projects page ───────────────────────────────────────────────────────
  projects: {
    heroEyebrow: "Projects", heroTitle: "Our project portfolio",
    heroSubtitle: "The SMS project portfolio is published and managed from the Admin Panel.",
    eyebrow: "Completed Projects", title: "Project portfolio will appear here",
    subtitle: "Per the Company Profile, completed project details are not currently published. The CMS supports project name, category, location, client, dates, status, description, images, and gallery.",
    emptyTitle: "No projects published yet",
    emptyBody: "Once the Admin publishes projects, they will appear here with cover image, category, location, client, dates, status, and a detail page with gallery.",
    discussCTA: "Discuss your project",
    ctaTitle: "Have a project for SMS?",
    ctaSubtitle: "Tell us about the scope, location, and timeline.",
  },

  // ── Equipment page ──────────────────────────────────────────────────────
  equipment: {
    heroEyebrow: "Equipment", heroTitle: "A modern fleet for every construction phase",
    heroSubtitle: "Our equipment categories cover earthmoving, concrete & roads, material handling, drilling & foundations, demolition & finishing, and supporting equipment.",
    eyebrow: "Equipment Categories", title: "Six categories, fully supported by the CMS",
    subtitle: "Specific equipment items, models, quantities, and statuses are managed from the Admin Panel — we don't publish quantities that aren't verified.",
    ctaTitle: "Need equipment for your project?",
    ctaSubtitle: "SMS offers equipment-as-part-of-contract for complex projects.",
  },
  // IMPORTANT: keys MUST be the English titles from data/operations.js because
  // components look them up as t(`equipmentCategories.${cat.title}.title`) for
  // the card heading and t(`equipmentCategories.${cat.title}.items.${idx}`)
  // for each list item. Each entry exposes a `title` (English category name)
  // plus an `items` array of English equipment names.
  equipmentCategories: {
    "Earthmoving Equipment": {
      title: "Earthmoving Equipment",
      items: ["Excavators","Bulldozers","Backhoe Loaders","Skid-Steer Loaders","Graders","Scrapers"],
      descriptions: [
        "Hydraulic excavators for digging, trenching, demolition support, and material loading on construction sites.",
        "Tracked bulldozers for heavy earthmoving, site clearing, grading, and pushing large volumes of soil and rubble.",
        "Versatile backhoe loaders combining a front loader and rear excavator for digging, loading, and small site works.",
        "Compact skid-steer loaders for tight spaces — ideal for landscaping, small demolition, and material handling.",
        "Motor graders for fine grading, road leveling, and snow removal on construction and access roads.",
        "Scrapers for self-loading, hauling, and spreading earth over medium to long distances on large sites.",
      ],
      availability: ["Available","Available","Available","Available","Available","Available"],
      specs: [
        "Operating weight: 20–35 t · Bucket: 1.0–1.6 m³ · Engine: 110–200 kW",
        "Operating weight: 15–40 t · Blade capacity: 5–11 m³ · Engine: 130–300 kW",
        "Operating weight: 7–11 t · Dig depth: 4–6 m · Loader capacity: 1.0–1.5 m³",
        "Operating weight: 3–4 t · Rated capacity: 800–1,200 kg · Engine: 50–75 kW",
        "Operating weight: 12–20 t · Blade length: 3.7–4.3 m · Engine: 110–180 kW",
        "Heaped capacity: 15–34 m³ · Engine: 260–450 kW · Self-loading elevator",
      ],
    },
    "Concrete & Road Equipment": {
      title: "Concrete & Road Equipment",
      items: ["Mobile Concrete Mixers","Stationary Concrete Mixers","Concrete Pumps","Pavers","Rollers","Vibratory Rollers","Static Rollers"],
      descriptions: [
        "Truck-mounted mobile concrete mixers for transporting ready-mix concrete to dispersed construction sites.",
        "Stationary concrete mixers for high-volume batching plants producing structural concrete for buildings and infrastructure.",
        "Concrete pumps for placing ready-mix concrete at height, distance, or in confined areas inaccessible to trucks.",
        "Asphalt pavers for laying road surfaces, parking areas, and industrial yards to uniform thickness and grade.",
        "Single-drum and tandem rollers for compacting road bases, asphalt layers, and earthworks.",
        "Vibratory rollers using vibration + weight for high-efficiency compaction of granular soils and asphalt.",
        "Static rollers for finish rolling, smooth-wheel compaction, and sensitive surfaces where vibration is unwanted.",
      ],
      availability: ["Available","Available","Available","Available","Available","Available","Available"],
      specs: [
        "Drum capacity: 6–10 m³ · Chassis: 4×2 / 6×4 · Discharge rate: 1 m³/min",
        "Drum capacity: 1–3 m³ · Output: 30–120 m³/h · Planetary / twin-shaft options",
        "Output: 60–170 m³/h · Vertical reach: up to 62 m · Horizontal reach: up to 56 m",
        "Paving width: 2.5–13 m · Paving thickness: up to 500 mm · Laydown rate: 800 t/h",
        "Operating weight: 8–22 t · Drum width: 1.7–2.1 m · Centrifugal force: 250 kN",
        "Operating weight: 7–20 t · Dual amplitude / frequency · Drum width: 1.7–2.1 m",
        "Operating weight: 6–18 t · Smooth drum · Static linear load: 25–35 kg/cm",
      ],
    },
    "Material Handling": {
      title: "Material Handling",
      items: ["Cranes","Telehandlers","Forklifts","Dumper Trucks","Hand Carts / Wheelbarrows"],
      descriptions: [
        "Mobile and tower cranes for lifting steel, formwork, precast elements, and heavy materials at height.",
        "Telehandlers for versatile lifting and placing of pallets, blocks, and materials on rough terrain.",
        "Forklifts for warehousing, indoor material movement, and loading/unloading trucks at site yards.",
        "Dumper trucks for hauling concrete, aggregates, soil, and demolition debris across rough site conditions.",
        "Hand carts and wheelbarrows for moving small loads of concrete, mortar, and tools around tight sites.",
      ],
      availability: ["Available","Available","Available","Available","Available"],
      specs: [
        "Capacity: 25–500 t · Boom length: 30–100 m · Telescopic / lattice options",
        "Lift capacity: 3.5–4.5 t · Lift height: 7–17 m · Engine: 75–110 kW",
        "Capacity: 2.5–7 t · Lift height: 3–6 m · Electric / diesel / LPG",
        "Payload: 5–30 t · 4×4 / 6×6 · Articulated or rigid chassis",
        "Capacity: 80–250 kg · Steel / pneumatic wheel options",
      ],
    },
    "Drilling & Foundation": {
      title: "Drilling & Foundation",
      items: ["Compressors","Rotary Drilling Rigs","Pile Drivers","Trenchers"],
      descriptions: [
        "Portable and skid-mounted air compressors powering jackhammers, breakers, and pneumatic tools on site.",
        "Rotary drilling rigs for bored piles, well drilling, and ground engineering — supporting foundations and water wells.",
        "Pile drivers for driving precast or steel piles into the ground to support bridges, buildings, and heavy structures.",
        "Trenchers for cutting narrow trenches for utilities (water, gas, electric, telecom) and drainage lines.",
      ],
      availability: ["Available","Available","Available","Available"],
      specs: [
        "Capacity: 185–1,500 cfm · Pressure: 7–14 bar · Diesel / electric drive",
        "Hole diameter: 300–2,500 mm · Depth: up to 80 m · Torque: up to 450 kN·m",
        "Hammer weight: 4–12 t · Pile length: up to 24 m · Hydraulic / diesel drop",
        "Trench depth: 0.6–2.4 m · Trench width: 150–450 mm · Chain / wheel cutting",
      ],
    },
    "Demolition & Finishing": {
      title: "Demolition & Finishing",
      items: ["Breakers","Jackhammers","Vibrators","Trowels","Scaffolding"],
      descriptions: [
        "Hydraulic breakers mounted on excavators for concrete demolition, rock breaking, and trenching in hard ground.",
        "Handheld pneumatic and electric jackhammers for breaking pavements, walls, and small concrete elements.",
        "Concrete vibrators (needle / poker) for consolidating fresh concrete and removing air pockets in walls and slabs.",
        "Power trowels for finishing large concrete slabs to a smooth, hard, level surface ready for curing or coating.",
        "Modular scaffolding systems for safe access to work at height on buildings, bridges, and industrial structures.",
      ],
      availability: ["Available","Available","Available","Available","Available"],
      specs: [
        "Operating weight: 800–4,000 kg · Impact energy: 800–8,000 J · Hydraulic",
        "Power: 1.0–2.0 kW · Impact rate: 800–1,800 bpm · Weight: 9–32 kg",
        "Poker diameter: 25–75 mm · Frequency: 200 Hz · Electric / pneumatic drive",
        "Diameter: 600–1,200 mm · Engine: 4–13 kW · Walk-behind / ride-on",
        "System height: up to 60 m · Load class: 1–6 · Hot-dip galvanized steel",
      ],
    },
    "Other Equipment": {
      title: "Other Equipment",
      items: ["Generators","Lighting Towers","Water Tankers","Welding Machines"],
      descriptions: [
        "Diesel generators providing primary or backup power for sites, camps, and equipment where grid power is unavailable.",
        "Mobile lighting towers for safe night work on roads, bridges, and large sites with poor ambient light.",
        "Water tankers for dust suppression, compaction support, and potable / non-potable water delivery to remote sites.",
        "Electric and engine-driven welding machines for structural steel welding, on-site fabrication, and repair.",
      ],
      availability: ["Available","Available","Available","Available"],
      specs: [
        "Capacity: 20–500 kVA · Prime / standby rated · Sound-attenuated canopy",
        "Lamp power: 4×1,000 W LED · Mast height: 9 m · Trailer-mounted",
        "Capacity: 5–20 m³ · Chassis: 4×2 / 6×4 · Gravity / pump discharge",
        "Output: 200–500 A · Engine / inverter drive · Stick / TIG / MIG options",
      ],
    },
  },
  // ── Equipment detail page UI strings ─────────────────────────────────────
  equipmentDetail: {
    backToAll: "Back to all equipment",
    backToEquipmentCategory: "Back to Equipment Categories",
    itemsInThisCategory: "items in this category",
    equipmentHeading: "Equipment",
    tableEquipmentName: "Equipment Name",
    tableCategory: "Category",
    tableDescription: "Description",
    tableAvailability: "Availability",
    tableSpecifications: "Specifications",
    tableImage: "Image",
    statusAvailable: "Available",
    statusOnRequest: "On Request",
    statusLimited: "Limited",
    notFoundTitle: "Category not found",
    notFoundBody: "The equipment category you requested does not exist. Please return to the full equipment list.",
  },

  // ── Team page ───────────────────────────────────────────────────────────
  team: {
    heroEyebrow: "Team", heroTitle: "Our people make SMS",
    heroSubtitle: "An engineering & technical team supported by skilled tradespeople — covering every discipline needed to deliver complex construction projects.",
    eyebrow: "Our Workforce", title: "Engineering & technical, plus skilled labor",
    subtitle: "Specific team members (name, photo, position, department, biography, contact) are managed from the Admin Panel.",
    engineeringLabel: "Engineering & Technical", engineeringTitle: "Technical team roles",
    skilledLabel: "Skilled Labor", skilledTitle: "Skilled trade roles",
    ctaTitle: "Join the SMS team",
    ctaSubtitle: "We're always looking for skilled engineers and tradespeople.",
  },
  workforce: {
    engineering: ["Civil Engineers","Architects","Structural Engineers","Electrical Engineers","Mechanical Engineers","Hydrologists","Irrigation Engineers","Surveyors","Community Liaison Officers","Admin Officers","Health & Safety Officers","Environmental Specialists","Geotechnical Specialists","Material Testing Specialists","Project Managers","Site Supervisors","Logistics & Procurement Team"],
    skilled: ["Masons","Carpenters","Steel Fixers","Plumbers","Electricians","Painters & Finishers","Welders","Heavy Equipment Operators","Concrete Workers","Irrigation Technicians","Survey Assistants","Tile Setters","Road Workers"],
  },

  // ── Clients page ────────────────────────────────────────────────────────
  clients: {
    heroEyebrow: "Clients", heroTitle: "Our client portfolio",
    heroSubtitle: "SMS serves public and private sector clients across Afghanistan. Client logos and details are managed from the Admin Panel.",
    eyebrow: "Major Clients", title: "Trusted across multiple sectors",
    subtitle: "The Company Profile includes a Major Clients section, but does not list specific client names. We do not fabricate names.",
    emptyTitle: "Client portfolio to be added",
    emptyBody: "Add clients (name, logo, website, description, category, display order) via the Admin Panel so they appear on this page.",
    becomeCTA: "Become a client",
    ctaTitle: "Become a client of SMS",
    ctaSubtitle: "Let's discuss your construction or engineering project.",
  },

  // ── Safety & Quality page ───────────────────────────────────────────────
  safetyQuality: {
    heroEyebrow: "Safety & Quality", heroTitle: "Zero-harm culture, three-stage quality control",
    heroSubtitle: "Safety and quality are non-negotiable at SMS — embedded in every drawing, every site, and every handover.",
    safetyEyebrow: "Safety", safetyTitle: "A safe site is a productive site",
    safetyBody: "SMS applies strict OHS regulations and UN safety standards across every project — risk assessments, hazard identification, PPE enforcement, training, drills, on-site safety officers, accident prevention, and unsafe practice prevention.",
    qualityEyebrow: "Quality", qualityTitle: "Built right, verified at every stage",
    qualityBody: "Our quality framework follows ISO and international standards, Afghan National Building Code compliance, material verification, three-stage quality control (pre/during/post-construction), third-party QA, as-built documentation, compliance checks, and continuous improvement.",
    tqcEyebrow: "Three-Stage Quality Control", tqcTitle: "Pre-construction · During · Post-construction",
    tqcStage1Title: "Pre-Construction", tqcStage1Desc: "Quality planning, method statements, material specifications, supplier qualification.",
    tqcStage2Title: "During Construction", tqcStage2Desc: "Daily inspections, material testing, stage inspections, third-party QA, schedule and cost control.",
    tqcStage3Title: "Post-Construction", tqcStage3Desc: "Final inspections, as-built documentation, snagging, commissioning, defects liability.",
    ctaTitle: "Discuss safety and quality for your project",
  },
  safetyTopics: {
    "OHS Regulations": "OHS Regulations", "UN Safety Standards": "UN Safety Standards",
    "Risk Assessments": "Risk Assessments", "Hazard Identification": "Hazard Identification",
    "Personal Protective Equipment": "Personal Protective Equipment",
    "Safety Training": "Safety Training", "Emergency Drills": "Emergency Drills",
    "Safety Officers On-site": "Safety Officers On-site", "Accident Prevention": "Accident Prevention",
    "Unsafe Practice Prevention": "Unsafe Practice Prevention",
  },
  qualityTopics: {
    "ISO / International Quality Standards": "ISO / International Quality Standards",
    "Afghan National Building Code Compliance": "Afghan National Building Code Compliance",
    "Material Quality Verification": "Material Quality Verification",
    "Three-Stage Quality Control": "Three-Stage Quality Control",
    "Pre-Construction Quality Planning": "Pre-Construction Quality Planning",
    "During-Construction Monitoring": "During-Construction Monitoring",
    "Post-Construction Quality Assurance": "Post-Construction Quality Assurance",
    "Third-Party Quality Control": "Third-Party Quality Control",
    "As-Built Documentation": "As-Built Documentation",
    "Compliance Checks": "Compliance Checks", "Continuous Improvement": "Continuous Improvement",
  },

  // ── Sustainability page ─────────────────────────────────────────────────
  sustainability: {
    heroEyebrow: "Sustainability", heroTitle: "Built responsibly — for communities and the planet",
    heroSubtitle: "SMS designs sustainability into every project through energy efficiency, responsible materials, water stewardship, renewable energy, and environmental care.",
    eyebrow: "Five Pillars", title: "How we engineer sustainability into every project",
    ctaTitle: "Build greener with SMS",
    ctaSubtitle: "Discuss your project's sustainability goals with our engineering team.",
  },
  // IMPORTANT: keys MUST be the English titles from data/safety.js because
  // components look them up as t(`sustainabilityPillars.${p.title}.title`)
  // and t(`sustainabilityPillars.${p.title}.points.${idx}`). Each entry
  // exposes a `title` (so the card heading is translatable) plus the same
  // `points` array as data/safety.js.
  sustainabilityPillars: {
    "Sustainable Construction": {
      title: "Sustainable Construction",
      points: ["Energy-efficient designs","Sustainable materials","Low-carbon concrete","Recycled aggregates","Passive cooling & heating","Solar energy integration"],
    },
    "Waste Management": {
      title: "Waste Management",
      points: ["Construction & demolition waste management","Waste segregation","Recycling programs","Material waste reduction","Safe hazardous-material disposal"],
    },
    "Water Conservation": {
      title: "Water Conservation",
      points: ["Water-efficient construction practices","Rainwater harvesting","Stormwater management","Water pollution prevention"],
    },
    "Renewable Energy": {
      title: "Renewable Energy",
      points: ["Solar systems","LED lighting","Energy-efficient systems","Prefabrication to reduce site energy use"],
    },
    "Environmental Impact Assessment": {
      title: "Environmental Impact Assessment",
      points: ["Environmental assessments","Tree plantation programs","Green landscaping","Habitat restoration"],
    },
  },

  // ── Methodology page ────────────────────────────────────────────────────
  methodology: {
    heroEyebrow: "Methodology", heroTitle: "Our six-step project methodology",
    heroSubtitle: "A clear, repeatable, quality-driven process — from feasibility to handover and aftercare.",
    ctaTitle: "Start with a feasibility study",
    ctaSubtitle: "Our first methodology step is the foundation of every successful SMS project.",
  },
  methodologySteps: {
    1: { title: "Planning & Feasibility Analysis",        description: "Defining project goals, feasibility, budgets, timelines, and risk profiles.", points: ["Site assessment","Feasibility study","Budgeting & scheduling","Stakeholder alignment","Permitting"] },
    2: { title: "Design & Engineering",                   description: "Architectural, structural, MEP, and environmental design using modern tools.", points: ["Architectural design","Structural engineering","MEP design","BIM coordination","Value engineering"] },
    3: { title: "Procurement & Resource Management",     description: "Sourcing qualified suppliers, materials, equipment, and skilled workforce.", points: ["Vendor qualification","Material procurement","Equipment mobilization","Workforce planning","Logistics"] },
    4: { title: "Construction & Execution",              description: "Safe, on-schedule, on-budget construction with continuous supervision and reporting.", points: ["Site mobilization","Trade coordination","HSE management","Schedule control","Daily reporting"] },
    5: { title: "Quality Assurance & Compliance",        description: "Three-stage quality control from pre-construction through post-construction.", points: ["Material testing","Stage inspections","Third-party QA","As-built documentation","Compliance checks"] },
    6: { title: "Project Handover & Post-Construction Support", description: "Commissioning, documentation, training, and ongoing support after handover.", points: ["Commissioning","O&M manuals","Client training","Defects liability","Aftercare support"] },
  },

  // ── Organization page ───────────────────────────────────────────────────
  organization: {
    heroEyebrow: "Organization", heroTitle: "Our organizational structure",
    heroSubtitle: "A clear chain of command and dedicated departments — from executive leadership to HSE, technical, supply chain, and HR.",
    eyebrow: "Departments & Leadership", title: "From the CEO to every specialist on site",
    topLabel: "Top",
    ctaTitle: "Want to work with our team?",
    ctaSubtitle: "Talk to SMS about your engineering or construction project.",
  },
  organizationChart: {
    departments: { Executive: "Executive", Operations: "Operations", Projects: "Projects", Technical: "Technical", Quality: "Quality", Finance: "Finance", HSE: "HSE", "Supply Chain": "Supply Chain", "Human Resources": "Human Resources" },
    roles: {
      "Chief Executive Officer": "Chief Executive Officer", "Operations Manager": "Operations Manager",
      "Project Management": "Project Management", "Project Managers": "Project Managers",
      "Estimators": "Estimators", "Planners": "Planners", "Site Supervisors": "Site Supervisors",
      "Construction Managers": "Construction Managers", "Civil Engineers": "Civil Engineers",
      "Mechanical Engineers": "Mechanical Engineers", "Electrical Engineers": "Electrical Engineers",
      "Architect": "Architect", "QA/QC Manager": "QA/QC Manager", "Site Engineers": "Site Engineers",
      "Hydrologists": "Hydrologists", "Urban Planner": "Urban Planner", "Financial Officer": "Financial Officer",
      "HSE Manager": "HSE Manager", "Environmental Managers": "Environmental Managers",
      "Health & Safety Officers": "Health & Safety Officers",
      "Environmental Safeguard Specialist": "Environmental Safeguard Specialist",
      "Waste Management Specialists": "Waste Management Specialists",
      "Procurement & Logistics": "Procurement & Logistics", "Procurement Manager": "Procurement Manager",
      "Supply Chain Coordinators": "Supply Chain Coordinators", "HR Managers": "HR Managers",
      "Recruitment Specialists": "Recruitment Specialists", "Training Specialists": "Training Specialists",
      "HR Information System Specialists": "HR Information System Specialists",
    },
  },

  // ── Strategic Plans page ────────────────────────────────────────────────
  strategicPlans: {
    heroEyebrow: "Strategic Plans", heroTitle: "Where SMS is heading",
    heroSubtitle: "Our strategic plans focus on technology, sustainability, workforce development, and international collaboration.",
    eyebrow: "Four Strategic Pillars", title: "The roadmap that shapes our growth",
    ctaTitle: "Partner with SMS on the future of construction",
  },
  strategicPlansItems: {
    "Technology Integration": ["Building Information Modeling (BIM)","Precast construction","Modular construction","AI-based construction management"],
    "Sustainability": ["Solar energy deployment","Rainwater harvesting systems","Energy-efficient building design","Construction waste management","Eco-friendly material sourcing"],
    "Training & Workforce Development": ["Technical training center","University internship programs","Health & safety workshops"],
    "International Collaboration & Investment": ["Global construction partnerships","Material supplier alliances","Investor engagement","Foreign Direct Investment (FDI)","International tenders"],
  },

  // ── Expansion Goals page ────────────────────────────────────────────────
  expansionGoals: {
    heroEyebrow: "Expansion Goals", heroTitle: "Where we are growing",
    heroSubtitle: "SMS is investing in geographical growth, service diversification, capacity enhancement, and public-private partnerships.",
    eyebrow: "Four Pillars of Expansion", title: "How we scale to serve Afghanistan's development",
    ctaTitle: "Invest or partner with SMS",
    ctaSubtitle: "Discuss expansion and partnership opportunities with our leadership.",
  },
  expansionGoalsItems: {
    "Geographical Growth": "Expanding our presence across Afghanistan and into regional markets to support national development.",
    "Diversification": "Broadening our service portfolio into new sectors and adjacent industries to better serve clients.",
    "Capacity Enhancement": "Investing in workforce training, equipment, and modern construction methods to scale delivery capacity.",
    "Public-Private Partnerships": "Building long-term partnerships with government, donors, and private investors to deliver shared infrastructure.",
  },

  // ── Upcoming Projects page ──────────────────────────────────────────────
  upcomingProjects: {
    heroEyebrow: "Upcoming Projects", heroTitle: "Planned & upcoming project focus areas",
    heroSubtitle: "The categories below reflect SMS's planned and upcoming project focus. They are listed as planned, not as completed work.",
    intro: "As a forward-looking firm, SMS is positioned to participate in upcoming projects across these sectors:",
    noteEyebrow: "Important Note", noteTitle: "Planned vs. completed",
    noteSubtitle: "We do not present planned projects as completed projects. Once projects are delivered, they are published on the Projects page with full details.",
    ctaTitle: "Partner with SMS on upcoming national projects",
  },

  // ── News page ────────────────────────────────────────────────────────────
  news: {
    heroEyebrow: "News & Insights", heroTitle: "Latest from SMS",
    heroSubtitle: "Industry news, project announcements, and engineering insights from the SMS team.",
    emptyTitle: "No articles published yet",
    emptyBody: "Blog & News articles are managed from the Admin Panel — with draft/publish/schedule, featured image, categories, tags, SEO metadata, and a full content editor.",
    subscribeCTA: "Subscribe via Contact",
    ctaTitle: "Stay informed about SMS projects",
  },

  // ── Contact page + form ─────────────────────────────────────────────────
  contact: {
    heroEyebrow: "Contact", heroTitle: "Get in touch with SMS",
    heroSubtitle: "Have a project, partnership, or career inquiry? Reach out — our team will respond.",
    officesTitle: "Our Offices",
    mainLabel: "Main Office (Kabul)", branchLabel: "Branch Office (Nangarhar)",
    formTitle: "Send us a message",
    formSubtitle: "Fill out the form below and our team will get back to you.",
    fullName: "Full Name", fullNamePlaceholder: "Your full name",
    email: "Email", emailPlaceholder: "you@example.com",
    phone: "Phone", phonePlaceholder: "+93 ...",
    company: "Company / Organization", companyPlaceholder: "Optional",
    subject: "Subject", subjectPlaceholder: "What is this about?",
    message: "Message", messagePlaceholder: "Tell us about your project...",
    sendButton: "Send Message",
    successMessage: "Thank you. Your message has been received — our team will respond shortly.",
    errorMessage: "Something went wrong sending your message. Please try again.",
    errFullName: "Full name is required",
    errEmailRequired: "Email is required", errEmailInvalid: "Email is invalid",
    errMessage: "Message must be at least 10 characters",
  },

  // ── Sustainability pillar modal content ────────────────────────────────
  // Keys MUST be the English pillar titles from data/safety.js because the
  // modal looks them up as t(`sustainabilityDetails.${pillar}.description`).
  sustainabilityDetails: {
    "Sustainable Construction": {
      tagline: "Design once. Benefit for decades.",
      description: "Sustainable construction at SMS means choosing systems, materials, and methods that reduce operational energy, lower embodied carbon, and minimise waste — without compromising on performance, safety, or budget. Every design decision is weighed against its 50-year environmental and economic cost.",
      features: [
        "Whole-life carbon assessment integrated into design",
        "Energy-efficient building envelopes and passive cooling/heating",
        "Low-carbon concrete mix designs and recycled aggregate use",
        "Solar-ready electrical infrastructure from day one",
        "Sustainable material sourcing and supplier qualification",
      ],
      benefits: [
        { title: "Lower lifetime cost", description: "Energy-efficient buildings cost less to run over their entire life cycle." },
        { title: "Reduced embodied carbon", description: "Low-carbon materials and methods shrink the building's carbon footprint from day one." },
        { title: "Resilient to climate change", description: "Passive cooling and renewable-ready design handle future climate stress better." },
        { title: "Higher occupant comfort", description: "Daylight, natural ventilation, and thermal comfort improve health and productivity." },
      ],
      stats: [
        { value: "Lower", label: "Lifetime operating cost" },
        { value: "Less",  label: "Embodied carbon vs baseline" },
        { value: "Zero",  label: "Net waste to landfill goal" },
      ],
      highlights: ["Low-Carbon", "Passive Design", "Solar Ready", "Sustainable Sourcing"],
      practices: [
        "Whole-life carbon assessment on every design",
        "Passive solar orientation and natural ventilation modelling",
        "Material passports for every major component",
        "Lifecycle cost analysis presented to every client",
      ],
    },
    "Waste Management": {
      tagline: "Plan it. Measure it. Reduce it.",
      description: "Construction generates enormous waste by default. Our job is to flip that around — segregate at source, recycle what we can, safely dispose of what we cannot, and report on every kilogram. SMS applies a structured C&D Waste Management Plan to every project so waste is a managed resource, not a by-product.",
      features: [
        "Construction & Demolition Waste Management Plan on every project",
        "Source segregation into inert, recyclable, and hazardous streams",
        "Material reuse strategy for cut-offs and packaging",
        "Tracking and reporting of every waste stream in tonnes",
        "Safe handling and disposal of hazardous materials",
      ],
      benefits: [
        { title: "Less landfill", description: "Higher recycling rate means less waste going to landfill — measurable in every monthly report." },
        { title: "Lower disposal cost", description: "Recycling and reuse reduce hauling and tipping fees over the project life." },
        { title: "Safer sites", description: "Proper segregation of hazardous streams protects workers, neighbours, and the environment." },
        { title: "Compliance ready", description: "Documented waste trails satisfy regulators, donors, and ESG-conscious clients." },
      ],
      stats: [
        { value: "Plan",    label: "C&D on every project" },
        { value: "100%",    label: "Hazardous materials tracked" },
        { value: "Monthly", label: "Waste reporting cadence" },
      ],
      highlights: ["C&D Plan", "Segregation", "Recycling", "Hazard Safety"],
      practices: [
        "Weekly waste audits with photo evidence",
        "Designated sorting zones on every site",
        "Reuse of cut-offs and formwork where structurally allowed",
        "Partnerships with certified recycling contractors",
      ],
    },
    "Water Conservation": {
      tagline: "Use less. Capture more. Reuse wisely.",
      description: "Water is one of our most precious resources — especially on the dry sites where we often build. SMS applies water-efficient construction practices, captures rainwater for reuse, manages stormwater responsibly, and prevents site pollution of local water sources.",
      features: [
        "Water-efficient construction practices and dust suppression",
        "Rainwater harvesting for site and operational use",
        "Stormwater management and erosion control",
        "Water pollution prevention and runoff treatment",
        "Water-efficient fixtures and greywater reuse in finished buildings",
      ],
      benefits: [
        { title: "Lower water bills", description: "Rainwater harvesting and efficient fixtures cut operational water costs from year one." },
        { title: "Resilient supply", description: "Captured rainwater provides backup supply during shortages — critical in arid regions." },
        { title: "Protects waterways", description: "Stormwater management and pollution prevention protect rivers, groundwater, and neighbours." },
        { title: "Compliance ready", description: "Documented water plans satisfy environmental regulators and donor requirements." },
      ],
      stats: [
        { value: "Lower", label: "Operational water use" },
        { value: "100%",  label: "Stormwater managed on site" },
        { value: "24/7",  label: "Monitoring during construction" },
      ],
      highlights: ["Rainwater", "Stormwater", "Greywater", "Efficient Fixtures"],
      practices: [
        "Pre-construction water-balance study",
        "Sediment and erosion control on every site",
        "Rainwater storage tanks sized to roof catchment",
        "Greywater reuse systems in finished buildings",
      ],
    },
    "Renewable Energy": {
      tagline: "Power the build. Power the building.",
      description: "SMS integrates solar and renewable systems into both our construction sites (reducing diesel generator use) and the finished buildings (lowering the asset's lifetime energy cost). Every project is designed renewable-ready so future upgrades are straightforward.",
      features: [
        "Solar PV systems sized and modelled for every site",
        "LED lighting and energy-efficient systems as standard",
        "Smart HVAC design for reduced energy consumption",
        "Hybrid off-grid systems for remote sites",
        "Prefabrication to reduce on-site energy use",
      ],
      benefits: [
        { title: "Lower lifetime cost", description: "Renewable-ready buildings cost less to run for their entire life — often paying back in 5–10 years." },
        { title: "Energy independence", description: "Hybrid systems reduce reliance on the grid, especially valuable in remote or unreliable-grid areas." },
        { title: "Lower diesel use", description: "Solar-powered site offices and equipment reduce diesel generator runtime during construction." },
        { title: "Carbon credits ready", description: "Documented renewable integration unlocks carbon credit and ESG reporting opportunities." },
      ],
      stats: [
        { value: "Solar",   label: "Ready in every new build" },
        { value: "LED",     label: "Lighting as standard" },
        { value: "Hybrid",  label: "Systems available off-grid" },
      ],
      highlights: ["Solar PV", "LED Lighting", "Smart HVAC", "Microgrids"],
      practices: [
        "Solar yield modelling before sizing decisions",
        "Battery storage options for critical loads",
        "Smart metering and energy monitoring on every site",
        "Lifecycle energy analysis presented to every client",
      ],
    },
    "Environmental Impact Assessment": {
      tagline: "Know the site. Protect what matters.",
      description: "Before we break ground, we understand the environment we are about to change. SMS runs environmental assessments for every project, develops tree-planting and habitat-restoration programs where appropriate, and designs green landscaping that supports local biodiversity.",
      features: [
        "Environmental assessments for every project",
        "Tree plantation and reforestation programs",
        "Green landscaping with native species prioritisation",
        "Habitat restoration in impacted areas",
        "Biodiversity monitoring during and after construction",
      ],
      benefits: [
        { title: "Protected ecosystems", description: "Pre-construction surveys and ongoing monitoring minimise harm to local flora and fauna." },
        { title: "Stronger community relations", description: "Visible greening and restoration build community goodwill and lasting local support." },
        { title: "Regulatory compliance", description: "Documented EIA processes satisfy environmental regulators and donor requirements." },
        { title: "Long-term biodiversity gain", description: "Native species and habitat restoration leave the site better than we found it." },
      ],
      stats: [
        { value: "100%",  label: "Projects EIA-assessed" },
        { value: "Trees", label: "Planted per project" },
        { value: "Local", label: "Native species prioritised" },
      ],
      highlights: ["EIA Studies", "Tree Planting", "Native Species", "Habitat Restore"],
      practices: [
        "Pre-construction biodiversity baseline surveys",
        "Tree planting with local nurseries and communities",
        "Native species selection for all landscaping",
        "Post-construction habitat monitoring reports",
      ],
    },
  },

  // ── Methodology step modal content (deep content per step) ─────────────
  // Keys are numeric (matching m.step in data/content.js).
  methodologyDetails: {
    1: {
      tagline: "Set the foundation. Before a single brick is laid.",
      description: "Every successful build starts with a rigorous understanding of the site, the brief, the budget, and the risks. In Step 1 we align stakeholders, validate feasibility, lock in budgets and schedules, and secure the permits that make construction legal — so the rest of the project runs on solid ground, not assumptions.",
      activities: [
        "Site assessment, topographic surveys, and geotechnical investigations",
        "Feasibility study covering technical, financial, and regulatory viability",
        "Detailed budgeting, value-engineering options, and schedule baselining",
        "Stakeholder alignment workshops with client, authorities, and partners",
        "Risk profiling with mitigation plans and decision-gate criteria",
        "Permitting, licensing, and statutory approvals",
      ],
      deliverables: [
        "Approved feasibility report",
        "Master schedule with stage gates",
        "Class-A budget with contingencies",
        "Risk register and mitigation plan",
        "Permits and statutory approvals dossier",
      ],
      responsibilities: [
        { role: "Project Director", description: "Owns the client relationship and final sign-off on feasibility, budget, and schedule." },
        { role: "Planning Lead", description: "Drives the feasibility study, permitting, and stakeholder alignment workshops." },
        { role: "Cost Engineer", description: "Builds the budget, runs value-engineering, and tracks cost contingencies." },
        { role: "Risk Manager", description: "Maintains the risk register and ensures mitigations are assigned and tracked." },
      ],
      stats: [
        { value: "100%", label: "Permits cleared before Step 2" },
        { value: "Class A", label: "Budget accuracy target" },
        { value: "5+",    label: "Stakeholder groups aligned" },
      ],
      highlights: ["Feasibility Study", "Risk Register", "Permits", "Budget"],
      duration: "2–4 weeks",
      tools: ["MS Project", "Primavera P6", "Risk Matrix", "AutoCAD", "Local Building Codes"],
    },
    2: {
      tagline: "Engineered for buildability. Detailed for clarity.",
      description: "Step 2 turns the approved feasibility into a fully coordinated, buildable design. Architecture, structure, MEP, and environmental systems are designed in parallel and coordinated in BIM so the project can be constructed safely, efficiently, and to the highest quality.",
      activities: [
        "Architectural design development and detailed drawings",
        "Structural engineering analysis and member design",
        "MEP system design and coordination",
        "BIM coordination across all disciplines for clash-free models",
        "Value engineering to optimise cost without compromising quality",
        "Client design reviews and milestone sign-offs",
      ],
      deliverables: [
        "Issued-for-construction (IFC) drawing set",
        "Coordinated BIM model",
        "Specifications and material schedules",
        "Value engineering report",
        "Client-approved design package",
      ],
      responsibilities: [
        { role: "Lead Architect", description: "Owns the architectural design and ensures it meets brief, code, and aesthetics." },
        { role: "Structural Lead", description: "Designs the structure for safety, durability, and buildability within budget." },
        { role: "MEP Lead", description: "Designs mechanical, electrical, and plumbing systems to brief and code." },
        { role: "BIM Coordinator", description: "Runs clash detection and ensures all disciplines coordinate in the model." },
      ],
      stats: [
        { value: "BIM",   label: "Coordination on every project" },
        { value: "Zero",  label: "Major clashes on site" },
        { value: "IFC",   label: "Drawing set delivered" },
      ],
      highlights: ["BIM Coordination", "Value Engineering", "IFC Drawings", "MEP Design"],
      duration: "4–8 weeks",
      tools: ["Revit", "AutoCAD", "TEKLA", "BIM 360", "ETABS"],
    },
    3: {
      tagline: "Right material. Right vendor. Right time.",
      description: "Step 3 turns the design into a real-world supply chain. We qualify suppliers, procure materials and equipment, plan workforce mobilisation, and coordinate logistics so everything arrives on site, on time, and to spec — without surprises.",
      activities: [
        "Vendor qualification and pre-qualification audits",
        "Material procurement with quality verification at source",
        "Equipment mobilisation and logistics planning",
        "Workforce planning, hiring, and onboarding",
        "Subcontractor procurement and contract management",
        "Procurement schedule aligned with construction schedule",
      ],
      deliverables: [
        "Approved vendor and supplier list",
        "Material purchase orders with delivery milestones",
        "Equipment mobilisation schedule",
        "Workforce mobilisation plan",
        "Subcontractor agreements",
      ],
      responsibilities: [
        { role: "Procurement Manager", description: "Owns supplier selection, negotiation, and purchase order management." },
        { role: "Logistics Lead", description: "Plans delivery, customs, storage, and on-site material handling." },
        { role: "HR Lead", description: "Drives workforce hiring, onboarding, and certification compliance." },
        { role: "Commercial Manager", description: "Manages subcontractor contracts, payments, and risk allocation." },
      ],
      stats: [
        { value: "100%", label: "Materials pre-qualified" },
        { value: "On-Time", label: "Delivery target" },
        { value: "Tier-1", label: "Subcontractor qualification" },
      ],
      highlights: ["Vendor Qualification", "Material Sourcing", "Logistics", "Workforce Planning"],
      duration: "2–6 weeks (overlaps with Step 2)",
      tools: ["ERP Systems", "Vendor Portals", "Logistics Software", "Material Tracking"],
    },
    4: {
      tagline: "Build it. Safely. On schedule. On budget.",
      description: "This is where the design meets the ground. Step 4 mobilises the site, coordinates the trades, enforces HSE, controls schedule and cost, and reports daily so the client always knows exactly where their project stands.",
      activities: [
        "Site mobilisation including fencing, offices, utilities, and welfare",
        "Trade coordination and daily sequencing of work",
        "HSE management, daily toolbox talks, and incident reporting",
        "Schedule control with weekly look-aheads and slip-recovery",
        "Daily reporting with photos, progress, and issues logged",
        "Change-order management with documented approvals",
      ],
      deliverables: [
        "Mobilised, operational construction site",
        "Weekly progress reports with photo evidence",
        "Updated schedule with look-ahead",
        "HSE statistics and incident reports",
        "Change-order log with client approvals",
      ],
      responsibilities: [
        { role: "Site Manager", description: "Owns day-to-day site operations, sequencing, and trade coordination." },
        { role: "HSE Officer", description: "Enforces safety standards, runs toolbox talks, and reports incidents." },
        { role: "Scheduler", description: "Maintains the master schedule and weekly look-aheads, flags slip risks early." },
        { role: "Project Engineer", description: "Resolves technical queries, manages RFIs, and ensures spec compliance." },
      ],
      stats: [
        { value: "Daily",   label: "Reporting cadence" },
        { value: "Zero",    label: "Tolerance for HSE breaches" },
        { value: "On-Time", label: "Milestone delivery target" },
      ],
      highlights: ["Site Mobilisation", "HSE Management", "Schedule Control", "Daily Reporting"],
      duration: "Majority of project timeline",
      tools: ["MS Project", "Daily Reports", "HSE Software", "Drone Surveys"],
    },
    5: {
      tagline: "Verified at every stage. Documented end-to-end.",
      description: "Quality is a discipline, not an inspection. Step 5 runs three-stage QC — pre-construction material verification, during-construction stage inspections, and post-construction final sign-off — backed by independent third-party audits and complete as-built documentation.",
      activities: [
        "Material testing and certification at source and on site",
        "Stage inspections at structural, MEP, and finishing milestones",
        "Independent third-party QA audits",
        "As-built documentation and BIM handover model",
        "Compliance checks against codes, specs, and client requirements",
      ],
      deliverables: [
        "Material test certificates and lab reports",
        "Stage inspection sign-offs with photo evidence",
        "Third-party audit reports",
        "As-built drawings and BIM handover model",
        "Compliance and code-clearance dossier",
      ],
      responsibilities: [
        { role: "QA / QC Manager", description: "Owns the inspection and test plan and signs off each stage." },
        { role: "Materials Engineer", description: "Verifies all incoming materials against specifications before use." },
        { role: "Third-Party Auditor", description: "Provides independent sign-off on critical structural and life-safety systems." },
        { role: "Document Controller", description: "Maintains the as-built record, BIM model, and compliance dossier." },
      ],
      stats: [
        { value: "3",     label: "QC stages per project" },
        { value: "100%",  label: "Materials tested before use" },
        { value: "3rd",   label: "Party audits on critical works" },
      ],
      highlights: ["Stage Inspections", "Material Testing", "3rd-Party QA", "As-Built Docs"],
      duration: "Continuous through Steps 4–6",
      tools: ["ITPs", "Lab Reports", "BIM 360", "Code Standards", "Audit Checklists"],
    },
    6: {
      tagline: "Hand over with confidence. Support after handover.",
      description: "Handover isn't the finish line — it's the start of the asset's operating life. Step 6 commissions systems, hands over complete documentation and BIM models, trains client teams, defines a defects-liability period, and stays on call for aftercare support so the asset performs exactly as designed from day one.",
      activities: [
        "System commissioning and performance verification",
        "Operations & maintenance (O&M) manual handover",
        "Client team training on systems and equipment",
        "Defects-liability period setup with response SLAs",
        "Aftercare support and post-handover inspections",
      ],
      deliverables: [
        "Commissioning certificates and test sheets",
        "Complete O&M manuals (printed + digital)",
        "Client training records and materials",
        "Defects-liability agreement with SLAs",
        "As-built BIM model and digital twin",
      ],
      responsibilities: [
        { role: "Commissioning Lead", description: "Verifies every system performs to spec before client takeover." },
        { role: "Document Controller", description: "Delivers the complete O&M and as-built package." },
        { role: "Training Lead", description: "Runs hands-on training for the client's operations team." },
        { role: "Aftercare Manager", description: "Owns the defects-liability period and ongoing aftercare support." },
      ],
      stats: [
        { value: "100%", label: "Systems commissioned before handover" },
        { value: "DLP",   label: "Defects-liability period included" },
        { value: "24/7",  label: "Aftercare support available" },
      ],
      highlights: ["Commissioning", "O&M Manuals", "Client Training", "Aftercare"],
      duration: "4–8 weeks handover + DLP",
      tools: ["Commissioning Scripts", "BIM Handover", "CMMS", "Training Kits", "DLP Tracker"],
    },
  },

  // ── Login page ──────────────────────────────────────────────────────────
  login: {
    title: "Admin Access",
    subtitle: "Secure login for authorized personnel only",
    emailLabel: "Email address", emailPlaceholder: "admin@company.com",
    passwordLabel: "Password", passwordPlaceholder: "••••••••",
    submitButton: "Sign in",
    errEmailRequired: "Email is required", errEmailInvalid: "Email is invalid",
    errPasswordRequired: "Password is required",
    errGeneric: "An unexpected error occurred. Please try again.",
    footerNotice: "This is a secure area for authorized personnel only. Unauthorized access is prohibited.",
  },

  // ── Modal section labels (shared by all home-page modals) ──────────────
  modals: {
    close: "Close",
    highlights: "Highlights",
    keyFeatures: "Key Features",
    benefitsForYou: "Benefits for You",
    bestPractices: "Best Practices",
    activitiesProcesses: "Activities & Processes",
    whatYouReceive: "What You Receive",
    whoDoesWhat: "Who Does What",
    toolsStandards: "Tools & Standards",
    typicalDuration: "Typical Duration",
    stepProgress: "Step",
    of: "of",
    backToWhy: "Back to Why SMS",
    backToSustainability: "Back to Sustainability",
    backToMethodology: "Back to Methodology",
    seeFullMethodology: "See Full Methodology",
    learnMoreWhy: "Learn more about SMS",
    learnMoreSustainability: "Learn more about our sustainability",
    pillar: "Pillar",
  },
  // Accessibility label templates for cards that open a detail dialog.
  // `learnMoreAbout(item)` takes the translated card title and returns the
  // full screen-reader label, matching the `(arg) => string` pattern already
  // used by other parameterized translations (e.g. home.heroBadge).
  cards: {
    learnMoreAbout: (item) => `Learn more about ${item}`,
  },

  // ── Why SMS pillar detail modals (deep content per pillar) ─────────────
  // Keys MUST be the English pillar titles from data/content.js because the
  // modal looks them up as t(`pillarDetails.${pillar}.description`) etc.
  pillarDetails: {
    Quality: {
      tagline: "Built right. Verified at every stage.",
      description: "Quality at SMS is not a checkpoint — it's a continuous discipline. We align every project with international ISO standards and the Afghan National Building Code, run a strict three-stage quality control process (pre-construction, during-construction, post-construction), and bring in independent third-party auditors so our clients receive verifiable evidence, not just promises.",
      features: [
        "ISO 9001-aligned quality management on every project",
        "Three-stage QC: pre / during / post-construction inspections",
        "Material verification at source and on-site laboratory testing",
        "Independent third-party audits and as-built documentation",
        "Continuous improvement driven by lessons-learned reviews",
      ],
      benefits: [
        { title: "Defect-free handover", description: "Issues are caught and resolved long before the keys change hands — protecting your budget and your timeline." },
        { title: "Verifiable compliance", description: "Every claim is backed by documented inspections, test reports, and audit trails you can hand to stakeholders." },
        { title: "Predictable outcomes", description: "Standardised processes mean fewer surprises, fewer reworks, and lower total cost of ownership." },
        { title: "Longer asset life", description: "Materials and methods chosen for durability, so your facility performs for decades, not just years." },
      ],
      stats: [
        { value: "3",     label: "QC stages per project" },
        { value: "100%",  label: "ISO-aligned processes" },
        { value: "3rd",   label: "Party audits delivered" },
      ],
      highlights: ["ISO 9001", "Afghan NBC", "Stage Inspections", "Material Testing"],
    },
    Safety: {
      tagline: "Zero-harm. Every site. Every shift.",
      description: "Safety is the first item on every meeting agenda at SMS. We apply strict OHS compliance and UN safety standards, run continuous risk assessments and hazard identification, enforce PPE usage, conduct regular drills, and keep trained safety officers on every site — because a safe site is a productive site, and nothing we build is worth a person's wellbeing.",
      features: [
        "Strict OHS regulations enforced on every site",
        "UN safety standards integrated into daily operations",
        "Continuous risk assessments and hazard identification",
        "PPE enforcement and on-site safety officers on every shift",
        "Regular emergency drills and incident-lessons reviews",
      ],
      benefits: [
        { title: "Zero-harm sites", description: "Every worker goes home safe — every shift, every site, every project." },
        { title: "Lower insurance & risk cost", description: "Strong safety records reduce premiums, claims, and project delays from incidents." },
        { title: "Higher productivity", description: "Safe, well-trained crews work faster and more confidently — fewer stoppages, fewer injuries." },
        { title: "Trusted by clients", description: "Clients and partners know their project is in hands that put people first." },
      ],
      stats: [
        { value: "0",      label: "Compromise on safety" },
        { value: "100%",   label: "PPE compliance enforced" },
        { value: "24/7",   label: "Safety officer presence" },
      ],
      highlights: ["OHS", "UN Standards", "PPE", "Drills"],
    },
    Innovation: {
      tagline: "Modern methods. Better outcomes.",
      description: "SMS invests in modern methods because they consistently deliver better buildings, faster. From BIM and digital twins to prefabrication and AI-assisted scheduling, we adopt technologies that improve accuracy, reduce rework, and give our clients real-time visibility into their project.",
      features: [
        "Building Information Modeling (BIM) across every project",
        "Prefabrication and modular construction methods",
        "AI-assisted scheduling and resource optimisation",
        "Digital twins for operations and facility management",
        "Continuous R&D into methods, materials, and tools",
      ],
      benefits: [
        { title: "Fewer surprises", description: "Digital twins and BIM catch clashes and coordination issues in the model, not on site." },
        { title: "Faster delivery", description: "Prefabrication and modular construction shave weeks — sometimes months — off the schedule." },
        { title: "Lower rework cost", description: "Clash detection and 3D coordination reduce rework to near zero on most projects." },
        { title: "Future-ready assets", description: "Digital handover models make operations, maintenance, and future renovations easier for decades." },
      ],
      stats: [
        { value: "BIM",     label: "On every project" },
        { value: "AI",      label: "Scheduling assistance" },
        { value: "Digital", label: "Handover twin included" },
      ],
      highlights: ["BIM", "Prefabrication", "AI Tools", "Digital Twin"],
    },
    Professionalism: {
      tagline: "Disciplined. Transparent. Ethical.",
      description: "Professionalism is how we run every project — disciplined project management, transparent reporting, and ethical business conduct at every level. Our clients always know what is happening, why, and what it costs.",
      features: [
        "PMO-aligned project management standards on every project",
        "Transparent cost, schedule, and quality reporting",
        "Ethical sourcing and anti-corruption compliance",
        "Documented decision logs and change-order trails",
        "Continuous client communication and milestone reviews",
      ],
      benefits: [
        { title: "No surprises", description: "Clear, frequent reporting means you always know exactly where the project stands." },
        { title: "Faster decisions", description: "Documented decision rights and live logs keep approvals moving instead of stalling in email." },
        { title: "Auditable trail", description: "Every decision and change is logged — defensible to auditors, boards, and donors." },
        { title: "Trusted partner", description: "Ethical, transparent conduct makes SMS a long-term partner, not just a contractor." },
      ],
      stats: [
        { value: "Weekly",   label: "Client reporting cadence" },
        { value: "Live",     label: "Decision & change logs" },
        { value: "PMO",      label: "Standards on every project" },
      ],
      highlights: ["PMO Standards", "Transparency", "Ethics", "Live Reports"],
    },
    Sustainability: {
      tagline: "Energy-efficient. Resource-conscious. Built to last.",
      description: "Sustainability is engineered into every SMS project. We design for energy efficiency from day one, source low-carbon and recycled materials, minimise construction waste, and integrate renewable energy wherever the brief allows — because better buildings serve both clients and communities for decades.",
      features: [
        "Energy-efficient building design and passive strategies",
        "Low-carbon concrete and recycled aggregate sourcing",
        "Construction & demolition waste management plans",
        "Solar-ready electrical design and renewable integration",
        "Water-efficient fixtures and rainwater harvesting",
      ],
      benefits: [
        { title: "Lower operating cost", description: "Energy-efficient design cuts utility bills for the entire life of the building." },
        { title: "Smaller environmental footprint", description: "Lower embodied carbon, less waste, less site impact — measurable and reportable." },
        { title: "Healthier spaces", description: "Better ventilation, daylighting, and materials mean healthier occupants." },
        { title: "Future-proof compliance", description: "Buildings designed to meet — and exceed — current and emerging codes." },
      ],
      stats: [
        { value: "Lower", label: "Operating cost for clients" },
        { value: "Less",  label: "Construction waste to landfill" },
        { value: "More",  label: "Renewable energy integration" },
      ],
      highlights: ["Energy Efficient", "Low-Carbon", "Waste Plan", "Solar Ready"],
    },
    "Client Collaboration": {
      tagline: "Hand-in-hand. Concept to handover.",
      description: "Great projects are co-authored. From the first concept sketch to the final handover walkthrough, we work hand-in-hand with our clients, their communities, and our partners — listening first, sharing decisions openly, and treating every stakeholder's input as material to the outcome, not noise to be filtered out.",
      features: [
        "Joint concept workshops and design charrettes",
        "Regular client review meetings and milestone sign-offs",
        "Transparent RFIs, change orders, and decision logs",
        "Community engagement plans for socially-impactful projects",
        "Partner and subcontractor coordination led by a single PM",
      ],
      benefits: [
        { title: "Aligned outcomes", description: "Early and continuous collaboration means the finished project matches what you actually needed — not what we assumed." },
        { title: "Faster decisions", description: "Clear decision-rights and live logs keep approvals moving instead of stalling in email threads." },
        { title: "Community goodwill", description: "Stakeholder engagement turns neighbours into supporters, not objectors, for socially-impactful builds." },
        { title: "Stronger partnerships", description: "Most of our work comes from repeat clients — collaboration is how those relationships are built." },
      ],
      stats: [
        { value: "Weekly",   label: "Client review cadence" },
        { value: "Live",     label: "Decision & change logs" },
        { value: "Repeat",   label: "Client relationships" },
      ],
      highlights: ["Workshops", "Live Logs", "Community", "Partner Coordination"],
    },
    "Social Responsibility": {
      tagline: "People first. Country always.",
      description: "SMS was founded in Afghanistan, for Afghanistan. We hire locally wherever we operate, invest in training the next generation of Afghan engineers and tradespeople, support national development priorities, and run our projects in ways that uplift communities — because every structure we build should strengthen the country it stands in.",
      features: [
        "Local hiring and skills development on every project",
        "Graduate engineer and apprenticeship programs",
        "Procurement preference for Afghan suppliers and subcontractors",
        "Community support programs in areas where we operate",
        "Alignment with national development priorities and codes",
      ],
      benefits: [
        { title: "Stronger communities", description: "Our projects leave behind trained people, working supply chains, and lasting local capability." },
        { title: "National impact", description: "Every project is a contribution to Afghanistan's infrastructure and economic capacity." },
        { title: "Inclusive workforce", description: "We open doors for women, youth, and returning professionals wherever the project allows." },
        { title: "Trusted locally", description: "Community-rooted operations mean smoother approvals, faster mobilisation, and lasting goodwill." },
      ],
      stats: [
        { value: "Local",   label: "Hiring on every site" },
        { value: "100s",    label: "Trainees mentored" },
        { value: "Afghan",  label: "Supply chain priority" },
      ],
      highlights: ["Local Hiring", "Apprenticeships", "Afghan Supply", "Community"],
    },
  },

  // ── Dashboard admin panel ───────────────────────────────────────────────
  dashboard: {
    title: "Inbox",
    newBadge: (n) => `${n} new`,
    searchPlaceholder: "Search contacts...",
    loading: "Loading contacts...",
    retry: "Retry",
    failedToLoad: "Failed to load contacts. Please try again.",
    failedToMarkRead: "Failed to mark message as read.",
    sidebar: {
      adminDashboard: "Admin Dashboard", contactMessages: "Contact Messages",
      inbox: "Inbox", profile: "Profile", settings: "Settings", logout: "Logout",
    },
    card: { submittedRelativePrefix: "" },
    modal: {
      title: "Contact Details", message: "Message", additionalInfo: "Additional Information",
      fullName: "Full Name", company: "Company", email: "Email",
      submissionDate: "Submission Date", submittedOn: (d) => `Submitted on ${d}`,
      close: "Close", markHandled: "Mark as Handled",
    },
    empty: {
      noResultsTitle: "No results found",
      noResultsBody: (q) => `We couldn't find any contacts matching "${q}". Try adjusting your search terms.`,
      emptyTitle: "Your inbox is empty",
      emptyBody: "When you receive new contact form submissions, they will appear here.",
    },
  },
};
const fa = {
  common: {
    learnMore: "بیشتر بدانید", viewAll: "مشاهده همه", explore: "کاوش",
    seeMore: "بیشتر ببینید", readMore: "ادامه مطلب", viewDetails: "مشاهده جزئیات",
    getStarted: "شروع کنید", close: "بستن", cancel: "لغو", save: "ذخیره",
    edit: "ویرایش", delete: "حذف", submit: "ارسال", sending: "در حال ارسال…",
    retry: "تلاش دوباره", back: "برگشت", next: "بعدی", yes: "بله", no: "خیر",
    loading: "در حال بارگذاری…", search: "جستجو", home: "خانه", breadcrumbHome: "خانه",
    more: "بیشتر", stage: "مرحله", planned: "برنامه‌ریزی شده / آینده",
    optional: "اختیاری", required: "الزامی", none: "هیچ",
  },

  brand: {
    shortName: "SMS", name: "سید مصور سادات",
    fullName: "شرکت ساختمانی و انجینری طراحی سید مصور سادات",
    line: "ساخت و ساز و انجینری",
    tagline: "با شوق می‌سازیم، با افتخار تحویل می‌دهیم",
    established: "تاسیس",
  },

  nav: {
    home: "خانه", about: "درباره ما", services: "خدمات", projects: "پروژه‌ها",
    equipment: "تجهیزات", team: "تیم ما", safetyQuality: "ایمنی و کیفیت",
    sustainability: "پایداری", methodology: "متدولوژی",
    clients: "مشتریان", news: "اخبار", contact: "تماس",
  },

  header: { requestConsultation: "درخواست مشاوره", logIn: "ورود", dashboard: "داشبورد" },

  drawer: { navigation: "منو", theme: "تم", language: "زبان" },

  footer: {
    about: "درباره ما", quickLinks: "لینک‌های سریع", ourServices: "خدمات ما",
    contactUs: "تماس با ما", rights: "تمامی حقوق محفوظ است.",
    address: "آدرس", phone: "تلفن", email: "ایمیل", followUs: "ما را دنبال کنید",
  },

  langSwitcher:  { label: "زبان", switchToEnglish: "Switch to English", switchToDari: "تغییر به دری" },
  themeSwitcher: { switchToLight: "تغییر به حالت روشن", switchToDark: "تغییر به حالت تاریک" },

  // ── Social media (screen-reader aria-labels for the Footer's social icons) ──
  social: {
    facebook:  "فیسبوک",
    twitter:   "توییتر",
    linkedin:  "لینکدین",
    instagram: "اینستاگرام",
  },

  // ── Flat-key aliases ─────────────────────────────────────────────────────
  // See the EN side for the full explanation. These mirror the flat
  // top-level keys that Navbar/Footer/LanguageSwitcher use.
  brandShort: "SMS",
  brandName: "سید مصور سادات",
  brandLine: "ساخت و ساز و انجینری",
  heroTagline: "با اشتیاق بسازید، با افتخار تحویل دهید",
  requestConsultation: "درخواست مشاوره",
  logIn: "ورود",
  // See the EN side — `dashboard` is a nested Admin Panel section,
  // so the Navbar uses t("header.dashboard") to read the right string.
  mobileLanguageHeading: "زبان",
  mobileThemeHeading: "تم",
  footerAbout: "درباره ما",
  footerOurServices: "خدمات ما",
  footerContactUs: "تماس با ما",
  footerRights: "تمامی حقوق محفوظ است.",
  // Screen-reader label for the clickable phone link in the Footer.
  // Parametrised so the actual phone number is injected at call time.
  // EN: "Call +93 747777788"  /  FA: "تماس با +۹۳ ۷۴۷۷۷۷۷۸۸"
  footerCallPhone: (phone) => `تماس با ${phone}`,
  language: "زبان",
  switchToEnglish: "تغییر به انگلیسی",
  switchToDari: "تغییر به دری",

  home: {
    heroBadge: (year) => `SMS · تاسیس ${year}`,
    heroExploreServices: "کاوش در خدمات ما",
    heroViewProjects: "مشاهده پروژه‌ها",
    heroContactUs: "تماس با ما",
    statsFooter: "ما فقط حقایق تایید شده شرکت را از پروفایل شرکت نمایش می‌دهیم. تعداد پروژه‌ها، کارمندان و مشتریان به عمد ذکر نشده و از طریق پنل مدیر قابل تنظیم است.",
    servicesEyebrow: "آنچه ما انجام می‌دهیم",
    servicesTitle: "خدمات جامع ساخت و ساز و انجینری",
    servicesSubtitle: "از ساختمان‌های بلند تا شبکه‌های آب، از انرژی خورشیدی تا بازسازی — SMS خدمات کامل ساخت و ساز و طراحی انجینری را ارائه می‌دهد.",
    servicesExplore: "کاوش",
    servicesViewAll: "مشاهده همه خدمات",
    mediaEyebrow: "کارهای ما",
    mediaTitle: "ساخت و ساز و انجینری در عمل",
    mediaPrev: "اسلاید قبلی",
    mediaNext: "اسلاید بعدی",
    whyEyebrow: "چرا SMS",
    whyTitle: "برتری انجینری، بر پایه هفت اصل",
    whySubtitle: "ارزش‌های ما هر نقشه، هر سایت و هر تحویل را شکل می‌دهند.",
    whyLearnMore: "درباره SMS بیشتر بدانید",
    sqSafetyTitle: "فرهنگ صفر آسیب در هر سایت",
    sqSafetyBody: "رعایت دقیق قوانین OHS، استانداردهای ایمنی سازمان ملل، ارزیابی ریسک، شناسایی خطرات، تجهیزات حفاظت فردی، آموزش، تمرین‌های اضطراری، افسران ایمنی در سایت و پیشگیری از حوادث — در هر پروژه‌ای که ارائه می‌دهیم.",
    sqSafetyReadMore: "برنامه ایمنی ما را بخوانید",
    sqQualityTitle: "کنترل کیفیت سه مرحله‌ای",
    sqQualityBody: "استانداردهای کیفی ISO و بین‌المللی، رعایت کد ساختمانی ملی افغانستان، آزمایش مواد، کنترل کیفیت قبل/حین/بعد از ساخت، ممیزی شخص ثالث و بهبود مستمر.",
    sqSeeQuality: "رویکرد کیفی ما را ببینید",
    sustainEyebrow: "پایداری",
    sustainTitle: "مسئولانه ساخته شده — برای جوامع و کره زمین",
    sustainSubtitle: "از بتن کم‌کربن تا جمع‌آوری آب باران و انرژی خورشیدی، پایداری در هر پروژه SMS مهندسی شده است.",
    sustainReadMore: "برنامه پایداری ما",
    methodEyebrow: "متدولوژی ما",
    methodTitle: "یک فرآیند شش مرحله‌ای برای تحویل قابل پیش‌بینی",
    methodSubtitle: "از امکان‌سنجی تا تحویل، هر پروژه SMS از یک فرآیند روشن، تکرارپذیر و مبتنی بر کیفیت پیروی می‌کند.",
    methodSeeFull: "متدولوژی کامل را ببینید",
    equipEyebrow: "تجهیزات و ماشین‌آلات",
    equipTitle: "ناوگان مدرن، آماده برای هر زمینی",
    equipSubtitle: "از خاکبرداری تا پرداخت نهایی، دسته‌بندی تجهیزات ما چرخه کامل عمر یک پروژه ساختمانی را پوشش می‌دهد.",
    equipExplore: "کاوش در همه تجهیزات",
    workforceEyebrow: "نیروی کار ما",
    workforceTitle: "مهندسان، متخصصان و کارگران ماهر",
    workforceSubtitle: "تیم‌های مهندسی و فنی ما به همراه نیروی کار ماهر، هر رشته‌ای را که برای تحویل پروژه‌های پیچیده نیاز است پوشش می‌دهند.",
    workforceMeetTeam: "با تیم آشنا شوید",
    upcomingEyebrow: "آینده و برنامه‌ریزی شده",
    upcomingTitle: "پروژه‌های آینده در بخش‌های مختلف",
    upcomingSubtitle: "SMS آماده است تا در پروژه‌های آینده در زیرساخت، انرژی، بهداشت، آموزش و توسعه شهری هوشمند مشارکت کند.",
    upcomingBody: "دسته‌بندی‌های زیر نشان‌دهنده تمرکز برنامه‌ریزی شده و آتی پروژه‌های SMS است. آنها به عنوان برنامه‌ریزی شده فهرست شده‌اند، نه کار تکمیل شده.",
    upcomingSeeAll: "مشاهده همه دسته‌بندی‌ها",
    // ── Project category pills (Upcoming / UpcomingProjects page) ───────────
    // Keep these keys in sync with `data/operations.js > upcomingProjectCategories`
    // and with the matching entries in the `en` dictionary above.
    categorySanitation:              "بهداشت و فاضلاب",
    categoryWaterSupply:             "آبرسانی",
    categoryAgriculturalInfrastructure: "زیرساخت‌های کشاورزی",
    categoryIrrigation:              "آبیاری",
    categoryHospitals:               "شفاخانه‌ها",
    categorySchools:                 "مکاتب",
    categoryRenewableEnergy:         "انرژی‌های تجدیدپذیر",
    categoryHydropower:              "برق‌آبی",
    categoryDrainageSewerage:        "زهکشی و فاضلاب",
    categoryRoadsBridges:            "سرک‌ها و پل‌ها",
    categorySmartBuildings:          "ساختمان‌های هوشمند",
    categoryCommercialDevelopment:   "توسعه تجاری",
    categoryIndustrialDevelopment:   "توسعه صنعتی",
    categoryHousing:                 "مسکن",
    categoryAirportInfrastructure:   "زیرساخت فرودگاه",
    categoryTransportation:          "حمل و نقل",
    categorySolarEnergy:             "انرژی خورشیدی",
    // ── Footer company blurb + city labels ──────────────────────────────────
    footerCompanyDescription: "یک شرکت برتر افغان در زمینه ساخت و ساز و انجنیری که ساختمان‌ها، زیرساخت‌ها، آب و آبیاری، انرژی و کارهای بازسازی را در سراسر کشور ارائه می‌دهد.",
    footerCityKabul:    "کابل:",
    footerCityNangarhar: "ننگرهار:",
    footerCompanyWebsite: "وب‌سایت",
    // ── Service titles used in the Footer "Our Services" list ──────────────
    // Keep slugs in sync with `data/content.js > services[]`.
    buildingConstruction:        "ساخت و ساز ساختمان",
    infrastructureDevelopment:   "توسعه زیرساخت‌ها",
    rehabilitationRenovation:    "بازسازی و نوسازی",
    waterSupplyIrrigation:       "سیستم‌های آبرسانی و آبیاری",
    energySolutions:             "راه‌حل‌های انرژی",
    wasteManagementSanitation:   "مدیریت پسماند و بهداشت",
    landscapingParks:            "محوطه‌سازی و پارک‌ها",
    clientsEyebrow: "مشتریان ما",
    clientsTitle: "مورد اعتماد شرکا در بخش‌های دولتی و خصوصی",
    clientsSubtitle: "SMS به طیف گسترده‌ای از مشتریان خدمات ارائه می‌دهد. نمونه کار کامل مشتری از طریق پنل مدیر پیکربندی می‌شود.",
    clientsEmptyTitle: "نمونه کار مشتریان اضافه خواهد شد",
    clientsEmptyBody: "پروفایل شرکت شامل بخش مشتریان اصلی است، اما نام‌های واقعی مشتری در متن موجود ذکر نشده است. لطفاً مشتریان خود (نام، لوگو، وب‌سایت، دسته‌بندی) را از طریق پنل مدیر اضافه کنید تا در اینجا نمایش داده شوند.",
    clientsGoTo: "به صفحه مشتریان بروید",
    ctaTitle: "بیایید پروژه ساخت و ساز یا انجینری بعدی شما را برنامه‌ریزی کنیم.",
    ctaSubtitle: "چه یک ساختمان بلند، چه کریدور زیرساختی، چه طرح آبیاری و چه نصب خورشیدی — SMS مهندسی، تجهیزات و نیروی انسانی را برای تحویل آن به ارمغان می‌آورد.",
    contactCallUs: "با ما تماس بگیرید", contactEmail: "ایمیل",
    contactKabulOffice: "دفتر کابل", contactNangarharOffice: "دفتر ننگرهار",
    contactEmailPlaceholder: "از طریق مدیر اضافه شود",
  },

  about: {
    heroEyebrow: "درباره SMS",
    heroTitle: "ساختن آینده افغانستان، یک پروژه در یک زمان.",
    heroSubtitle: "SMS یک شرکت ساختمانی و انجینری افغان است که ساختمان‌ها، زیرساخت‌ها، سیستم‌های آب، انرژی و کارهای بازسازی را ارائه می‌دهد.",
    overviewEyebrow: "نمای کلی شرکت", overviewTitle: "ما که هستیم",
    overviewP1: "شرکت ساختمانی و انجینری طراحی سید مصور سادات (SMS) یک شرکت ساختمانی و انجینری افغان است که خدمات طراحی، ساخت و بازسازی در سطح کامل را برای مشتریان دولتی و خصوصی ارائه می‌دهد.",
    overviewP2: "توانایی‌های ما شامل ساخت و ساز ساختمان (از ویلاها تا برج‌ها)، توسعه زیرساخت (جاده‌ها، بزرگراه‌ها، پل‌ها، آبروها)، بازسازی و نوسازی، سیستم‌های آب و آبیاری، انرژی تجدیدپذیر، مدیریت پسماند و بهداشت، و فضای سبز و پارک‌ها است.",
    overviewP3: "ما یک نیروی کار باتجربه مهندسی و فنی را با صنعتگران ماهر، تجهیزات مدرن و یک چارچوب سختگیرانه کیفیت، ایمنی و پایداری ترکیب می‌کنیم.",
    vision: "چشم‌انداز", mission: "مأموریت",
    infoEyebrow: "اطلاعات شرکت",
    infoTitle: "حقایق تایید شده درباره SMS",
    infoSubtitle: "مستقیماً از پروفایل شرکت گرفته شده است. فیلدهای خالی عمداً برای پر کردن توسط مدیر خالی گذاشته شده‌اند.",
    editableInAdmin: "در پنل مدیر قابل ویرایش",
    valuesEyebrow: "ارزش‌های ما",
    valuesTitle: "اصولی که هر پروژه را راهنمایی می‌کنند",
    valuesSubtitle: "هفت ارزش فرهنگ و کار ما را شکل می‌دهند.",
    ctaTitle: "می‌خواهید درباره SMS بیشتر بدانید؟",
    ctaSubtitle: "با تیم ما درباره پروژه ساخت و ساز یا انجینری خود صحبت کنید.",
  },

  companyFacts: {
    companyName: "نام شرکت", shortName: "نام کوتاه", tagline: "شعار",
    established: "سال تاسیس", registrationNumber: "شماره ثبت",
    licenseNumber: "شماره جواز", tinNumber: "شماره TIN",
    ungmNumber: "شماره UNGM", phone: "تلفن", email: "ایمیل",
    mainOffice: "دفتر مرکزی", branchOffice: "دفتر شعبه",
  },

  values: {
    quality:                { title: "کیفیت",                description: "استانداردهای بین‌المللی و یک فرآیند کنترل کیفیت سه مرحله‌ای در هر پروژه." },
    safety:                 { title: "ایمنی",                description: "رعایت دقیق قوانین OHS، آموزش مستمر و فرهنگ صفر آسیب در هر سایت." },
    innovation:             { title: "نوآوری",               description: "پذیرش روش‌های مدرن — BIM، پیش‌ساختگی، ساخت ماژولار و مدیریت مبتنی بر هوش مصنوعی." },
    professionalism:        { title: "حرفه‌ای‌گری",           description: "مدیریت پروژه منضبط، گزارش‌دهی شفاف و رفتار تجاری اخلاقی." },
    sustainability:         { title: "پایداری",               description: "طرح‌های کم‌مصرف، مصالح کم‌کربن، کاهش ضایعات و انرژی تجدیدپذیر." },
    clientCollaboration:    { title: "همکاری با مشتری",     description: "کار مشترک با مشتریان، جوامع و شرکا از مفهوم تا تحویل." },
    socialResponsibility:   { title: "مسئولیت اجتماعی",     description: "استخدام محلی، آموزش نسل بعدی و کمک به توسعه ملی." },
  },

  vision: "تبدیل شدن به قابل اعتمادترین و نوآورانه‌ترین شرکت ساختمانی و انجینری طراحی افغانستان، شناخته شده برای ارائه زیرساختی که جوامع را ارتقا می‌دهد، از توسعه ملی حمایت می‌کند و معیار کیفیت، ایمنی و پایداری را تعیین می‌کند.",
  mission: "ارائه راه‌حل‌های ساخت و ساز و انجینری با کیفیت بالا، ایمن و پایدار در هر پروژه‌ای که متعهد می‌شویم — از ساختمان‌های بلند و زیرساخت‌ها تا سیستم‌های آب، انرژی و کارهای بازسازی — با ترکیب متخصصان باتجربه، روش‌های مدرن و تعهد تزلزل‌ناپذیر به مشتریان و جوامع ما.",
  heroIntro: "شرکت ساختمانی و انجینری طراحی سید مصور سادات (SMS) یک شرکت ساختمانی و انجینری افغان است که ساختمان‌های بلند، زیرساخت‌ها، سیستم‌های آب و آبیاری، انرژی تجدیدپذیر و کارهای بازسازی را ارائه می‌دهد — با ترکیب برتری مهندسی و تعهد تزلزل‌ناپذیر به ایمنی، کیفیت و پایداری.",

  stats: {
    foundedLabel: "تاسیس", foundedShort: "تاسیس",
    regLabel: "شماره ثبت", regShort: "ش. ثبت",
    licenseLabel: "شماره جواز", licenseShort: "جواز",
    tinLabel: "TIN", tinShort: "TIN",
  },

  servicesPage: {
    heroEyebrow: "خدمات",
    heroTitle: "خدمات کامل ساخت و ساز و انجینری",
    heroSubtitle: "از ساختمان‌ها تا زیرساخت‌ها، سیستم‌های آب تا انرژی — SMS در کل چرخه عمر ساخت و ساز خدمات ارائه می‌دهد.",
    eyebrow: "آنچه ما انجام می‌دهیم",
    title: "هفت حوزه خدمات اصلی، یک شریک پاسخگو",
    subtitle: "هر خدمت تحت همان تعهد به کیفیت، ایمنی و پایداری ارائه می‌شود.",
    learnMore: "بیشتر بدانید",
    ctaTitle: "به خدمتی که در بالا ذکر نشده نیاز دارید؟",
    ctaSubtitle: "تیم ما می‌تواند راه‌حل‌های سفارشی را برای متناسب با پروژه شما طراحی کند.",
  },
  services: {
    "building-construction": { title: "ساخت و ساز ساختمان", summary: "ساختمان‌های بلند، میان‌مرتبه و کم‌مرتبه، ویلاها، مدارس، بیمارستان‌ها و مجتمع‌های تجاری.", description: "ما ساخت و ساز ساختمان را از پی تا کلید — برای اماکن مسکونی، تجاری، آموزشی و بهداشتی — به طور کامل ارائه می‌دهیم.", items: ["ساختمان‌های بلند","ساختمان‌های میان‌مرتبه","ساختمان‌های کم‌مرتبه","سازه‌های یک طبقه","ویلاها","اماکن آموزشی","اماکن بهداشتی","مجتمع‌های تجاری","سایر کارهای عمرانی"] },
    "infrastructure-development": { title: "توسعه زیرساخت", summary: "جاده‌ها، بزرگراه‌ها، پل‌ها و آبروهایی که جوامع را به هم متصل می‌کنند و از رشد ملی حمایت می‌کنند.", description: "ما زیرساخت‌های حیاتی که مردم و کالاها را جابجا می‌کنند — مهندسی شده برای دوام، ایمنی و عمر طولانی — برنامه‌ریزی و احداث می‌کنیم.", items: ["جاده‌ها","بزرگراه‌ها","پل‌ها","آبروها"] },
    "rehabilitation-renovation": { title: "بازسازی و نوسازی", summary: "مرمت سازه‌های موجود، ارتقای تاسیسات و کارهای بازسازی.", description: "ما ساختمان‌ها و تاسیسات موجود را مرمت، مدرن می‌کنیم و عمر مفید آنها را افزایش می‌دهیم.", items: ["مرمت سازه‌های موجود","ارتقای تاسیسات","کارهای بازسازی"] },
    "water-supply-irrigation": { title: "تامین آب و سیستم‌های آبیاری", summary: "حفاری چاه‌های عمیق، شبکه‌های آب و سیستم‌های آبیاری کشاورزی.", description: "از حفاری چاه‌های عمیق تا شبکه‌های توزیع و آبیاری مزارع، ما سیستم‌های آب قابل اعتمادی را ارائه می‌دهیم که به جوامع و کشاورزی خدمت می‌کنند.", items: ["حفاری چاه‌های عمیق","شبکه‌های آب","سیستم‌های آبیاری کشاورزی","خدمات مرتبط با آبیاری"] },
    "energy-solutions": { title: "راه‌حل‌های انرژی", summary: "سیستم‌های برق خورشیدی و پروژه‌های انرژی تجدیدپذیر برای آینده‌ای پاک‌تر و مقاوم‌تر.", description: "ما سیستم‌های خورشیدی و انرژی تجدیدپذیر را طراحی و نصب می‌کنیم که هزینه‌های عملیاتی و اثرات زیست‌محیطی را کاهش می‌دهد.", items: ["سیستم‌های برق خورشیدی","پروژه‌های انرژی تجدیدپذیر"] },
    "waste-management-sanitation": { title: "مدیریت پسماند و بهداشت", summary: "تاسیسات تصفیه پسماند و سیستم‌های بهداشتی برای جوامع سالم‌تر.", description: "ما زیرساخت‌های مدرن تصفیه پسماند و بهداشت را ارائه می‌دهیم که از سلامت عمومی و محیط زیست محافظت می‌کند.", items: ["تاسیسات تصفیه پسماند","سیستم‌های بهداشتی"] },
    "landscaping-parks": { title: "محوطه‌سازی و پارک‌ها", summary: "پارک‌های شهری، فضاهای تفریحی و فضاهای سبز که کیفیت زندگی را بهبود می‌بخشند.", description: "ما فضاهای عمومی سبز — پارک‌ها، میدان‌ها و مناطق تفریحی — را طراحی و می‌سازیم که جوامع را گرد هم می‌آورند.", items: ["پارک‌های شهری","فضاهای تفریحی","فضاهای سبز"] },
  },

  serviceDetail: {
    overview: "نمای کلی", scopeOfWork: "دامنه کار",
    needThisService: "به این خدمت نیاز دارید؟",
    requestConsultation: "درخواست مشاوره",
    requestBody: "درباره پروژه خود به ما بگویید و تیم مهندسی ما به شما پاسخ خواهد داد.",
    contactUs: "تماس با ما",
    orExplore: "یا خدمات دیگر را کاوش کنید:",
    ctaTitle: (n) => `پروژه ${n} خود را برنامه‌ریزی کنید`,
    ctaSubtitle: "برای ارزیابی فنی و پیشنهاد سفارشی با SMS همکاری کنید.",
  },

  projects: {
    heroEyebrow: "پروژه‌ها", heroTitle: "نمونه کار پروژه‌های ما",
    heroSubtitle: "نمونه کار پروژه SMS از پنل مدیر منتشر و مدیریت می‌شود.",
    eyebrow: "پروژه‌های تکمیل شده", title: "نمونه کار پروژه در اینجا نمایش داده خواهد شد",
    subtitle: "با توجه به پروفایل شرکت، جزئیات پروژه‌های تکمیل شده در حال حاضر منتشر نشده است. CMS از نام پروژه، دسته‌بندی، مکان، مشتری، تاریخ‌ها، وضعیت، توضیحات، تصاویر و گالری پشتیبانی می‌کند.",
    emptyTitle: "هنوز هیچ پروژه‌ای منتشر نشده است",
    emptyBody: "وقتی مدیر پروژه‌ها را منتشر کند، آنها در اینجا با تصویر جلد، دسته‌بندی، مکان، مشتری، تاریخ‌ها، وضعیت و یک صفحه جزئیات با گالری نمایش داده می‌شوند.",
    discussCTA: "درباره پروژه خود بحث کنید",
    ctaTitle: "پروژه‌ای برای SMS دارید؟",
    ctaSubtitle: "درباره محدوده، مکان و جدول زمانی به ما بگویید.",
  },

  equipment: {
    heroEyebrow: "تجهیزات", heroTitle: "ناوگان مدرن برای هر مرحله ساخت و ساز",
    heroSubtitle: "دسته‌بندی‌های تجهیزات ما شامل خاکبرداری، بتن و جاده، جابجایی مواد، حفاری و فونداسیون، تخریب و پرداخت، و تجهیزات پشتیبانی است.",
    eyebrow: "دسته‌بندی تجهیزات", title: "شش دسته، به طور کامل توسط CMS پشتیبانی می‌شوند",
    subtitle: "اقلام، مدل‌ها، مقادیر و وضعیت‌های خاص تجهیزات از پنل مدیر مدیریت می‌شوند — ما مقادیری را منتشر نمی‌کنیم که تایید نشده‌اند.",
    ctaTitle: "به تجهیزات برای پروژه خود نیاز دارید؟",
    ctaSubtitle: "SMS تجهیزات به عنوان بخشی از قرارداد را برای پروژه‌های پیچیده ارائه می‌دهد.",
  },
  // IMPORTANT: keys MUST be the English titles from data/operations.js because
  // components look them up as t(`equipmentCategories.${cat.title}.title`) for
  // the card heading and t(`equipmentCategories.${cat.title}.items.${idx}`)
  // for each list item. Each entry exposes a `title` (Dari translation of
  // the category name) plus an `items` array of Dari translations.
  equipmentCategories: {
    "Earthmoving Equipment": {
      title: "تجهیزات خاکبرداری",
      items: ["بیل مکانیکی","بولدوزر","لودر بکهو","لودر اسکید-استیر","گریدر","اسکریپر"],
      descriptions: [
        "بیل‌های مکانیکی هیدرولیکی برای حفاری، ترانشه‌برداری، پشتیبانی تخریب و بارگیری مصالح در سایت‌های ساختمانی.",
        "بولدوزرهای زنجیری برای خاکبرداری سنگین، پاکسازی سایت، تسطیح و جابجایی حجم زیاد خاک و نخاله.",
        "لودرهای بکهو چندمنظوره با ترکیب لودر جلو و بیل عقب برای حفاری، بارگیری و کارهای کوچک سایت.",
        "لودرهای اسکید-استیر کمپکت برای فضاهای تنگ — ایده‌آل برای محوطه‌سازی، تخریب کوچک و جابجایی مصالح.",
        "گریدرهای موتوری برای تسطیح دقیق، هموار کردن جاده و برف‌روبی در جاده‌های ساخت و دسترسی.",
        "اسکریپرها برای بارگیری، حمل و پخش خاک در مسافت‌های متوسط تا طولانی در سایت‌های بزرگ.",
      ],
      availability: ["موجود","موجود","موجود","موجود","موجود","موجود"],
      specs: [
        "وزن عملیاتی: ۲۰–۳۵ تن · ظرفیت باکت: ۱٫۰–۱٫۶ مترمکعب · موتور: ۱۱۰–۲۰۰ کیلووات",
        "وزن عملیاتی: ۱۵–۴۰ تن · ظرفیت تیغه: ۵–۱۱ مترمکعب · موتور: ۱۳۰–۳۰۰ کیلووات",
        "وزن عملیاتی: ۷–۱۱ تن · عمق حفاری: ۴–۶ متر · ظرفیت لودر: ۱٫۰–۱٫۵ مترمکعب",
        "وزن عملیاتی: ۳–۴ تن · ظرفیت نامی: ۸۰۰–۱۲۰۰ کیلوگرم · موتور: ۵۰–۷۵ کیلووات",
        "وزن عملیاتی: ۱۲–۲۰ تن · طول تیغه: ۳٫۷–۴٫۳ متر · موتور: ۱۱۰–۱۸۰ کیلووات",
        "ظرفیت انباشته: ۱۵–۳۴ مترمکعب · موتور: ۲۶۰–۴۵۰ کیلووات · بارگیر خودکار",
      ],
    },
    "Concrete & Road Equipment": {
      title: "تجهیزات بتن و جاده",
      items: ["میکسرهای بتن سیار","میکسرهای بتن ثابت","پمپ‌های بتن","فینیشر","غلتک","غلتک ویبره‌ای","غلتک استاتیک"],
      descriptions: [
        "میکسرهای بتن سیار نصب‌شده بر کامیون برای انتقال بتن آماده به سایت‌های پراکنده ساختمانی.",
        "میکسرهای بتن ثابت برای کارخانه‌های بتون‌سازی با حجم بالا، تولید بتن سازه‌ای برای ساختمان‌ها و زیرساخت.",
        "پمپ‌های بتن برای ریختن بتن آماده در ارتفاع، مسافت یا مناطق محدودی که کامیون دسترسی ندارد.",
        "فینیشرهای آسفالت برای پخش سطوح جاده، پارکینگ و محوطه‌های صنعتی با ضخامت و شیب یکنواخت.",
        "غلتک‌های تک‌درام و دو‌درام برای تراکم بستر جاده، لایه‌های آسفالت و خاکریزها.",
        "غلتک‌های ویبره‌ای با ترکیب ارتعاش و وزن برای تراکم کارآمد خاک‌های دانه‌ای و آسفالت.",
        "غلتک‌های استاتیک برای غلتک نهایی، تراکم سطح صاف و سطوح حساس که ارتعاش نامطلوب است.",
      ],
      availability: ["موجود","موجود","موجود","موجود","موجود","موجود","موجود"],
      specs: [
        "ظرفیت درام: ۶–۱۰ مترمکعب · شاسی: ۴×۲ / ۶×۴ · نرخ تخلیه: ۱ مترمکعب در دقیقه",
        "ظرفیت درام: ۱–۳ مترمکعب · خروجی: ۳۰–۱۲۰ مترمکعب در ساعت · گزینه‌های سیاره‌ای / دو‌شفت",
        "خروجی: ۶۰–۱۷۰ مترمکعب در ساعت · دسترسی عمودی: تا ۶۲ متر · دسترسی افقی: تا ۵۶ متر",
        "عرض پخش: ۲٫۵–۱۳ متر · ضخامت پخش: تا ۵۰۰ میلی‌متر · نرخ پخش: ۸۰۰ تن در ساعت",
        "وزن عملیاتی: ۸–۲۲ تن · عرض درام: ۱٫۷–۲٫۱ متر · نیروی گریز از مرکز: ۲۵۰ کیلونیوتن",
        "وزن عملیاتی: ۷–۲۰ تن · دامنه / فرکانس دوگانه · عرض درام: ۱٫۷–۲٫۱ متر",
        "وزن عملیاتی: ۶–۱۸ تن · درام صاف · بار خطی استاتیک: ۲۵–۳۵ کیلوگرم در سانتی‌متر",
      ],
    },
    "Material Handling": {
      title: "جابجایی مواد",
      items: ["جرثقیل","تیل‌هندلر","لیفتراک","کامیون کمپرسی","گاری دستی / فرغون"],
      descriptions: [
        "جرثقیل‌های متحرک و برجی برای بلند کردن فولاد، قالب‌بندی، قطعات پیش‌ساخته و مصالح سنگین در ارتفاع.",
        "تیل‌هندلرها برای بلند کردن و جای‌گذاری چندمنظوره پالت‌ها، بلوک‌ها و مصالح در زمین‌های ناهموار.",
        "لیفتراک‌ها برای انبارداری، جابجایی مصالح در محیط بسته و بارگیری/تخلیه کامیون‌ها در محوطه سایت.",
        "کامیون‌های کمپرسی برای حمل بتن، مصالح سنگی، خاک و نخاله تخریب در شرایط سخت سایت.",
        "گاری دستی و فرغون برای جابجایی بارهای کوچک بتن، ملات و ابزار در سایت‌های تنگ.",
      ],
      availability: ["موجود","موجود","موجود","موجود","موجود"],
      specs: [
        "ظرفیت: ۲۵–۵۰۰ تن · طول بوم: ۳۰–۱۰۰ متر · گزینه‌های تلسکوپی / خرپایی",
        "ظرفیت بالابر: ۳٫۵–۴٫۵ تن · ارتفاع بالابری: ۷–۱۷ متر · موتور: ۷۵–۱۱۰ کیلووات",
        "ظرفیت: ۲٫۵–۷ تن · ارتفاع بالابری: ۳–۶ متر · برقی / دیزل / گاز مایع",
        "بار مفید: ۵–۳۰ تن · ۴×۴ / ۶×۶ · شاسی مفصلی یا صلب",
        "ظرفیت: ۸۰–۲۵۰ کیلوگرم · گزینه‌های فولادی / چرخ بادی",
      ],
    },
    "Drilling & Foundation": {
      title: "حفاری و فونداسیون",
      items: ["کمپرسورها","دستگاه‌های حفاری روتاری","شمع‌کوب","ترنچرها"],
      descriptions: [
        "کمپرسورهای هوای قابل حمل و نصب‌شده برای تغذیه پتک‌های برقی، چکش‌ها و ابزارهای بادی در سایت.",
        "دستگاه‌های حفاری روتاری برای شمع‌های حفاری، چاه‌ها و مهندسی زمین — پشتیبانی فونداسیون و چاه‌های آب.",
        "شمع‌کوب‌ها برای کوبیدن شمع‌های پیش‌ساخته یا فولادی در زمین برای پل‌ها، ساختمان‌ها و سازه‌های سنگین.",
        "ترنچرها برای برش ترانشه‌های باریک جهت تاسیسات (آب، گاز، برق، مخابرات) و خطوط زهکشی.",
      ],
      availability: ["موجود","موجود","موجود","موجود"],
      specs: [
        "ظرفیت: ۱۸۵–۱۵۰۰ cfm · فشار: ۷–۱۴ بار · دیزل / برقی",
        "قطر چاه: ۳۰۰–۲۵۰۰ میلی‌متر · عمق: تا ۸۰ متر · گشتاور: تا ۴۵۰ کیلونیوتن متر",
        "وزن چکش: ۴–۱۲ تن · طول شمع: تا ۲۴ متر · هیدرولیک / دیزل سقوطی",
        "عمق ترانشه: ۰٫۶–۲٫۴ متر · عرض ترانشه: ۱۵۰–۴۵۰ میلی‌متر · برش زنجیری / چرخی",
      ],
    },
    "Demolition & Finishing": {
      title: "تخریب و پرداخت",
      items: ["چکش تخریب","پتک‌های برقی","ویبراتورها","ماله","داربست"],
      descriptions: [
        "چکش‌های هیدرولیکی نصب‌شده بر بیل مکانیکی برای تخریب بتن، شکستن سنگ و ترانشه‌برداری در زمین سخت.",
        "پتک‌های بادی و برقی دستی برای شکستن پیاده‌روها، دیوارها و عناصر بتنی کوچک.",
        "ویبراتورهای بتن (سوزنی / پوکر) برای تراکم بتن تازه و حذف حباب‌های هوا در دیوارها و دال‌ها.",
        "ماله‌های مکانیکی برای پرداخت دال‌های بزرگ بتن به سطحی صاف، سخت و تراز برای عمل‌آوری یا پوشش.",
        "سیستم‌های داربست مدولار برای دسترسی ایمن به کار در ارتفاع در ساختمان‌ها، پل‌ها و سازه‌های صنعتی.",
      ],
      availability: ["موجود","موجود","موجود","موجود","موجود"],
      specs: [
        "وزن عملیاتی: ۸۰۰–۴۰۰۰ کیلوگرم · انرژی ضربه: ۸۰۰–۸۰۰۰ ژول · هیدرولیک",
        "توان: ۱٫۰–۲٫۰ کیلووات · نرخ ضربه: ۸۰۰–۱۸۰۰ ضربه در دقیقه · وزن: ۹–۳۲ کیلوگرم",
        "قطر سوزن: ۲۵–۷۵ میلی‌متر · فرکانس: ۲۰۰ هرتز · محرک برقی / بادی",
        "قطر: ۶۰۰–۱۲۰۰ میلی‌متر · موتور: ۴–۱۳ کیلووات · پیاده‌روی / سواری",
        "ارتفاع سیستم: تا ۶۰ متر · کلاس بار: ۱–۶ · فولاد گالوانیزه گرم",
      ],
    },
    "Other Equipment": {
      title: "سایر تجهیزات",
      items: ["ژنراتورها","برج‌های روشنایی","تانکرهای آب","دستگاه‌های جوشکاری"],
      descriptions: [
        "ژنراتورهای دیزل برای تامین برق اصلی یا پشتیبان سایت‌ها، کمپ‌ها و تجهیزات در مناطق بدون شبکه برق.",
        "برج‌های روشنایی سیار برای کار ایمن در شب در جاده‌ها، پل‌ها و سایت‌های بزرگ با نور محیطی ضعیف.",
        "تانکرهای آب برای کنترل گرد و غبار، پشتیبانی تراکم و تحویل آب آشامیدنی / غیرآشامیدنی به سایت‌های دور.",
        "دستگاه‌های جوشکاری برقی و موتوری برای جوشکاری فولاد سازه‌ای، ساخت در سایت و تعمیرات.",
      ],
      availability: ["موجود","موجود","موجود","موجود"],
      specs: [
        "ظرفیت: ۲۰–۵۰۰ کیلوولت‌آمپر · اولیه / آماده‌به‌کار · کابین صداگیر",
        "توان لامپ: ۴×۱۰۰۰ وات LED · ارتفاع دکل: ۹ متر · نصب بر تریلر",
        "ظرفیت: ۵–۲۰ مترمکعب · شاسی: ۴×۲ / ۶×۴ · تخلیه ثقلی / پمپی",
        "خروجی: ۲۰۰–۵۰۰ آمپر · محرک موتور / اینورتر · گزینه‌های الکترود / TIG / MIG",
      ],
    },
  },
  // ── Equipment detail page UI strings (Dari) ──────────────────────────────
  equipmentDetail: {
    backToAll: "بازگشت به همه تجهیزات",
    backToEquipmentCategory: "بازگشت به دسته‌بندی تجهیزات",
    itemsInThisCategory: "مورد در این دسته",
    equipmentHeading: "تجهیزات",
    tableEquipmentName: "نام تجهیز",
    tableCategory: "دسته‌بندی",
    tableDescription: "توضیحات",
    tableAvailability: "دسترس‌پذیری",
    tableSpecifications: "مشخصات",
    tableImage: "تصویر",
    statusAvailable: "موجود",
    statusOnRequest: "به درخواست",
    statusLimited: "محدود",
    notFoundTitle: "دسته‌بندی پیدا نشد",
    notFoundBody: "دسته‌بندی تجهیزاتی که درخواست کردید وجود ندارد. لطفاً به فهرست کامل تجهیزات بازگردید.",
  },

  team: {
    heroEyebrow: "تیم", heroTitle: "مردم ما SMS را می‌سازند",
    heroSubtitle: "یک تیم مهندسی و فنی با پشتیبانی صنعتگران ماهر — پوشش هر رشته‌ای که برای تحویل پروژه‌های ساختمانی پیچیده نیاز است.",
    eyebrow: "نیروی کار ما", title: "مهندسی و فنی، به علاوه نیروی کار ماهر",
    subtitle: "اعضای خاص تیم (نام، عکس، سمت، بخش، بیوگرافی، تماس) از پنل مدیر مدیریت می‌شوند.",
    engineeringLabel: "مهندسی و فنی", engineeringTitle: "نقش‌های تیم فنی",
    skilledLabel: "نیروی کار ماهر", skilledTitle: "نقش‌های صنعتگران ماهر",
    ctaTitle: "به تیم SMS بپیوندید",
    ctaSubtitle: "ما همیشه به دنبال مهندسان و صنعتگران ماهر هستیم.",
  },
  workforce: {
    engineering: ["مهندسان عمران","معماران","مهندسان سازه","مهندسان برق","مهندسان مکانیک","هیدرولوژیست‌ها","مهندسان آبیاری","نقشه‌برداران","افسران رابط جامعه","افسران اداری","افسران بهداشت و ایمنی","متخصصان محیط زیست","متخصصان ژئوتکنیک","متخصصان آزمایش مواد","مدیران پروژه","ناظران سایت","تیم تدارکات و لجستیک"],
    skilled: ["بناها","نجارها","آرماتوربندها","لوله‌کش‌ها","برق‌کارها","نقاشان و پرداخت‌کاران","جوشکاران","اپراتورهای تجهیزات سنگین","کارگران بتن","تکنسین‌های آبیاری","دستیاران نقشه‌برداری","کاشی‌کاران","کارگران جاده"],
  },

  clients: {
    heroEyebrow: "مشتریان", heroTitle: "نمونه کار مشتریان ما",
    heroSubtitle: "SMS به مشتریان بخش دولتی و خصوصی در سراسر افغانستان خدمات ارائه می‌دهد. لوگوها و جزئیات مشتریان از پنل مدیر مدیریت می‌شوند.",
    eyebrow: "مشتریان اصلی", title: "مورد اعتماد در بخش‌های مختلف",
    subtitle: "پروفایل شرکت شامل بخش مشتریان اصلی است، اما نام‌های خاص مشتری را فهرست نمی‌کند. ما نام‌ها را جعل نمی‌کنیم.",
    emptyTitle: "نمونه کار مشتریان اضافه خواهد شد",
    emptyBody: "مشتریان (نام، لوگو، وب‌سایت، توضیحات، دسته‌بندی، ترتیب نمایش) را از طریق پنل مدیر اضافه کنید تا در این صفحه نمایش داده شوند.",
    becomeCTA: "مشتری شوید",
    ctaTitle: "مشتری SMS شوید",
    ctaSubtitle: "بیایید درباره پروژه ساخت و ساز یا انجینری شما بحث کنیم.",
  },

  safetyQuality: {
    heroEyebrow: "ایمنی و کیفیت", heroTitle: "فرهنگ صفر آسیب، کنترل کیفیت سه مرحله‌ای",
    heroSubtitle: "ایمنی و کیفیت در SMS غیرقابل مذاکره هستند — در هر نقشه، هر سایت و هر تحویل تعبیه شده‌اند.",
    safetyEyebrow: "ایمنی", safetyTitle: "یک سایت امن، یک سایت مولد است",
    safetyBody: "SMS قوانین سختگیرانه OHS و استانداردهای ایمنی سازمان ملل را در هر پروژه اعمال می‌کند — ارزیابی ریسک، شناسایی خطرات، اجرای PPE، آموزش، تمرین‌ها، افسران ایمنی در سایت، پیشگیری از حوادث و پیشگیری از اقدامات ناامن.",
    qualityEyebrow: "کیفیت", qualityTitle: "درست ساخته شده، در هر مرحله تایید شده",
    qualityBody: "چارچوب کیفیت ما از استانداردهای ISO و بین‌المللی، رعایت کد ساختمانی ملی افغانستان، تایید مواد، کنترل کیفیت سه مرحله‌ای (قبل/حین/بعد از ساخت)، QA شخص ثالث، مستندات as-built، بررسی‌های انطباق و بهبود مستمر پیروی می‌کند.",
    tqcEyebrow: "کنترل کیفیت سه مرحله‌ای", tqcTitle: "قبل از ساخت · حین · بعد از ساخت",
    tqcStage1Title: "قبل از ساخت", tqcStage1Desc: "برنامه‌ریزی کیفیت، بیانیه‌های روش، مشخصات مواد، صلاحیت تامین‌کننده.",
    tqcStage2Title: "حین ساخت", tqcStage2Desc: "بازرسی‌های روزانه، آزمایش مواد، بازرسی‌های مرحله‌ای، QA شخص ثالث، کنترل برنامه و هزینه.",
    tqcStage3Title: "بعد از ساخت", tqcStage3Desc: "بازرسی‌های نهایی، مستندات as-built، عیب‌یابی، راه‌اندازی، مسئولیت نقص.",
    ctaTitle: "درباره ایمنی و کیفیت برای پروژه خود بحث کنید",
  },
  // IMPORTANT: keys MUST be the English titles from data/safety.js because
  // components look them up as t(`safetyTopics.${tp.title}`) and the data
  // titles are English. Earlier these were inverted (Dari keys, Dari values)
  // which is why every item rendered in English when Dari was selected.
  safetyTopics: {
    "OHS Regulations":                "مقررات OHS",
    "UN Safety Standards":            "استانداردهای ایمنی سازمان ملل",
    "Risk Assessments":               "ارزیابی‌های ریسک",
    "Hazard Identification":          "شناسایی خطرات",
    "Personal Protective Equipment":  "تجهیزات حفاظت فردی",
    "Safety Training":                "آموزش ایمنی",
    "Emergency Drills":               "تمرین‌های اضطراری",
    "Safety Officers On-site":        "افسران ایمنی در سایت",
    "Accident Prevention":            "پیشگیری از حوادث",
    "Unsafe Practice Prevention":     "پیشگیری از اقدامات ناامن",
  },
  qualityTopics: {
    "ISO / International Quality Standards":     "استانداردهای کیفی ISO / بین‌المللی",
    "Afghan National Building Code Compliance":   "رعایت کد ساختمانی ملی افغانستان",
    "Material Quality Verification":               "تایید کیفیت مواد",
    "Three-Stage Quality Control":                 "کنترل کیفیت سه مرحله‌ای",
    "Pre-Construction Quality Planning":           "برنامه‌ریزی کیفیت قبل از ساخت",
    "During-Construction Monitoring":              "نظارت حین ساخت",
    "Post-Construction Quality Assurance":        "تضمین کیفیت بعد از ساخت",
    "Third-Party Quality Control":                 "کنترل کیفیت شخص ثالث",
    "As-Built Documentation":                      "مستندات As-Built",
    "Compliance Checks":                           "بررسی‌های انطباق",
    "Continuous Improvement":                      "بهبود مستمر",
  },

  sustainability: {
    heroEyebrow: "پایداری", heroTitle: "مسئولانه ساخته شده — برای جوامع و کره زمین",
    heroSubtitle: "SMS پایداری را در هر پروژه از طریق بهره‌وری انرژی، مواد مسئولانه، مدیریت آب، انرژی تجدیدپذیر و مراقبت از محیط زیست طراحی می‌کند.",
    eyebrow: "پنج اصل", title: "چگونه پایداری را در هر پروژه مهندسی می‌کنیم",
    ctaTitle: "با SMS سبزتر بسازید",
    ctaSubtitle: "درباره اهداف پایداری پروژه خود با تیم مهندسی ما بحث کنید.",
  },
  // IMPORTANT: keys MUST match the English titles in data/safety.js and
  // the EN side above, because components look them up via the English
  // p.title from the data file. Each entry exposes a `title` (Dari
  // translation of the pillar name) plus the Dari `points` array.
  // Earlier this dictionary used Dari keys with Dari values, which is why
  // every card rendered in English when Dari was selected.
  sustainabilityPillars: {
    "Sustainable Construction": {
      title: "ساخت و ساز پایدار",
      points: ["طرح‌های کم‌مصرف","مواد پایدار","بتن کم‌کربن","سنگدانه‌های بازیافتی","سرمایش و گرمایش غیرفعال","یکپارچه‌سازی انرژی خورشیدی"],
    },
    "Waste Management": {
      title: "مدیریت پسماند",
      points: ["مدیریت پسماند ساخت و ساز و تخریب","جداسازی پسماند","برنامه‌های بازیافت","کاهش ضایعات مواد","دفع ایمن مواد خطرناک"],
    },
    "Water Conservation": {
      title: "حفاظت از آب",
      points: ["شیوه‌های ساخت و ساز کم‌مصرف آب","جمع‌آوری آب باران","مدیریت آب طوفان","پیشگیری از آلودگی آب"],
    },
    "Renewable Energy": {
      title: "انرژی تجدیدپذیر",
      points: ["سیستم‌های خورشیدی","روشنایی LED","سیستم‌های کم‌مصرف","پیش‌ساختگی برای کاهش مصرف انرژی در سایت"],
    },
    "Environmental Impact Assessment": {
      title: "ارزیابی اثرات زیست‌محیطی",
      points: ["ارزیابی‌های زیست‌محیطی","برنامه‌های کاشت درخت","محوطه‌سازی سبز","بازسازی زیستگاه"],
    },
  },

  methodology: {
    heroEyebrow: "متدولوژی", heroTitle: "متدولوژی شش مرحله‌ای پروژه ما",
    heroSubtitle: "یک فرآیند روشن، تکرارپذیر و مبتنی بر کیفیت — از امکان‌سنجی تا تحویل و پشتیبانی.",
    ctaTitle: "با مطالعه امکان‌سنجی شروع کنید",
    ctaSubtitle: "اولین مرحله متدولوژی ما، پایه و اساس هر پروژه موفق SMS است.",
  },
  methodologySteps: {
    1: { title: "برنامه‌ریزی و تحلیل امکان‌سنجی", description: "تعریف اهداف پروژه، امکان‌سنجی، بودجه‌ها، جدول زمانی و پروفایل‌های ریسک.", points: ["ارزیابی سایت","مطالعه امکان‌سنجی","بودجه‌بندی و زمان‌بندی","هم‌راستایی ذینفعان","مجوزها"] },
    2: { title: "طراحی و انجینری",                   description: "طراحی معماری، سازه، MEP و زیست‌محیطی با استفاده از ابزارهای مدرن.", points: ["طراحی معماری","انجینری سازه","طراحی MEP","هماهنگی BIM","انجینری ارزش"] },
    3: { title: "تدارکات و مدیریت منابع",            description: "تامین تامین‌کنندگان واجد شرایط، مواد، تجهیزات و نیروی کار ماهر.", points: ["صلاحیت فروشندگان","تدارک مواد","بسیج تجهیزات","برنامه‌ریزی نیروی کار","لجستیک"] },
    4: { title: "ساخت و اجرا",                       description: "ساخت و ساز ایمن، به موقع، در بودجه با نظارت و گزارش‌دهی مستمر.", points: ["بسیج سایت","هماهنگی حرفه‌ها","مدیریت HSE","کنترل برنامه","گزارش‌دهی روزانه"] },
    5: { title: "تضمین کیفیت و انطباق",              description: "کنترل کیفیت سه مرحله‌ای از قبل از ساخت تا بعد از ساخت.", points: ["آزمایش مواد","بازرسی‌های مرحله‌ای","QA شخص ثالث","مستندات As-Built","بررسی‌های انطباق"] },
    6: { title: "تحویل پروژه و پشتیبانی پس از ساخت", description: "راه‌اندازی، مستندات، آموزش و پشتیبانی مستمر پس از تحویل.", points: ["راه‌اندازی","دستورالعمل‌های O&M","آموزش مشتری","مسئولیت نقص","پشتیبانی"] },
  },

  organization: {
    heroEyebrow: "سازمان", heroTitle: "ساختار سازمانی ما",
    heroSubtitle: "یک زنجیره فرماندهی روشن و بخش‌های اختصاصی — از رهبری اجرایی تا HSE، فنی، زنجیره تامین و منابع انسانی.",
    eyebrow: "بخش‌ها و رهبری", title: "از مدیر عامل تا هر متخصص در سایت",
    topLabel: "بالا",
    ctaTitle: "می‌خواهید با تیم ما کار کنید؟",
    ctaSubtitle: "با SMS درباره پروژه انجینری یا ساخت و ساز خود صحبت کنید.",
  },
  organizationChart: {
    departments: { Executive: "اجرایی", Operations: "عملیات", Projects: "پروژه‌ها", Technical: "فنی", Quality: "کیفیت", Finance: "مالی", HSE: "بهداشت، ایمنی و محیط زیست", "Supply Chain": "زنجیره تامین", "Human Resources": "منابع انسانی" },
    roles: {
      "Chief Executive Officer": "مدیر عامل", "Operations Manager": "مدیر عملیات",
      "Project Management": "مدیریت پروژه", "Project Managers": "مدیران پروژه",
      "Estimators": "برآوردکنندگان", "Planners": "برنامه‌ریزان", "Site Supervisors": "ناظران سایت",
      "Construction Managers": "مدیران ساخت و ساز", "Civil Engineers": "مهندسان عمران",
      "Mechanical Engineers": "مهندسان مکانیک", "Electrical Engineers": "مهندسان برق",
      "Architect": "معمار", "QA/QC Manager": "مدیر QA/QC", "Site Engineers": "مهندسان سایت",
      "Hydrologists": "هیدرولوژیست‌ها", "Urban Planner": "برنامه‌ریز شهری", "Financial Officer": "مسئول مالی",
      "HSE Manager": "مدیر HSE", "Environmental Managers": "مدیران محیط زیست",
      "Health & Safety Officers": "افسران بهداشت و ایمنی",
      "Environmental Safeguard Specialist": "متخصص حفاظت از محیط زیست",
      "Waste Management Specialists": "متخصصان مدیریت پسماند",
      "Procurement & Logistics": "تدارکات و لجستیک", "Procurement Manager": "مدیر تدارکات",
      "Supply Chain Coordinators": "هماهنگ‌کنندگان زنجیره تامین", "HR Managers": "مدیران منابع انسانی",
      "Recruitment Specialists": "متخصصان استخدام", "Training Specialists": "متخصصان آموزش",
      "HR Information System Specialists": "متخصصان سیستم اطلاعات منابع انسانی",
    },
  },

  strategicPlans: {
    heroEyebrow: "برنامه‌های استراتژیک", heroTitle: "SMS به کجا می‌رود",
    heroSubtitle: "برنامه‌های استراتژیک ما بر فناوری، پایداری، توسعه نیروی کار و همکاری بین‌المللی تمرکز دارند.",
    eyebrow: "چهار اصل استراتژیک", title: "نقشه راهی که رشد ما را شکل می‌دهد",
    ctaTitle: "با SMS در آینده ساخت و ساز شریک شوید",
  },
  strategicPlansItems: {
    "یکپارچه‌سازی فناوری": ["مدل‌سازی اطلاعات ساختمان (BIM)","ساخت و ساز پیش‌ساخته","ساخت و ساز ماژولار","مدیریت ساخت و ساز مبتنی بر هوش مصنوعی"],
    "پایداری": ["استقرار انرژی خورشیدی","سیستم‌های جمع‌آوری آب باران","طراحی ساختمان کم‌مصرف","مدیریت پسماند ساخت و ساز","تامین مواد سازگار با محیط زیست"],
    "آموزش و توسعه نیروی کار": ["مرکز آموزش فنی","برنامه‌های کارآموزی دانشگاهی","کارگاه‌های بهداشت و ایمنی"],
    "همکاری و سرمایه‌گذاری بین‌المللی": ["مشارکت‌های ساخت و ساز جهانی","اتحادهای تامین‌کننده مواد","تعامل با سرمایه‌گذاران","سرمایه‌گذاری مستقیم خارجی (FDI)","مناقصات بین‌المللی"],
  },

  expansionGoals: {
    heroEyebrow: "اهداف توسعه", heroTitle: "ما کجا در حال رشد هستیم",
    heroSubtitle: "SMS در حال سرمایه‌گذاری بر رشد جغرافیایی، تنوع خدمات، افزایش ظرفیت و مشارکت‌های دولتی-خصوصی است.",
    eyebrow: "چهار اصل توسعه", title: "چگونه برای خدمت به توسعه افغانستان مقیاس می‌شویم",
    ctaTitle: "سرمایه‌گذاری یا شراکت با SMS",
    ctaSubtitle: "درباره فرصت‌های توسعه و شراکت با رهبری ما بحث کنید.",
  },
  expansionGoalsItems: {
    "رشد جغرافیایی": "گسترش حضور ما در سراسر افغانستان و در بازارهای منطقه‌ای برای حمایت از توسعه ملی.",
    "تنوع‌بخشی": "گسترش سبد خدمات ما به بخش‌های جدید و صنایع مرتبط برای خدمت بهتر به مشتریان.",
    "افزایش ظرفیت": "سرمایه‌گذاری بر آموزش نیروی کار، تجهیزات و روش‌های ساخت و ساز مدرن برای مقیاس‌بندی ظرفیت تحویل.",
    "مشارکت‌های دولتی-خصوصی": "ایجاد مشارکت‌های بلندمدت با دولت، اهداکنندگان و سرمایه‌گذاران خصوصی برای ارائه زیرساخت مشترک.",
  },

  upcomingProjects: {
    heroEyebrow: "پروژه‌های آینده", heroTitle: "حوزه‌های تمرکز پروژه‌های برنامه‌ریزی شده و آینده",
    heroSubtitle: "دسته‌بندی‌های زیر نشان‌دهنده تمرکز برنامه‌ریزی شده و آتی پروژه‌های SMS است. آنها به عنوان برنامه‌ریزی شده فهرست شده‌اند، نه کار تکمیل شده.",
    intro: "به عنوان یک شرکت آینده‌نگر، SMS آماده است تا در پروژه‌های آینده در این بخش‌ها مشارکت کند:",
    noteEyebrow: "نکته مهم", noteTitle: "برنامه‌ریزی شده در مقابل تکمیل شده",
    noteSubtitle: "ما پروژه‌های برنامه‌ریزی شده را به عنوان پروژه‌های تکمیل شده ارائه نمی‌کنیم. پس از تحویل پروژه‌ها، آنها با جزئیات کامل در صفحه پروژه‌ها منتشر می‌شوند.",
    ctaTitle: "در پروژه‌های ملی آینده با SMS شریک شوید",
  },

  news: {
    heroEyebrow: "اخبار و بینش‌ها", heroTitle: "آخرین از SMS",
    heroSubtitle: "اخبار صنعت، اطلاعیه‌های پروژه و بینش‌های انجینری از تیم SMS.",
    emptyTitle: "هنوز هیچ مقاله‌ای منتشر نشده است",
    emptyBody: "مقالات وبلاگ و اخبار از پنل مدیر مدیریت می‌شوند — با پیش‌نویس/انتشار/زمان‌بندی، تصویر شاخص، دسته‌بندی‌ها، برچسب‌ها، ابرداده SEO و ویرایشگر محتوای کامل.",
    subscribeCTA: "از طریق تماس مشترک شوید",
    ctaTitle: "از پروژه‌های SMS مطلع باشید",
  },

  contact: {
    heroEyebrow: "تماس", heroTitle: "با SMS در تماس باشید",
    heroSubtitle: "پرس و جو در مورد پروژه، شراکت یا شغل دارید؟ با ما تماس بگیرید — تیم ما پاسخ خواهد داد.",
    officesTitle: "دفاتر ما",
    mainLabel: "دفتر مرکزی (کابل)", branchLabel: "دفتر شعبه (ننگرهار)",
    formTitle: "برای ما پیام بفرستید",
    formSubtitle: "فرم زیر را پر کنید و تیم ما به شما پاسخ خواهد داد.",
    fullName: "نام کامل", fullNamePlaceholder: "نام کامل شما",
    email: "ایمیل", emailPlaceholder: "you@example.com",
    phone: "تلفن", phonePlaceholder: "+93 ...",
    company: "شرکت / سازمان", companyPlaceholder: "اختیاری",
    subject: "موضوع", subjectPlaceholder: "این درباره چیست؟",
    message: "پیام", messagePlaceholder: "درباره پروژه خود به ما بگویید...",
    sendButton: "ارسال پیام",
    successMessage: "متشکریم. پیام شما دریافت شد — تیم ما به زودی پاسخ خواهد داد.",
    errorMessage: "خطایی در ارسال پیام شما رخ داد. لطفاً دوباره تلاش کنید.",
    errFullName: "نام کامل الزامی است",
    errEmailRequired: "ایمیل الزامی است", errEmailInvalid: "ایمیل نامعتبر است",
    errMessage: "پیام باید حداقل ۱۰ کاراکتر باشد",
  },

  login: {
    title: "دسترسی مدیر",
    subtitle: "ورود امن فقط برای پرسنل مجاز",
    emailLabel: "آدرس ایمیل", emailPlaceholder: "admin@company.com",
    passwordLabel: "رمز عبور", passwordPlaceholder: "••••••••",
    submitButton: "ورود",
    errEmailRequired: "ایمیل الزامی است", errEmailInvalid: "ایمیل نامعتبر است",
    errPasswordRequired: "رمز عبور الزامی است",
    errGeneric: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.",
    footerNotice: "این یک منطقه امن فقط برای پرسنل مجاز است. دسترسی غیرمجاز ممنوع است.",
  },

  // ── Modal section labels (shared by all home-page modals) ──────────────
  modals: {
    close: "بستن",
    highlights: "نکات برجسته",
    keyFeatures: "ویژگی‌های کلیدی",
    benefitsForYou: "مزایا برای شما",
    bestPractices: "بهترین شیوه‌ها",
    activitiesProcesses: "فعالیت‌ها و فرآیندها",
    whatYouReceive: "آنچه دریافت می‌کنید",
    whoDoesWhat: "چه کسی چه کاری انجام می‌دهد",
    toolsStandards: "ابزارها و استانداردها",
    typicalDuration: "مدت زمان معمول",
    stepProgress: "مرحله",
    of: "از",
    backToWhy: "بازگشت به چرا SMS",
    backToSustainability: "بازگشت به پایداری",
    backToMethodology: "بازگشت به متدولوژی",
    seeFullMethodology: "مشاهده متدولوژی کامل",
    learnMoreWhy: "درباره SMS بیشتر بدانید",
    learnMoreSustainability: "درباره پایداری ما بیشتر بدانید",
    pillar: "ستون",
  },
  // Accessibility label templates for cards that open a detail dialog.
  // `learnMoreAbout(item)` takes the translated card title and returns the
  // full screen-reader label, matching the `(arg) => string` pattern already
  // used by other parameterized translations (e.g. home.heroBadge).
  cards: {
    // Note: Dari puts the noun first, then the verb, then `item`.
    learnMoreAbout: (item) => `درباره ${item} بیشتر بدانید`,
  },

  // ── Why SMS pillar detail modals (deep content per pillar) ─────────────
  pillarDetails: {
    Quality: {
      tagline: "درست ساخته شده. در هر مرحله تأیید شده.",
      description: "کیفیت در SMS یک نقطه بازرسی نیست — یک انضباط مداوم است. ما هر پروژه را با استانداردهای بین‌المللی ISO و کد ساختمانی ملی افغانستان هماهنگ می‌کنیم، یک فرآیند کنترل کیفیت سه مرحله‌ای سخت‌گیرانه اجرا می‌کنیم و حسابرسان مستقل شخص ثالث را به کار می‌گیریم تا مشتریان ما شواهد قابل تأیید دریافت کنند، نه فقط وعده.",
      features: [
        "مدیریت کیفیت همسو با ISO 9001 در هر پروژه",
        "کنترل کیفیت سه مرحله‌ای: بازرسی‌های قبل / حین / بعد از ساخت",
        "تأیید مواد در مبدأ و آزمایش آزمایشگاهی در سایت",
        "حسابرسی‌های مستقل شخص ثالث و مستندات as-built",
        "بهبود مستمر از طریق بررسی‌های درس‌آموخته",
      ],
      benefits: [
        { title: "تحویل بدون نقص", description: "مسائل قبل از تحویل کلید پروژه شناسایی و حل می‌شوند — بودجه و زمان‌بندی شما محافظت می‌شود." },
        { title: "انطباق قابل تأیی", description: "هر ادعا با بازرسی‌های مستند، گزارش‌های آزمایش و سوابق حسابرسی پشتیبانی می‌شود." },
        { title: "نتایج قابل پیش‌بینی", description: "فرآیندهای استاندارد به معنای غافلگیری کمتر، بازکاری کمتر و هزینه کل مالکیت کمتر است." },
        { title: "عمر طولانی‌تر دارایی", description: "مواد و روش‌های انتخابی برای دوام، تا تأسیسات شما برای دهه‌ها، نه فقط سال‌ها عمل کند." },
      ],
      stats: [
        { value: "۳",        label: "مرحله کنترل کیفیت در هر پروژه" },
        { value: "۱۰۰٪",     label: "فرآیندهای همسو با ISO" },
        { value: "شخص ثالث", label: "حسابرسی‌های تحویل شده" },
      ],
      highlights: ["ISO 9001", "کد ساختمانی افغانستان", "بازرسی‌های مرحله‌ای", "آزمایش مواد"],
    },
    Safety: {
      tagline: "بدون آسیب. هر سایت. هر شیفت.",
      description: "ایمنی اولین مورد در هر دستور جلسه SMS است. ما قوانین سخت‌گیرانه OHS و استانداردهای ایمنی سازمان ملل را اعمال می‌کنیم، ارزیابی‌های ریسک مداوم و شناسایی خطرات انجام می‌دهیم، استفاده از PPE را اجباریی می‌کنیم، تمرین‌های منظم برگزار می‌کنیم و افسران ایمنی آموزش‌دیده را در هر سایت نگه می‌داریم.",
      features: [
        "قوانین سخت‌گیرانه OHS در هر سایت اجرا می‌شود",
        "استانداردهای ایمنی سازمان ملل در عملیات روزانه ادغام شده",
        "ارزیابی‌های ریسک مداوم و شناسایی خطرات",
        "اجرای PPE و حضور افسر ایمنی در هر شیفت",
        "تمرین‌های اضطراری منظم و بررسی‌های درس‌آموخته",
      ],
      benefits: [
        { title: "سایت‌های بدون آسیب", description: "هر کارگر سالم به خانه برمی‌گردد — هر شیفت، هر سایت، هر پروژه." },
        { title: "هزینه بیمه و ریسک کمتر", description: "سابقه ایمنی قوی حق بیمه، ادعاها و تأخیرهای پروژه ناشی از حوادث را کاهش می‌دهد." },
        { title: "بهره‌وری بالاتر", description: "تیم‌های ایمن و آموزش‌دیده سریع‌تر و با اعتماد به نفس بیشتر کار می‌کنند." },
        { title: "مورد اعتماد مشتریان", description: "مشتریان و شرکا می‌دانند پروژه آنها در دستانی است که افراد را در اولویت قرار می‌دهد." },
      ],
      stats: [
        { value: "۰",      label: "سازش در ایمنی" },
        { value: "۱۰۰٪",   label: "اجرای PPE" },
        { value: "۲۴/۷",   label: "حضور افسر ایمنی" },
      ],
      highlights: ["OHS", "استانداردهای سازمان ملل", "PPE", "تمرین‌ها"],
    },
    Innovation: {
      tagline: "روش‌های مدرن. نتایج بهتر.",
      description: "SMS در روش‌های مدرن سرمایه‌گذاری می‌کند زیرا به طور مداوم ساختمان‌های بهتر و سریع‌تر ارائه می‌دهند. از BIM و دوقلوهای دیجیتال تا پیش‌ساختگی و زمان‌بندی با کمک هوش مصنوعی، ما فناوری‌هایی را اتخاذ می‌کنیم که دقت را بهبود می‌بخشند، بازکاری را کاهش می‌دهند و دید real-time از پروژه به مشتریان می‌دهند.",
      features: [
        "مدل‌سازی اطلاعات ساختمان (BIM) در هر پروژه",
        "روش‌های پیش‌ساختگی و ساخت ماژولار",
        "زمان‌بندی و بهینه‌سازی منابع با کمک هوش مصنوعی",
        "دوقلوهای دیجیتال برای عملیات و مدیریت تأسیسات",
        "تحقیق و توسعه مداوم در روش‌ها، مواد و ابزارها",
      ],
      benefits: [
        { title: "غافلگیری کمتر", description: "دوقلوهای دیجیتال و BIM تداخل‌ها را در مدل شناسایی می‌کنند، نه در سایت." },
        { title: "تحویل سریع‌تر", description: "پیش‌ساختگی و ساخت ماژولار هفته‌ها — گاهی ماه‌ها — از زمان‌بندی می‌کاهند." },
        { title: "هزینه بازکاری کمتر", description: "تشخیص تداخل و هماهنگی سه‌بعدی بازکاری را در اکثر پروژه‌ها به نزدیک صفر می‌رساند." },
        { title: "دارایی‌های آماده برای آینده", description: "مدل‌های تحویل دیجیتال عملیات، نگهداری و بازسازی‌های آینده را برای دهه‌ها آسان‌تر می‌کنند." },
      ],
      stats: [
        { value: "BIM",     label: "در هر پروژه" },
        { value: "AI",      label: "کمک زمان‌بندی" },
        { value: "دیجیتال", label: "دوقلوی تحویل شامل" },
      ],
      highlights: ["BIM", "پیش‌ساختگی", "ابزارهای AI", "دوقلوی دیجیتال"],
    },
    Professionalism: {
      tagline: "منضبط. شفاف. اخلاقی.",
      description: "حرفه‌ای‌گری نحوه اجرای هر پروژه است — مدیریت پروژه منضبط، گزارش‌دهی شفاف و رفتار تجاری اخلاقی در هر سطح. مشتریان ما همیشه می‌دانند چه اتفاقی می‌افتد، چرا و چه هزینه‌ای دارد.",
      features: [
        "استانداردهای مدیریت پروژه همسو با PMO در هر پروژه",
        "گزارش‌دهی شفاف هزینه، زمان‌بندی و کیفیت",
        "تأمین اخلاقی و انطباق با ضد فساد",
        "سوابق تصمیم‌گیری مستند و ردپای تغییرات",
        "ارتباط مستمر با مشتری و بررسی‌های نقطه عطف",
      ],
      benefits: [
        { title: "بدون غافلگیری", description: "گزارش‌دهی واضح و مکرر به ای mean است که همیشه می‌دانید پروژه در کجا ایستاده است." },
        { title: "تصمیمات سریع‌تر", description: "حقوق تصمیم‌گیری مستند و سوابق زنده تأییدها را در جریان نگه می‌دارد." },
        { title: "ردپای قابل حسابرسی", description: "هر تصمیم و تغییر ثبت شده — قابل دفاع در برابر حسابرسان، هیئت‌ها و اهداکنندگان." },
        { title: "شریک مورد اعتماد", description: "رفتار اخلاقی و شفاف SMS را به یک شریک بلندمدت تبدیل می‌کند، نه فقط یک پیمانکار." },
      ],
      stats: [
        { value: "هفتگی",  label: "گزارش‌دهی به مشتری" },
        { value: "زنده",    label: "سوابق تصمیم و تغییر" },
        { value: "PMO",     label: "استانداردها در هر پروژه" },
      ],
      highlights: ["استانداردهای PMO", "شفافیت", "اخلاق", "گزارش‌های زنده"],
    },
    Sustainability: {
      tagline: "کم‌مصرف. آگاه به منابع. ساخته شده برای دوام.",
      description: "پایداری در هر پروژه SMS مهندسی شده است. ما از روز اول برای بهره‌وری انرژی طراحی می‌کنیم، مواد کم‌کربن و بازیافتی تأمین می‌کنیم، ضایعات ساخت را به حداقل می‌رسانیم و انرژی تجدیدپذیر را در هر جایی که نیاز اجازه دهد ادغام می‌کنیم.",
      features: [
        "طراحی ساختمان کم‌مصرف و استراتژی‌های غیرفعال",
        "بتن کم‌کربن و تأمین سنگدانه بازیافتی",
        "برنامه‌های مدیریت ضایعات ساخت و تخریب",
        "طراحی برق آماده خورشیدی و یکپارچه‌سازی تجدیدپذیر",
        "لوازم کم‌مصرف آب و جمع‌آوری آب باران",
      ],
      benefits: [
        { title: "هزینه عملیاتی کمتر", description: "طراحی کم‌مصرف قبض‌های آب و برق را برای کل عمر ساختمان کاهش می‌دهد." },
        { title: "ردپای زیست‌محیطی کوچک‌تر", description: "کربن نهفته کمتر، ضایعات کمتر، تأثیر سایت کمتر — قابل اندازه‌گیری و گزارش." },
        { title: "فضاهای سالم‌تر", description: "تهویه، نور طبیعی و مواد بهتر به معنای ساکنان سالم‌تر است." },
        { title: "انطباق آینده‌نگر", description: "ساختمان‌هایی که برای برآورده کردن — و فراتر از — کدهای فعلی و نوظهور طراحی شده‌اند." },
      ],
      stats: [
        { value: "کمتر", label: "هزینه عملیاتی برای مشتریان" },
        { value: "کم",  label: "ضایعات ساخت به محل دفن" },
        { value: "بیشتر", label: "یکپارچه‌سازی انرژی تجدیدپذیر" },
      ],
      highlights: ["کم‌مصرف", "کم‌کربن", "برنامه ضایعات", "آماده خورشیدی"],
    },
    "Client Collaboration": {
      tagline: "دست در دست. از مفهوم تا تحویل.",
      description: "پروژه‌های بزرگ با همکاری نوشته می‌شوند. از اولین طرح مفهومی تا پیاده‌روی نهایتی تحویل، ما دست در دست با مشتریان، جوامع و شرکای خود کار می‌کنیم.",
      features: [
        "کارگاه‌های مفهومی مشترک و چارتهای طراحی",
        "جلسات منظم بررسی مشتری و تأیید نقطه عطف",
        "RFIs شفاف، سفارشات تغییر و سوابق تصمیم",
        "برنامه‌های مشارکت جامعه برای پروژه‌های تأثیرگذار اجتماعی",
        "هماهنگی شریک و پیمانکار فرعی به رهبری یک PM",
      ],
      benefits: [
        { title: "نتایج همسو", description: "همکاری زودهنگام و مداوم به این معناست که پروژه تمام شده با آنچه واقعاً نیاز داشتید مطابقت دارد." },
        { title: "تصمیمات سریع‌تر", description: "حقوق تصمیم‌گیری روشن و سوابق زنده تأییدها را در جریان نگه می‌دارد." },
        { title: "حسن نظر جامعه", description: "مشارکت ذینفعان همسایگان را به حامیان تبدیل می‌کند." },
        { title: "روابط قوی‌تر", description: "بیشتر کار ما از مشتریان تکراری است — همکاری نحوه ساخت این روابط است." },
      ],
      stats: [
        { value: "هفتگی",   label: "بررسی مشتری" },
        { value: "زنده",     label: "سوابق تصمیم و تغییر" },
        { value: "تکراری",   label: "روابط مشتری" },
      ],
      highlights: ["کارگاه‌ها", "سوابق زنده", "جامعه", "هماهنگی شریک"],
    },
    "Social Responsibility": {
      tagline: "مردم اول. کشور همیشه.",
      description: "SMS در افغانستان، برای افغانستان تأسیس شد. ما در هر جایی که فعالیت می‌کنیم به صورت محلی استخدام می‌کنیم، در آموزش نسل بعدی مهندسان و صنعتگران افغان سرمایه‌گذاری می‌کنیم، از اولویت‌های توسعه ملی حمایت می‌کنیم و پروژه‌های خود را به گونه‌ای اجرا می‌کنیم که جوامع را ارتقا دهد.",
      features: [
        "استخدام محلی و توسعه مهارت‌ها در هر پروژه",
        "برنامه‌های کارآموزی مهندس و فارغ‌التحصیلان",
        "اولویت تأمین برای تأمین‌کنندگان و پیمانکاران فرعی افغان",
        "برنامه‌های حمایت از جامعه در مناطقی که فعالیت می‌کنیم",
        "هماهنگی با اولویت‌ها و کدهای توسعه ملی",
      ],
      benefits: [
        { title: "جوامع قوی‌تر", description: "پروژه‌های ما افراد آموزش‌دیده، زنجیره‌های تأمین فعال و ظرفیت محلی ماندگار را به جا می‌گذارند." },
        { title: "تأثیر ملی", description: "هر پروژه کمکی به زیرساخت و ظرفیت اقتصادی افغانستان است." },
        { title: "نیروی کار فراگیر", description: "ما درها را به روی زنان، جوانان و متخصصان بازگشته باز می‌کنیم." },
        { title: "مورد اعتماد محلی", description: "عملیات ریشه‌دار در جامعه به معنای تأییدهای روان‌تر و بسیج سریع‌تر است." },
      ],
      stats: [
        { value: "محلی",   label: "استخدام در هر سایت" },
        { value: "صدها",    label: "کارآموزان راهنمایی شده" },
        { value: "افغان",   label: "اولویت زنجیره تأمین" },
      ],
      highlights: ["استخدام محلی", "کارآموزی", "تأمین افغان", "جامعه"],
    },
  },

  // ── Sustainability pillar modal content (Dari) ──────────────────────────
  sustainabilityDetails: {
    "Sustainable Construction": {
      tagline: "یک بار طراحی کنید. برای دهه‌ها سود ببرید.",
      description: "ساخت و ساز پایدار در SMS به معنای انتخاب سیستم‌ها، مواد و روش‌هایی است که انرژی عملیاتی را کاهش می‌دهند، کربن نهفته را پایین می‌آورند و ضایعات را به حداقل می‌رسانند — بدون به خطر انداختن عملکرد، ایمنی یا بودجه.",
      features: [
        "ارزیابی کربن چرخه عمر در طراحی ادغام شده",
        "پاکت‌های ساختمان کم‌مصرف و سرمایش/گرمایش غیرفعال",
        "طرح‌های اختلاط بتن کم‌کربن و استفاده از سنگدانه بازیافتی",
        "زیرساخت برق آماده خورشیدی از روز اول",
        "تأمین مواد پایدار و صلاحیت تأمین‌کننده",
      ],
      benefits: [
        { title: "هزینه کمتر در طول عمر", description: "ساختمان‌های کم‌مصرف هزینه عملیاتی کمتری در کل چرخه عمر خود دارند." },
        { title: "کربن نهفته کاهش‌یافته", description: "مواد و روش‌های کم‌کربن ردپای کربن ساختمان را از روز اول کوچک می‌کنند." },
        { title: "مقاوم در برابر تغییرات آب و هوا", description: "سرمایش غیرفعال و طراحی آماده تجدیدپذیر استرس آب و هوایی آینده را بهتر مدیریت می‌کند." },
        { title: "راحتی بالاتر ساکنان", description: "نور طبیعی، تهویه طبیعی و راحتی حرارتی سلامت و بهره‌وری را بهبود می‌بخشد." },
      ],
      stats: [
        { value: "کمتر", label: "هزینه عملیاتی در طول عمر" },
        { value: "کم",  label: "کربن نهفته در مقابل پایه" },
        { value: "صفر",  label: "هدف خالص ضایعات به محل دفن" },
      ],
      highlights: ["کم‌کربن", "طراحی غیرفعال", "آماده خورشیدی", "تأمین پایدار"],
      practices: [
        "ارزیابی کربن چرخه عمر در هر طراحی",
        "جهت‌گیری خورشیدی غیرفعال و مدلسازی تهویه طبیعی",
        "پاسپورت مواد برای هر جزء اصلی",
        "تحلیل هزینه چرخه عمر به هر مشتری",
      ],
    },
    "Waste Management": {
      tagline: "برنامه‌ریزی کنید. اندازه‌گیری کنید. کاهش دهید.",
      description: "ساخت و ساز به طور پیش‌فرض ضایعات عظیمی تولید می‌کند. کار ما معکوس کردن این روند است — جداسازی در مبدأ، بازیافت آنچه می‌توانیم، دفع ایمن آنچه نمی‌توانیم، و گزارش هر کیلوگرم.",
      features: [
        "برنامه مدیریت ضایعات ساخت و تخریب در هر پروژه",
        "جداسازی مبدأ به جریان‌های بی‌اثر، قابل بازیافت و خطرناک",
        "استراتژی استفاده مجدد از مواد برای برش‌ها و بسته‌بندی",
        "ردیابی و گزارش هر جریان ضایعات به تن",
        "مدیریت و دفع ایمن مواد خطرناک",
      ],
      benefits: [
        { title: "محل دفن کمتر", description: "نرخ بازیافت بالاتر به معنای ضایعات کمتر به محل دفن است." },
        { title: "هزینه دفع کمتر", description: "بازیافت و استفاده مجدد هزینه‌های حمل و دفع را در طول عمر پروژه کاهش می‌دهد." },
        { title: "سایت‌های ایمن‌تر", description: "جداسازی مناسب جریان‌های خطرناک از کارگران، همسایگان و محیط زیست محافظت می‌کند." },
        { title: "آماده انطباق", description: "ردپای ضایعات مستند رگولاتورها، اهداکنندگان و مشتریان ESG را راضی می‌کند." },
      ],
      stats: [
        { value: "برنامه",    label: "C&D در هر پروژه" },
        { value: "۱۰۰٪",    label: "مواد خطرناک ردیابی شده" },
        { value: "ماهانه", label: "گزارش‌دهی ضایعات" },
      ],
      highlights: ["برنامه C&D", "جداسازی", "بازیافت", "ایمنی خطر"],
      practices: [
        "ممیزی‌های هفتگی ضایعات با شواهد عکسی",
        "مناطق مرتب‌سازی تعیین شده در هر سایت",
        "استفاده مجدد از برش‌ها و قالب‌ها در صورت مجاز بودن سازه‌ای",
        "مشارکت با پیمانکاران بازیافت معتبر",
      ],
    },
    "Water Conservation": {
      tagline: "کمتر مصرف کنید. بیشتر جمع کنید. عاقلانه استفاده مجدد کنید.",
      description: "آب یکی از ارزشمندترین منابع ماست — به خصوص در سایت‌های خشکی که اغلب در آنجا می‌سازیم. SMS شیوه‌های کم‌مصرف آب را اعمال می‌کند، آب باران را برای استفاده مجدد جمع‌آوری می‌کند، آب‌های سطحی را مسئولانه مدیریت می‌کند و از آلودگی منابع آب محلی جلوگیری می‌کند.",
      features: [
        "شیوه‌های ساخت و ساز کم‌مصرف آب و کنترل گرد و غبار",
        "جمع‌آوری آب باران برای استفاده در سایت و عملیات",
        "مدیریت آب‌های سطحی و کنترل فرسایش",
        "پیشگیری از آلودگی آب و تصفیه رواناب",
        "لوازم کم‌مصرف آب و استفاده مجدد از آب خاکستری در ساختمان‌های تمام شده",
      ],
      benefits: [
        { title: "قبض آب کمتر", description: "جمع‌آوری آب باران و لوازم کارآمد هزینه‌های آب عملیاتی را از سال اول کاهش می‌دهد." },
        { title: "تأمین مقاوم", description: "آب باران جمع‌آوری شده تأمین پشتیبان در طول کمبودها را فراهم می‌کند." },
        { title: "محافظت از آبراهه‌ها", description: "مدیریت آب‌های سطحی و پیشگیری از آلودگی از رودخانه‌ها، آب‌های زیرزمینی و همسایگان محافظت می‌کند." },
        { title: "آماده انطباق", description: "برنامه‌های آب مستند رگولاتورها و نیازهای اهداکنندگان را برآورده می‌کند." },
      ],
      stats: [
        { value: "کمتر", label: "مصرف آب عملیاتی" },
        { value: "۱۰۰٪",  label: "آب‌های سطحی مدیریت شده در سایت" },
        { value: "۲۴/۷",  label: "نظارت حین ساخت" },
      ],
      highlights: ["آب باران", "آب‌های سطحی", "آب خاکستری", "لوازم کارآمد"],
      practices: [
        "مطالعه توازن آب پیش از ساخت",
        "کنترل رسوب و فرسایش در هر سایت",
        "مخازن ذخیره آب باران متناسب با سطح سقف",
        "سیستم‌های استفاده مجدد از آب خاکستری در ساختمان‌های تمام شده",
      ],
    },
    "Renewable Energy": {
      tagline: "ساخت را نیرو دهید. ساختمان را نیرو دهید.",
      description: "SMS سیستم‌های خورشیدی و تجدیدپذیر را در سایت‌های ساخت و ساز ما (کاهش استفاده از ژنراتورهای دیزلی) و ساختمان‌های تمام شود (کاهش هزینه انرژی عمر دارایی) ادغام می‌کند.",
      features: [
        "سیستم‌های PV خورشیدی برای هر سایت اندازه و مدلسازی شده",
        "روشنایی LED و سیستم‌های کم‌مصرف به عنوان استاندارد",
        "طراحی HVAC هوشمند برای کاهش مصرف انرژی",
        "سیستم‌های هیبریدی خارج از شبکه برای سایت‌های دور",
        "پیش‌ساختگی برای کاهش مصرف انرژی در سایت",
      ],
      benefits: [
        { title: "هزینه کمتر در طول عمر", description: "ساختمان‌های آماده تجدیدپذیر هزینه عملیاتی کمتری در طول عمر خود دارند." },
        { title: "استقلال انرژی", description: "سیستم‌های هیبریدی وابستگی به شبکه را کاهش می‌دهند." },
        { title: "استفاده کمتر از دیزل", description: "دفاتر و تجهیزات سایت با انرژی خورشیدی زمان کارکرد ژنراتور دیزل را کاهش می‌دهند." },
        { title: "آماده اعتبار کربن", description: "یکپارچه‌سازی تجدیدپذیر مستند فرصت‌های اعتبار کربن و گزارش ESG را باز می‌کند." },
      ],
      stats: [
        { value: "خورشیدی",   label: "آماده در هر ساخت جدید" },
        { value: "LED",     label: "روشنایی به عنوان استاندارد" },
        { value: "هیبرید",  label: "سیستم‌های خارج از شبکه موجود" },
      ],
      highlights: ["PV خورشیدی", "روشنایی LED", "HVAC هوشمند", "میکروگریدها"],
      practices: [
        "مدلسازی عملکرد خورشیدی قبل از تصمیم‌گیری اندازه",
        "گزینه‌های ذخیره باتری برای بارهای حیاتی",
        "اندازه‌گیری هوشمند و نظارت انرژی در هر سایت",
        "تحلیل انرژی چرخه عمر به هر مشتری",
      ],
    },
    "Environmental Impact Assessment": {
      tagline: "سایت را بشناسید. از آنچه مهم است محافظت کنید.",
      description: "قبل از شروع ساخت و ساز، محیطی را که قرار است تغییر دهیم درک می‌کنیم. SMS ارزیابی‌های زیست‌محیطی را برای هر پروژه اجرا می‌کند، برنامه‌های كاشت درخت و بازسازی زیستگاه را در جایی که مناسب باشد توسعه می‌دهد و محوطه‌سازی سبز را طراحی می‌کند که از تنوع زیستی محلی حمایت می‌کند.",
      features: [
        "ارزیابی‌های زیست‌محیطی برای هر پروژه",
        "برنامه‌های كاشت درخت و جنگل‌کاری مجدد",
        "محوطه‌سازی سبز با اولویت گونه‌های بومی",
        "بازسازی زیستگاه در مناطق آسیب‌دیده",
        "نظارت بر تنوع زیستی در حین و بعد از ساخت و ساز",
      ],
      benefits: [
        { title: "اکوسیستم‌های محافظت‌شده", description: "بررسی‌های پیش از ساخت و نظارت مداوم آسیب به گیاهان و جانوران محلی را به حداقل می‌رساند." },
        { title: "روابط قوی‌تر با جامعه", description: "سبز کردن و بازسازی قابل مشاهده حسن نظر جامعه و حمایت محلی ماندگار را ایجاد می‌کند." },
        { title: "انطباق رگولاتوری", description: "فرآیندهای EIA مستند رگولاتورها و نیازهای اهداکنندگان را برآورده می‌کند." },
        { title: "سود تنوع زیستی بلندمدت", description: "گونه‌های بومی و بازسازی زیستگاه سایت را بهتر از آنچه یافتیم ترک می‌کنند." },
      ],
      stats: [
        { value: "۱۰۰٪",  label: "پروژه‌ها ارزیابی EIA شده" },
        { value: "درختان", label: "كاشته شده در هر پروژه" },
        { value: "محلی", label: "اولویت گونه‌های بومی" },
      ],
      highlights: ["مطالعات EIA", "كاشت درخت", "گونه‌های بومی", "بازسازی زیستگاه"],
      practices: [
        "بررسی‌های پایه تنوع زیستی پیش از ساخت",
        "كاشت درخت با نهالستان‌ها و جوامع محلی",
        "انتخاب گونه‌های بومی برای همه محوطه‌سازی",
        "گزارش‌های نظارت بر زیستگاه پس از ساخت",
      ],
    },
  },

  // ── Methodology step modal content (Dari) ──────────────────────────────
  methodologyDetails: {
    1: {
      tagline: "پایه را تنظیم کنید. قبل از چیدن اولین آجر.",
      description: "هر ساخت موفق با درک دقیق از سایت، خلاصه، بودجه و ریسک‌ها شروع می‌شود. در مرحله ۱ ما ذین‌فعان را همسو می‌کنیم، امکان‌سنجی را تأیید می‌کنیم، بودجه‌ها و زمان‌بندی‌ها را قفل می‌کنیم و مجوزهایی را که ساخت و ساز را قانونی می‌کنند به دست می‌آوریم.",
      activities: [
        "ارزیابی سایت، بررسی‌های توپوگرافی و تحقیقات ژئوتکنیکی",
        "مطالعه امکان‌سنجی شامل امکان‌سنجی فنی، مالی و رگولاتوری",
        "بودجه‌بندی دقیق، گزینه‌های مهندسی ارزش و پایه‌گذاری زمان‌بندی",
        "کارگاه‌های همسویی ذینفعان با مشتری، مقامات و شرکا",
        "پروفایل ریسک با برنامه‌های کاهش و معیارهای دروازه تصمیم",
        "مجوزها، صدور مجوز و تأییدیه‌های قانونی",
      ],
      deliverables: [
        "گزارش امکان‌سنجی تأیید شده",
        "زمان‌بندی اصلی با دروازه‌های مرحله‌ای",
        "بودجه کلاس A با احتیاط‌ها",
        "ثبت ریسک و برنامه کاهش",
        "مجوزها و پرونده تأییدیه‌های قانونی",
      ],
      responsibilities: [
        { role: "مدیر پروژه", description: "مالک رابطه با مشتری و تأیید نهایی امکان‌سنجی، بودجه و زمان‌بندی است." },
        { role: "راهنمای برنامه‌ریزی", description: "مطالعه امکان‌سنجی، صدور مجوز و کارگاه‌های همسویی ذینفعان را هدایت می‌کند." },
        { role: "مهندس هزینه", description: "بودجه را می‌سازد، مهندسی ارزش را اجرا می‌کند و احتیاط‌های هزینه را ردیابی می‌کند." },
        { role: "مدیر ریسک", description: "ثبت ریسک را حفظ می‌کند و اطمینان می‌دهد که کاهش‌ها تخصیص داده شده و ردیابی می‌شوند." },
      ],
      stats: [
        { value: "۱۰۰٪", label: "مجوزها قبل از مرحله ۲" },
        { value: "کلاس A", label: "هدف دقت بودجه" },
        { value: "۵+",    label: "گروه‌های ذینفعان همسو" },
      ],
      highlights: ["مطالعه امکان‌سنجی", "ثبت ریسک", "مجوزها", "بودجه"],
      duration: "۲–۴ هفته",
      tools: ["MS Project", "Primavera P6", "ماتریس ریسک", "AutoCAD", "کدهای ساختمانی محلی"],
    },
    2: {
      tagline: "مهندسی برای قابلیت ساخت. جزئیات برای وضوح.",
      description: "مرحله ۲ امکان‌سنجی تأیید شده را به یک طراحی fully coordinated و h قابل ساخت تبدیل می‌کند. معماری، سازه، MEP و سیستم‌های زیست‌محیطی به صورت موازی طراحی می‌شوند و در BIM هماهنگ می‌شوند تا پروژه بتواند ایمن، کارآمد و با بالاترین کیفیت ساخته شود.",
      activities: [
        "توسعه طراحی معماری و نقشه‌های تفصیلی",
        "تحلیل انجینری سازه و طراحی اعضا",
        "طراحی و هماهنگی سیستم MEP",
        "هماهنگی BIM در همه رشته‌ها برای مدل‌های بدون تداخل",
        "مهندسی ارزش برای بهینه‌سازی هزینه بدون به خطر انداختن کیفیت",
        "بررسی‌های طراحی مشتری و تأیید نقطه عطف",
      ],
      deliverables: [
        "مجموعه نقشه‌های صادر شده برای ساخت (IFC)",
        "مدل BIM هماهنگ",
        "مشخصات و برنامه‌های مواد",
        "گزارش مهندسی ارزش",
        "بسته طراحی تأیید شده توسط مشتری",
      ],
      responsibilities: [
        { role: "معمار ارشد", description: "مالک طراحی معماری و اطمینان از برآورده شدن خلاصه، کد و زیبایی‌شناسی." },
        { role: "راهنمای سازه", description: "سازه را برای ایمنی، دوام و قابلیت ساخت در بودجه طراحی می‌کند." },
        { role: "راهنمای MEP", description: "سیستم‌های مکانیکی، الکتریکی و لوله‌کشی را طبق خلاصه و کد طراحی می‌کند." },
        { role: "هماهنگ‌کننده BIM", description: "تشخیص تداخل را اجرا می‌کند و هماهنگی همه رشته‌ها در مدل را تضمین می‌کند." },
      ],
      stats: [
        { value: "BIM",   label: "هماهنگی در هر پروژه" },
        { value: "صفر",  label: "تداخل‌های اصلی در سایت" },
        { value: "IFC",   label: "مجموعه نقشه تحویل شده" },
      ],
      highlights: ["هماهنگی BIM", "مهندسی ارزش", "نقشه‌های IFC", "طراحی MEP"],
      duration: "۴–۸ هفته",
      tools: ["Revit", "AutoCAD", "TEKLA", "BIM 360", "ETABS"],
    },
    3: {
      tagline: "مواد مناسب. فروشنده مناسب. زمان مناسب.",
      description: "مرحله ۳ طراحی را به یک زنجیره تأمین واقعی تبدیل می‌کند. ما تأمین‌کنندگان را صلاحیت‌سنجی می‌کنیم، مواد و تجهیزات را تهیه می‌کنیم، بسیج نیروی کار را برنامه‌ریزی می‌کنیم و لجستیک را هماهنگ می‌کنیم تا همه چیز به موقع و به مشخصات در سایت برسد.",
      activities: [
        "صلاحیت‌سنجی تأمین‌کننده و ممیزی‌های پیش‌صلاحیت",
        "تهیه مواد با تأیید کیفیت در مبدأ",
        "برنامه‌ریزی بسیج تجهیزات و لجستیک",
        "برنامه‌ریزی، استخدام و onboarding نیروی کار",
        "تهیه پیمانکار فرعی و مدیریت قرارداد",
        "برنامه تهیه همسو با برنامه ساخت و ساز",
      ],
      deliverables: [
        "لیست تأمین‌کنندگان و فروشندگان تأیید شده",
        "سفارشات خرید مواد با نقاط عطف تحویل",
        "برنامه بسیج تجهیزات",
        "برنامه بسیج نیروی کار",
        "توافقات پیمانکار فرعی",
      ],
      responsibilities: [
        { role: "مدیر تهیه", description: "مالک انتخاب تأمین‌کننده، مذاکره و مدیریت سفارش خرید." },
        { role: "راهنمای لجستیک", description: "تحویل، گمرک، ذخیره‌سازی و جابجایی مواد در سایت را برنامه‌ریزی می‌کند." },
        { role: "راهنمای HR", description: "استخدام، onboarding و انطباق گواهینامه نیروی کار را هدایت می‌کند." },
        { role: "مدیر تجاری", description: "قراردادهای پیمانکار فرعی، پرداخت‌ها و تخصیص ریسک را مدیریت می‌کند." },
      ],
      stats: [
        { value: "۱۰۰٪", label: "مواد پیش‌صلاحیت شده" },
        { value: "به موقع", label: "هدف تحویل" },
        { value: "رده ۱", label: "صلاحیت پیمانکار فرعی" },
      ],
      highlights: ["صلاحیت تأمین‌کننده", "تأمین مواد", "لجستیک", "برنامه‌ریزی نیروی کار"],
      duration: "۲–۶ هفته (همپوشانی با مرحله ۲)",
      tools: ["سیستم‌های ERP", "پورتال‌های تأمین‌کننده", "نرم‌افزار لجستیک", "ردیابی مواد"],
    },
    4: {
      tagline: "ایمن بسازید. به موقع. در بودجه.",
      description: "اینجا جایی است که طراحی با زمین ملاقات می‌کند. مرحله ۴ سایت را بسیج می‌کند، حرفه‌ها را هماهنگ می‌کند، HSE را اجرا می‌کند، زمان‌بندی و هزینه را کنترل می‌کند و روزانه گزارش می‌دهد تا مشتری همیشه بداند پروژه‌اش دقیقاً در کجا ایستاده است.",
      activities: [
        "بسیج سایت شامل حصار، دفاتر، تأسیسات و رفاه",
        "هماهنگی حرفه‌ها و توالی روزانه کار",
        "مدیریت HSE، جلسات جعبه ابزار روزانه و گزارش حوادث",
        "کنترل زمان‌بندی با نگاه‌رو به جلو هفتگی و بازیابی لغزش",
        "گزارش‌دهی روزانه با عکس، پیشرفت و مسائل ثبت شده",
        "مدیریت سفارش تغییر با تأییدیه‌های مستند",
      ],
      deliverables: [
        "سایت ساخت و ساز بسیج شده و عملیاتی",
        "گزارش‌های پیشرفت هفتگی با شواهد عکسی",
        "برنامه به‌روز شده با نگاه‌رو به جلو",
        "آمار HSE و گزارش‌های حوادث",
        "گزارش تغییر با تأییدیه‌های مشتری",
      ],
      responsibilities: [
        { role: "مدیر سایت", description: "مالک عملیات روزانه سایت، توالی و هماهنگی حرفه‌ها." },
        { role: "افسر HSE", description: "استانداردهای ایمنی را اجرا می‌کند، جلسات جعبه ابزار را اجرا می‌کند و حوادث را گزارش می‌دهد." },
        { role: "برنامه‌ریز", description: "برنامه اصلی و نگاه‌های هفتگی به جلو را حفظ می‌کند، ریسک‌های لغزش را زود شناسایی می‌کند." },
        { role: "مهندس پروژه", description: "سؤالات فنی را حل می‌کند، RFI را مدیریت می‌کند و انطباق با مشخصات را تضمین می‌کند." },
      ],
      stats: [
        { value: "روزانه",   label: "گزارش‌دهی" },
        { value: "صفر",    label: "تحمل نقض HSE" },
        { value: "به موقع", label: "هدف تحویل نقطه عطف" },
      ],
      highlights: ["بسیج سایت", "مدیریت HSE", "کنترل زمان‌بندی", "گزارش‌دهی روزانه"],
      duration: "اکثریت زمان‌بندی پروژه",
      tools: ["MS Project", "گزارش‌های روزانه", "نرم‌افزار HSE", "بررسی‌های هوایی"],
    },
    5: {
      tagline: "در هر مرحله تأیید شده. مستند end-to-end.",
      description: "کیفیت یک انضباط است، not یک بازرسی. مرحله ۵ QC سه مرحله‌ای را اجرا می‌کند — تأیید مواد پیش از ساخت، بازرسی‌های مرحله‌ای حین ساخت، و تأیید نهایی پس از ساخت — با پشتوانه حسابرسی‌های مستقل شخص ثالث و مستندات کامل as-built.",
      activities: [
        "آزمایش مواد و صدور گواهی در مبدأ و سایت",
        "بازرسی‌های مرحله‌ای در نقاط عطف سازه، MEP و پرداخت",
        "حسابرسی‌های QA مستقل شخص ثالث",
        "مستندات as-built و مدل تحویل BIM",
        "بررسی‌های انطباق با کدها، مشخصات و نیازهای مشتری",
      ],
      deliverables: [
        "گواهی‌های آزمایش مواد و گزارش‌های آزمایشگاه",
        "تأییدیه‌های بازرسی مرحله‌ای با شواهد عکسی",
        "گزارش‌های حسابرسی شخص ثالث",
        "نقشه‌های as-built و مدل تحویل BIM",
        "پرونده انطباق و ترخیص کد",
      ],
      responsibilities: [
        { role: "مدیر QA / QC", description: "مالک برنامه بازرسی و آزمایش است و هر مرحله را تأیید می‌کند." },
        { role: "مهندس مواد", description: "تمام مواد ورودی را قبل از استفاده در مقابل مشخصات تأیید می‌کند." },
        { role: "حسابرس شخص ثالث", description: "تأیید مستقل در سیستم‌های حیاتی سازه و ایمنی فراهم می‌کند." },
        { role: "کنترل‌کننده اسناد", description: "سابقه as-built، مدل BIM و پرونده انطباق را حفظ می‌کند." },
      ],
      stats: [
        { value: "۳",     label: "مرحله QC در هر پروژه" },
        { value: "۱۰۰٪",  label: "مواد قبل از استفاده آزمایش شده" },
        { value: "شخص ثالث",   label: "حسابرسی‌ها در کارهای حیاتی" },
      ],
      highlights: ["بازرسی‌های مرحله‌ای", "آزمایش مواد", "QA شخص ثالث", "مستندات As-built"],
      duration: "مداوم از طریق مراحل ۴–۶",
      tools: ["ITP ها", "گزارش‌های آزمایشگاه", "BIM 360", "استانداردهای کد", "چک‌لیست‌های حسابرسی"],
    },
    6: {
      tagline: "تحویل با اطمینان. پشتیبانی پس از تحویل.",
      description: "تحویل خط پایان نیست — شروع عمر عملیاتی دارایی است. مرحله ۶ سیستم‌ها را راه‌اندازی می‌کند، مستندات کامل و مدل‌های BIM را تحویل می‌دهد، تیم‌های مشتری را آموزش می‌دهد، دوره نقص را تعریف می‌کند و برای پشتیبانی پس از تحویل در دسترس می‌ماند.",
      activities: [
        "راه‌اندازی سیستم و تأیید عملکرد",
        "تحویل دفترچه O&M",
        "آموزش تیم مشتری در مورد سیستم‌ها و تجهیزات",
        "تنظیم دوره نقص با SLA های پاسخ",
        "پشتیبانی پس از تحویل و بازرسی‌ها",
      ],
      deliverables: [
        "گواهی‌های راه‌اندازی و برگه‌های آزمایش",
        "دفترچه‌های کامل O&M (چاپی + دیجیتال)",
        "سوابق و مواد آموزشی مشتری",
        "توافق دوره نقص با SLA ها",
        "مدل BIM as-built و دوقلوی دیجیتال",
      ],
      responsibilities: [
        { role: "راهنماا راه‌اندازی", description: "تأیید می‌کند هر سیستم قبل از تحویل مشتری طبق مشخصات عمل می‌کند." },
        { role: "کنترل‌کننده اسناد", description: "بسته کامل O&M و as-built را تحویل می‌دهد." },
        { role: "راهنمای آموزش", description: "آموزش hands-on را برای تیم عملیات مشتری اجرا می‌کند." },
        { role: "مدیر پس از تحویل", description: "مالک دوره نقص و پشتیبانی مداوم پس از تحویل است." },
      ],
      stats: [
        { value: "۱۰۰٪", label: "سیستم‌ها قبل از تحویل راه‌اندازی شده" },
        { value: "DLP",   label: "دوره نقص included included" },
        { value: "۲۴/۷",  label: "پشتیبانی پس از تحویل موجود" },
      ],
      highlights: ["راه‌اندازی", "دفترچه‌های O&M", "آموزش مشتری", "پس از تحویل"],
      duration: "۴–۸ هفته تحویل + DLP",
      tools: ["اسکریپت‌های راه‌اندازی", "تحویل BIM", "CMMS", "کیت‌های آموزشی", "ردیاب DLP"],
    },
  },

  // ── Dashboard admin panel ───────────────────────────────────────────────
  dashboard: {
    title: "صندوق ورودی",
    newBadge: (n) => `${n} جدید`,
    searchPlaceholder: "جستجوی مخاطبین...",
    loading: "در حال بارگذاری مخاطبین...",
    retry: "تلاش دوباره",
    failedToLoad: "بارگذاری مخاطبین ناموفق بود. لطفاً دوباره تلاش کنید.",
    failedToMarkRead: "علامت‌گذاری پیام به عنوان خوانده شده ناموفق بود.",
    sidebar: {
      adminDashboard: "داشبورد مدیر", contactMessages: "پیام‌های تماس",
      inbox: "صندوق ورودی", profile: "پروفایل", settings: "تنظیمات", logout: "خروج",
    },
    card: { submittedRelativePrefix: "" },
    modal: {
      title: "جزئیات تماس", message: "پیام", additionalInfo: "اطلاعات تکمیلی",
      fullName: "نام کامل", company: "شرکت", email: "ایمیل",
      submissionDate: "تاریخ ارسال", submittedOn: (d) => `ارسال شده در ${d}`,
      close: "بستن", markHandled: "علامت‌گذاری به عنوان رسیدگی شده",
    },
    empty: {
      noResultsTitle: "نتیجه‌ای یفت نشد",
      noResultsBody: (q) => `هیچ مخاطبی مطابق با «${q}» یافت نشد. شرایط جستجوی خود را تنظیم کنید.`,
      emptyTitle: "صندوق ورودی شما خالی است",
      emptyBody: "وقتی ارسال‌های جدید فرم تماس دریافت کنید، در اینجا نمایش داده می‌شوند.",
    },
  },
};
const dictionaries = { en, fa };
export function translate(lang, key, ...args) {
  const dict = dictionaries[lang] || dictionaries.en;
  const parts = String(key).split(".");
  let cur = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else {
      let fb = dictionaries.en;
      for (const fp of parts) {
        if (fb && typeof fb === "object" && fp in fb) fb = fb[fp];
        else return key;
      }
      return typeof fb === "function" ? fb(...args) : fb;
    }
  }
  return typeof cur === "function" ? cur(...args) : cur;
}
export function isRtl(lang) {
  return lang === "fa" || lang === "ar" || lang === "he" || lang === "ur";
}
export const SUPPORTED_LANGS = [
  { code: "en", label: "EN", nativeLabel: "English" },
  { code: "fa", label: "دری", nativeLabel: "دری" },
];
