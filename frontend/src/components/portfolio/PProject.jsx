import React, { useState } from "react";
import { motion } from "framer-motion";
import architecture1 from "../../assets/img39.webp";
import architecture2 from "../../assets/architecture1.jpg";
import architecture3 from "../../assets/architecture.jpg";
import architecture4 from "../../assets/architecture2.jpg";
import architecture5 from "../../assets/architecture3.jpg";
import architecture6 from "../../assets/architecture4.jpg";
import architecture7 from "../../assets/architecture5.jpg";
import project2 from "../../assets/img2.jpg";
import project3 from "../../assets/img3.jpg";
import bedroom from "../../assets/bedroom.jpg";
import bedroom1 from "../../assets/bedroom1.jpg";
import bedroom2 from "../../assets/bedroom3.jpg";
import lobby from "../../assets/interior.jpg";
import lobby1 from "../../assets/lobby.jpg";
import lobby2 from "../../assets/lobby1.jpg";
import lobby3 from "../../assets/lobby2.jpg";
import interior from "../../assets/interior12.jpg";
import interior1 from "../../assets/interior1.jpg";
import interior2 from "../../assets/interior2.jpg";
import landscape from "../../assets/landscape.jpg";
import landscape1 from "../../assets/landscape1.jpg";
import landscape2 from "../../assets/lc.jpg";
import lobby5 from "../../assets/lobby/lobby10.jpg";
import lobby6 from "../../assets/lobby/lobby11.jpg";
import lobby7 from "../../assets/lobby/lobby12.jpg";
import bedroom5 from "../../assets/bedroom/bd1.jpg";
import bedroom6 from "../../assets/bedroom/bd2.jpg";
import bedroom7 from "../../assets/bedroom/bd3.jpg";
import ar1 from "../../assets/architecture/ar1.jpg";
import ar2 from "../../assets/architecture/ar2.jpg";
import ar3 from "../../assets/architecture/ar3.jpg";
import ar4 from "../../assets/architecture/ar4.jpg";
import ar5 from "../../assets/architecture/ar5.jpg";
import ar6 from "../../assets/architecture/ar6.jpg";
import ar7 from "../../assets/architecture/ar7.jpg";
import ar8 from "../../assets/architecture/ar8.jpg";
import ar9 from "../../assets/architecture/ar9.jpg";
import ar10 from "../../assets/architecture/ar10.jpg";
import ar11 from "../../assets/architecture/ar11.jpg";
import ar12 from "../../assets/architecture/ar12.jpg";
import ar13 from "../../assets/architecture/ar13.jpg";
import ar14 from "../../assets/architecture/ar14.jpg";
import ar16 from "../../assets/architecture/ar16.jpg";
import ar17 from "../../assets/architecture/ar17.jpg";
import ar18 from "../../assets/architecture/ar18.jpg";
import ar19 from "../../assets/architecture/ar19.jpg";
import ar20 from "../../assets/architecture/ar20.jpg";
import ar21 from "../../assets/architecture/ar21.jpg";
import ar22 from "../../assets/architecture/ar22.jpg";
import ar23 from "../../assets/architecture/ar23.jpg";

const allProjects = [
  { id: 1,  title: "Luxury Villa",        img: architecture3, category: "Architecture" },
  { id: 2,  title: "Luxury Interior",     img: project2,      category: "Interior" },
  { id: 3,  title: "Landscape Garden",    img: landscape,     category: "Landscape" },
  { id: 4,  title: "Luxury Bedroom",      img: bedroom,       category: "Bedrooms" },
  { id: 5,  title: "Cozy Bedroom",        img: bedroom1,      category: "Bedrooms" },
  { id: 6,  title: "Lobby",               img: lobby,         category: "Lobby" },
  { id: 7,  title: "Premium Kitchen",     img: interior,      category: "Interior" },
  { id: 8,  title: "Kitchen",             img: interior1,     category: "Interior" },
  { id: 9,  title: "City Lobby",          img: lobby1,        category: "Lobby" },
  { id:10,  title: "Villa",               img: architecture2, category: "Architecture" },
  { id:11,  title: "Modern Villa",        img: architecture4, category: "Architecture" },
  { id:12,  title: "Luxury Interior",     img: interior2,     category: "Interior" },
  { id:13,  title: "Black Theme",         img: bedroom2,      category: "Bedrooms" },
  { id:14,  title: "Garden",              img: landscape1,    category: "Landscape" },
  { id:15,  title: "Villa",               img: architecture1, category: "Architecture" },
  { id:16,  title: "Villa",               img: architecture5, category: "Architecture" },
  { id:17,  title: "Villa",               img: architecture6, category: "Architecture" },
  { id:18,  title: "Lobby Premium",       img: lobby2,        category: "Lobby" },
  { id:19,  title: "Luxury Lobby",        img: lobby3,        category: "Lobby" },
  { id:20,  title: "Modern Villa",        img: architecture7, category: "Architecture" },
  { id:21,  title: "Vill Garden",              img: landscape2,    category: "Landscape" },
  { id:22,  title: "Luxury Lobby",        img: lobby5,        category: "Lobby" },
  { id:23,  title: "Luxury Lobby",        img: lobby6,        category: "Lobby" },
  { id:24,  title: "Luxury Lobby",        img: lobby7,        category: "Lobby" },
  { id: 25,  title: "Cozy Bedroom",        img: bedroom5,      category: "Bedrooms" },
  { id: 26,  title: " Bedroom",        img:bedroom6 ,      category: "Bedrooms" },
  { id: 27,  title: "Luxury Bedroom",        img: bedroom7,      category: "Bedrooms" },
  { id:28,  title: "Modern Villa",        img: ar1, category: "Architecture" },
  { id:29,  title: "Modern Villa",        img: ar2, category: "Architecture" },
  { id:30,  title: "Modern Villa",        img: ar3, category: "Architecture" },
  { id:31,  title: "Modern Villa",        img: ar4, category: "Architecture" },
  { id:32,  title: "Modern Villa",        img: ar5, category: "Architecture" },
  { id:33,  title: "Modern Villa",        img: ar6, category: "Architecture" },
  { id:34,  title: "Modern Villa",        img: ar7, category: "Architecture" },
  { id:36,  title: "Modern Villa",        img: ar8, category: "Architecture" },
  { id:37,  title: "Modern Villa",        img: ar9, category: "Architecture" },
  { id:38,  title: "Modern Villa",        img: ar10, category: "Architecture" },
  { id:39,  title: "Modern Villa",        img: ar11, category: "Architecture" },
  { id:40,  title: "Modern Villa",        img: ar12, category: "Architecture" },
  { id:41,  title: "Modern Villa",        img: ar13, category: "Architecture" },
  { id:42,  title: "Modern Villa",        img: ar14, category: "Architecture" },
  { id:44,  title: "Modern Villa",        img: ar16, category: "Architecture" },
  { id:45,  title: "Modern Villa",        img: ar17, category: "Architecture" },
  { id:46,  title: "Modern Villa",        img: ar18, category: "Architecture" },
  { id:47,  title: "Modern Villa",        img: ar19, category: "Architecture" },
  { id:48,  title: "Modern Villa",        img: ar20, category: "Architecture" },
  { id:49,  title: "Modern Villa",        img: ar21, category: "Architecture" },
  { id:50,  title: "Modern Villa",        img: ar22, category: "Architecture" },
  { id:51,  title: "Modern Villa",        img: ar23, category: "Architecture" },
];


export default function PProjects() {
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["All", "Lobby", "Bedrooms", "Architecture", "Interior", "Landscape"];

  const filteredProjects = category === "All" ? allProjects : allProjects.filter((p) => p.category === category);

  const showMore = () => setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length));
  const showLess = () => setVisibleCount(6);

  return (
    <section id="projects" className="py-20 bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center text-[#D4AF37]"
        >
          Architectural Excellence
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10 rounded"
        />

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                category === cat
                  ? "bg-[#D4AF37] text-[#0f0f0f] border-[#D4AF37]"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleCount).map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-3xl overflow-hidden
                         bg-[#1a1a1a]/40 backdrop-blur-lg p-[2px] cursor-pointer
                         border border-gray-700 hover:border-[#D4AF37]
                         hover:shadow-[0_0_25px_#D4AF37]/40 transition"
            >
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"  // ✅ Lazy loading added
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

        {/* Toggle Button */}
        <div className="text-center mt-10">
          {visibleCount < filteredProjects.length ? (
            <motion.button
              onClick={showMore}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="px-7 py-3 bg-[#D4AF37] text-[#0f0f0f] rounded-lg hover:bg-[#b8902d] transition"
            >
              Show More
            </motion.button>
          ) : filteredProjects.length > 6 ? (
            <motion.button
              onClick={showLess}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="px-7 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Show Less
            </motion.button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
