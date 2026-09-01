import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

import project1 from "../../assets/pp1.webp";
import project2 from "../../assets/pp2.webp";
import project3 from "../../assets/pp3.webp";
import project4 from "../../assets/pp4.webp";
import project5 from "../../assets/pp5.webp";
import project6 from "../../assets/pp6.webp";
import OptimizedImg from "../common/OptimizedImg";

const allProjects = [
  { id: 1, img: project1, title: "Luxury Bedroom",      category: "Bedroom" },
  { id: 2, img: project2, title: "King Size Bedroom",      category: "Bedroom" },
  { id: 3, img: project3, title: "Lounging Area", category: "Lounge"     },
  { id: 4, img: project4, title: "Modern Bedroom",    category: "Bedroom"     },
  { id: 5, img: project5, title: "Luxury King Size Bedroom",      category: "Bedroom"     },
  { id: 6, img: project6, title: "Premium Bedroom",             category: "Bedroom"     },
];

export default function PProjects() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal  = (i) => setSelectedIndex(i);
  const closeModal = ()  => setSelectedIndex(null);
  const next = () => setSelectedIndex((p) => (p + 1) % allProjects.length);
  const prev = () => setSelectedIndex((p) => (p === 0 ? allProjects.length - 1 : p - 1));

  /* keyboard navigation */
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex]);

  return (
    <section id="projects" className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b8902d]/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[8px] text-[#D4AF37]/70 font-medium">
              Our Portfolio
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mb-6">
            <span className="block text-white">Architectural</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#e8cc72] to-[#b8902d] bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
            A curated selection of projects that define our commitment to precision, beauty, and enduring craft.
          </p>
          <div className="mt-8 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">

          {/* Card 1 — large, spans 2 cols on md */}
          {allProjects.slice(0, 6).map((p, index) => {
            const isBig = index === 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.07 }}
                onClick={() => openModal(index)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,175,55,0.12)] ${
                  isBig ? "col-span-2 md:col-span-2 row-span-1" : ""
                }`}
                style={{ aspectRatio: isBig ? "16/7" : "4/3" }}
              >
                {/* Image */}
                <OptimizedImg
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />

                {/* Permanent dark gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                {/* Category badge — top left */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm group-hover:border-[#D4AF37]/30 transition-all duration-400">
                  <span className="text-[9px] uppercase tracking-[3px] text-white/50 group-hover:text-[#D4AF37]/80 transition-colors duration-400">
                    {p.category}
                  </span>
                </div>

                {/* Arrow icon — top right */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#D4AF37]/40 transition-all duration-400">
                  <ArrowUpRight size={15} className="text-[#D4AF37]" />
                </div>

                {/* Title — always centered at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-5 px-4">
                  <h4 className="text-white font-bold text-center leading-tight text-base md:text-lg tracking-wide drop-shadow-lg">
                    {p.title}
                  </h4>
                  {/* Gold underline on hover */}
                  <div className="mt-2 h-[2px] w-8 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                </div>

                {/* Index number — bottom right watermark */}
                <div className="absolute bottom-4 right-4 text-3xl font-black text-white/5 select-none leading-none group-hover:text-white/8 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Explore Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <button
            onClick={() => navigate("/project")}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold tracking-widest uppercase overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-400 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
          >
            {/* Fill bg on hover */}
            <span className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/8 transition-colors duration-400 rounded-full" />
            <span className="relative z-10">Explore All Projects</span>
            <ArrowUpRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* ── Premium Lightbox Modal ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

            {/* Counter top-left */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="text-[#D4AF37] font-black text-sm tabular-nums">
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-white/30 text-xs tabular-nums">
                {String(allProjects.length).padStart(2, "0")}
              </span>
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 z-10"
            >
              <X size={16} className="text-white/60" />
            </button>

            {/* Image + Arrows */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex items-center justify-center"
            >
              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute -left-2 md:-left-14 z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft size={20} className="text-white/60 hover:text-[#D4AF37]" />
              </button>

              {/* Image */}
              <div className="w-full rounded-2xl overflow-hidden border border-white/8 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                <OptimizedImg
                  src={allProjects[selectedIndex].img}
                  alt={allProjects[selectedIndex].title}
                  className="w-full max-h-[70vh] object-contain bg-[#0c0c0c]"
                  loading="eager"
                />
              </div>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute -right-2 md:-right-14 z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight size={20} className="text-white/60 hover:text-[#D4AF37]" />
              </button>
            </motion.div>

            {/* Title — always centered */}
            <motion.div
              key={`title-${selectedIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 text-center"
            >
              <h4 className="text-white font-bold text-xl md:text-2xl tracking-wide text-center">
                {allProjects[selectedIndex].title}
              </h4>
              <p className="text-[10px] uppercase tracking-[4px] text-[#D4AF37]/50 mt-1">
                {allProjects[selectedIndex].category}
              </p>
            </motion.div>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-5">
              {allProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`rounded-full transition-all duration-400 ${
                    selectedIndex === i
                      ? "w-6 h-1.5 bg-[#D4AF37]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
