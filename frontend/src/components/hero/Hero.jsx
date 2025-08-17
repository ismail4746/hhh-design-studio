import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}  // Always animate when in view
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-wide mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Crafting <span className="text-yellow-500">Spaces</span> That Inspire
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Premium Architecture & Interior Design solutions tailored for
          elegance, functionality, and timeless appeal.
        </motion.p>

        <motion.button
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition"
        >
          Explore Our Work
        </motion.button>
      </motion.div>
    </section>
  );
}
