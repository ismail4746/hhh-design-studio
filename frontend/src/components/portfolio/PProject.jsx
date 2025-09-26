import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import project1 from "../../assets/architecture/ar5.jpg";
import project2 from "../../assets/architecture/ar13.jpg";
import project3 from "../../assets/bedroom/bd2.jpg";
import project4 from "../../assets/bedroom3.jpg";
import project5 from "../../assets/interior/interior15.jpg";
import project6 from "../../assets/lobby1.jpg";
import OptimizedImg from "../common/OptimizedImg";

const allProjects = [
  { id: 1, img: project1, title: "Luxury Villa" },
  { id: 2, img: project2, title: "Luxury Villa" },
  { id: 3, img: project3, title: "King Size Bedroom" },
  { id: 4, img: project4, title: "Luxury Bedroom" },
  { id: 5, img: project5, title: "Luxury Lobby" },
  { id: 6, img: project6, title: "Lobby" },
];

export default function PProjects() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null); // modal ke liye index

  // Next / Prev functions
  const nextSlide = () => {
    setSelectedIndex((prev) => (prev + 1) % allProjects.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? allProjects.length - 1 : prev - 1
    );
  };

  return (
    <section id="projects" className="py-20 bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center text-[#D4AF37]"
        >
          Architectural Excellence
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10 rounded"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {allProjects.slice(0, 6).map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedIndex(index)} // click par modal khulega
              className="group relative rounded-3xl overflow-hidden
                         bg-[#1a1a1a]/40 backdrop-blur-lg p-[2px] cursor-pointer
                         border border-gray-700 hover:border-[#D4AF37]
                         hover:shadow-[0_0_25px_#D4AF37]/40 transition"
            >
              <div className="rounded-3xl overflow-hidden">
                <OptimizedImg
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
                  <motion.h4
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-white text-center px-2"
                  >
                    {p.title}
                  </motion.h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Button → Projects Page */}
        <div className="text-center mt-10">
          <motion.button
            onClick={() => navigate("/project")}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-7 py-3 bg-[#D4AF37] text-[#0f0f0f] rounded-lg hover:bg-[#b8902d] transition"
          >
            Explore More Projects
          </motion.button>
        </div>
      </div>

      {/* Modal with Slider */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 z-40 right-4 text-white hover:text-[#D4AF37]"
              >
                <X size={28} />
              </button>

              {/* Slider Content */}
              <div className="relative flex items-center justify-center">
                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 text-white hover:text-[#D4AF37]"
                >
                  <ChevronLeft size={36} />
                </button>

                {/* Image */}
                <OptimizedImg
                  src={allProjects[selectedIndex].img}
                  alt={allProjects[selectedIndex].title}
                  className="max-h-[80vh] object-contain mx-auto rounded-lg"
                  loading="eager"
                />

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-4 text-white hover:text-[#D4AF37]"
                >
                  <ChevronRight size={36} />
                </button>
              </div>

              {/* Title */}
              <div className="p-4 text-center text-white text-xl font-semibold">
                {allProjects[selectedIndex].title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
