"use client"; // Required for framer-motion

import { FaAward, FaBriefcase, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutEx() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 md:py-20 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Card 1: Experience */}
        <motion.div
          className="bg-[#1c1c1c] p-6 sm:p-8 rounded-3xl border border-[#2f2f2f] 
          hover:-translate-y-2 hover:shadow-[0_0_40px_#D4AF37]/30 transition"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-[#D4AF37]/20 p-3 sm:p-4 rounded-full">
              <FaAward className="text-[#D4AF37]" size={28} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
              18 <span className="text-[#D4AF37]">Years of Experience</span>
            </h3>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Bringing visionary architectural concepts to life with uncompromising
            detailing, thoughtful design and client-centric execution.
            Our experience is rooted in passion & polished through precision.
          </p>
        </motion.div>

        {/* Card 2: Projects */}
        <motion.div
          className="bg-[#1c1c1c] p-6 sm:p-8 rounded-3xl border border-[#2f2f2f] 
          hover:-translate-y-2 hover:shadow-[0_0_40px_#b8902d]/30 transition flex flex-col"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-[#b8902d]/20 p-3 sm:p-4 rounded-full">
              <FaBriefcase className="text-[#b8902d]" size={28} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
              56 <span className="text-[#b8902d]">Projects Completed</span>
            </h3>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
            From luxury villas to corporate towers and boutique interiors,
            our portfolio captures innovation, craftsmanship and timeless beauty.
          </p>
          <Link
            href="/project"
            className="w-full sm:w-auto mt-auto inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:opacity-90 transition text-center"
          >
            Visit Projects
          </Link>
        </motion.div>

        {/* Card 3: Sustainable + Modern */}
        <motion.div
          className="bg-[#1c1c1c] p-6 sm:p-8 rounded-3xl border border-[#2f2f2f] 
          hover:-translate-y-2 hover:shadow-[0_0_40px_#75e08c]/30 transition w-full md:col-span-2 md:w-2/3 mx-auto"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={2}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-[#75e08c]/20 p-3 sm:p-4 rounded-full">
              <FaLeaf className="text-[#75e08c]" size={28} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
              Sustainable & <span className="text-[#75e08c]">Modern Design</span>
            </h3>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Fusing nature-inspired principles with cutting-edge
            contemporary techniques to deliver spaces that are
            environmentally conscious, future-ready and aesthetically bold.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
