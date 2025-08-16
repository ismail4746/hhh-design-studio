import React from "react";
import { motion } from "framer-motion";
import heroBg from "../../assets/hero11.jpg";
import logo from "../../assets/logomm.png";

export default function PHero() {
  return (
      <section
          id="home"
          className="relative h-screen w-full bg-cover bg-center md:bg-top md:bg-fixed pt-24"
          style={{ backgroundImage: `url(${heroBg})` }}
      >
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-6 drop-shadow-2xl">
            Portfolio
          </h1>
          <div className="w-20 h-[3px] bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            We craft timeless, functional, and luxurious spaces — blending
            modern architecture with exquisite interior design to match your
            lifestyle.
          </p>
          <a
            href="#projects"
            className="inline-block mt-10 px-8 py-3 border border-amber-500 bg-amber-600/90 text-white text-lg rounded-lg shadow-lg hover:bg-amber-700 hover:border-amber-400 transition duration-300"
          >
            View Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
