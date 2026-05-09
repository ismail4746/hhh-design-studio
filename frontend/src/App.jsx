import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Meta from "./components/Meta/Meta";

const Hero = lazy(() => import("./components/hero/Hero"));
const Store = lazy(() => import("./components/store/Store"));
const Project = lazy(() => import("./components/projects/Project"));
const Blog = lazy(() => import("./components/blog/Blog"));

const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const About = lazy(() => import("./components/about/About"));
const ContactDetails = lazy(() => import("./components/contact/ContactDetails"));
const Projectsmain = lazy(() => import("./components/ProjectsDetails/Projectsmain"));
const ServicesMain = lazy(() => import("./components/services/ServicesMain"));

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

function useSpaQueryRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const spaTarget = params.get("spa");
    if (!spaTarget) return;

    // Only allow internal absolute paths
    if (typeof spaTarget !== "string" || !spaTarget.startsWith("/")) return;

    params.delete("spa");
    const remaining = params.toString();
    const next = `${spaTarget}${remaining ? `?${remaining}` : ""}${location.hash || ""}`;
    navigate(next, { replace: true });
  }, [location.search, location.hash, navigate]);
}

export default function App() {
  const idleReady = useIdle();
  useSpaQueryRedirect();

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
              <>
                <Meta
                  title="HHH Design Studio — Home"
                  description="HHH Design Studio — Architecture, interior design, and project management. We design modern, sustainable spaces tailored to your vision."
                  keywords="architecture, interior design, design studio, HHH Design Studio"
                  url="https://hhhdesignstudio.com/"
                  image="https://hhhdesignstudio.com/src/assets/abouthero.jpg"
                />
                <Suspense fallback={<RouteFallback />}>
                  <Hero />
                </Suspense>

                {/* Defer below-the-fold mounts for faster first paint */}
                {idleReady && (
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
            <>
              <Meta
                title="Portfolio — HHH Design Studio"
                description="Our portfolio showcases residential and commercial projects highlighting our design philosophy and expertise."
                keywords="portfolio, architecture projects, design portfolio, HHH"
                url="https://hhhdesignstudio.com/portfolio"
                image="https://hhhdesignstudio.com/src/assets/architecture1.jpg"
              />
              <Suspense fallback={<RouteFallback />}>
                <Portfolio />
              </Suspense>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Meta
                title="About — HHH Design Studio"
                description="Learn about HHH Design Studio: our team, approach, and commitment to sustainable, client-driven design."
                keywords="about, team, HHH Design Studio, sustainable design"
                url="https://hhhdesignstudio.com/about"
                image="https://hhhdesignstudio.com/src/assets/azeemCeo1.jpg"
              />
              <Suspense fallback={<RouteFallback />}>
                <About />
              </Suspense>
            </>
          }
        />
        <Route
          path="/contactDetails"
          element={
            <>
              <Meta
                title="Contact — HHH Design Studio"
                description="Get in touch with HHH Design Studio for consultations, project inquiries, and collaboration opportunities."
                keywords="contact, inquiries, HHH Design Studio, consultations"
                url="https://hhhdesignstudio.com/contact"
                image="https://hhhdesignstudio.com/src/assets/about.jpg"
              />
              <Suspense fallback={<RouteFallback />}>
                <ContactDetails />
              </Suspense>
            </>
          }
        />
        <Route
          path="/project"
          element={
            <>
              <Meta
                title="Project — HHH Design Studio"
                description="Project highlights and case studies by HHH Design Studio. Explore our detailed project pages for design insights."
                keywords="project, case study, architecture, HHH"
                url="https://hhhdesignstudio.com/project"
                image="https://hhhdesignstudio.com/src/assets/architecture3.jpg"
              />
              <Suspense fallback={<RouteFallback />}>
                <Projectsmain />
              </Suspense>
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Meta
                title="Services — HHH Design Studio"
                description="Our services include architectural design, interior design, project management, and consultancy for residential and commercial projects."
                keywords="services, architectural design, interior design, project management"
                url="https://hhhdesignstudio.com/services"
                image="https://hhhdesignstudio.com/src/assets/architecture2.jpg"
              />
              <Suspense fallback={<RouteFallback />}>
                <ServicesMain />
              </Suspense>
            </>
          }
        />

      </Routes>
      <Footer/>
    </>
  );
}
