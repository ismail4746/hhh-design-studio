import React from "react";
import { motion } from "framer-motion";
import member1 from "../../assets/team2.jpg";
import member2 from "../../assets/draft2.jpg";
import member3 from "../../assets/interiorDesign.jpg";
import member4 from "../../assets/site.jpg";
import member5 from "../../assets/architect.jpg";  

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
        role: "Site Incharge",
        desc: "Supervises on-site activities, ensuring quality control, safety, and timely project completion.",
        img: member4,
      },
      {
        name: "NOMAN WARIS",
        role: "Architect",
        desc: "Creates innovative architectural concepts, balancing aesthetics, functionality, and sustainability.",
        img: member5,
      },
      
];

export default function PTeam() {
  return (
    <section
      id="team"
      className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white relative overflow-hidden"
    >
      {/* Soft golden grid background */}
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
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] relative z-10 transition duration-500 group-hover:scale-110"
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

                {/* Social Links Dummy */}
                <div className="mt-6 flex gap-4">
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
          ))}
        </div>
      </div>
    </section>
  );
}
