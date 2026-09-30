// adminSeed.js
// ─────────────────────────────────────────────────────────────────────────────
// Empty / placeholder defaults for the CMS collections managed from
// /admin. Each seed is the shape of one record and matches the schema
// expected by the corresponding public page on the site.
//
// IMPORTANT
//   These seeds intentionally start EMPTY (or near-empty) so the admin
//   has a clean slate to populate. The existing static arrays in
//   data/content.js, data/operations.js, data/safety.js etc. are NOT
//   duplicated here — those continue to drive the static pages. The
//   admin can decide whether to populate the CMS collections (e.g. real
//   Projects with full CMS metadata) or rely on the static content.
// ─────────────────────────────────────────────────────────────────────────────

export const EMPTY_PROJECT = () => ({
  id: "",
  slug: "",
  title: "",
  summary: "",
  description: "",
  category: "Buildings",
  location: "",
  client: "",
  status: "Completed",          // Planned | In Progress | Completed | On Hold
  year: new Date().getFullYear(),
  coverImage: "",
  gallery: [],                  // array of image URLs
  featured: false,
  body: "",                     // markdown / rich text
  isPublished: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const EMPTY_TEAM_MEMBER = () => ({
  id: "",
  name: "",
  role: "",
  department: "Technical",     // Executive | Operations | Projects | Technical | Quality | Finance | HSE | "Supply Chain" | "Human Resources"
  bio: "",
  photo: "",
  email: "",
  phone: "",
  isPublished: true,
  displayOrder: 0,
});

export const EMPTY_CLIENT = () => ({
  id: "",
  name: "",
  logo: "",
  website: "",
  description: "",
  category: "Public",           // Public | Private | NGO | International
  displayOrder: 0,
  isPublished: true,
});

export const EMPTY_NEWS_ARTICLE = () => ({
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  coverImage: "",
  category: "Company News",     // Company News | Project Update | Engineering Insights | Awards
  tags: [],                     // array of strings
  isPublished: false,
  publishedAt: new Date().toISOString(),
  author: "SMS Team",
  seoTitle: "",
  seoDescription: "",
});

export const EMPTY_JOB = () => ({
  id: "",
  title: "",
  department: "Technical",
  location: "Kabul, Afghanistan",
  type: "Full-time",            // Full-time | Part-time | Contract | Internship
  description: "",
  requirements: [],             // array of strings
  isOpen: true,
  postedAt: new Date().toISOString(),
});

export const DEFAULT_SETTINGS = () => ({
  contactEmail: "",
  contactPhone: "+93 747777788",
  addressLines: ["Flat #6, Kabul, Afghanistan", "Transport Street, Nangarhar, Afghanistan"],
  social: { facebook: "", twitter: "", linkedin: "", instagram: "" },
});

// Order options reused by multiple forms.
export const PROJECT_STATUSES   = ["Planned", "In Progress", "Completed", "On Hold"];
export const PROJECT_CATEGORIES = ["Buildings", "Infrastructure", "Water & Irrigation", "Energy", "Rehabilitation", "Other"];
export const TEAM_DEPARTMENTS   = ["Executive", "Operations", "Projects", "Technical", "Quality", "Finance", "HSE", "Supply Chain", "Human Resources"];
export const CLIENT_CATEGORIES  = ["Public", "Private", "NGO", "International"];
export const NEWS_CATEGORIES    = ["Company News", "Project Update", "Engineering Insights", "Awards"];
export const JOB_TYPES          = ["Full-time", "Part-time", "Contract", "Internship"];
