// Serves dist/ the way Apache will in production:
//   - /about  -> dist/about/index.html   (directory index)
//   - unknown -> dist/404.html with a real 404 status
//   - NO SPA fallback
//
// `vite preview` rewrites every unknown path to index.html, which hides
// routing mistakes. Use this to check what search engines will actually get.
//
// Run: npm run serve:dist

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT) || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

// Kept in sync with the "Retired URLs" section of public/.htaccess.
const REDIRECTS = (urlPath) => {
  if (/^\/contactDetails\/?$/i.test(urlPath)) return "/contact";
  if (urlPath.length > 1 && urlPath.endsWith("/")) return urlPath.slice(0, -1);
  return null;
};

const send = (res, status, body, type) => {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);

    // Reject path traversal before touching the filesystem.
    const target = path.join(root, urlPath);
    if (!target.startsWith(root)) return send(res, 403, "Forbidden", "text/plain");

    // Mirror the 301s that public/.htaccess performs in production, so this
    // server reflects real behaviour rather than just the file layout.
    const redirect = REDIRECTS(urlPath);
    if (redirect) {
      console.log(`301 ${urlPath} -> ${redirect}`);
      res.writeHead(301, { Location: redirect });
      return res.end();
    }

    let file = target;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }

    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      const notFound = path.join(root, "404.html");
      const body = fs.existsSync(notFound)
        ? fs.readFileSync(notFound)
        : "404 Not Found";
      console.log(`404 ${urlPath}`);
      return send(res, 404, body, "text/html; charset=utf-8");
    }

    console.log(`200 ${urlPath}`);
    send(res, 200, fs.readFileSync(file), TYPES[path.extname(file)] || "application/octet-stream");
  })
  .listen(port, () => {
    console.log(`Serving dist/ (Apache-style) on http://localhost:${port}`);
  });
