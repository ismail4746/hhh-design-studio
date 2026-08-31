// Single source of truth for all SEO data.
// Used by three consumers:
//   1. scripts/prerender.mjs  -> bakes <head> into the static HTML of every route
//   2. src/components/Meta    -> keeps <head> correct during client-side navigation
//   3. scripts/generate-sitemap.mjs -> builds sitemap.xml from ROUTES

export const SITE = {
  url: "https://hhhdesignstudio.com",
  name: "HHH Design Studio",
  legalName: "HHH Design Studio",
  locale: "en_PK",
  email: "hhhdesignstudio@outlook.com",
  phones: ["+92 321 7500253", "+92 302 4599748"],
  address: {
    street: "Building 80, Street 6, CCA Phase V, Defence Housing Authority",
    city: "Lahore",
    region: "Punjab",
    postalCode: "54000",
    country: "PK",
  },
  // Real profiles (taken from the site footer) — Google uses these to link the brand.
  socials: [
    "https://www.facebook.com/share/1AygEBaNnx/",
    "https://www.instagram.com/hhhdesignstudio",
    "https://www.tiktok.com/@hhh.design.studio",
    "https://youtube.com/@hhhdesignstudio01",
  ],
  services: [
    "Architecture Design",
    "Interior Design",
    "Project Management",
    "Construction",
    "Renovation",
  ],
  // Files under public/ keep a stable URL (no build hash), so social crawlers can always fetch them.
  logo: "/og/logo.png",
  defaultOgImage: "/og/og-home.jpg",
};

export const abs = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
};

// Every indexable route. `path` must match the react-router path exactly.
export const ROUTES = [
  {
    path: "/",
    title: "Architecture & Interior Design Studio in Lahore | HHH",
    description:
      "Lahore-based architecture and interior design studio creating modern, sustainable homes, offices and commercial spaces — from first concept to final handover.",
    ogImage: "/og/og-home.jpg",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "About Our Design Studio | HHH Design Studio Lahore",
    description:
      "Meet the architects and interior designers behind HHH Design Studio in DHA Lahore — our design philosophy, our process, and how we work with clients.",
    ogImage: "/og/og-about.jpg",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/services",
    title: "Architecture & Interior Design Services | HHH Lahore",
    description:
      "Architectural design, interior design, project management, construction and renovation for residential and commercial clients across Lahore.",
    ogImage: "/og/og-services.jpg",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/project",
    title: "Our Projects | Architecture & Interiors | HHH Studio",
    description:
      "Completed architecture and interior projects by HHH Design Studio — residential villas, apartments, offices and retail spaces built in Lahore and beyond.",
    ogImage: "/og/og-project.jpg",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/portfolio",
    title: "Design Portfolio | HHH Design Studio Lahore",
    description:
      "A curated portfolio of residential and commercial work showing our approach to space planning, materials, lighting and timeless interior detail.",
    ogImage: "/og/og-portfolio.jpg",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "Contact HHH Design Studio | Interior Designers Lahore",
    description:
      "Talk to HHH Design Studio about your project. Visit our DHA Phase V Lahore office, call +92 321 7500253, or send an enquiry for a design consultation and quote.",
    ogImage: "/og/og-contact.jpg",
    priority: "0.7",
    changefreq: "monthly",
  },
];

export const getRouteSeo = (pathname) => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return ROUTES.find((r) => r.path === clean) || null;
};
