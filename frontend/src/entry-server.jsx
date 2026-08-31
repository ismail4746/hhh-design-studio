import React from "react";
import { prerenderToNodeStream } from "react-dom/static.node";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

// Server entry used only by scripts/prerender.mjs at build time.
//
// React 19's prerender API (unlike renderToString) waits for every Suspense
// boundary to settle, so the lazy() route components resolve and their real
// markup lands in the static HTML instead of the "Loading…" fallback.
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  const chunks = [];
  for await (const chunk of prelude) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}
