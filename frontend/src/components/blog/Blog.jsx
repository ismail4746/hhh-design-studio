import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImg from "../common/OptimizedImg";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080";
    fetch(`${apiBase.replace(/\/$/, '')}/admin/blogs`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setBlogs(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const showMore = () => setVisibleCount((prev) => prev + 2);
  const closeModal = () => setSelectedBlog(null);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f0f0f]">
        <p className="text-gray-500 animate-pulse">Loading Blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gradient-to-tr from-black via-[#0a1f3f]/50 to-[#02101f]">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#b8902d] bg-clip-text text-transparent inline-block">
          Premium Blogs
        </h1>
        <div className="w-28 mx-auto mt-2 h-[3px] rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d]" />
      </div>

      {/* Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {blogs.slice(0, visibleCount).map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden bg-gradient-to-tr from-[#1e1e1e] to-[#111111] border-2 border-transparent hover:border-yellow-400 shadow-lg hover:shadow-yellow-500/40 transition-transform hover:-translate-y-3 duration-500 cursor-pointer"
          >
                {blog.thumbnail && (
              <div className="relative w-full h-56 bg-black overflow-hidden rounded-t-3xl">
                <OptimizedImg
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center text-gray-400 text-xs font-semibold tracking-wide">
                <time className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 fill-yellow-400"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 7v5l4 2" />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="uppercase tracking-wider bg-yellow-700/20 text-yellow-300 px-2 py-0.5 rounded-full">
                  {blog.category || "N/A"}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-white leading-tight hover:text-yellow-500 transition-colors">
                {blog.title}
              </h2>

              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Tags:{" "}
                <span className="text-yellow-400">
                  {Array.isArray(blog.tags)
                    ? blog.tags.join(", ")
                    : blog.tags || "N/A"}
                </span>
              </p>

              <button
                onClick={() => setSelectedBlog(blog)}
                className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-lg hover:shadow-yellow-400 transition duration-300 transform hover:scale-105"
                aria-label={`Read more about ${blog.title}`}
              >
                Read More <span className="ml-2 inline-block">➝</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More / Less */}
      <div className="text-center mt-14">
        {visibleCount < blogs.length ? (
          <button
            onClick={showMore}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-white font-medium tracking-wide hover:scale-105 hover:shadow-[0_0_30px_#D4AF37]/50 transition"
          >
            Show More
          </button>
        ) : (
          <button
            onClick={() => setVisibleCount(1)} // reset to sirf 1 blog
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#b8902d] to-[#D4AF37] text-white font-medium tracking-wide hover:scale-105 hover:shadow-[0_0_30px_#D4AF37]/50 transition"
          >
            Show Less
          </button>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex justify-center items-center bg-black/70 backdrop-blur-lg p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative bg-[#0f0f0f] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#2e2e2e]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 text-gray-300 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full transition"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-[#D4AF37]/50 scrollbar-track-transparent">

                {/* Header with Title */}
                <div className="bg-gradient-to-r from-[#1a1a1a] via-[#111111] to-[#1a1a1a] border border-[#3d3d3d] rounded-xl shadow-lg p-6 mb-4">
                  <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#b8902d] drop-shadow-[0_0_10px_#D4AF37]">
                    {selectedBlog.title}
                  </h2>
                </div>


                {/* Thumbnail */}
                    {selectedBlog.thumbnail && (
                  <div className="w-full flex justify-center items-center bg-[#000] py-6 px-4 border-b border-[#333]">
                    <OptimizedImg
                      src={selectedBlog.thumbnail}
                      alt={selectedBlog.title}
                      className="max-h-[400px] w-auto object-contain rounded-xl shadow-md"
                      loading="eager"
                    />
                  </div>
                )}

                {/* Meta Info: Date, Category, Tags */}
                <div className="p-6 space-y-4 text-white">
                  {/* Meta Info: Date, Category, Tags */}
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center text-sm px-6 pt-6">
                    {/* Date */}
                    <span className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#3a3a3a] px-4 py-1 rounded-full text-gray-300 shadow-sm hover:shadow-md transition">
                      {/* 📅{" "} */}
                      {/* <span className="text-sm">
                        {new Date(selectedBlog.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span> */}
                    </span>

                    {/* Category */}
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border border-[#444] px-4 py-1 rounded-full text-[#D4AF37] font-medium shadow-sm hover:shadow-md transition">
                      🗂️ Category:
                      <span className="text-white">
                        {selectedBlog.category || "N/A"}
                      </span>
                    </span>

                    {/* Tags */}
                    <span className="inline-flex items-center gap-2 bg-[#161616] border border-[#2f2f2f] px-4 py-1 rounded-full text-[#b8902d] font-medium shadow-sm hover:shadow-md transition">
                      🏷️ Tags:
                      <span className="text-white">
                        {selectedBlog.tags || "N/A"}
                      </span>
                    </span>
                  </div>


                  {/* Content */}
                  <div className="mt-4 max-w-prose mx-auto text-gray-300 leading-relaxed whitespace-pre-line text-base">
                    <p>
                      <span className="float-left mr-3 text-6xl font-extrabold text-[#D4AF37] leading-none select-none tracking-wide">
                        {selectedBlog.content.charAt(0)}
                      </span>
                      <span className="tracking-wide">{selectedBlog.content.slice(1)}</span>
                    </p>
                  </div>


                  {/* CTA Button */}
                  <div className="pt-8 text-center">
                    <button
                      onClick={closeModal}
                      className="inline-block px-10 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8902d] text-black font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#D4AF37]/40 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;
