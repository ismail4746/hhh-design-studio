import React from "react";
import { motion } from "framer-motion";
import { FaDraftingCompass, FaCouch, FaProjectDiagram, FaHardHat, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import MMM from "../../assets/MMM.jpeg";
import OptimizedImg from "../common/OptimizedImg";

export default function Store() {
  return (
    <section id="store" className="py-20 bg-[#0d0d0d] text-white relative overflow-hidden">
      {/* blurred rings */}
      <div className="absolute -top-5 -left-5 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-10 w-80 h-80 bg-[#b8902d]/30 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-stretch gap-12">

          {/* ── image column ── */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex items-center"
          >
            <div className="border-[6px] border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden w-full">
              <OptimizedImg
                src={MMM}
                alt="Our Store"
                className="w-full h-[480px] md:h-[540px] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* ── content column ── */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex flex-col justify-center"
          >
            <h3 className="text-xs uppercase tracking-[6px] text-[#D4AF37]/70 mb-3">
              Our Store
            </h3>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
              Where Design Meets Excellence
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed text-base">
              Step into our creative space where modern architecture, innovative interiors,
              and professional project management come together to craft iconic, timeless
              environments. Our store is not just a workspace — it's an experience of
              luxury & design perfection.
            </p>

            {/* services grid — 3 cols always */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: <FaDraftingCompass size={28} />, title: "Architecture" },
                { icon: <FaCouch size={28} />, title: "Interior Design" },
                { icon: <FaProjectDiagram size={28} />, title: "Project Management" },
                { icon: <FaHardHat size={28} />, title: "Construction" },
                { icon: <FaTools size={28} />, title: "Renovation" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-[#131313] border border-[#D4AF37]/10 p-4 rounded-2xl hover:-translate-y-1 hover:border-[#D4AF37]/40 transition-all duration-300"
                >
                  <div className="text-[#D4AF37] mb-2">{item.icon}</div>
                  <p className="font-semibold text-white text-sm text-center leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* button */}
            <div>
              <Link
                to="/about"
                className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#e6c26a] to-[#b8902d] text-black font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}