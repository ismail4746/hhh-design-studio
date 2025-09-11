"use client"; // Next.js 13+ app directory ke liye

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src="/assets/hero.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

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
          Designing <span className="text-yellow-500">Spaces</span> That Ignite Creativity
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
          Premium Architecture & Interior Design solutions tailored for
          elegance, functionality, and timeless appeal.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Link href="/project">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105">
              Explore Our Work
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
