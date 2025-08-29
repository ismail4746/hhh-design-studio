import React from "react";
import { motion } from "framer-motion";
import ceoImg from "../../assets/azeemCeo1.jpg";
import { Link } from "react-router-dom";

export default function Ceo() {
  return (
    <section className="py-20 md:py-28 bg-[#0e0e0e] text-white relative overflow-hidden">
      {/* background luxury gradient blur */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8902d]/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* CEO Image */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden group"
        >
          {/* glow layers */}
          <div className="absolute -inset-12 bg-gradient-to-tr from-[#D4AF37]/40 via-transparent to-[#b8902d]/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-all duration-1000"></div>
          <div className="absolute -inset-16 bg-gradient-to-br from-[#b8902d]/25 via-transparent to-[#D4AF37]/25 rounded-3xl blur-[120px] opacity-50 group-hover:opacity-80 transition-all duration-1000"></div>

          <img
            src={ceoImg}
            alt="Chief Executive Officer"
            className="relative w-full h-[450px] sm:h-[520px] object-cover rounded-3xl transform transition-transform duration-[6000ms] group-hover:scale-105 group-hover:rotate-[1deg] shadow-[0_0_80px_rgba(212,175,55,0.25)]"
          />

          {/* shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/40 mix-blend-overlay pointer-events-none"></div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <p
            className="text-lg text-white mb-2 tracking-wide font-medium"
            style={{ fontFamily: "'Poppins',sans-serif" }}
          >
            Muhammad Azeem
          </p>

          <h4 className="text-yellow-500 text-xs tracking-[6px] uppercase mb-6">
            Chief Executive Officer
          </h4>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-tight mb-6 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display',serif" }}
          >
            “We don’t create buildings — we shape emotions through space.”
          </h2>

          <p
            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10"
            style={{ fontFamily: "'Poppins',sans-serif" }}
          >
            At HHH Design Studio, we believe architecture, interiors, and project
            management are not just services — they’re a journey of translating
            soul into structure. Every detail is crafted to echo legacy, luxury,
            and emotion across generations.
          </p>

          {/* Premium Button */}
          <Link
            to="/portfolio"
            className="inline-block px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] font-semibold tracking-wide transition duration-500 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b8902d] hover:text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Visit Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
