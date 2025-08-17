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
    <section className="py-20 bg-[#0d0d0d] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
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
                className="group relative rounded-3xl overflow-hidden bg-[#1a1a1a]/40 backdrop-blur-lg border border-gray-700 hover:border-[#D4AF37] hover:shadow-[0_0_25px_#D4AF37]/40 transition cursor-pointer"
                onClick={() => setSelected(p)}  // <-- OPEN MODAL
              >
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src={p.images && p.images[0] ? `http://localhost:8080/${p.images[0].image_url}` : ""}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
                    <motion.h4 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-white">
                      {p.name}
                    </motion.h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link to="/portfolio" className="inline-block px-10 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_45px_#D4AF37]/50 transition duration-300">
            Explore More Projects
          </Link>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
  {selected && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4"
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1a1a1a] max-w-lg w-full rounded-xl overflow-hidden"
      >
        {/* image at top */}
        {selected.images && selected.images[0] && (
          <img
            src={`http://localhost:8080/${selected.images[0].image_url}`}
            alt={selected.name}
            className="w-full h-60 object-cover"
          />
        )}

        <div className="p-8">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">{selected.name}</h3>
          <p className="text-xs uppercase text-gray-500 mb-3">Status – {selected.status}</p>
          <p className="text-gray-300 leading-relaxed mb-6">{selected.description}</p>

          <button
            onClick={() => setSelected(null)}
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
