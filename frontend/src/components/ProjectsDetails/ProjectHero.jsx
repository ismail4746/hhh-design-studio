import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/img35.jpg";

export default function ProjectHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Projects Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible" // animate immediately on mount
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
        }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white tracking-wide mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our <span className="text-yellow-500">Projects</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Discover a curated selection of our architectural and interior
          design projects, showcasing creativity, functionality, and
          timeless elegance in every space.
        </motion.p>
      </motion.div>
    </section>
  );
}
