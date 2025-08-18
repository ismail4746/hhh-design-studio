import React from "react";
import { FaAward, FaBriefcase, FaLeaf } from "react-icons/fa";

export default function AboutEX() {
  return (
    <section className="py-16 md:py-20 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* Card 1: Experience */}
        <div className="bg-[#1c1c1c] p-6 sm:p-8 rounded-3xl border border-[#2f2f2f] hover:-translate-y-2 hover:shadow-[0_0_40px_#D4AF37]/30 transition">
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
        </div>

        {/* Card 2: Projects */}
        <div className="bg-[#1c1c1c] p-6 sm:p-8 rounded-3xl border border-[#2f2f2f] hover:-translate-y-2 hover:shadow-[0_0_40px_#b8902d]/30 transition flex flex-col">
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
          <button className="w-full sm:w-auto mt-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold hover:opacity-90 transition">
            Visit Projects
          </button>
        </div>

        {/* Card 3: Sustainable + Modern */}
        <div className="bg-[#1c1c1c] p-6 sm:p-8 rounded-3xl border border-[#2f2f2f] hover:-translate-y-2 hover:shadow-[0_0_40px_#75e08c]/30 transition w-full md:col-span-2 md:w-2/3 mx-auto">
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
        </div>

      </div>
    </section>
  );
}
