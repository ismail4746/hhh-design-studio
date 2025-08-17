import React from "react";
import { motion } from "framer-motion";
import ceoImg from "../../assets/azeemCeo1.jpg";
import { Link } from "react-router-dom";

export default function Ceo() {
  return (
    <section className="py-24 bg-[#0e0e0e] text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Image with slow zoom hover */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.20)]"
        >
          <img
            src={ceoImg}
            alt="Chief Executive Officer"
            className="w-full h-[580px] object-cover transition-transform duration-[6000ms] hover:scale-110"
          />
        </motion.div>

        {/* Speech */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* back blur glow */}
          <div className="absolute -left-5 -top-5 w-40 h-40 bg-[#D4AF37]/30 rounded-full blur-[120px] -z-10"></div>

          <p className="text-lg text-gray-400 mb-1 tracking-wide font-medium"
            style={{ fontFamily: "'Poppins',sans-serif" }}>
            Muhammad Azeem
          </p>

          <h4 className="text-yellow-500 text-xs tracking-[6px] uppercase mb-4">
            Chief Executive Officer
          </h4>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent"
            style={{ fontFamily:"'Playfair Display',serif" }}>
            “We don’t create buildings — <br/> we shape emotions through space.”
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-10"
            style={{ fontFamily:"'Poppins',sans-serif" }}>
            At HHH Design Studio, we believe architecture, interiors and project
            management are not services — they are a journey of translating soul
            into structure. Every detail is crafted to echo legacy, luxury and
            emotion across generations.
          </p>

          {/* Premium Button */}
          <Link
            to="/portfolio"
            className="inline-block px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] font-semibold tracking-wide transition duration-300 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b8902d] hover:text-black"
          >
            Visit Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
