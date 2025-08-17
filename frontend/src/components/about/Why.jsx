import React from "react";
import { motion } from "framer-motion";
import { FaCrown, FaLayerGroup, FaLightbulb } from "react-icons/fa";

export default function Why() {
  return (
    <section className="py-24 bg-[#0c0c0c] text-white relative overflow-hidden">
      {/* blurred glow */}
      <div className="absolute -left-16 -top-10 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-[180px]"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#b8902d]/20 rounded-full blur-[160px]"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent tracking-wider"
            style={{ fontFamily:"'Playfair Display', serif" }}>
          Why HHH Design Studio?
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-14 text-lg" style={{fontFamily:"'Poppins',sans-serif"}}>
          Because we don’t just design spaces — we create soulful experiences that elevate the way
          people live, work and feel. Our design philosophy blends timeless luxury with modern innovation.
        </p>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaCrown size={38} />,
              title: "Signature Architecture",
              desc: "Distinctive forms, bespoke detailing, and iconic silhouettes that stand as symbols of identity and elegance."
            },
            {
              icon: <FaLayerGroup size={38} />,
              title: "Interior Luxury",
              desc: "Curated materials, thoughtful functionality and handcrafted refinement for interiors that truly feel alive."
            },
            {
              icon: <FaLightbulb size={38} />,
              title: "Project Brilliance",
              desc: "From drawings to handover — our management expertise ensures flawless execution & timeless results."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-[#141414]/80 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_60px_#D4AF37]/30 transition"
            >
              <div className="text-[#D4AF37] mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2" style={{fontFamily:"'Playfair Display',serif"}}>{item.title}</h4>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
