// pillarDetails.js
// ─────────────────────────────────────────────────────────────────────────────
// Rich, unique content for each of the seven "Why SMS" pillars.
// Consumed by the PillarModal that opens when a card on the Home page
// "Why SMS" section is clicked.
//
// Each pillar object provides:
//   • icon       — name registered in components/ui/IconByName.jsx
//   • tagline    — short line shown in the modal header
//   • description— 2-3 sentence detailed paragraph (unique per pillar)
//   • features   — array of 5 short feature strings
//   • benefits   — array of 4 {title, description} benefit cards
//   • stats      — array of 3 {value, label} hero numbers
//   • highlights — array of 4 short visual badges
//   • accent     — Tailwind utility tokens for theming the modal
// ─────────────────────────────────────────────────────────────────────────────

export const pillarDetails = {
  // Each pillar object MUST include `title` matching the key above.
  // PillarModal builds the translation key as `pillarDetails.${pillar.title}`,
  // so a missing title field silently produces "pillarDetails.undefined.*"
  // — which is the bug this comment documents the fix for.
  Quality: {
    title: "Quality",
    icon: "Award",
    accent: {
      chip: "bg-smsorange-500/15 text-smsorange-400 border-smsorange-400/30",
      stat: "text-smsorange-400",
      ring: "ring-smsorange-400/40",
    },
    tagline: "Built right. Verified at every stage.",
    description:
      "Quality at SMS is not a checkpoint — it's a continuous discipline. We align every project with international ISO standards and the Afghan National Building Code, run a strict three-stage quality control process (pre-construction, during-construction, post-construction), and bring in independent third-party auditors so our clients receive verifiable evidence, not just promises.",
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
    title: "Safety",
    icon: "ShieldCheck",
    accent: {
      chip: "bg-smsorange-500/15 text-smsorange-400 border-smsorange-400/30",
      stat: "text-smsorange-400",
      ring: "ring-smsorange-400/40",
    },
    tagline: "Zero-harm. Every site. Every shift.",
    description:
      "Safety is the first item on every meeting agenda at SMS. We apply strict OHS compliance and UN safety standards, run continuous risk assessments and hazard identification, enforce PPE usage, conduct regular drills, and keep trained safety officers on every site — because a safe site is a productive site, and nothing we build is worth a person's wellbeing.",
    features: [
      "Strict OHS regulations enforced on every site",
      "UN safety standards and continuous risk assessments",
      "Hazard identification and control measures before work begins",
      "Mandatory PPE and on-site safety officers for every project",
      "Regular safety drills, training, and toolbox-talk sessions",
    ],
    benefits: [
      { title: "Zero-harm culture", description: "Every worker goes home safely — that's the non-negotiable standard we hold ourselves to, every shift." },
      { title: "Project continuity", description: "Fewer incidents mean fewer stoppages, fewer delays, and a more predictable schedule for our clients." },
      { title: "Regulatory confidence", description: "Full compliance with OHS and UN standards protects you from fines, disputes, and reputational risk." },
      { title: "Trained people", description: "A continuously trained workforce makes better decisions on-site — for themselves and for your project." },
    ],
    stats: [
      { value: "0",     label: "Compromise on PPE" },
      { value: "Daily", label: "Toolbox talks held" },
      { value: "24/7",  label: "On-site safety coverage" },
    ],
    highlights: ["OHS Compliant", "UN Standards", "PPE Enforced", "Drills & Training"],
  },

  Innovation: {
    title: "Innovation",
    icon: "Cpu",
    accent: {
      chip: "bg-smsorange-500/15 text-smsorange-400 border-smsorange-400/30",
      stat: "text-smsorange-400",
      ring: "ring-smsorange-400/40",
    },
    tagline: "Modern methods. Smarter outcomes.",
    description:
      "We treat innovation as a practical advantage, not a buzzword. From BIM coordination and prefabrication to modular construction and AI-assisted project management, we adopt the methods that shorten schedules, reduce waste, and improve predictability — and we pair every new tool with experienced engineers who know how to use it.",
    features: [
      "Building Information Modeling (BIM) for clash-free design",
      "Prefabrication and modular construction for faster delivery",
      "AI-assisted scheduling, risk modelling, and resource planning",
      "Digital twins for handover and facilities management",
      "Continuous R&D partnerships with engineering institutes",
    ],
    benefits: [
      { title: "Faster delivery", description: "Off-site prefabrication and parallel workflows compress schedules by weeks — sometimes months." },
      { title: "Fewer errors", description: "BIM clash detection catches conflicts in the model, not on-site where they cost 10x more to fix." },
      { title: "Lower waste", description: "Optimised cut-lists, modular assemblies, and digital quantity take-offs cut material waste significantly." },
      { title: "Future-ready assets", description: "Digital twins and as-built BIM models give owners a living record of their facility for the long term." },
    ],
    stats: [
      { value: "BIM",  label: "Adopted across projects" },
      { value: "30%+", label: "Faster via prefab" },
      { value: "AI",   label: "Assisted scheduling" },
    ],
    highlights: ["BIM", "Prefabrication", "Modular", "Digital Twins"],
  },

  Professionalism: {
    title: "Professionalism",
    icon: "Briefcase",
    accent: {
      chip: "bg-smsorange-500/15 text-smsorange-400 border-smsorange-400/30",
      stat: "text-smsorange-400",
      ring: "ring-smsorange-400/40",
    },
    tagline: "Disciplined. Transparent. Accountable.",
    description:
      "Professionalism at SMS means clients always know where their project stands. We run disciplined project management with clear reporting cadences, transparent cost and schedule tracking, ethical business conduct, and documented decision-making — so there are no surprises, only informed conversations.",
    features: [
      "PMBOK-aligned project management methodology",
      "Transparent weekly progress and cost reports",
      "Ethical procurement and zero-tolerance anti-corruption policy",
      "Documented change-control and decision logs",
      "Dedicated single point of contact for every client",
    ],
    benefits: [
      { title: "Clear visibility", description: "Live dashboards, weekly reports, and open-book cost tracking mean you always know what's happening." },
      { title: "Reduced risk", description: "Documented approvals and change control protect both parties from disputes and scope creep." },
      { title: "Trusted partner", description: "Ethical conduct and transparent dealings make SMS a partner you can put in front of your board." },
      { title: "Single point of contact", description: "One accountable project manager from contract signing to final handover — no relay races." },
    ],
    stats: [
      { value: "Weekly", label: "Progress reports" },
      { value: "100%",  label: "Transparent costing" },
      { value: "1",     label: "Dedicated PM per project" },
    ],
    highlights: ["PMBOK", "Transparent", "Ethical", "Single PM"],
  },

  Sustainability: {
    title: "Sustainability",
    icon: "Leaf",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Built today. Sustained for tomorrow.",
    description:
      "Sustainability at SMS means designing and building in ways that respect the land, the climate, and the people who will live with our work for generations. We use energy-efficient designs, low-carbon materials, recycled aggregates, passive cooling strategies, and integrate renewable energy — so every project leaves a lighter footprint and a stronger community.",
    features: [
      "Energy-efficient architectural and MEP design",
      "Low-carbon concrete and recycled aggregate materials",
      "Passive cooling, natural lighting, and insulation strategies",
      "Solar PV integration and renewable energy systems",
      "Construction waste segregation and recycling programs",
    ],
    benefits: [
      { title: "Lower operating cost", description: "Energy-efficient envelopes and systems cut utility bills from day one of operation." },
      { title: "Reduced carbon", description: "Material choices and renewable integration shrink your project's embodied and operational carbon." },
      { title: "Healthier occupants", description: "Passive design, natural light, and good air quality create more comfortable, productive spaces." },
      { title: "Regulatory future-proofing", description: "Anticipates tightening sustainability regulations so your asset stays compliant for decades." },
    ],
    stats: [
      { value: "40%+", label: "Energy savings potential" },
      { value: "Solar", label: "Integration available" },
      { value: "Zero",  label: "Tolerance for landfill waste" },
    ],
    highlights: ["Energy Efficient", "Low-Carbon", "Solar Ready", "Waste Recycled"],
  },

  "Client Collaboration": {
    title: "Client Collaboration",
    icon: "Handshake",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Hand-in-hand. Concept to handover.",
    description:
      "Great projects are co-authored. From the first concept sketch to the final handover walkthrough, we work hand-in-hand with our clients, their communities, and our partners — listening first, sharing decisions openly, and treating every stakeholder's input as material to the outcome, not noise to be filtered out.",
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
    title: "Social Responsibility",
    icon: "Users",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "People first. Country always.",
    description:
      "SMS was founded in Afghanistan, for Afghanistan. We hire locally wherever we operate, invest in training the next generation of Afghan engineers and tradespeople, support national development priorities, and run our projects in ways that uplift communities — because every structure we build should strengthen the country it stands in.",
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
      { value: "Local",  label: "Hiring on every site" },
      { value: "100s",   label: "Trainees mentored" },
      { value: "Afghan", label: "Supply chain priority" },
    ],
    highlights: ["Local Hiring", "Apprenticeships", "Afghan Supply", "Community"],
  },
};
