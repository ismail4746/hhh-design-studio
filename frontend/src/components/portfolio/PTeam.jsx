import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import member1 from "../../assets/team2.jpg";
import member2 from "../../assets/draft.jpg";
import member3 from "../../assets/interiorDesign.jpg";
import member4 from "../../assets/site.jpg";
import member5 from "../../assets/architect.jpg";  
import member6 from "../../assets/site2.jpg";  
import { X } from "lucide-react";
import OptimizedImg from "../common/OptimizedImg";

const teamMembers = [
  {
    name: "MUHAMMAD MATEEN",
    role: "3D Designer",
    desc: "Specializes in creating photorealistic 3D models, walkthroughs, and architectural visualizations.",
    img: member1,
  },
  {
    name: "MUHAMMAD AHMAD",
    role: "Draftsman",
    desc: "Expert in preparing precise technical drawings, detailed layouts, and construction-ready plans.",
    img: member2,
  },
  {
    name: "MUHAMMAD AWAIS",
    role: "Interior Designer",
    desc: "Designs modern and functional interior spaces with creative 3D concepts and detailed layouts.",
    img: member3,
  },
  {
    name: "AHAD SADDIQUE",
    role: "Construction Manager",
    desc: "Supervises on-site activities, ensuring quality control, safety, and timely project completion.",
    img: member4,
  },
  {
    name: "NOMAN WARIS",
    role: "Architect",
    desc: "Creates innovative architectural concepts, balancing aesthetics, functionality, and sustainability.",
    img: member5,
  },
  {
    name: "Naeem",
    role: "Site Supervisor",
    desc:"Oversees construction projects with precision, ensuring quality, safety, and timely execution while maintaining coordination between design and site work.",
    img: member6,
  },
];

export default function PTeam() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="team"
      className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/gold-fibers.png')]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent tracking-wide"
          >
            Meet Our Creative Minds
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-32 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#b8902d] mx-auto rounded-full mt-4"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative overflow-hidden rounded-3xl p-[2px] bg-gradient-to-tr from-[#D4AF37] to-[#b8902d] h-full group`}
            >
              <div className="bg-[#101010]/90 rounded-3xl backdrop-blur-xl p-8 shadow-xl group-hover:-translate-y-3 group-hover:shadow-[0_0_45px_#D4AF37]/40 transition transform h-full flex flex-col items-center text-center">
                {/* Image */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#b8902d] blur-md opacity-40 group-hover:opacity-70 transition"></div>
                  <OptimizedImg
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] relative z-10 transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Name & Role */}
                <h4 className="mt-6 text-xl font-semibold text-[#D4AF37]">
                  {member.name}
                </h4>
                <p className="uppercase tracking-[3px] text-gray-400 text-xs mb-4">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                  {member.desc}
                </p>

                {/* Button */}
                <button
                  onClick={() => setSelected(member)}
                  className="mt-6 px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold rounded-full shadow-lg hover:scale-105 transition"
                >
                  More Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#101010] rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left - Image */}
              <div className="relative">
                <OptimizedImg
                  src={selected.img}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white rounded-full p-2"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Right - Details */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-[#D4AF37]">{selected.name}</h2>
                <p className="uppercase text-gray-400 tracking-[3px] text-sm mb-4">
                  {selected.role}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">{selected.desc}</p>

                {/* Social Links */}
                <div className="flex gap-4 mt-auto">
                  <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
