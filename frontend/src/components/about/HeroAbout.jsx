import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/abouthero.jpg";

export default function HeroAbout() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <img
        src={heroImg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-white tracking-[9px] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          About
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-yellow-500 text-lg md:text-2xl font-semibold tracking-[8px] mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          HHH DESIGN STUDIO
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          An artistic journey of innovation, refinement and soul —
          crafting spaces that whisper luxury and echo timeless architectural beauty.
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          From inspiring architecture to bespoke interiors and seamless project
          execution — every detail is designed with heart, precision and uncompromising elegance.
        </motion.p>
      </motion.div>
    </section>
  );
}
