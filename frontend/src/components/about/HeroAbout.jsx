import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/lc2.jpg";
import { ChevronDown } from "lucide-react";

export default function HeroAbout() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative z-10 text-center px-4 sm:px-6 md:px-8"
      >
        {/* Title */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-[4px] sm:tracking-[6px] md:tracking-[9px] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          About
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-yellow-500 text-base sm:text-lg md:text-3xl font-semibold tracking-[3px] sm:tracking-[6px] md:tracking-[8px] mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          HHH DESIGN STUDIO
        </motion.p>

        {/* Main Paragraph */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-4 leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          An artistic journey of innovation, refinement and soul — crafting
          spaces that whisper luxury and echo timeless architectural beauty.
        </motion.p>

        {/* Second Paragraph */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xs sm:text-sm md:text-lg text-white max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          From inspiring architecture to bespoke interiors and seamless project
          execution — every detail is designed with heart, precision and
          uncompromising elegance.
        </motion.p>
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
