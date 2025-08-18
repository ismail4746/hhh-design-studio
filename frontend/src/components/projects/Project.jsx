import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);  // <-- NEW

  useEffect(() => {
    fetch("http://localhost:8080/admin/projects", {
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

  return (
    <section
  className="relative py-20 text-white overflow-hidden"
  style={{
    background:
      "radial-gradient(circle at top left, #1a1a1a, #0d0d0d), url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
    backgroundBlendMode: "overlay",
  }}
>
  {/* Optional animated particles or subtle glow */}
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
            className="group rounded-3xl overflow-hidden bg-[#1a1a1a]/40 backdrop-blur-lg border border-gray-700 hover:border-[#D4AF37] hover:shadow-[0_0_25px_#D4AF37]/40 transition"
          >
            <div className="rounded-3xl overflow-hidden">
              <img
                src={p.images && p.images[0] ? `http://localhost:8080/${p.images[0].image_url}` : ""}
                alt={p.name}
                loading="lazy"
                className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-5">
              <h4 className="text-xl mb-1 font-semibold text-[#D4AF37]">{p.name}</h4>
              <p className="text-xs uppercase text-gray-500 mb-3">Status — {p.status}</p>

              <button
                onClick={() => setSelected(p)}
                className="mt-auto w-full px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:scale-105 hover:shadow-[0_0_30px_#D4AF37]/40 transition"
              >
                Read More
              </button>
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
          {/*Close Button */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white hover:text-yellow-400 transition p-2 bg-black/60 rounded-full shadow-lg flex items-center justify-center"
          >
            <span className="text-2xl font-bold z-40">&times;</span>
          </button>
  
          {/* Image Carousel */}
          {selected.images && selected.images.length > 0 ? (
            <div className="relative w-full overflow-hidden">
              <motion.img
                key={selected.images[0].image_url}
                src={`http://localhost:8080/${selected.images[0].image_url}`}
                alt={selected.name}
                className="w-full h-[350px] md:h-[450px] object-cover rounded-t-2xl hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              {selected.images.length > 1 && (
                <>
                  <button className="absolute top-1/2 -left-3 transform -translate-y-1/2 text-white text-3xl font-bold bg-black/40 p-2 rounded-full hover:bg-black/60 transition shadow-lg">
                    &#10094;
                  </button>
                  <button className="absolute top-1/2 -right-3 transform -translate-y-1/2 text-white text-3xl font-bold bg-black/40 p-2 rounded-full hover:bg-black/60 transition shadow-lg">
                    &#10095;
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-16">No images available</p>
          )}
  
          {/* Title & Description */}
          <div className="p-5 md:p-6 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm">
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
