// sustainabilityDetails.js
// ─────────────────────────────────────────────────────────────────────────────
// Rich, unique content for each of the five Sustainability pillars shown on
// the Home page. Consumed by SustainabilityModal.
//
// Each pillar object provides:
//   • icon       — name registered in components/ui/IconByName.jsx
//   • tagline    — short line shown in the modal header
//   • description— 2-3 sentence detailed paragraph (unique per pillar)
//   • features   — array of 5 short feature strings
//   • benefits   — array of 4 {title, description} benefit cards
//   • stats      — array of 3 {value, label} hero numbers
//   • highlights — array of 4 short visual badges
//   • practices  — array of 3-4 best-practice strings (extra unique content)
//   • accent     — Tailwind utility tokens for theming the modal
// ─────────────────────────────────────────────────────────────────────────────

export const sustainabilityDetails = {
  // Each pillar object MUST include `title` matching the key above.
  // SustainabilityModal builds the translation key as
  // `sustainabilityDetails.${pillar.title}`; a missing title field
  // silently produces "sustainabilityDetails.undefined.*" — see the
  // matching note in data/pillarDetails.js.
  "Sustainable Construction": {
    title: "Sustainable Construction",
    icon: "Leaf",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Built to last. Engineered to tread lightly.",
    description:
      "Sustainable construction at SMS is a holistic discipline — it shapes every material choice, every design decision, and every site practice from the first sketch to final handover. We specify low-carbon concrete, recycled aggregates, sustainably-sourced timber, and passive design strategies so our buildings consume less energy, generate less waste, and serve their occupants comfortably for decades.",
    features: [
      "Energy-efficient architectural and MEP design from day one",
      "Sustainable material sourcing with full chain-of-custody",
      "Low-carbon concrete mixes and recycled aggregate substitutes",
      "Passive cooling, natural daylighting, and high-performance insulation",
      "Solar PV integration for on-site renewable generation",
    ],
    benefits: [
      { title: "Lower lifetime cost", description: "Energy-efficient envelopes and systems cut utility bills from day one and add up to major savings over the asset's life." },
      { title: "Healthier occupants", description: "Natural light, fresh-air ventilation, and low-VOC finishes create more comfortable, productive indoor environments." },
      { title: "Reduced embodied carbon", description: "Material substitutions and optimised structural design shrink the carbon footprint before the building is even occupied." },
      { title: "Future-ready assets", description: "Buildings designed to today's sustainability standards stay compliant and valuable as regulations tighten over the coming decade." },
    ],
    stats: [
      { value: "40%+", label: "Energy savings potential" },
      { value: "30%+", label: "Embodied carbon reduction" },
      { value: "Zero",  label: "Net waste to landfill goal" },
    ],
    highlights: ["Low-Carbon", "Passive Design", "Solar Ready", "Sustainable Sourcing"],
    practices: [
      "Whole-life carbon assessment on every design",
      "Material passports documenting origin & embodied carbon",
      "Commissioning and post-occupancy energy verification",
      "Local sourcing to cut transport emissions",
    ],
  },

  "Waste Management": {
    title: "Waste Management",
    icon: "Recycle",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Less waste. More value. Cleaner sites.",
    description:
      "Construction and demolition waste is one of the largest waste streams worldwide. SMS tackles it head-on with on-site segregation, material reuse programs, certified recycling partners, and safe disposal pathways for hazardous materials — turning what would be landfill into recovered resources and protecting workers and communities in the process.",
    features: [
      "Construction & demolition (C&D) waste management plans",
      "On-site source segregation into reusable, recyclable, and disposal streams",
      "Partner recycling programs for concrete, metal, timber, and packaging",
      "Material waste reduction through prefabrication and just-in-time delivery",
      "Safe handling and disposal of hazardous materials",
    ],
    benefits: [
      { title: "Reduced landfill", description: "Segregation and recycling divert the vast majority of site waste away from landfill — protecting land and groundwater." },
      { title: "Lower project cost", description: "Reusing formwork, packaging, and excavated material on-site cuts procurement and disposal expenses." },
      { title: "Regulatory safety", description: "Documented handling of hazardous materials protects workers, communities, and clients from liability." },
      { title: "Better community relations", description: "Clean, well-managed sites are quieter, safer, and more welcome in the neighbourhoods where we build." },
    ],
    stats: [
      { value: "75%+",  label: "Target diversion from landfill" },
      { value: "5",     label: "Waste streams segregated on-site" },
      { value: "100%",  label: "Hazardous materials tracked" },
    ],
    highlights: ["C&D Plan", "Segregation", "Recycling", "Hazard Safety"],
    practices: [
      "Weekly waste audits with photo evidence",
      "Just-in-time deliveries to minimise on-site stockpiling",
      "Reusable formwork and packaging take-back schemes",
      "Certified disposal partners with full manifests",
    ],
  },

  "Water Conservation": {
    title: "Water Conservation",
    icon: "Droplet",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Every drop counts. From site to operation.",
    description:
      "Water is life — and in many of the regions where we build, it's scarce. SMS designs water-efficient construction processes, integrates rainwater harvesting, manages stormwater on-site, and prevents water pollution at every stage. The result: projects that protect local watersheds during construction and continue to save water for their occupants for decades.",
    features: [
      "Water-efficient construction practices and dust-suppression recycling",
      "Rainwater harvesting systems sized to roof catchment and demand",
      "Stormwater management with detention, retention, and bioswales",
      "Water pollution prevention with bunded washout and silt controls",
      "Low-flow fixtures and greywater reuse in completed buildings",
    ],
    benefits: [
      { title: "Lower operating cost", description: "Rainwater harvesting and greywater reuse cut municipal water bills — quickly paying back the install cost." },
      { title: "Resilience in scarcity", description: "On-site water storage keeps operations running through supply interruptions and dry seasons." },
      { title: "Watershed protection", description: "Stormwater management and pollution prevention keep sediment and chemicals out of local rivers and groundwater." },
      { title: "Regulatory alignment", description: "Best-practice water management anticipates tightening drainage and discharge regulations." },
    ],
    stats: [
      { value: "50%+", label: "Potential non-potable offset" },
      { value: "Zero",  label: "Untreated site runoff" },
      { value: "24/7",  label: "Monitoring during construction" },
    ],
    highlights: ["Rainwater", "Stormwater", "Greywater", "Efficient Fixtures"],
    practices: [
      "Pre-construction water-balance study",
      "Bunded fuel and chemical storage on every site",
      "Wheel-wash and silt-trap maintenance logs",
      "Post-occupancy water-use benchmarking",
    ],
  },

  "Renewable Energy": {
    title: "Renewable Energy",
    icon: "Sun",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Powering projects with the sun — and beyond.",
    description:
      "Renewable energy turns buildings from energy consumers into energy producers. SMS integrates solar PV systems, LED lighting, energy-efficient HVAC, and prefabricated components that slash site energy use — while partnering with specialists for larger wind, hybrid, and microgrid solutions where the project and the grid allow.",
    features: [
      "Solar PV system design, installation, and commissioning",
      "LED lighting and smart controls across all completed facilities",
      "Energy-efficient HVAC, motors, and building-management systems",
      "Prefabrication to reduce on-site construction energy demand",
      "Hybrid systems and microgrids for remote or off-grid projects",
    ],
    benefits: [
      { title: "Lower operating cost", description: "On-site solar and efficient systems slash electricity bills — and hedge against future tariff increases." },
      { title: "Energy independence", description: "Hybrid systems and battery storage keep critical loads running through grid outages and remote constraints." },
      { title: "Carbon reduction", description: "Displacing grid electricity with on-site renewables cuts operational carbon year after year." },
      { title: "Long-term resilience", description: "Modern, efficient systems need less maintenance, last longer, and adapt easily to future upgrades." },
    ],
    stats: [
      { value: "50%+",  label: "Typical daytime offset with solar" },
      { value: "60%+",  label: "Lighting savings with LED + controls" },
      { value: "Hybrid", label: "Systems available off-grid" },
    ],
    highlights: ["Solar PV", "LED Lighting", "Smart HVAC", "Microgrids"],
    practices: [
      "Solar yield modelling before sizing decisions",
      "Battery-ready inverter selection for future storage",
      "Lifecycle cost vs. upfront cost analysis for clients",
      "Remote monitoring dashboards on every PV install",
    ],
  },

  "Environmental Impact Assessment": {
    title: "Environmental Impact Assessment",
    icon: "TreePine",
    accent: {
      chip: "bg-smsgold-400/15 text-smsgold-400 border-smsgold-400/30",
      stat: "text-smsgold-400",
      ring: "ring-smsgold-400/40",
    },
    tagline: "Measure first. Then build responsibly.",
    description:
      "Every responsible project starts with understanding its environment. SMS conducts thorough environmental assessments, plans tree-planting and green landscaping, designs habitat restoration into disturbed areas, and aligns with national environmental standards — so the natural systems around our projects are stronger after we leave, not weaker.",
    features: [
      "Environmental and social impact assessments",
      "Tree-plantation programs tied to every project's footprint",
      "Green landscaping using native, drought-tolerant species",
      "Habitat restoration in disturbed or buffer zones",
      "Compliance with national environmental legislation and codes",
    ],
    benefits: [
      { title: "Informed decisions", description: "Baseline studies and impact assessments give clients, communities, and regulators the evidence to proceed with confidence." },
      { title: "Restored ecosystems", description: "Tree planting and habitat work leave disturbed sites measurably greener and more biodiverse than we found them." },
      { title: "Community goodwill", description: "Visible greening and habitat programs build local pride and acceptance around our projects." },
      { title: "Regulatory confidence", description: "Documented compliance protects projects from delays, fines, and post-construction disputes." },
    ],
    stats: [
      { value: "100%", label: "Projects with baseline EIA" },
      { value: "2:1",   label: "Tree replacement ratio target" },
      { value: "Local", label: "Native species prioritised" },
    ],
    highlights: ["EIA Studies", "Tree Planting", "Native Species", "Habitat Restore"],
    practices: [
      "Pre-construction biodiversity baseline surveys",
      "Tree survival audits at 6 and 12 months",
      "Community greening partnerships for public spaces",
      "Post-handover environmental monitoring plans",
    ],
  },
};
