import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectDetails() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [selected, setSelected] = useState(null);

  // category states
  const [category, setCategory] = useState("All");
  const categories = ["All", "Lobby", "Bedrooms", "Elevation", "Interior", "Landscape","Kitchen"]; // tum apni marzi ke categories add kar sakte ho

  useEffect(() => {
    fetch("http://localhost:8080/admin/projects", {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
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

  // filter projects by category
  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter((p) => p.category?.toLowerCase() === category.toLowerCase());

  const toggleShow = () => {
    if (visibleCount >= filteredProjects.length) {
      setVisibleCount(9);
    } else {
      setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length));
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
            {filteredProjects.slice(0, visibleCount).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group rounded-3xl overflow-hidden bg-[#1a1a1a]/40 backdrop-blur-lg border border-gray-700 hover:border-[#D4AF37] hover:shadow-[0_0_25px_#D4AF37]/40 transition"
              >
                <div className="rounded-3xl overflow-hidden">
                  <motion.img
                    src={
                      p.images && p.images[0]
                        ? `http://localhost:8080/${p.images[0].image_url}`
                        : ""
                    }
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-72 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="p-5 flex flex-col">
                  <h4 className="text-xl mb-1 font-semibold text-[#D4AF37]">{p.name}</h4>
                  <p className="text-xs uppercase text-gray-500 mb-3">
                    Status — {p.status}
                  </p>

                  <motion.button
                    onClick={() => setSelected(p)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="mt-auto w-full px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:shadow-[0_0_30px_#D4AF37]/40 transition"
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 9 && (
          <div className="text-center mt-12">
            <button
              onClick={toggleShow}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:scale-105 hover:shadow-[0_0_40px_#D4AF37]/50 transition duration-300"
            >
              {visibleCount >= filteredProjects.length ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-3xl bg-gradient-to-br from-[#111111]/80 via-[#1a1a1a]/80 to-[#111111]/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 z-40 right-4 text-white hover:text-yellow-400 transition p-2 bg-black/60 rounded-full shadow-lg"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>

              {/* Image */}
              {selected.images && selected.images.length > 0 ? (
                <div className="relative w-full overflow-hidden">
                  <motion.img
                    key={selected.images[0].image_url}
                    src={`http://localhost:8080/${selected.images[0].image_url}`}
                    alt={selected.name}
                    className="w-full h-[350px] md:h-[450px] object-cover rounded-t-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              ) : (
                <p className="text-gray-400 text-center py-16">No images available</p>
              )}

              {/* Title & Description */}
              <div className="p-5 md:p-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-3 tracking-wide">
                  {selected.name}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {selected.description || "No description available."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
