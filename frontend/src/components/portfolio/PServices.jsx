import React from "react";
import { motion } from "framer-motion";

const services = [
  { title: "Architecture Design", desc: "Innovative building designs tailored to your needs." },
  { title: "Interior Design", desc: "Elegant and functional interiors for homes and offices." },
  { title: "Project Management", desc: "Planning and managing projects to deliver successful results." }


];

export default function PServices() {
  return (
    <section id="services" className="py-20 bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 tracking-wide"
        >
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
            Our Services
          </span>
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative rounded-2xl overflow-hidden group p-[2px]"
            >
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37] via-transparent to-[#b8902d] opacity-60 blur-lg transition duration-500 group-hover:opacity-100"></div>
              
              <div className="relative z-10 p-6 bg-[#222222]/80 backdrop-blur-xl rounded-2xl border border-gray-700 group-hover:shadow-[0_0_25px_#D4AF37]/40 transition">
                <h4 className="text-xl font-semibold mb-2 text-[#D4AF37]">
                  {s.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
