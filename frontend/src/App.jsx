import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Meta from "./components/Meta/Meta";
import NotFound from "./components/common/NotFound";

const Hero = lazy(() => import("./components/hero/Hero"));
const Store = lazy(() => import("./components/store/Store"));
const Project = lazy(() => import("./components/projects/Project"));
const Blog = lazy(() => import("./components/blog/Blog"));

const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const About = lazy(() => import("./components/about/About"));
const ContactDetails = lazy(() => import("./components/contact/ContactDetails"));
const Projectsmain = lazy(() => import("./components/ProjectsDetails/Projectsmain"));
const ServicesMain = lazy(() => import("./components/services/ServicesMain"));

// True while scripts/prerender.mjs renders the page to static HTML at build time.
const IS_PRERENDER = typeof window === "undefined";

function RouteFallback() {
  return <div className="p-10 text-gray-500 text-center">Loading…</div>;
}

function useIdle(readyDelayMs = 700) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    let idleId;

    const markReady = () => {
      if (cancelled) return;
      setIsIdle(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      // @ts-ignore
      idleId = window.requestIdleCallback(markReady, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(markReady, readyDelayMs);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        // @ts-ignore
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [readyDelayMs]);

  return isIdle;
}

export default function App() {
  const idleReady = useIdle();

  // Below-the-fold sections still mount lazily for real visitors (unchanged),
  // but are rendered up-front during prerender so crawlers get the full page.
  const showDeferred = idleReady || IS_PRERENDER;

  return (
    <>
      <Meta />
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Suspense fallback={<RouteFallback />}>
                <Hero />
              </Suspense>

              {/* Defer below-the-fold mounts for faster first paint */}
              {showDeferred && (
                <Suspense fallback={null}>
                  <Store />
                  <Project />
                  <Blog />
                </Suspense>
              )}
            </>
          }
        />

        {/* Portfolio Page */}
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Portfolio />
            </Suspense>
          }
        />

        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactDetails />
            </Suspense>
          }
        />

        {/* Old camelCase URL kept alive so existing links never 404.
            Apache 301s it server-side; this covers in-app navigation. */}
        <Route path="/contactDetails" element={<Navigate to="/contact" replace />} />

        <Route
          path="/project"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Projectsmain />
            </Suspense>
          }
        />

        <Route
          path="/services"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ServicesMain />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
