// Builds the exact <head> contents for a route, as plain data.
// scripts/prerender.mjs turns this into static HTML; <Meta> applies the same
// data to the live DOM on client-side navigation. One description, two outputs.

import { SITE, abs, getRouteSeo } from "./seo.config.js";
import { jsonLdForRoute } from "./jsonld.js";

const NOT_FOUND = {
  path: null,
  title: "Page Not Found | HHH Design Studio",
  description: "The page you are looking for does not exist or has been moved.",
  ogImage: SITE.defaultOgImage,
  noindex: true,
};

export function buildHead(pathname) {
  const route = getRouteSeo(pathname) || NOT_FOUND;
  const canonical = route.path ? abs(route.path) : null;
  const image = abs(route.ogImage || SITE.defaultOgImage);

  const metas = [
    { name: "description", content: route.description },
    {
      name: "robots",
      content: route.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { name: "author", content: SITE.name },

    // Open Graph — Facebook, WhatsApp, LinkedIn
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { property: "og:title", content: route.title },
    { property: "og:description", content: route.description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: route.title },

    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: route.title },
    { name: "twitter:description", content: route.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: route.title },
  ];

  if (canonical) metas.push({ property: "og:url", content: canonical });

  return {
    title: route.title,
    description: route.description,
    canonical,
    metas,
    jsonLd: route.path ? jsonLdForRoute(route.path) : [],
  };
}

// Attribute name used to mark tags this module owns, so client-side
// navigation can clear the previous route's tags instead of stacking them.
export const OWNED_ATTR = "data-seo";
