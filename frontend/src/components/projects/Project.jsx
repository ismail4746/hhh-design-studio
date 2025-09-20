import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(null); // modal project
  const [currentIndex, setCurrentIndex] = useState(0); // image slider index

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080";
    fetch(`${apiBase.replace(/\/$/, '')}/admin/projects`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          setProjects(data.data);
        } else {
          setError("Failed to load projects");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-10 text-gray-500">Loading projects...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

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
      className="relative py-20 text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1a1a1a, #0d0d0d), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/50 via-transparent to-[#0d0d0d]/80 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl text-center font-extrabold mb-12 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
          Featured Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-400">No projects found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-3xl overflow-hidden bg-[#1a1a1a]/40 backdrop-blur-lg border border-gray-700 hover:border-[#D4AF37] hover:shadow-[0_0_25px_#D4AF37]/40 transition cursor-pointer"
                onClick={() => {
                  setSelected(p);
                  setCurrentIndex(0);
                }}
              >
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src={
                      p.images && p.images[0]
                        ? `${(import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, '')}/${p.images[0].image_url}`
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h4 className="text-xl mb-1 font-semibold text-[#D4AF37]">
                    {p.name}
                  </h4>
                  <p className="text-xs uppercase text-gray-500 mb-3">
                    Status — {p.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/Project"
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
            <img
              src={`${(import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, '')}/${selected.images[currentIndex].image_url}`}
              alt={selected.name}
              className="max-h-[80vh] object-contain mx-auto rounded-lg"
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
