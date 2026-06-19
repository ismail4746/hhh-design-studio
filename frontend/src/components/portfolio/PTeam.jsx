import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import member1 from "../../assets/team2.jpg";
import member2 from "../../assets/draft.jpg";
import member3 from "../../assets/interiorDesign.jpg";
import member4 from "../../assets/site.jpg";
import member5 from "../../assets/architect.jpg";
import member6 from "../../assets/site2.jpg";
import { X, Linkedin, Instagram, Facebook } from "lucide-react";
import OptimizedImg from "../common/OptimizedImg";

const teamMembers = [
  {
    name: "Muhammad Mateen",
    role: "3D Designer",
    desc: "Specializes in creating photorealistic 3D models, walkthroughs, and architectural visualizations that bring spaces to life before construction begins.",
    img: member1,
    tag: "Visualization",
    num: "01",
  },
  {
    name: "Muhammad Ahmad",
    role: "Draftsman",
    desc: "Expert in preparing precise technical drawings, detailed layouts, and construction-ready plans with meticulous attention to detail.",
    img: member2,
    tag: "Technical",
    num: "02",
  },
  {
    name: "Muhammad Awais",
    role: "Interior Designer",
    desc: "Designs modern and functional interior spaces with creative 3D concepts, material selections, and detailed layout planning.",
    img: member3,
    tag: "Interiors",
    num: "03",
  },
  {
    name: "Ahad Saddique",
    role: "Construction Manager",
    desc: "Supervises on-site activities, ensuring quality control, safety standards, and timely project completion at every phase.",
    img: member4,
    tag: "Management",
    num: "04",
  },
  {
    name: "Noman Waris",
    role: "Architect",
    desc: "Creates innovative architectural concepts, balancing aesthetics, functionality, and sustainability in every design.",
    img: member5,
    tag: "Architecture",
    num: "05",
  },
  {
    name: "Naeem",
    role: "Site Supervisor",
    desc: "Oversees construction projects with precision, ensuring quality, safety, and timely execution while maintaining coordination between design and site work.",
    img: member6,
    tag: "On-Site",
    num: "06",
  },
];

const socialLinks = [
  { Icon: Facebook,  href: "#", label: "Facebook"  },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin,  href: "#", label: "LinkedIn"  },
];

export default function PTeam() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="team"
      className="py-32 bg-[#080808] text-white relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#D4AF37]/4 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b8902d]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[8px] text-[#D4AF37]/60 font-medium">
              The People Behind the Vision
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tight mb-4">
            <span className="text-white">Meet Our </span>
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#e8cc72] to-[#b8902d] bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-white/35 text-sm max-w-sm mx-auto leading-relaxed mt-4">
            A dedicated group of professionals passionate about crafting spaces that inspire and endure.
          </p>
          <div className="mt-7 h-px max-w-[120px] mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              onClick={() => setSelected(member)}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Avatar ring + image */}
              <div className="relative mb-5">
                {/* Outer gold ring — animates on hover */}
                <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#D4AF37] via-[#e8cc72] to-[#b8902d] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Middle gap ring */}
                <div className="absolute -inset-[2px] rounded-full bg-[#080808]" />
                {/* Image container */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 group-hover:border-transparent transition-colors duration-500">
                  <OptimizedImg
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-[1.08]"
                    loading="lazy"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Number badge — bottom right of avatar */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0e0e0e] border border-[#D4AF37]/30 flex items-center justify-center">
                  <span className="text-[8px] font-black text-[#D4AF37]/60 tabular-nums">{member.num}</span>
                </div>
              </div>

              {/* Name */}
              <h4 className="text-[15px] md:text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300 leading-snug mb-1 px-2">
                {member.name}
              </h4>

              {/* Role */}
              <p className="text-[9px] uppercase tracking-[3px] text-[#D4AF37]/50 mb-3">
                {member.role}
              </p>

              {/* Tag pill */}
              <span className="px-3 py-1 rounded-full text-[8px] uppercase tracking-[2px] bg-white/4 border border-white/8 text-white/30 group-hover:border-[#D4AF37]/25 group-hover:text-[#D4AF37]/60 group-hover:bg-[#D4AF37]/5 transition-all duration-400">
                {member.tag}
              </span>

              {/* Gold line reveal on hover */}
              <div className="mt-4 h-px w-8 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Premium Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#0b0b0b] border border-white/8 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent z-30" />

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 z-40 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 hover:border-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
              >
                <X size={14} className="text-white/60 hover:text-white transition-colors duration-300" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">

                {/* ── Left: Full Image ── */}
                <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
                  <OptimizedImg
                    src={selected.img}
                    alt={selected.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="eager"
                  />

                  {/* Gradient blending into right panel on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0b0b0b] hidden md:block" />
                  {/* Gradient bottom on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/20 to-transparent md:hidden" />

                  {/* Tag badge — top left */}
                  <div className="absolute top-5 left-5 z-10 px-3 py-1.5 rounded-full bg-black/60 border border-[#D4AF37]/30 backdrop-blur-md">
                    <span className="text-[9px] uppercase tracking-[3px] text-[#D4AF37]/80 font-medium">
                      {selected.tag}
                    </span>
                  </div>

                  {/* Number watermark — bottom left */}
                  <div className="absolute bottom-5 left-5 z-10">
                    <span className="text-7xl font-black text-white/6 select-none leading-none">
                      {selected.num}
                    </span>
                  </div>
                </div>

                {/* ── Right: Details ── */}
                <div className="relative flex flex-col justify-between p-8 md:p-10">

                  <div>
                    {/* Line + tag label */}
                    <div className="flex items-center gap-3 mb-7">
                      <div className="h-px w-8 bg-gradient-to-r from-[#D4AF37] to-[#b8902d]" />
                      <span className="text-[9px] uppercase tracking-[5px] text-[#D4AF37]/55 font-medium">
                        {selected.role}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-8">
                      {selected.name}
                    </h2>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent mb-7" />

                    {/* Description */}
                    <p className="text-white/45 text-sm leading-[1.95]">
                      {selected.desc}
                    </p>
                  </div>

                  {/* Bottom: socials */}
                  <div className="mt-10 pt-7 border-t border-white/6">
                    <p className="text-[8px] uppercase tracking-[5px] text-white/20 mb-4">
                      Connect
                    </p>
                    <div className="flex gap-2.5">
                      {socialLinks.map(({ Icon, href, label }, i) => (
                        <a
                          key={i}
                          href={href}
                          aria-label={label}
                          className="w-10 h-10 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/8 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
                        >
                          <Icon size={15} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gold bottom bar */}
              <div className="h-[2px] bg-gradient-to-r from-[#D4AF37]/60 via-[#e8cc72]/40 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
