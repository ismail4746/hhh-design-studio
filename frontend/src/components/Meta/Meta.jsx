import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildHead, OWNED_ATTR } from "../../seo/head";

// Keeps <head> in sync during client-side navigation.
//
// The static HTML shipped by scripts/prerender.mjs already carries the correct
// head for the first page a visitor lands on — that is what non-JS crawlers
// (Facebook, WhatsApp, LinkedIn, Bing) read. This component only has to fix up
// the head when react-router swaps routes without a page load.
//
// Every tag it writes is stamped with data-seo so the next navigation can
// remove the previous route's tags rather than leaving them stacked in <head>.
export default function Meta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildHead(pathname);

    // Drop whatever the previous route (or the prerenderer) left behind.
    document
      .querySelectorAll(`[${OWNED_ATTR}]`)
      .forEach((el) => el.parentNode?.removeChild(el));

    document.title = head.title;

    for (const meta of head.metas) {
      if (!meta.content) continue;
      const el = document.createElement("meta");
      if (meta.property) el.setAttribute("property", meta.property);
      else el.setAttribute("name", meta.name);
      el.setAttribute("content", meta.content);
      el.setAttribute(OWNED_ATTR, "");
      document.head.appendChild(el);
    }

    if (head.canonical) {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", head.canonical);
      link.setAttribute(OWNED_ATTR, "");
      document.head.appendChild(link);
    }

    for (const block of head.jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(OWNED_ATTR, "");
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}
