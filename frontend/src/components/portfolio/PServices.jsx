import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Sofa,
  ClipboardList,
  HardHat,
  Wrench,
} from "lucide-react";

const services = [
  {
    num: "01",
    icon: Building2,
    title: "Architecture Design",
    short: "From vision to blueprint",
    desc: "We craft innovative, site-responsive architectural designs that balance aesthetics with function — from concept sketches to construction-ready blueprints tailored entirely to your vision.",
    tags: ["Concept Design", "Floor Plans", "Elevations", "3D Rendering"],
    color: "#D4AF37",
  },
  {
    num: "02",
    icon: Sofa,
    title: "Interior Design",
    short: "Spaces that inspire daily",
    desc: "Elegant, functional interiors for homes and offices — blending material palettes, lighting schemes, and spatial planning to create environments that feel alive.",
    tags: ["Space Planning", "Material Boards", "Lighting", "Furniture"],
    color: "#c9a227",
  },
  {
    num: "03",
    icon: ClipboardList,
    title: "Project Management",
    short: "Precision from day one",
    desc: "From planning through handover, we manage timelines, budgets, contractors, and quality so your project is delivered seamlessly — on time and within scope.",
    tags: ["Scheduling", "Budgeting", "Coordination", "Reporting"],
    color: "#e8cc72",
  },
  {
    num: "04",
    icon: HardHat,
    title: "Construction",
    short: "Built to last, built right",
    desc: "End-to-end construction combining skilled labour, premium materials, and rigorous site supervision for results that meet the highest standards of craftsmanship.",
    tags: ["Site Management", "Quality Control", "Safety", "Execution"],
    color: "#b8902d",
  },
  {
    num: "05",
    icon: Wrench,
    title: "Renovation",
    short: "Transform what exists",
    desc: "Breathing new life into existing structures — whether a single room or a full-scale renovation, we reimagine your space with precision and minimal disruption.",
    tags: ["Remodeling", "Upgrades", "Restoration", "Modern Finish"],
    color: "#d4a843",
  },
];

export default function PServices() {
  const [hovered, setHovered] = useState(0);
  const active = services[hovered];
  const Icon = active.icon;

  return (
    <section
      id="services"
      className="py-32 bg-[#080808] text-white relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b8902d]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <span className="text-[10px] uppercase tracking-[8px] text-[#D4AF37]/70 font-medium">
              What We Offer
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
              <span className="block text-white">Our</span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#e8cc72] to-[#b8902d] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed md:text-right">
              Every discipline under one roof — delivered with craft, clarity, and commitment.
            </p>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent" />
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-16 items-start">

          {/* Left — Service List */}
          <div className="flex flex-col divide-y divide-white/5">
            {services.map((svc, i) => {
              const isActive = hovered === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onMouseEnter={() => setHovered(i)}
                  className="group relative flex items-center gap-6 py-7 cursor-default transition-all duration-300"
                >
                  {/* Active left bar */}
                  <motion.div
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#D4AF37] to-[#b8902d] origin-top"
                  />

                  {/* Number */}
                  <span
                    className={`text-[11px] font-black tracking-[4px] tabular-nums flex-shrink-0 transition-colors duration-400 ml-4 ${
                      isActive ? "text-[#D4AF37]" : "text-white/15"
                    }`}
                  >
                    {svc.num}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-tight transition-all duration-400 leading-none ${
                      isActive
                        ? "text-white"
                        : "text-white/25 group-hover:text-white/50"
                    }`}
                  >
                    {svc.title}
                  </h3>

                  {/* Short label — only on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="ml-auto text-[10px] uppercase tracking-[3px] text-[#D4AF37]/50 hidden md:block flex-shrink-0"
                      >
                        {svc.short}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right — Sticky Detail Panel */}
          <div className="hidden lg:block sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl border border-white/8 bg-[#0e0e0e] overflow-hidden"
              >
                {/* Top gold line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                {/* Glow bg */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4AF37]/6 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 p-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    <Icon size={26} className="text-[#D4AF37]" />
                  </div>

                  {/* Number watermark */}
                  <div className="absolute top-6 right-8 text-7xl font-black text-white/4 select-none leading-none">
                    {active.num}
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-black text-white mb-1 leading-tight">
                    {active.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-[4px] text-[#D4AF37]/50 mb-6">
                    {active.short}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-[#D4AF37]/25 to-transparent mb-6" />

                  {/* Desc */}
                  <p className="text-white/50 text-sm leading-[1.9] mb-8">
                    {active.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((tag, t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[2px] bg-[#D4AF37]/8 border border-[#D4AF37]/20 text-[#D4AF37]/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom gold bar */}
                <div className="h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#e8cc72] to-[#b8902d]" />
              </motion.div>
            </AnimatePresence>

            {/* Indicator dots */}
            <div className="flex justify-center gap-2 mt-5">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHovered(i)}
                  className={`rounded-full transition-all duration-400 ${
                    hovered === i
                      ? "w-6 h-1.5 bg-[#D4AF37]"
                      : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile — expanded cards below list */}
          <div className="lg:hidden mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#D4AF37]/15 bg-[#0e0e0e] p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                    <Icon size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">{active.title}</p>
                    <p className="text-[10px] uppercase tracking-[3px] text-[#D4AF37]/50">{active.short}</p>
                  </div>
                </div>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{active.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag, t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[2px] bg-[#D4AF37]/8 border border-[#D4AF37]/20 text-[#D4AF37]/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
