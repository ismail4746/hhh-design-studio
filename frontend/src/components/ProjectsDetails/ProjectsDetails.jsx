import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImg from "../common/OptimizedImg";

const PROJECTS_CACHE_KEY = "hhh.projects.v1";
const PROJECTS_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

function readProjectsCache() {
  try {
    const raw = sessionStorage.getItem(PROJECTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.t !== "number") return null;
    if (Date.now() - parsed.t > PROJECTS_CACHE_TTL_MS) return null;
    return Array.isArray(parsed.v) ? parsed.v : null;
  } catch {
    return null;
  }
}

function writeProjectsCache(projects) {
  try {
    sessionStorage.setItem(
      PROJECTS_CACHE_KEY,
      JSON.stringify({ t: Date.now(), v: projects })
    );
  } catch {
    // ignore quota / private mode
  }
}

function canPrefetchImages() {
  try {
    const c = navigator.connection;
    if (c?.saveData) return false;
    const t = c?.effectiveType;
    if (t === "slow-2g" || t === "2g") return false;
    return true;
  } catch {
    return true;
  }
}

export default function ProjectDetails() {
  // Normalize API base and helper to build image URLs safely
  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/+$/, '');

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    // If already an absolute URL, return as-is
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    // Trim leading slashes and join with apiBase
    return `${apiBase}/${imageUrl.replace(/^\/+/, '')}`;
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [lastLoadedSrc, setLastLoadedSrc] = useState('');
  const [pendingSrc, setPendingSrc] = useState(null);

  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const categories = [
    "All",
    "Lobby",
    "Bedrooms",
    "Elevation",
    "Interior",
    "Landscape",
    "Kitchen",
  ];

  useEffect(() => {
    const cached = readProjectsCache();
    if (cached) {
      setProjects(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    fetch(`${apiBase}/admin/projects`, {
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
          writeProjectsCache(sorted);
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

  // When the selected project or currentIndex changes, mark the image as loading
  // until the image's onLoad/onError fires. This prevents users rapidly clicking
  // arrows and causing the slider to render into a bad state.
  useEffect(() => {
    if (selected) {
      const starting = getImageUrl(selected.images?.[currentIndex]?.image_url);
      // start by loading the current image into the pending buffer; once it loads
      // it will become the lastLoadedSrc. This ensures the UI always shows an image
      // while new images are loading and prevents layout collapse.
      setIsImageLoading(true);
      setPendingSrc(starting);
    }
  }, [currentIndex, selected?.id]);

  // Prefetch adjacent images (previous and next) to make slider navigation instant.
  useEffect(() => {
    if (!selected || !selected.images || selected.images.length <= 1) return;
    if (!canPrefetchImages()) return;
    const len = selected.images.length;
    const prev = (currentIndex - 1 + len) % len;
    const next = (currentIndex + 1) % len;

    const urls = [
      getImageUrl(selected.images[prev]?.image_url),
      getImageUrl(selected.images[next]?.image_url),
    ].filter(Boolean);

    const imgs = urls.map((u) => {
      const img = new Image();
      img.decoding = "async";
      img.src = u;
      return img;
    });

    // No cleanup necessary: no DOM nodes were added. Let GC collect.
    void imgs;
  }, [selected?.id, currentIndex]);

  const filteredProjects = useMemo(() => {
    let result = category === "All"
      ? projects
      : projects.filter((p) => {
          const c = category.toLowerCase();
          return p.images?.some((img) => img.image_type && img.image_type.toLowerCase() === c);
        });
    return sortOrder === "newest"
      ? [...result].sort((a, b) => b.id - a.id)
      : [...result].sort((a, b) => a.id - b.id);
  }, [projects, category, sortOrder]);

  if (loading)
    return <p className="p-10 text-gray-500 text-center">Loading projects...</p>;
  if (error)
    return <p className="p-10 text-red-500 text-center">{error}</p>;

  const toggleShow = () => {
    if (visibleCount >= filteredProjects.length) {
      setVisibleCount(9);
    } else {
      setVisibleCount((prev) =>
        Math.min(prev + 3, filteredProjects.length)
      );
    }
  };

  return (
    <section
      className="relative py-20 text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1a1a1a, #0d0d0d), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/50 via-transparent to-[#0d0d0d]/80 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl text-center font-extrabold mb-8 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
          Featured Projects
        </h2>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setVisibleCount(9);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                category === cat
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black shadow-lg scale-105"
                  : "bg-[#1a1a1a]/60 text-gray-300 border border-gray-600 hover:border-[#D4AF37] hover:text-yellow-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Filter */}
        <div className="flex justify-center sm:justify-end mb-8">
          <div className="inline-flex w-full sm:w-auto items-center gap-1 rounded-full border border-[#D4AF37]/25 bg-[#0f0f0f]/75 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <span className="hidden sm:inline-flex px-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              Sort
            </span>

            {[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
            ].map((opt) => {
              const active = sortOrder === opt.value;

              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortOrder(opt.value);
                    setVisibleCount(9);
                  }}
                  aria-pressed={active}
                  className={`relative min-w-0 flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black shadow-[0_0_18px_rgba(212,175,55,0.35)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-gray-400 text-center">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.slice(0, visibleCount).map((p, index) => {
              const firstImage =
                category === "All"
                  ? p.images?.[0]
                  : p.images?.find(
                      (img) =>
                        img.image_type &&
                        img.image_type.toLowerCase() === category.toLowerCase()
                    );

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="group rounded-3xl overflow-hidden bg-[#1a1a1a]/40 backdrop-blur-lg border border-gray-700 hover:border-[#D4AF37] hover:shadow-[0_0_25px_#D4AF37]/40 transition"
                >
                  <div className="rounded-3xl overflow-hidden">
                    {firstImage ? (
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
                        <OptimizedImg
                          src={getImageUrl(firstImage.image_url)}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-72 object-cover"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-72 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                    <div className="p-5 flex flex-col">
                    <h4 className="text-xl mb-1 font-semibold text-[#D4AF37] truncate w-full">
                      {p.name}
                    </h4>
                    <p className="text-xs uppercase text-gray-500 mb-3">
                      Status — {p.status}
                    </p>

                    <motion.button
                      onClick={() => {
                        setSelected(p);
                        setCurrentIndex(0); // start from first image
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="mt-auto w-full px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:shadow-[0_0_30px_#D4AF37]/40 transition"
                    >
                      Read More
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 9 && (
          <div className="text-center mt-12">
            <button
              onClick={toggleShow}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:scale-105 hover:shadow-[0_0_40px_#D4AF37]/50 transition duration-300"
            >
              {visibleCount >= filteredProjects.length
                ? "Show Less"
                : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-[#D4AF37]/40 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#0a0a0a] flex flex-col"
            >
              {/* Gold glow top edge */}
              <div className="pointer-events-none absolute inset-x-0 -top-32 h-52 bg-[radial-gradient(ellipse_at_top,#D4AF37_0%,transparent_70%)] opacity-20" />

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-40 rounded-full px-4 py-2 text-sm font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#b8902d] hover:shadow-[0_0_28px_#D4AF37]/70 transition"
              >
                ✕
              </button>

              {/* Image Section with Slider */}
              <div className="relative bg-black/70 flex items-center justify-center max-h-[70vh]">
                {selected?.images?.length ? (
                  <div className="relative w-full flex items-center justify-center">
                    <div className="relative w-full flex items-center justify-center">
                      {/* Always show the last successfully loaded image as the base layer */}
                      {lastLoadedSrc ? (
                        <OptimizedImg
                          src={lastLoadedSrc}
                          alt={selected.name || 'Project image'}
                          className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                          loading={isImageLoading ? 'eager' : 'lazy'}
                          priority={true}
                        />
                      ) : (
                        <div className="w-full h-64 flex items-center justify-center text-gray-400">Loading…</div>
                      )}

                      {/* Pending image loads on top and crossfades in when ready */}
                      {pendingSrc && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="absolute inset-0 m-auto max-h-full max-w-full">
                          <OptimizedImg
                            src={pendingSrc}
                            alt={selected.name || 'Project image'}
                            className="absolute inset-0 m-auto max-h-full max-w-full object-contain rounded-xl shadow-lg"
                            loading="eager"
                            onLoad={() => {
                              // once pending finishes loading, make it the new lastLoadedSrc
                              setLastLoadedSrc(pendingSrc);
                              setPendingSrc(null);
                              setIsImageLoading(false);
                            }}
                            onError={() => {
                              // on error, clear the pending image and keep the previous image
                              setPendingSrc(null);
                              setIsImageLoading(false);
                            }}
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Prev/Next Buttons: show only when there are multiple images */}
                    {selected?.images && selected.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                              if (isImageLoading) return;
                              const len = selected.images.length || 1;
                              const next = (currentIndex - 1 + len) % len;
                              // compute the next image URL and set it as pending so the
                              // UI keeps showing the lastLoadedSrc until the new image is ready
                              setPendingSrc(getImageUrl(selected.images[next]?.image_url));
                              setCurrentIndex(next);
                          }}
                          aria-label="Previous image"
                          aria-disabled={isImageLoading}
                          disabled={isImageLoading}
                          className={`absolute left-4 z-30 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 shadow-lg border-2 border-transparent ${
                            isImageLoading
                              ? "bg-black/40 text-gray-400 cursor-not-allowed"
                              : "bg-black/70 text-white hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b8902d] hover:text-black hover:border-black"
                          }`}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <button
                          onClick={() => {
                            if (isImageLoading) return;
                            const len = selected.images.length || 1;
                            const next = (currentIndex + 1) % len;
                            setPendingSrc(getImageUrl(selected.images[next]?.image_url));
                            setCurrentIndex(next);
                          }}
                          aria-label="Next image"
                          aria-disabled={isImageLoading}
                          disabled={isImageLoading}
                          className={`absolute right-4 z-30 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 shadow-lg border-2 border-transparent ${
                            isImageLoading
                              ? "bg-black/40 text-gray-400 cursor-not-allowed"
                              : "bg-black/70 text-white hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b8902d] hover:text-black hover:border-black"
                          }`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    No image available
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="bg-black/40 backdrop-blur-md border-t border-[#D4AF37]/30 p-6 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#D4AF37] to-[#caa84a] bg-clip-text text-transparent drop-shadow-lg">
                  {selected?.name}
                </h3>
                <div className="mt-2 pr-2 text-gray-300 text-sm md:text-base leading-relaxed">
                  {selected?.description || "No description available."}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
