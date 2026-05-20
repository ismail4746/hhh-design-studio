import React from "react";
import { motion } from "framer-motion";
import { FaDraftingCompass, FaCouch, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import storeImg from "../../assets/architecture.jpg";
import MMM from "../../assets/MMM.jpeg";
import OptimizedImg from "../common/OptimizedImg";

export default function Store() {
  return (
    <section id="store" className="py-24 bg-[#0d0d0d] text-white relative overflow-hidden">
      {/* blurred rings */}
      <div className="absolute -top-5 -left-5 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-0 -right-10 w-80 h-80 bg-[#b8902d]/30 rounded-full blur-[180px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16 relative z-10">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="border-[6px] border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden">
            <OptimizedImg src={MMM} alt="Our Store" className="w-full h-[500px] object-cover" loading="lazy" />
          </div>
        </motion.div>

        {/* content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-sm uppercase tracking-[6px] text-white">Our Store</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent">
            Where Design Meets Excellence
          </h2>
          <p className="text-white mb-8 leading-relaxed text-lg">
            Step into our creative space where modern architecture, innovative interiors,
            and professional project management come together to craft iconic, timeless environments.
            Our store is not just a workspace — it’s an experience of luxury & design perfection.
          </p>

          {/* services */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <FaDraftingCompass size={32} />, title: "Architecture" },
              { icon: <FaCouch size={32} />, title: "Interior Design" },
              { icon: <FaProjectDiagram size={32} />, title: "Project Management" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-[#131313] p-5 rounded-2xl hover:-translate-y-1 transition">
                <div className="text-[#D4AF37] mb-3">{item.icon}</div>
                <p className="font-semibold text-white">{item.title}</p>
              </div>
            ))}
          </div>

          {/* premium button */}
          <div className="text-center">
            <Link
              to="/about"
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#e6c26a] to-[#b8902d] text-black font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_40px_#D4AF37]/50 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
