import React from "react";
import { motion } from "framer-motion";

export default function AboutStore() {
  return (
    <section className="py-24 bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold tracking-wider mb-6 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Store
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg leading-8 text-gray-300"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          From architectural concepts to interior artistry and impeccable project
          execution, our store is a tribute to the craft of design.  
          Here, every detail is curated — every line imagined with precision.  
          We create spaces that don’t just look beautiful, but feel unforgettable.  
          Driven by innovation and disciplined management, we turn ambitions into
          buildable realities.  
          Step inside our world of timeless design, where luxury meets purpose and
          visions are brought to life with passion.  
        </motion.p>
      </div>
    </section>
  );
}
