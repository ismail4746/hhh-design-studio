import React from "react";
import { motion } from "framer-motion";
import archImg from "../../assets/jk.png";
import interiorImg from "../../assets/iiii.png";
import projectImg from "../../assets/prr.png";
import OptimizedImg from "../common/OptimizedImg";
import constructionImg from "../../assets/cccc.png";
import renovationImg from "../../assets/rio.png";

export default function Services() {
  const services = [
    {
      title: "Architecture Design",
      desc: "We craft innovative and sustainable designs blending creativity with functionality, ensuring every project is timeless. Our architectural approach emphasizes structural integrity, modern aesthetics, and long-term durability. From residential spaces to commercial landmarks, we deliver designs that inspire and elevate lifestyles. Every detail is thoughtfully planned to create harmony between form, function, and environment.",
      img: archImg,
    },
    {
      title: "Interior Design",
      desc: "Our interiors are curated with elegance and practicality, creating spaces that truly reflect your lifestyle. We combine luxurious materials with modern trends to achieve comfort and sophistication. Every corner is designed to balance aesthetics with usability, ensuring timeless appeal. From cozy homes to corporate spaces, we bring creativity and precision into every detail.",
      img: interiorImg,
    },
    {
      title: "Project Management",
      desc: "From concept to completion, we ensure efficiency, precision, and on-time delivery in every project. Our team coordinates every phase with transparency and professionalism to keep clients stress-free. We integrate advanced tools and methods for seamless execution and quality control. With a client-first approach, we guarantee smooth collaboration, timely progress, and successful outcomes every time.",
      img: projectImg,
    },

    {
      title: "Construction",
      desc: "Our construction services are built on a foundation of quality, reliability, and craftsmanship. We manage every aspect of the construction process with precision and care, ensuring that each project is executed to the highest standards. From groundbreaking to finishing touches, we prioritize safety, efficiency, and client satisfaction. Our experienced team works closely with architects and designers to bring visions to life while maintaining strict timelines and budgets.",
      img: constructionImg,
    },
    {
      title: "Renovation",
      desc: "Our renovation services breathe new life into existing spaces, blending modern design with timeless elegance. We specialize in transforming homes and commercial spaces while preserving their unique character. Our team handles every aspect of the renovation process with meticulous attention to detail, ensuring a seamless blend of aesthetics and functionality. Whether it's a complete overhaul or a subtle refresh, we deliver exceptional results that exceed expectations.",
      img: renovationImg,
    }
  ];

  // Variants for framer-motion
  const textVariant = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-24 bg-[#0e0e0e] text-white overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-400/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold tracking-tight">
            Our <span className="text-yellow-400">Services</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Delivering excellence in architecture, interiors and management with
            a blend of modern aesthetics and practical solutions.
          </p>
        </motion.div>

        {/* Zig-Zag Services */}
        <div className="space-y-28">
          {services.map((service, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <motion.div
                variants={imageVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group ${
                  index % 2 === 1 ? "md:order-2" : "md:order-1"
                }`}
              >
                <OptimizedImg
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-yellow-400/40 rounded-3xl group-hover:border-yellow-400 transition"></div>
              </motion.div>

              {/* Text */}
              <motion.div
                custom={index % 2 === 0 ? "right" : "left"}
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`md:px-10 relative ${
                  index % 2 === 1 ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="absolute -left-4 top-0 h-20 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>

                <h3 className="text-4xl font-bold mb-6 text-white relative inline-block">
                  {service.title}
                  <span className="absolute -bottom-2 left-0 w-2/5 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></span>
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-lg hover:text-gray-100 transition-colors duration-500">
                  {service.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
