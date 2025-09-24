import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [category, setCategory] = useState("All");
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
    fetch(`${apiBase}/admin/projects`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ API Response:", data);
        if (data.status) setProjects(data.data);
        else setError("Failed to load projects");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="p-10 text-gray-500 text-center">Loading projects...</p>;
  if (error)
    return <p className="p-10 text-red-500 text-center">{error}</p>;

  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter((p) =>
          p.images?.some(
            (img) =>
              img.image_type &&
              img.image_type.toLowerCase() === category.toLowerCase()
          )
        );

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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setVisibleCount(9); // reset show count
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
                      <motion.img
                        src={getImageUrl(firstImage.image_url)}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-72 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div className="w-full h-72 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col">
                    <h4 className="text-xl mb-1 font-semibold text-[#D4AF37]">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl h-[88vh] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-[#D4AF37]/40 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#0a0a0a] flex flex-col"
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
              <div className="h-[70%] relative bg-black/70 flex items-center justify-center">
                {selected?.images?.length ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.img
                      src={getImageUrl(selected.images[currentIndex]?.image_url)}
                      alt={selected.name || "Project image"}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                    />

                    {/* Prev/Next Buttons: show only when there are multiple images */}
                    {selected?.images && selected.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentIndex((prev) =>
                              prev === 0
                                ? selected.images.length - 1
                                : prev - 1
                            )
                          }
                          className="absolute left-4 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/80 transition"
                        >
                          ◀
                        </button>

                        <button
                          onClick={() =>
                            setCurrentIndex((prev) =>
                              prev === selected.images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-4 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/80 transition"
                        >
                          ▶
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
              <div className="h-[30%] bg-black/40 backdrop-blur-md border-t border-[#D4AF37]/30 p-6 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#D4AF37] to-[#caa84a] bg-clip-text text-transparent drop-shadow-lg">
                  {selected?.name}
                </h3>
                <div className="mt-2 flex-1 overflow-y-auto pr-2 text-gray-300 text-sm md:text-base leading-relaxed">
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
