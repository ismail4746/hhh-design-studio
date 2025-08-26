import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "../../assets/services.jpg";

export default function ServicesHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Services Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
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
          Our <span className="text-yellow-400"> Services </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Delivering premium architecture and interior design solutions — 
          blending elegance, functionality, and timeless appeal for every space.
        </motion.p>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: "mirror" }}
          className="flex justify-center"
        >
          <ChevronDown className="text-white w-8 h-8 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
