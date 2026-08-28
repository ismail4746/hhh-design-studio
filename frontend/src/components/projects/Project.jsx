import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import OptimizedImg from "../common/OptimizedImg";
import { getCachedJson, setCachedJson } from "../../utils/storageCache";

const PROJECTS_CACHE_KEY = "hhh.home.projects.v1";
const PROJECTS_CACHE_TTL_MS = 2 * 60 * 1000;

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(null); // modal project
  const [currentIndex, setCurrentIndex] = useState(0); // image slider index

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080";

    const cached = getCachedJson(PROJECTS_CACHE_KEY, PROJECTS_CACHE_TTL_MS);
    if (cached) {
      setProjects(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    fetch(`${apiBase.replace(/\/$/, '')}/admin/projects`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          const sorted = [...data.data].sort((a, b) => b.id - a.id);
          setProjects(sorted);
          setCachedJson(PROJECTS_CACHE_KEY, sorted);
        } else {
          setError("Failed to load projects");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setError(err.message || "Something went wrong");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return <p className="p-6 md:p-10 text-gray-500">Loading projects...</p>;
  if (error) return <p className="p-6 md:p-10 text-red-500">{error}</p>;

  // Modal image change functions
  const nextImage = () => {
    if (selected?.images?.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % selected.images.length);
    }
  };

  const prevImage = () => {
    if (selected?.images?.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + selected.images.length) % selected.images.length
      );
    }
  };

  return (
    <section
      className="relative py-14 md:py-20 text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1a1a1a, #0d0d0d), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/50 via-transparent to-[#0d0d0d]/80 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-extrabold mb-12 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
          Featured Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-400">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {projects.slice(0, 6).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#161616] to-[#0c0c0c] shadow-[0_10px_30px_-16px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_55px_-24px_rgba(0,0,0,0.95)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
                role="button"
                tabIndex={0}
                aria-label={`View project ${p.name}`}
                onClick={() => {
                  setSelected(p);
                  setCurrentIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                    setCurrentIndex(0);
                  }
                }}
              >
                <div className="relative overflow-hidden">
                  <OptimizedImg
                    src={
                      p.images && p.images[0]
                        ? `${(import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, '')}/${p.images[0].image_url}`
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={p.name}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] sm:h-56 md:h-60"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-200 backdrop-blur-md">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {p.status}
                  </span>
                </div>

                <div
                  aria-hidden="true"
                  className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent transition-all duration-500 group-hover:via-[#D4AF37]/70"
                />

                <div className="flex flex-1 flex-col p-5">
                  <h4
                    className="truncate text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#D4AF37]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.name}
                  </h4>

                  <div className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] uppercase tracking-[0.2em] text-gray-500 transition-colors duration-300 group-hover:text-[#D4AF37]">
                    View Project
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/project"
            className="inline-block px-10 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_45px_#D4AF37]/50 transition duration-300"
          >
            Explore More Projects
          </Link>
        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
<AnimatePresence>
  {selected && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl w-full bg-[#1a1a1a] rounded-2xl shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelected(null)}
          className="absolute top-4 right-4 z-[60] text-white hover:text-[#D4AF37]"
        >
          <X size={28} />
        </button>

        {/* Slider Wrapper */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          {selected.images && selected.images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 z-[60] p-2 bg-black/70 rounded-full hover:bg-[#D4AF37]/60 transition"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>
          )}

          {/* Image */}
          {selected.images && selected.images.length > 0 ? (
            <OptimizedImg
              src={`${(import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, '')}/${selected.images[currentIndex].image_url}`}
              alt={selected.name}
              className="max-h-[80vh] object-contain mx-auto rounded-lg"
              loading="eager"
              priority={true}
            />
          ) : (
            <p className="text-gray-400 py-20">No images available</p>
          )}

          {/* Right Arrow */}
          {selected.images && selected.images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 z-[60] p-2 bg-black/70 rounded-full hover:bg-[#D4AF37]/60 transition"
            >
              <ChevronRight size={32} className="text-white" />
            </button>
          )}
        </div>

        {/* Title */}
        <div className="p-4 text-center text-white text-xl font-semibold">
          {selected.name}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </section>
  );
}
