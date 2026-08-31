// Build-time prerenderer.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
// For every route in seo.config.js it renders the real React tree to HTML and
// writes dist/<route>/index.html with a fully populated <head>.
//
// The result: a crawler that does not execute JavaScript — Facebook, WhatsApp,
// LinkedIn, Bing, and AI crawlers — still receives the complete page.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { ROUTES, SITE, abs } from "../src/seo/seo.config.js";
import { buildHead, OWNED_ATTR } from "../src/seo/head.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON-LD sits inside <script>, so the only real hazard is a literal "</script>".
const escapeJsonLd = (obj) =>
  JSON.stringify(obj).replace(/</g, "\u003c").replace(/>/g, "\u003e");

function renderHead(head) {
  const lines = [];

  for (const meta of head.metas) {
    if (!meta.content) continue;
    const key = meta.property
      ? `property="${meta.property}"`
      : `name="${meta.name}"`;
    lines.push(`    <meta ${key} content="${escapeAttr(meta.content)}" ${OWNED_ATTR} />`);
  }

  if (head.canonical) {
    lines.push(
      `    <link rel="canonical" href="${escapeAttr(head.canonical)}" ${OWNED_ATTR} />`
    );
  }

  for (const block of head.jsonLd) {
    lines.push(
      `    <script type="application/ld+json" ${OWNED_ATTR}>${escapeJsonLd(block)}</script>`
    );
  }

  return lines.join("\n");
}

// framer-motion's `initial` state serialises as opacity:0 / transform offsets.
// The client re-renders from scratch (createRoot, not hydrateRoot), so these
// only ever affect the static copy — where invisible text helps nobody.
// Neutralising them keeps the crawler's view identical to the visitor's.
function revealAnimatedContent(html) {
  return html
    .replace(/opacity\s*:\s*0(?=[;"])/g, "opacity:1")
    .replace(/transform\s*:\s*[^;"]*(?=[;"])/g, "transform:none");
}

async function main() {
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");

  if (!template.includes("<!--app-html-->") || !template.includes("<!--seo-head-->")) {
    throw new Error(
      "dist/index.html is missing the <!--app-html--> / <!--seo-head--> placeholders."
    );
  }

  const { render } = await import(pathToFileURL(ssrEntry).href);

  const targets = [
    ...ROUTES.map((r) => ({ url: r.path, out: r.path })),
    // Served by Apache's ErrorDocument with a real 404 status code.
    { url: "/__not-found__", out: "/404", file: "404.html" },
  ];

  for (const target of targets) {
    let appHtml = "";
    try {
      appHtml = await render(target.url);
    } catch (err) {
      console.error(`  ! render failed for ${target.url}:`, err.message);
      throw err;
    }

    const head = buildHead(target.url);
    // Replacements are passed as functions on purpose: a string replacement
    // would interpret $$ / $& / $` inside the generated markup as capture-group
    // syntax and silently corrupt it (priceRange "$$" became "$").
    const html = template
      .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeAttr(head.title)}</title>`)
      .replace("<!--seo-head-->", () => renderHead(head))
      .replace("<!--app-html-->", () => revealAnimatedContent(appHtml));

    let outPath;
    if (target.file) {
      outPath = path.join(distDir, target.file);
    } else if (target.out === "/") {
      outPath = path.join(distDir, "index.html");
    } else {
      outPath = path.join(distDir, target.out, "index.html");
    }

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html, "utf8");

    const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`  ✓ ${String(target.out).padEnd(12)} -> ${path.relative(root, outPath)} (${kb} kB)`);
  }

  await writeSitemap();
  console.log("\nPrerender complete.");
}

async function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (r) => `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await fs.writeFile(path.join(distDir, "sitemap.xml"), xml, "utf8");
  console.log(`  ✓ sitemap.xml (${ROUTES.length} urls, lastmod ${lastmod})`);

  const robots = `# ${SITE.name} — https://hhhdesignstudio.com
User-agent: *
Allow: /

# Legacy /?spa=... URLs are intentionally left crawlable: .htaccess 301s them
# to the real page, and Google has to fetch them to see that redirect. Blocking
# them here would freeze the old URLs in the index instead of retiring them.

# Large brochure PDF: unlinked and heavy, not worth crawl budget
Disallow: /HHH%20Design%20Studio-1.pdf

Sitemap: ${abs("/sitemap.xml")}
`;
  await fs.writeFile(path.join(distDir, "robots.txt"), robots, "utf8");
  console.log("  ✓ robots.txt");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
