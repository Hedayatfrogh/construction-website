// methodologyDetails.js
// ─────────────────────────────────────────────────────────────────────────────
// Rich, unique content for each of the six methodology steps shown on the
// Home page "Our Methodology" section. Consumed by MethodologyModal.
//
// Each step object provides:
//   • icon          — name registered in components/ui/IconByName.jsx
//   • tagline       — short line shown in the modal header
//   • description   — 2-3 sentence detailed paragraph (unique per step)
//   • activities    — array of 6 process / activity strings
//   • deliverables  — array of 5 tangible outputs the client receives
//   • responsibilities— array of 4 {role, description} "who does what"
//   • stats         — array of 3 {value, label} hero numbers
//   • highlights    — array of 4 short visual badges
//   • duration      — typical timeframe string ("2–4 weeks", etc.)
//   • tools         — array of 4-5 tools / standards used in this step
//   • accent        — Tailwind utility tokens for theming the modal
// ─────────────────────────────────────────────────────────────────────────────

export const methodologyDetails = {
  1: {
    icon: "ClipboardList",
    accent: {
      chip: "bg-smsorange-50 text-smsorange-600 border-smsorange-200",
      stat: "text-smsorange-600",
      ring: "ring-smsorange-300",
      bar: "bg-smsorange-500",
    },
    tagline: "Set the foundation. Before a single brick is laid.",
    description:
      "Every successful build starts with a rigorous understanding of the site, the brief, the budget, and the risks. In Step 1 we align stakeholders, validate feasibility, lock in budgets and schedules, and secure the permits that make construction legal — so the rest of the project runs on solid ground, not assumptions.",
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
    icon: "PencilRuler",
    accent: {
      chip: "bg-smsorange-50 text-smsorange-600 border-smsorange-200",
      stat: "text-smsorange-600",
      ring: "ring-smsorange-300",
      bar: "bg-smsorange-500",
    },
    tagline: "Engineered in the model. Coordinated before the field.",
    description:
      "Great buildings start as great models. In Step 2 our architects, structural, MEP, and environmental engineers work together inside a coordinated BIM environment — catching clashes on-screen instead of on-site, running value engineering, and producing the construction-ready drawings and specifications that turn a vision into buildable reality.",
    activities: [
      "Architectural concept and detailed design development",
      "Structural analysis, design, and member-sizing",
      "Mechanical, electrical, and plumbing (MEP) engineering",
      "Environmental and sustainability design integration",
      "BIM coordination with clash detection across disciplines",
      "Value engineering and constructability reviews",
    ],
    deliverables: [
      "Coordinated BIM model (LOD 300–350)",
      "Issued-for-construction (IFC) drawing set",
      "Technical specifications and material schedules",
      "MEP coordinated services drawings",
      "Value-engineering report with savings options",
    ],
    responsibilities: [
      { role: "Lead Architect", description: "Owns the architectural design intent and ensures it remains buildable and code-compliant." },
      { role: "Structural Engineer", description: "Designs the structure for safety, durability, and material efficiency." },
      { role: "MEP Engineer", description: "Coordinates mechanical, electrical, and plumbing systems within the BIM model." },
      { role: "BIM Coordinator", description: "Runs clash detection, federates models, and issues coordination reports weekly." },
    ],
    stats: [
      { value: "LOD 350", label: "BIM maturity target" },
      { value: "<2%",    label: "Design-stage clashes carried to site" },
      { value: "15%+",   label: "Typical VE savings vs. baseline" },
    ],
    highlights: ["BIM Coordination", "Value Engineering", "MEP Design", "IFC Drawings"],
    duration: "4–10 weeks",
    tools: ["Revit", "Tekla Structures", "Navisworks", "AutoCAD MEP", "ETABS"],
  },

  3: {
    icon: "Truck",
    accent: {
      chip: "bg-smsorange-50 text-smsorange-600 border-smsorange-200",
      stat: "text-smsorange-600",
      ring: "ring-smsorange-300",
      bar: "bg-smsorange-500",
    },
    tagline: "Right material. Right vendor. Right time.",
    description:
      "A schedule is only as good as the supply chain behind it. In Step 3 we qualify vendors, lock in material specifications, mobilise equipment, and plan our workforce — so when construction starts, nothing is missing, nothing is late, and everything that arrives on site meets our quality bar.",
    activities: [
      "Vendor pre-qualification and framework agreements",
      "Material procurement with specification verification",
      "Equipment selection, sourcing, and mobilisation planning",
      "Workforce planning across trades and shifts",
      "Logistics routing and just-in-time delivery scheduling",
      "Warehouse and lay-down area setup",
    ],
    deliverables: [
      "Approved vendor list with framework agreements",
      "Material procurement schedule (MPS)",
      "Equipment mobilisation plan and registry",
      "Workforce organogram with shift rotations",
      "Logistics and delivery calendar",
    ],
    responsibilities: [
      { role: "Procurement Manager", description: "Owns vendor qualification, contracts, and material delivery against the schedule." },
      { role: "Plant & Equipment Lead", description: "Sources, inspects, and mobilises heavy equipment to site on time." },
      { role: "HR / Workforce Lead", description: "Plans trades, shifts, and accommodation for the project workforce." },
      { role: "Logistics Coordinator", description: "Schedules deliveries, manages lay-down, and clears customs where required." },
    ],
    stats: [
      { value: "100%",  label: "Materials spec-verified before delivery" },
      { value: "JIT",   label: "Delivery model to cut site waste" },
      { value: "Tier 1", label: "Vendor preference for critical items" },
    ],
    highlights: ["Vendor Qualification", "Material Specs", "Equipment", "Workforce"],
    duration: "Ongoing through Step 4",
    tools: ["SAP / ERP", "MS Project", "Vendor Portals", "ISO 9001", "Customs Docs"],
  },

  4: {
    icon: "HardHat",
    accent: {
      chip: "bg-smsorange-50 text-smsorange-600 border-smsorange-200",
      stat: "text-smsorange-600",
      ring: "ring-smsorange-300",
      bar: "bg-smsorange-500",
    },
    tagline: "Safe sites. Disciplined execution. Daily reporting.",
    description:
      "This is where the project becomes real. Step 4 is the on-site construction phase — mobilised trades, supervised activities, daily progress and HSE reporting, and disciplined schedule and cost control. Every crew knows the plan for the day, every risk is managed, and the client sees a transparent picture of progress every single day.",
    activities: [
      "Site mobilisation, fencing, temporary facilities, and signage",
      "Trade coordination with daily look-ahead planning",
      "HSE management, toolbox talks, and incident reporting",
      "Schedule control with earned-value tracking",
      "Daily progress, photo, and cost reporting to client",
      "Change-order management and decision logging",
    ],
    deliverables: [
      "Daily progress reports with photos",
      "Weekly HSE and schedule dashboards",
      "Earned-value schedule updates",
      "Change order log with approvals",
      "Trade coordination look-ahead plans",
    ],
    responsibilities: [
      { role: "Site Manager", description: "Owns day-to-day execution, safety, and progress on the ground." },
      { role: "HSE Officer", description: "Runs daily toolbox talks, inspections, and incident investigations." },
      { role: "Planning Engineer", description: "Maintains the master schedule and weekly look-aheads." },
      { role: "Commercial Lead", description: "Tracks cost, progress payments, and change orders in real time." },
    ],
    stats: [
      { value: "Daily", label: "Progress reports" },
      { value: "Zero",  label: "Tolerance for missed toolbox talks" },
      { value: "EVM",   label: "Earned-value tracking enabled" },
    ],
    highlights: ["HSE Management", "Daily Reporting", "Schedule Control", "Trade Coordination"],
    duration: "Main build phase",
    tools: ["MS Project", "Procore", "HSE Checklists", "Earned-Value", "Drone Photos"],
  },

  5: {
    icon: "BadgeCheck",
    accent: {
      chip: "bg-smsorange-50 text-smsorange-600 border-smsorange-200",
      stat: "text-smsorange-600",
      ring: "ring-smsorange-300",
      bar: "bg-smsorange-500",
    },
    tagline: "Verified at every stage. Not just at the end.",
    description:
      "Quality is not a checkpoint — it's a discipline that runs across the entire build. Step 5 embeds our three-stage quality control process into the live project: pre-construction planning and material verification, during-construction inspections and third-party QA, and post-construction compliance checks before handover.",
    activities: [
      "Material testing and laboratory verification",
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
    icon: "KeyRound",
    accent: {
      chip: "bg-smsorange-50 text-smsorange-600 border-smsorange-200",
      stat: "text-smsorange-600",
      ring: "ring-smsorange-300",
      bar: "bg-smsorange-500",
    },
    tagline: "Hand over with confidence. Support after handover.",
    description:
      "Handover isn't the finish line — it's the start of the asset's operating life. Step 6 commissions systems, hands over complete documentation and BIM models, trains client teams, defines a defects-liability period, and stays on call for aftercare support so the asset performs exactly as designed from day one.",
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
};
