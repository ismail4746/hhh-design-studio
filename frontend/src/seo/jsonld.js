// Structured data (schema.org JSON-LD) builders.
// Shared by the prerenderer and the client-side <Meta> component so the
// markup a crawler sees and the markup a visitor sees never drift apart.

import { SITE, abs, getRouteSeo } from "./seo.config.js";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

// ProfessionalService is a LocalBusiness subtype — it is what earns the
// business the map pack / local results for "interior designer in Lahore".
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: abs(SITE.logo),
    },
    image: abs(SITE.defaultOgImage),
    description:
      "Architecture, interior design and project management studio based in DHA Lahore, delivering residential and commercial spaces from concept to completion.",
    email: SITE.email,
    telephone: SITE.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Lahore" },
      { "@type": "Country", name: "Pakistan" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    sameAs: SITE.socials,
    contactPoint: SITE.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function webPageLd(pathname) {
  const route = getRouteSeo(pathname);
  if (!route) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs(route.path)}#webpage`,
    url: abs(route.path),
    name: route.title,
    description: route.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: abs(route.ogImage) },
    inLanguage: "en",
  };
}

// Breadcrumbs show the page's position under the site name in search results.
export function breadcrumbLd(pathname) {
  const route = getRouteSeo(pathname);
  if (!route || route.path === "/") return null;

  const label = route.title.split("|")[0].trim();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: label, item: abs(route.path) },
    ],
  };
}

// One Service node per offering, wired back to the organisation.
export function servicesLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services offered by HHH Design Studio",
    itemListElement: SITE.services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service,
        serviceType: service,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: "Lahore" },
      },
    })),
  };
}

export function contactPageLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: abs("/contact"),
    name: "Contact HHH Design Studio",
    mainEntity: { "@id": ORG_ID },
  };
}

// Everything a given route should emit, in one array.
export function jsonLdForRoute(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const blocks = [];

  // Organization + WebSite are site-wide identity; repeat them on every page
  // so any single page can establish the brand on its own.
  blocks.push(organizationLd(), websiteLd());

  const page = webPageLd(clean);
  if (page) blocks.push(page);

  const crumbs = breadcrumbLd(clean);
  if (crumbs) blocks.push(crumbs);

  if (clean === "/services") blocks.push(servicesLd());
  if (clean === "/contact") blocks.push(contactPageLd());

  return blocks;
}
